import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

const JobMap = ({ jobs = [], selectedJobId = null, onJobSelect = () => {}, viewMode = 'world' }) => {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markersRef = useRef({})

  useEffect(() => {
    // Initialize map only once
    if (mapInstance.current) return

    if (!mapRef.current) return

    try {
      // Create map with Lagos coordinates
      mapInstance.current = L.map(mapRef.current, {
        center: [6.5244, 3.3792],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: true
      })

      // Add OpenStreetMap tiles
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 2
      }).addTo(mapInstance.current)

      // Trigger resize after a short delay to ensure proper rendering
      setTimeout(() => {
        if (mapInstance.current) {
          mapInstance.current.invalidateSize()
        }
      }, 100)
    } catch (error) {
      console.error('Error initializing map:', error)
    }

    // Handle window resize
    const handleResize = () => {
      if (mapInstance.current) {
        setTimeout(() => {
          mapInstance.current.invalidateSize()
        }, 100)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  // Handle view mode changes
  useEffect(() => {
    if (!mapInstance.current) return

    if (viewMode === 'world') {
      // World view - zoom out to show more countries
      mapInstance.current.setView([20, 0], 3)
    } else if (viewMode === 'region') {
      // Region detail - zoom in on Lagos/Nigeria region
      mapInstance.current.setView([6.5244, 3.3792], 11)
    }
  }, [viewMode])

  // Add markers when jobs change
  useEffect(() => {
    if (!mapInstance.current) return

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      mapInstance.current.removeLayer(marker)
    })
    markersRef.current = {}

    // Add new markers
    jobs.forEach(job => {
      if (job.lat && job.lng) {
        const isSelected = job.id === selectedJobId

        // Create marker
        const marker = L.marker([job.lat, job.lng])
          .bindPopup(`
            <div style="min-width: 200px;">
              <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">${job.title}</h3>
              <p style="margin: 2px 0; font-size: 12px; color: #666;">${job.company}</p>
              <p style="margin: 2px 0; font-size: 12px; color: #666;">${job.location}</p>
              ${job.salary ? `<p style="margin: 4px 0; font-size: 12px; font-weight: bold; color: #10b981;">${job.salary}</p>` : ''}
            </div>
          `)
          .on('click', () => {
            onJobSelect(job.id)
          })
          .addTo(mapInstance.current)

        // Highlight selected marker
        if (isSelected) {
          marker.openPopup()
          // Change marker color for selected
          const icon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
          marker.setIcon(icon)
        }

        markersRef.current[job.id] = marker
      }
    })
  }, [jobs, selectedJobId])

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f3f4f6'
        }}
      />
    </div>
  )
}

export default JobMap
