// Adzuna Job API Service
// API Key: 26f6db81fe3e03fce024e9c228269726

const ADZUNA_API_KEY = '26f6db81fe3e03fce024e9c228269726'
const ADZUNA_APP_ID = 'global_skills_explorer' // App ID for Adzuna
const ADZUNA_BASE_URL = 'https://api.adzuna.com/v1/api/jobs'

// Country code mapping for Adzuna API
const countryCodeMap = {
  US: 'us',
  GB: 'gb',
  DE: 'de',
  IN: 'in',
  CA: 'ca',
  AU: 'au',
  SG: 'sg',
  JP: 'jp',
  FR: 'fr',
  NL: 'nl',
  SE: 'se',
  CH: 'ch',
  NZ: 'nz',
  IE: 'ie',
  BR: 'br',
  MX: 'mx',
}

/**
 * Fetch jobs from Adzuna API for a specific country
 * @param {string} countryCode - Country code (e.g., 'US', 'GB')
 * @param {object} options - Search options
 * @returns {Promise<array>} Array of job listings
 */
export const fetchJobsByCountry = async (countryCode, options = {}) => {
  try {
    const country = countryCodeMap[countryCode] || countryCode.toLowerCase()
    
    // Build query parameters
    const params = new URLSearchParams({
      app_id: ADZUNA_APP_ID,
      app_key: ADZUNA_API_KEY,
      results_per_page: options.limit || 10,
      what: options.keywords || 'React Python AWS JavaScript Node.js',
      where: options.location || '',
      sort_by: options.sortBy || 'date',
      sort_direction: options.sortDirection || 'descending',
    })

    const page = options.page || 1
    const url = `${ADZUNA_BASE_URL}/${country}/search/${page}?${params.toString()}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      console.error(`Adzuna API error: ${response.status}`)
      return null
    }

    const data = await response.json()
    
    if (!data.results) {
      return []
    }

    // Transform Adzuna data to our format
    return data.results.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      salary: formatSalary(job),
      posted: formatPostedTime(job.created),
      url: job.redirect_url,
      description: job.description,
      category: job.category.label,
      contractType: job.contract_type,
      created: job.created,
    }))
  } catch (error) {
    console.error('Error fetching jobs from Adzuna:', error)
    return null
  }
}

/**
 * Search jobs by keywords across all countries
 * @param {string} keywords - Search keywords
 * @param {string} countryCode - Country code
 * @param {object} options - Additional options
 * @returns {Promise<array>} Array of job listings
 */
export const searchJobs = async (keywords, countryCode = 'US', options = {}) => {
  try {
    const country = countryCodeMap[countryCode] || countryCode.toLowerCase()
    
    const params = new URLSearchParams({
      app_id: ADZUNA_APP_ID,
      app_key: ADZUNA_API_KEY,
      results_per_page: options.limit || 20,
      what: keywords,
      where: options.location || '',
      sort_by: options.sortBy || 'date',
    })

    const page = options.page || 1
    const url = `${ADZUNA_BASE_URL}/${country}/search/${page}?${params.toString()}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      return null
    }

    const data = await response.json()
    
    return data.results ? data.results.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      salary: formatSalary(job),
      posted: formatPostedTime(job.created),
      url: job.redirect_url,
      description: job.description,
      category: job.category.label,
      contractType: job.contract_type,
      created: job.created,
    })) : []
  } catch (error) {
    console.error('Error searching jobs:', error)
    return null
  }
}

/**
 * Get job categories available in a country
 * @param {string} countryCode - Country code
 * @returns {Promise<array>} Array of categories
 */
export const getJobCategories = async (countryCode = 'US') => {
  try {
    const country = countryCodeMap[countryCode] || countryCode.toLowerCase()
    
    const params = new URLSearchParams({
      app_id: ADZUNA_APP_ID,
      app_key: ADZUNA_API_KEY,
    })

    const url = `${ADZUNA_BASE_URL}/${country}/categories?${params.toString()}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Format salary information
 * @param {object} job - Job object from Adzuna
 * @returns {string} Formatted salary string
 */
const formatSalary = (job) => {
  if (!job.salary_min || !job.salary_max) {
    return 'Salary not specified'
  }

  const min = Math.round(job.salary_min / 1000)
  const max = Math.round(job.salary_max / 1000)
  
  // Determine currency based on country
  let currency = '$'
  if (job.location.area && job.location.area[0]) {
    const country = job.location.area[0]
    if (country.includes('UK') || country.includes('United Kingdom')) currency = '£'
    if (country.includes('Germany') || country.includes('Europe')) currency = '€'
    if (country.includes('India')) currency = '₹'
    if (country.includes('Australia')) currency = 'A$'
    if (country.includes('Canada')) currency = 'C$'
    if (country.includes('Singapore')) currency = 'S$'
    if (country.includes('Japan')) currency = '¥'
  }

  return `${currency}${min}k - ${currency}${max}k`
}

/**
 * Format posted time to relative format
 * @param {string} createdDate - ISO date string
 * @returns {string} Relative time string
 */
const formatPostedTime = (createdDate) => {
  const now = new Date()
  const created = new Date(createdDate)
  const diffMs = now - created
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) {
    return `${diffMins}m ago`
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else if (diffDays < 7) {
    return `${diffDays}d ago`
  } else {
    return created.toLocaleDateString()
  }
}

/**
 * Get trending skills in a country
 * @param {string} countryCode - Country code
 * @returns {Promise<array>} Array of trending skills
 */
export const getTrendingSkills = async (countryCode = 'US') => {
  try {
    // Fetch jobs and extract common skills from titles and descriptions
    const jobs = await fetchJobsByCountry(countryCode, { limit: 50 })
    
    if (!jobs) return []

    const skillKeywords = [
      'React', 'Python', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
      'TypeScript', 'JavaScript', 'Java', 'Go', 'Rust', 'C++',
      'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST',
      'DevOps', 'CI/CD', 'Git', 'Linux', 'Terraform', 'Ansible',
      'Machine Learning', 'AI', 'Data Science', 'Analytics',
    ]

    const skillCounts = {}

    jobs.forEach(job => {
      const text = `${job.title} ${job.description}`.toLowerCase()
      skillKeywords.forEach(skill => {
        if (text.includes(skill.toLowerCase())) {
          skillCounts[skill] = (skillCounts[skill] || 0) + 1
        }
      })
    })

    return Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }))
  } catch (error) {
    console.error('Error getting trending skills:', error)
    return []
  }
}

/**
 * Get salary statistics for a country
 * @param {string} countryCode - Country code
 * @returns {Promise<object>} Salary statistics
 */
export const getSalaryStats = async (countryCode = 'US') => {
  try {
    const jobs = await fetchJobsByCountry(countryCode, { limit: 100 })
    
    if (!jobs || jobs.length === 0) return null

    const salaries = jobs
      .map(job => {
        const match = job.salary.match(/(\d+)k/g)
        if (match && match.length >= 2) {
          return (parseInt(match[0]) + parseInt(match[1])) / 2
        }
        return null
      })
      .filter(s => s !== null)

    if (salaries.length === 0) return null

    const avg = Math.round(salaries.reduce((a, b) => a + b) / salaries.length)
    const min = Math.min(...salaries)
    const max = Math.max(...salaries)

    return {
      average: avg,
      minimum: min,
      maximum: max,
      count: salaries.length,
    }
  } catch (error) {
    console.error('Error getting salary stats:', error)
    return null
  }
}

export default {
  fetchJobsByCountry,
  searchJobs,
  getJobCategories,
  getTrendingSkills,
  getSalaryStats,
}
