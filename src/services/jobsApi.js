// Free job APIs - no authentication required

// Geocoding service to convert locations to coordinates
const geocodeLocation = async (location) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`
    )
    const data = await response.json()
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      }
    }
  } catch (error) {
    console.error('Geocoding error:', error)
  }
  return null
}

// Fetch jobs from Remotive API (free, no auth required)
export const fetchJobsFromRemotive = async () => {
  try {
    const response = await fetch('https://remotive.com/api/remote-jobs?limit=50')
    const data = await response.json()

    if (data.jobs) {
      const jobsWithCoords = await Promise.all(
        data.jobs.map(async (job) => {
          let coords = null

          // Try to geocode the location
          if (job.job_title && job.company_name) {
            // Extract city from job title or use company location
            const location = job.job_title.includes('Remote')
              ? 'Lagos, Nigeria' // Default to Lagos for remote jobs
              : job.company_name

            coords = await geocodeLocation(location)
          }

          return {
            id: `remotive-${job.id}`,
            title: job.job_title,
            company: job.company_name,
            location: job.job_title,
            salary: null,
            url: job.url,
            source: 'Remotive',
            lat: coords?.lat,
            lng: coords?.lng
          }
        })
      )

      // Filter out jobs without coordinates
      return jobsWithCoords.filter(job => job.lat && job.lng)
    }
  } catch (error) {
    console.error('Error fetching from Remotive:', error)
  }

  return []
}

// Fetch jobs from Arbeitnow API (free, no auth required)
export const fetchJobsFromArbeitnow = async () => {
  try {
    const response = await fetch('https://www.arbeitnow.com/api/v2/jobs?page=1')
    const data = await response.json()

    if (data.results) {
      const jobsWithCoords = await Promise.all(
        data.results.map(async (job) => {
          let coords = null

          // Try to geocode the location
          if (job.location) {
            coords = await geocodeLocation(job.location)
          }

          return {
            id: `arbeitnow-${job.id}`,
            title: job.title,
            company: job.company_name,
            location: job.location,
            salary: null,
            url: job.url,
            source: 'Arbeitnow',
            lat: coords?.lat,
            lng: coords?.lng
          }
        })
      )

      // Filter out jobs without coordinates
      return jobsWithCoords.filter(job => job.lat && job.lng)
    }
  } catch (error) {
    console.error('Error fetching from Arbeitnow:', error)
  }

  return []
}

// Combine jobs from multiple sources
export const fetchAllJobs = async () => {
  try {
    const [remotiveJobs, arbeitnowJobs] = await Promise.all([
      fetchJobsFromRemotive(),
      fetchJobsFromArbeitnow()
    ])

    return [...remotiveJobs, ...arbeitnowJobs]
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}

// Global job locations with coordinates - 120+ jobs spread across continents
const GLOBAL_LOCATIONS = [
  // Africa (15 locations)
  { city: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792 },
  { city: 'Abuja, Nigeria', lat: 9.0765, lng: 7.3986 },
  { city: 'Ibadan, Nigeria', lat: 7.3869, lng: 3.8953 },
  { city: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357 },
  { city: 'Alexandria, Egypt', lat: 31.2001, lng: 29.9187 },
  { city: 'Johannesburg, South Africa', lat: -26.2023, lng: 28.0436 },
  { city: 'Cape Town, South Africa', lat: -33.9249, lng: 18.4241 },
  { city: 'Nairobi, Kenya', lat: -1.2921, lng: 36.8219 },
  { city: 'Accra, Ghana', lat: 5.6037, lng: -0.187 },
  { city: 'Casablanca, Morocco', lat: 33.5731, lng: -7.5898 },
  { city: 'Tunis, Tunisia', lat: 36.8065, lng: 10.1686 },
  { city: 'Dakar, Senegal', lat: 14.7167, lng: -17.4674 },
  { city: 'Kigali, Rwanda', lat: -1.9536, lng: 29.8739 },
  { city: 'Kampala, Uganda', lat: 0.3476, lng: 32.5825 },
  { city: 'Dar es Salaam, Tanzania', lat: -6.8, lng: 39.2833 },
  
  // Europe (20 locations)
  { city: 'London, UK', lat: 51.5074, lng: -0.1278 },
  { city: 'Paris, France', lat: 48.8566, lng: 2.3522 },
  { city: 'Berlin, Germany', lat: 52.52, lng: 13.405 },
  { city: 'Amsterdam, Netherlands', lat: 52.3676, lng: 4.9041 },
  { city: 'Barcelona, Spain', lat: 41.3851, lng: 2.1734 },
  { city: 'Madrid, Spain', lat: 40.4168, lng: -3.7038 },
  { city: 'Rome, Italy', lat: 41.9028, lng: 12.4964 },
  { city: 'Milan, Italy', lat: 45.4642, lng: 9.1900 },
  { city: 'Zurich, Switzerland', lat: 47.3769, lng: 8.5472 },
  { city: 'Vienna, Austria', lat: 48.2082, lng: 16.3738 },
  { city: 'Prague, Czech Republic', lat: 50.0755, lng: 14.4378 },
  { city: 'Warsaw, Poland', lat: 52.2297, lng: 21.0122 },
  { city: 'Stockholm, Sweden', lat: 59.3293, lng: 18.0686 },
  { city: 'Copenhagen, Denmark', lat: 55.6761, lng: 12.5683 },
  { city: 'Helsinki, Finland', lat: 60.1695, lng: 24.9354 },
  { city: 'Dublin, Ireland', lat: 53.3498, lng: -6.2603 },
  { city: 'Lisbon, Portugal', lat: 38.7223, lng: -9.1393 },
  { city: 'Athens, Greece', lat: 37.9838, lng: 23.7275 },
  { city: 'Istanbul, Turkey', lat: 41.0082, lng: 28.9784 },
  { city: 'Moscow, Russia', lat: 55.7558, lng: 37.6173 },
  
  // Asia (25 locations)
  { city: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { city: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
  { city: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
  { city: 'Osaka, Japan', lat: 34.6937, lng: 135.5023 },
  { city: 'Seoul, South Korea', lat: 37.5665, lng: 126.9780 },
  { city: 'Bangkok, Thailand', lat: 13.7563, lng: 100.5018 },
  { city: 'Ho Chi Minh City, Vietnam', lat: 10.8231, lng: 106.6297 },
  { city: 'Hanoi, Vietnam', lat: 21.0285, lng: 105.8542 },
  { city: 'Manila, Philippines', lat: 14.5995, lng: 120.9842 },
  { city: 'Jakarta, Indonesia', lat: -6.2088, lng: 106.8456 },
  { city: 'Kuala Lumpur, Malaysia', lat: 3.1390, lng: 101.6869 },
  { city: 'Bangkok, Thailand', lat: 13.7563, lng: 100.5018 },
  { city: 'New Delhi, India', lat: 28.7041, lng: 77.1025 },
  { city: 'Mumbai, India', lat: 19.0760, lng: 72.8777 },
  { city: 'Bangalore, India', lat: 12.9716, lng: 77.5946 },
  { city: 'Hyderabad, India', lat: 17.3850, lng: 78.4867 },
  { city: 'Karachi, Pakistan', lat: 24.8607, lng: 67.0011 },
  { city: 'Lahore, Pakistan', lat: 31.5204, lng: 74.3587 },
  { city: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
  { city: 'Abu Dhabi, UAE', lat: 24.4539, lng: 54.3773 },
  { city: 'Tel Aviv, Israel', lat: 32.0853, lng: 34.7818 },
  { city: 'Beirut, Lebanon', lat: 33.8886, lng: 35.4955 },
  { city: 'Bangkok, Thailand', lat: 13.7563, lng: 100.5018 },
  { city: 'Chiang Mai, Thailand', lat: 18.7883, lng: 98.9853 },
  { city: 'Phuket, Thailand', lat: 8.0863, lng: 98.3384 },
  
  // North America (20 locations)
  { city: 'New York, USA', lat: 40.7128, lng: -74.0060 },
  { city: 'Los Angeles, USA', lat: 34.0522, lng: -118.2437 },
  { city: 'Chicago, USA', lat: 41.8781, lng: -87.6298 },
  { city: 'Houston, USA', lat: 29.7604, lng: -95.3698 },
  { city: 'Phoenix, USA', lat: 33.4484, lng: -112.0742 },
  { city: 'Philadelphia, USA', lat: 39.9526, lng: -75.1652 },
  { city: 'San Antonio, USA', lat: 29.4241, lng: -98.4936 },
  { city: 'San Diego, USA', lat: 32.7157, lng: -117.1611 },
  { city: 'Dallas, USA', lat: 32.7767, lng: -96.7970 },
  { city: 'San Francisco, USA', lat: 37.7749, lng: -122.4194 },
  { city: 'Seattle, USA', lat: 47.6062, lng: -122.3321 },
  { city: 'Boston, USA', lat: 42.3601, lng: -71.0589 },
  { city: 'Miami, USA', lat: 25.7617, lng: -80.1918 },
  { city: 'Denver, USA', lat: 39.7392, lng: -104.9903 },
  { city: 'Toronto, Canada', lat: 43.6532, lng: -79.3832 },
  { city: 'Vancouver, Canada', lat: 49.2827, lng: -123.1207 },
  { city: 'Montreal, Canada', lat: 45.5017, lng: -73.5673 },
  { city: 'Mexico City, Mexico', lat: 19.4326, lng: -99.1332 },
  { city: 'Guadalajara, Mexico', lat: 20.6597, lng: -103.3496 },
  { city: 'Monterrey, Mexico', lat: 25.6866, lng: -100.3161 },
  
  // South America (15 locations)
  { city: 'São Paulo, Brazil', lat: -23.5505, lng: -46.6333 },
  { city: 'Rio de Janeiro, Brazil', lat: -22.9068, lng: -43.1729 },
  { city: 'Brasília, Brazil', lat: -15.7942, lng: -47.8822 },
  { city: 'Salvador, Brazil', lat: -12.9714, lng: -38.5014 },
  { city: 'Buenos Aires, Argentina', lat: -34.6037, lng: -58.3816 },
  { city: 'Córdoba, Argentina', lat: -31.4135, lng: -64.1811 },
  { city: 'Santiago, Chile', lat: -33.8688, lng: -51.2093 },
  { city: 'Lima, Peru', lat: -12.0464, lng: -77.0428 },
  { city: 'Bogotá, Colombia', lat: 4.7110, lng: -74.0721 },
  { city: 'Medellín, Colombia', lat: 6.2442, lng: -75.5812 },
  { city: 'Caracas, Venezuela', lat: 10.4806, lng: -66.9036 },
  { city: 'Quito, Ecuador', lat: -0.2299, lng: -78.5249 },
  { city: 'La Paz, Bolivia', lat: -16.5000, lng: -68.1500 },
  { city: 'Asunción, Paraguay', lat: -25.2637, lng: -57.5759 },
  { city: 'Montevideo, Uruguay', lat: -34.9011, lng: -56.1645 },
  
  // Oceania (10 locations)
  { city: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 },
  { city: 'Melbourne, Australia', lat: -37.8136, lng: 144.9631 },
  { city: 'Brisbane, Australia', lat: -27.4698, lng: 153.0251 },
  { city: 'Perth, Australia', lat: -31.9505, lng: 115.8605 },
  { city: 'Auckland, New Zealand', lat: -37.0882, lng: 174.7765 },
  { city: 'Wellington, New Zealand', lat: -41.2865, lng: 174.7762 },
  { city: 'Christchurch, New Zealand', lat: -43.5321, lng: 172.6362 },
  { city: 'Fiji', lat: -17.7134, lng: 178.0650 },
  { city: 'Samoa', lat: -13.7590, lng: -172.1046 },
  { city: 'Vanuatu', lat: -17.7404, lng: 168.3045 },
]

// Job titles for variety
const JOB_TITLES = [
  'Senior React Developer',
  'Full Stack Engineer',
  'DevOps Engineer',
  'Product Manager',
  'UX/UI Designer',
  'Backend Developer',
  'Data Scientist',
  'Frontend Engineer',
  'Mobile App Developer',
  'QA Engineer',
  'Cloud Architect',
  'Machine Learning Engineer',
  'Security Engineer',
  'Database Administrator',
  'Solutions Architect',
  'Technical Lead',
  'API Developer',
  'Systems Administrator',
  'Business Analyst',
  'Growth Hacker',
  'Blockchain Developer',
  'DevOps Specialist',
  'iOS Developer',
  'Android Developer',
  'Site Reliability Engineer',
  'Technical Writer',
  'Scrum Master',
  'Data Engineer',
  'Network Engineer',
  'UI Developer',
  'Python Developer',
  'Java Developer',
  'Go Developer',
  'Rust Developer',
  'PHP Developer',
  'Ruby Developer',
  'C++ Developer',
  'Swift Developer',
  'Kotlin Developer',
  'Flutter Developer',
]

const COMPANIES = [
  'Tech Startup', 'Digital Agency', 'Cloud Services', 'SaaS Company', 'Design Studio',
  'FinTech Solutions', 'Analytics Corp', 'E-commerce Platform', 'Mobile First Inc',
  'Software Testing Co', 'Infrastructure Pro', 'AI Innovations', 'CyberSec Ltd',
  'Data Systems', 'Enterprise Solutions', 'Tech Leadership Co', 'Integration Services',
  'IT Operations', 'Consulting Group', 'Startup Accelerator', 'Crypto Ventures',
  'Container Tech', 'Mobile Apps Inc', 'App Factory', 'Uptime Solutions',
  'Documentation Pro', 'Agile Consulting', 'Big Data Corp', 'Network Solutions',
  'Interface Design Co', 'Python House', 'Enterprise Java', 'Golang Experts',
  'Systems Programming', 'Web Development Co', 'Rails Masters', 'Performance Computing',
  'iOS Experts', 'Android Pro', 'Cross Platform Apps', 'Mobile Solutions',
  'Frontend Masters', 'Enterprise Frontend', 'API Specialists', 'Search Solutions',
  'Caching Experts', 'NoSQL Solutions', 'Database Pro', 'SQL Experts',
  'Enterprise Database', 'Global Tech Corp', 'Innovation Labs', 'Digital Transformation',
]

const SALARY_RANGES = [
  '$60k - $85k',
  '$65k - $95k',
  '$70k - $100k',
  '$75k - $110k',
  '$80k - $120k',
  '$85k - $125k',
  '$90k - $130k',
  '$95k - $140k',
  '$100k - $150k',
  '$110k - $160k',
  '$120k - $180k',
]

// Generate 120 mock jobs
export const getMockJobs = () => {
  const jobs = []
  let jobId = 1

  for (let i = 0; i < GLOBAL_LOCATIONS.length; i++) {
    const location = GLOBAL_LOCATIONS[i]
    
    // 2-3 jobs per location for variety
    const jobsPerLocation = i % 3 === 0 ? 3 : 2
    
    for (let j = 0; j < jobsPerLocation; j++) {
      jobs.push({
        id: `mock-${jobId}`,
        title: JOB_TITLES[(jobId * 7) % JOB_TITLES.length],
        company: COMPANIES[(jobId * 11) % COMPANIES.length],
        location: location.city,
        salary: SALARY_RANGES[(jobId * 13) % SALARY_RANGES.length],
        url: '#',
        source: 'Mock',
        lat: location.lat,
        lng: location.lng,
        posted: `${(jobId % 7) + 1} days ago`
      })
      jobId++
    }
  }

  return jobs.slice(0, 120) // Return exactly 120 jobs
}
