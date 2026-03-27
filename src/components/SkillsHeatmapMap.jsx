import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Set your Mapbox token here
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example'

const SkillsHeatmapMap = ({ countryData, onCountrySelect }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
      if (map.current) {
        map.current.setStyle(`mapbox://styles/mapbox/${isDark ? 'dark' : 'light'}-v11`)
      }
    })

    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${isDarkMode ? 'dark' : 'light'}-v11`,
      center: [10, 20],
      zoom: 2,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      logoPosition: 'bottom-right'
    })

    // Add attribution
    map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    // Disable default interactions
    map.current.scrollZoom.enable()
    map.current.dragRotate.disable()
    map.current.touchZoomRotate.disableRotation()

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [isDarkMode])

  // Add markers and interactions
  useEffect(() => {
    if (!map.current) return

    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.demand-marker')
    existingMarkers.forEach(marker => marker.remove())

    // Add markers for each country
    Object.entries(countryData).forEach(([code, data]) => {
      // Create marker element
      const markerEl = document.createElement('div')
      markerEl.className = 'demand-marker'
      markerEl.innerHTML = `
        <div class="marker-container">
          <div class="marker-pulse"></div>
          <div class="marker-dot"></div>
        </div>
      `

      // Set marker color based on demand
      const color = getDemandColor(data.demand)
      markerEl.style.setProperty('--marker-color', color)

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
        className: 'demand-popup'
      }).setHTML(`
        <div class="popup-content">
          <div class="popup-header">
            <span class="popup-flag">${data.flag}</span>
            <span class="popup-name">${data.name}</span>
          </div>
          <div class="popup-stats">
            <div class="stat">
              <span class="stat-label">Demand</span>
              <span class="stat-value">${data.demand}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Salary</span>
              <span class="stat-value">${data.salary}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Jobs</span>
              <span class="stat-value">${data.jobs.toLocaleString()}</span>
            </div>
          </div>
          <div class="popup-skills">
            ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
      `)

      // Create marker
      const marker = new mapboxgl.Marker({ element: markerEl })
        .setLngLat([data.lng, data.lat])
        .setPopup(popup)
        .addTo(map.current)

      // Marker interactions
      markerEl.addEventListener('mouseenter', () => {
        setHoveredCountry(code)
        markerEl.classList.add('hovered')
        popup.addTo(map.current)
      })

      markerEl.addEventListener('mouseleave', () => {
        setHoveredCountry(null)
        markerEl.classList.remove('hovered')
        popup.remove()
      })

      markerEl.addEventListener('click', (e) => {
        e.stopPropagation()
        setSelectedCountry(code)
        onCountrySelect(code)
      })
    })
  }, [countryData, onCountrySelect])

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'High':
        return '#13c8ec'
      case 'Growing':
        return '#f59e0b'
      default:
        return '#94a3b8'
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
      zoom: 2,
      duration: 1000
    })
  }

  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Zoom Controls - Glassmorphism */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="group size-10 rounded-lg backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/60 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
          title="Zoom in"
        >
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-200 text-lg group-hover:scale-110 transition-transform">add</span>
        </button>
        <button
          onClick={handleZoomOut}
          className="group size-10 rounded-lg backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/60 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
          title="Zoom out"
        >
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-200 text-lg group-hover:scale-110 transition-transform">remove</span>
        </button>
        <button
          onClick={handleResetView}
          className="group size-10 rounded-lg backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/60 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
          title="Reset view"
        >
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-200 text-lg group-hover:scale-110 transition-transform">my_location</span>
        </button>
      </div>

      {/* Legend - Bottom Left */}
      <div className="absolute bottom-4 left-4 z-10 backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/60 rounded-xl p-4 shadow-lg">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">Demand Levels</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="size-2.5 rounded-full bg-primary shadow-md" style={{ boxShadow: '0 0 8px rgba(19, 200, 236, 0.6)' }}></div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">High Demand</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-2.5 rounded-full bg-amber-400 shadow-md" style={{ boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)' }}></div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Growing</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-2.5 rounded-full bg-slate-400 shadow-md" style={{ boxShadow: '0 0 8px rgba(148, 163, 184, 0.6)' }}></div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Medium</span>
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="absolute top-4 left-4 z-10 backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/60 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Click markers to explore opportunities</p>
      </div>

      <style>{`
        .demand-marker {
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .marker-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .marker-pulse {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: var(--marker-color);
          opacity: 0.2;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .marker-dot {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--marker-color);
          border: 3px solid white;
          box-shadow: 0 0 12px var(--marker-color), 0 0 0 2px rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }

        .demand-marker.hovered .marker-dot {
          transform: scale(1.3);
          box-shadow: 0 0 20px var(--marker-color), 0 0 0 3px rgba(255, 255, 255, 0.8);
        }

        .demand-marker.hovered .marker-pulse {
          animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
        }

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

        .demand-popup .popup-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 12px;
          min-width: 220px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .dark .demand-popup .popup-content {
          background: rgba(30, 41, 59, 0.95);
          border: 1px solid rgba(71, 85, 105, 0.6);
        }

        .popup-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .popup-flag {
          font-size: 20px;
        }

        .popup-name {
          font-weight: 600;
          font-size: 14px;
          color: #1e293b;
        }

        .dark .popup-name {
          color: #f1f5f9;
        }

        .popup-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .dark .popup-stats {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-label {
          font-size: 11px;
          font-weight: 500;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .dark .stat-label {
          color: #94a3b8;
        }

        .stat-value {
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
        }

        .dark .stat-value {
          color: #f1f5f9;
        }

        .popup-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .skill-tag {
          display: inline-block;
          background: rgba(19, 200, 236, 0.1);
          color: #13c8ec;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }

        .dark .skill-tag {
          background: rgba(19, 200, 236, 0.15);
          color: #22d3ee;
        }

        .mapboxgl-ctrl-attrib {
          background: transparent;
          font-size: 11px;
        }

        .mapboxgl-ctrl-attrib a {
          color: #64748b;
        }

        .dark .mapboxgl-ctrl-attrib a {
          color: #94a3b8;
        }
      `}</style>
    </div>
  )
}

export default SkillsHeatmapMap
