import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const GlobalTalentMap = ({ countryData, onCountrySelect }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [mapReady, setMapReady] = useState(false)
  const [error, setError] = useState(null)

  // Initialize map
  useEffect(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN

    if (!token || token.includes('example')) {
      setError('Please add a valid Mapbox token to .env.local')
      return
    }

    if (!mapContainer.current) return

    mapboxgl.accessToken = token

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [10, 20],
        zoom: 1.5,
        pitch: 0,
        bearing: 0,
        attributionControl: true,
        logoPosition: 'bottom-left',
        maxZoom: 18,
        minZoom: 1
      })

      // Add navigation controls
      const nav = new mapboxgl.NavigationControl({ showCompass: false })
      map.current.addControl(nav, 'bottom-right')

      // Wait for map to load
      map.current.on('load', () => {
        setMapReady(true)
        addDataLayers()
      })

      map.current.on('error', (e) => {
        console.error('Map error:', e)
        setError('Failed to load Mapbox map. Check your token.')
      })

      map.current.on('style.load', () => {
        if (mapReady) {
          addDataLayers()
        }
      })
    } catch (err) {
      console.error('Map init error:', err)
      setError('Failed to initialize map')
    }

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  const addDataLayers = () => {
    if (!map.current || !countryData) return

    try {
      // Prepare data
      const demandData = Object.entries(countryData).map(([code, data]) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [data.lng, data.lat]
        },
        properties: {
          code,
          name: data.name,
          demand: data.demand,
          salary: data.salary,
          jobs: data.jobs,
          skills: data.skills.join(', ')
        }
      }))

      // Add source if not exists
      if (!map.current.getSource('demand-data')) {
        map.current.addSource('demand-data', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: demandData
          }
        })
      }

      // Add layers
      const layers = [
        {
          id: 'demand-high',
          filter: ['==', ['get', 'demand'], 'High'],
          color: '#13c8ec',
          radius: [1, 8, 4, 12, 8, 16, 15, 20]
        },
        {
          id: 'demand-growing',
          filter: ['==', ['get', 'demand'], 'Growing'],
          color: '#f59e0b',
          radius: [1, 6, 4, 10, 8, 14, 15, 18]
        },
        {
          id: 'demand-medium',
          filter: ['==', ['get', 'demand'], 'Medium'],
          color: '#94a3b8',
          radius: [1, 5, 4, 8, 8, 12, 15, 16]
        }
      ]

      layers.forEach(layer => {
        if (!map.current.getLayer(layer.id)) {
          map.current.addLayer({
            id: layer.id,
            type: 'circle',
            source: 'demand-data',
            filter: layer.filter,
            paint: {
              'circle-radius': ['interpolate', ['linear'], ['zoom'], ...layer.radius],
              'circle-color': layer.color,
              'circle-opacity': 0.8,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff',
              'circle-stroke-opacity': 0.9
            }
          })
        }
      })

      // Add hover layer
      if (!map.current.getLayer('demand-hover')) {
        map.current.addLayer({
          id: 'demand-hover',
          type: 'circle',
          source: 'demand-data',
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 10, 4, 15, 8, 20, 15, 25],
            'circle-color': '#ffffff',
            'circle-opacity': 0,
            'circle-stroke-width': 3,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-opacity': 0
          }
        })
      }

      // Add interactions
      const interactiveLayers = ['demand-high', 'demand-growing', 'demand-medium']

      interactiveLayers.forEach(layer => {
        map.current.on('mouseenter', layer, (e) => {
          map.current.getCanvas().style.cursor = 'pointer'
          const feature = e.features[0]

          map.current.setPaintProperty('demand-hover', 'circle-opacity', 0.2)
          map.current.setPaintProperty('demand-hover', 'circle-stroke-opacity', 0.6)
          map.current.setFilter('demand-hover', ['==', ['get', 'code'], feature.properties.code])

          showPopup(feature, e.lngLat)
        })

        map.current.on('mouseleave', layer, () => {
          map.current.getCanvas().style.cursor = ''
          map.current.setPaintProperty('demand-hover', 'circle-opacity', 0)
          map.current.setPaintProperty('demand-hover', 'circle-stroke-opacity', 0)
          removePopup()
        })

        map.current.on('click', layer, (e) => {
          const feature = e.features[0]
          const code = feature.properties.code

          map.current.flyTo({
            center: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
            zoom: 4,
            duration: 1000
          })

          onCountrySelect(code)
        })
      })
    } catch (err) {
      console.error('Error adding layers:', err)
    }
  }

  const showPopup = (feature, lngLat) => {
    const props = feature.properties
    const html = `
      <div class="map-popup">
        <div class="popup-header"><strong>${props.name}</strong></div>
        <div class="popup-body">
          <div class="popup-row">
            <span class="popup-label">Demand:</span>
            <span class="popup-value">${props.demand}</span>
          </div>
          <div class="popup-row">
            <span class="popup-label">Jobs:</span>
            <span class="popup-value">${parseInt(props.jobs).toLocaleString()}</span>
          </div>
          <div class="popup-row">
            <span class="popup-label">Salary:</span>
            <span class="popup-value">${props.salary}</span>
          </div>
          <div class="popup-skills">
            ${props.skills.split(', ').map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
          </div>
        </div>
      </div>
    `

    removePopup()

    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      closeOnClick: false,
      className: 'talent-popup'
    })
      .setLngLat(lngLat)
      .setHTML(html)
      .addTo(map.current)

    map.current._currentPopup = popup
  }

  const removePopup = () => {
    if (map.current && map.current._currentPopup) {
      map.current._currentPopup.remove()
      map.current._currentPopup = null
    }
  }

  const handleZoomIn = () => {
    map.current?.zoomTo(map.current.getZoom() + 1, { duration: 300 })
  }

  const handleZoomOut = () => {
    map.current?.zoomTo(map.current.getZoom() - 1, { duration: 300 })
  }

  const handleResetView = () => {
    map.current?.flyTo({
      center: [10, 20],
      zoom: 1.5,
      duration: 1000
    })
  }

  if (error) {
    return (
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg bg-slate-900 flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-red-400 font-bold mb-2">⚠️ Map Setup Required</p>
          <p className="text-slate-300 text-sm mb-4">{error}</p>
          <div className="text-slate-400 text-xs space-y-2">
            <p>1. Go to: <a href="https://account.mapbox.com/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">account.mapbox.com/tokens</a></p>
            <p>2. Create a free token</p>
            <p>3. Add to .env.local: VITE_MAPBOX_TOKEN=your_token</p>
            <p>4. Restart dev server</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
      <div ref={mapContainer} className="w-full h-full bg-slate-900" />

      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="size-10 bg-slate-800/80 hover:bg-slate-700/90 border border-slate-600 rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
          title="Zoom in"
        >
          <span className="material-symbols-outlined text-white text-lg">add</span>
        </button>
        <button
          onClick={handleZoomOut}
          className="size-10 bg-slate-800/80 hover:bg-slate-700/90 border border-slate-600 rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
          title="Zoom out"
        >
          <span className="material-symbols-outlined text-white text-lg">remove</span>
        </button>
        <button
          onClick={handleResetView}
          className="size-10 bg-slate-800/80 hover:bg-slate-700/90 border border-slate-600 rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
          title="Reset view"
        >
          <span className="material-symbols-outlined text-white text-lg">my_location</span>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-10 bg-slate-800/80 border border-slate-600 rounded-lg p-4 shadow-lg">
        <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wide">Demand Levels</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-cyan-400"></div>
            <span className="text-xs font-medium text-slate-300">High Demand</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-amber-400"></div>
            <span className="text-xs font-medium text-slate-300">Growing</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-slate-500"></div>
            <span className="text-xs font-medium text-slate-300">Medium</span>
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="absolute top-6 left-6 z-10 bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-2 shadow-lg">
        <p className="text-xs font-medium text-slate-300">Click markers to explore • Scroll to zoom</p>
      </div>

      <style>{`
        .mapboxgl-popup {
          max-width: none;
        }

        .mapboxgl-popup-content {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
        }

        .talent-popup .mapboxgl-popup-content {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(71, 85, 105, 0.8);
          border-radius: 8px;
          padding: 12px;
          backdrop-filter: blur(8px);
        }

        .map-popup {
          min-width: 200px;
        }

        .popup-header {
          font-size: 13px;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.3);
        }

        .popup-body {
          font-size: 12px;
          color: #cbd5e1;
        }

        .popup-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .popup-label {
          color: #94a3b8;
          font-weight: 500;
        }

        .popup-value {
          color: #f1f5f9;
          font-weight: 600;
        }

        .popup-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid rgba(148, 163, 184, 0.3);
        }

        .skill-badge {
          display: inline-block;
          background: rgba(19, 200, 236, 0.2);
          color: #22d3ee;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 500;
        }

        .mapboxgl-ctrl-attrib {
          background: transparent;
          font-size: 10px;
        }

        .mapboxgl-ctrl-attrib a {
          color: #94a3b8;
        }

        .mapboxgl-ctrl-attrib a:hover {
          color: #cbd5e1;
        }
      `}</style>
    </div>
  )
}

export default GlobalTalentMap
