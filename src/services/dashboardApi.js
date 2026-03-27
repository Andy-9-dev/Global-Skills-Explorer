// Dashboard API endpoints
const API_BASE_URL = '/api'

// Helper function to get auth token (returns null if not logged in)
const getAuthToken = () => {
  return localStorage.getItem('authToken') || null
}

// Helper function to build headers (works with or without auth)
const buildHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  }
  
  const token = getAuthToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}

/**
 * Fetch skills heatmap data
 * @param {Array} skills - Selected skills to filter by
 * @param {String} role - Selected role to filter by
 * @returns {Promise} - Heatmap data with skill demand by country
 */
export const fetchSkillsHeatmap = async (skills = [], role = '') => {
  try {
    const params = new URLSearchParams({
      skills: skills.join(','),
      role: role
    })

    const response = await fetch(`${API_BASE_URL}/skills-heatmap?${params}`, {
      method: 'GET',
      headers: buildHeaders()
    })

    if (!response.ok) {
      throw new Error('Failed to fetch skills heatmap data')
    }

    const data = await response.json()
    
    // Expected response format:
    // [
    //   { skill: 'React', country: 'USA', demandLevel: 'high', percentage: 95 },
    //   { skill: 'Python', country: 'India', demandLevel: 'growing', percentage: 85 },
    //   ...
    // ]
    
    return data
  } catch (error) {
    console.error('Skills heatmap API error:', error)
    return []
  }
}

/**
 * Fetch job postings
 * @param {String} role - Role to filter by
 * @param {Array} skills - Skills to filter by
 * @param {String} geography - Geography filter (optional)
 * @returns {Promise} - Array of job postings
 */
export const fetchJobPostings = async (role = '', skills = [], geography = 'Global') => {
  try {
    const params = new URLSearchParams({
      role: role,
      skills: skills.join(','),
      geography: geography,
      limit: 10
    })

    const response = await fetch(`${API_BASE_URL}/job-postings?${params}`, {
      method: 'GET',
      headers: buildHeaders()
    })

    if (!response.ok) {
      throw new Error('Failed to fetch job postings')
    }

    const data = await response.json()
    
    // Expected response format:
    // [
    //   {
    //     id: '123',
    //     title: 'Senior React Developer',
    //     company: 'Tech Corp',
    //     location: 'San Francisco, CA',
    //     salary: '$150k - $200k',
    //     postedAt: '2024-01-15T10:30:00Z',
    //     skills: ['React', 'TypeScript'],
    //     remote: true
    //   },
    //   ...
    // ]
    
    return data
  } catch (error) {
    console.error('Job postings API error:', error)
    return []
  }
}

/**
 * Fetch salary insights by region
 * @returns {Promise} - Regional salary data
 */
export const fetchSalaryInsights = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/salary-insights`, {
      method: 'GET',
      headers: buildHeaders()
    })

    if (!response.ok) {
      throw new Error('Failed to fetch salary insights')
    }

    const data = await response.json()
    
    // Expected response format:
    // [
    //   { region: 'North America', avgSalary: 145000, currency: 'USD', growth: 12 },
    //   { region: 'Europe', avgSalary: 110000, currency: 'USD', growth: 8 },
    //   ...
    // ]
    
    // Transform to widget format
    return data.map(item => ({
      region: item.region,
      salary: `$${(item.avgSalary / 1000).toFixed(0)}k`,
      height: `${Math.min(100, (item.avgSalary / 2000))}%`
    }))
  } catch (error) {
    console.error('Salary insights API error:', error)
    return []
  }
}

/**
 * Fetch detailed job posting by ID
 * @param {String} jobId - Job posting ID
 * @returns {Promise} - Detailed job data
 */
export const fetchJobDetails = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/job-postings/${jobId}`, {
      method: 'GET',
      headers: buildHeaders()
    })

    if (!response.ok) {
      throw new Error('Failed to fetch job details')
    }

    return await response.json()
  } catch (error) {
    console.error('Job details API error:', error)
    return null
  }
}

/**
 * Search jobs with advanced filters
 * @param {Object} filters - Search filters
 * @returns {Promise} - Filtered job postings
 */
export const searchJobs = async (filters = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/job-postings/search`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(filters)
    })

    if (!response.ok) {
      throw new Error('Failed to search jobs')
    }

    return await response.json()
  } catch (error) {
    console.error('Job search API error:', error)
    return []
  }
}
