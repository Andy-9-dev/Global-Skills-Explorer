// API Configuration
// Replace these with your actual API keys
const API_KEYS = {
  LINKEDIN: 'YOUR_LINKEDIN_API_KEY', // https://developer.linkedin.com/docs/rest-api
  INDEED: 'YOUR_INDEED_API_KEY', // https://developer.indeed.com/docs
  SKILLS: 'YOUR_SKILLS_API_KEY', // https://www.skills-api.com
  PAYSCALE: 'YOUR_PAYSCALE_API_KEY', // https://www.payscale.com/developer
  SALARY: 'YOUR_SALARY_API_KEY', // https://www.salaryapi.com
}

// LinkedIn Jobs API
export const fetchLinkedInJobs = async (role = 'Software Engineer', country = 'US') => {
  try {
    const response = await fetch(
      `https://api.linkedin.com/v2/jobs?keywords=${encodeURIComponent(role)}&location=${country}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEYS.LINKEDIN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) throw new Error('LinkedIn API error')
    return await response.json()
  } catch (error) {
    console.error('LinkedIn API Error:', error)
    return []
  }
}

// Indeed Jobs API
export const fetchIndeedJobs = async (role = 'developer', country = 'us') => {
  try {
    const response = await fetch(
      `https://api.indeed.com/ads/apisearch?publisher=${API_KEYS.INDEED}&q=${encodeURIComponent(role)}&l=${country}&format=json&v=2`
    )
    
    if (!response.ok) throw new Error('Indeed API error')
    return await response.json()
  } catch (error) {
    console.error('Indeed API Error:', error)
    return []
  }
}

// GitHub Jobs API (No key required)
export const fetchGitHubJobs = async (description = 'react', location = '') => {
  try {
    const response = await fetch(
      `https://jobs.github.com/positions.json?description=${encodeURIComponent(description)}&location=${location}`
    )
    
    if (!response.ok) throw new Error('GitHub Jobs API error')
    return await response.json()
  } catch (error) {
    console.error('GitHub Jobs API Error:', error)
    return []
  }
}

// Skills API
export const fetchSkillsAPI = async (country = 'US', industry = 'technology') => {
  try {
    const response = await fetch(
      `https://api.skills-api.com/v1/trending?country=${country}&industry=${industry}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEYS.SKILLS}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) throw new Error('Skills API error')
    return await response.json()
  } catch (error) {
    console.error('Skills API Error:', error)
    return []
  }
}

// Payscale API
export const fetchPayscaleData = async (role = 'Software Engineer', country = 'US') => {
  try {
    const response = await fetch(
      `https://api.payscale.com/v1/salary?job_title=${encodeURIComponent(role)}&country=${country}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEYS.PAYSCALE}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) throw new Error('Payscale API error')
    return await response.json()
  } catch (error) {
    console.error('Payscale API Error:', error)
    return []
  }
}

// Salary API
export const fetchSalaryAPI = async (role = 'developer', location = 'US') => {
  try {
    const response = await fetch(
      `https://api.salaryapi.com/v1/salaries?role=${encodeURIComponent(role)}&location=${location}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEYS.SALARY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) throw new Error('Salary API error')
    return await response.json()
  } catch (error) {
    console.error('Salary API Error:', error)
    return []
  }
}

// Rest Countries API (No key required)
export const fetchRestCountries = async (countryCode = 'US') => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    )
    
    if (!response.ok) throw new Error('Rest Countries API error')
    return await response.json()
  } catch (error) {
    console.error('Rest Countries API Error:', error)
    return []
  }
}

// Aggregated API calls
export const fetchJobListings = async () => {
  try {
    // Fetch from multiple sources
    const [linkedInJobs, indeedJobs, githubJobs] = await Promise.allSettled([
      fetchLinkedInJobs(),
      fetchIndeedJobs(),
      fetchGitHubJobs()
    ])

    // Combine results
    const jobs = [
      ...(linkedInJobs.status === 'fulfilled' ? linkedInJobs.value : []),
      ...(indeedJobs.status === 'fulfilled' ? indeedJobs.value : []),
      ...(githubJobs.status === 'fulfilled' ? githubJobs.value : [])
    ]

    return jobs
  } catch (error) {
    console.error('Error fetching job listings:', error)
    return []
  }
}

export const fetchSalaryData = async () => {
  try {
    const [payscaleData, salaryAPIData] = await Promise.allSettled([
      fetchPayscaleData(),
      fetchSalaryAPI()
    ])

    const salaries = [
      ...(payscaleData.status === 'fulfilled' ? payscaleData.value : []),
      ...(salaryAPIData.status === 'fulfilled' ? salaryAPIData.value : [])
    ]

    return salaries
  } catch (error) {
    console.error('Error fetching salary data:', error)
    return []
  }
}

export const fetchSkillsData = async () => {
  try {
    const skills = await fetchSkillsAPI()
    return skills
  } catch (error) {
    console.error('Error fetching skills data:', error)
    return []
  }
}

export const fetchCountryData = async () => {
  try {
    // Fetch data for multiple countries
    const countries = ['US', 'GB', 'DE', 'IN', 'CA']
    const countryDataPromises = countries.map(code => fetchRestCountries(code))
    const results = await Promise.allSettled(countryDataPromises)
    
    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value)
      .flat()
  } catch (error) {
    console.error('Error fetching country data:', error)
    return []
  }
}
