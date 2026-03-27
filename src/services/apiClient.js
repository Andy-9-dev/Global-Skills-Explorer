/**
 * Global API Client with safe fallbacks
 * Handles all external API calls with error handling and mock data fallbacks
 */

const API_KEY = import.meta.env.VITE_API_KEY || ''
const ADZUNA_APP_ID = import.meta.env.VITE_ADZUNA_APP_ID || ''
const ADZUNA_API_KEY = import.meta.env.VITE_ADZUNA_API_KEY || ''

// Cache for API responses
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Generic fetch wrapper with error handling
 */
export const fetchWithFallback = async (url, options = {}, fallbackData = null) => {
  try {
    // Check cache first
    if (cache.has(url)) {
      const cached = cache.get(url)
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return { data: cached.data, cached: true, error: null }
      }
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    
    // Cache successful response
    cache.set(url, { data, timestamp: Date.now() })
    
    return { data, cached: false, error: null }
  } catch (error) {
    console.warn(`API fetch failed for ${url}:`, error.message)
    return { data: fallbackData, cached: false, error: error.message }
  }
}

/**
 * Adzuna Jobs API
 */
export const fetchJobsFromAdzuna = async (country = 'gb', page = 1) => {
  if (!ADZUNA_APP_ID || !ADZUNA_API_KEY) {
    console.warn('Adzuna credentials not configured, using mock data')
    return { data: getMockJobs(), error: null }
  }

  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=10`
  
  const { data, error } = await fetchWithFallback(url, {}, getMockJobs())
  
  if (error) {
    return { data: getMockJobs(), error }
  }

  // Transform Adzuna response to our format
  const jobs = (data.results || []).map(job => ({
    id: job.id,
    title: job.title,
    company: job.company.display_name,
    location: job.location.display_name,
    salary: job.salary_min && job.salary_max 
      ? `$${Math.round(job.salary_min / 1000)}k - $${Math.round(job.salary_max / 1000)}k`
      : 'Competitive',
    description: job.description,
    url: job.redirect_url
  }))

  return { data: jobs, error: null }
}

/**
 * REST Countries API
 */
export const fetchCountries = async () => {
  const url = 'https://restcountries.com/v3.1/all'
  const { data, error } = await fetchWithFallback(url, {}, getMockCountries())
  
  if (error) {
    return { data: getMockCountries(), error }
  }

  // Transform to our format
  const countries = data.map(country => ({
    code: country.cca2,
    name: country.name.common,
    region: country.region,
    flag: country.flag
  }))

  return { data: countries, error: null }
}

/**
 * Clearbit Company API
 */
export const fetchCompanyInfo = async (companyName) => {
  const url = `https://company.clearbit.com/v1/domains/find?name=${encodeURIComponent(companyName)}`
  
  const { data, error } = await fetchWithFallback(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  }, null)

  if (error || !data) {
    return { data: null, error }
  }

  // Fetch company details
  const companyUrl = `https://company.clearbit.com/v1/companies/find?domain=${data.domain}`
  const { data: companyData, error: companyError } = await fetchWithFallback(companyUrl, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  }, null)

  if (companyError || !companyData) {
    return { data: null, error: companyError }
  }

  return {
    data: {
      name: companyData.name,
      logo: companyData.logo,
      description: companyData.description,
      website: companyData.website,
      employees: companyData.employees,
      founded: companyData.founded
    },
    error: null
  }
}

/**
 * GitHub Trending Repositories
 */
export const fetchGitHubTrending = async (language = 'javascript') => {
  const url = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`
  
  const { data, error } = await fetchWithFallback(url, {}, getMockTrendingRepos())

  if (error) {
    return { data: getMockTrendingRepos(), error }
  }

  const repos = (data.items || []).map(repo => ({
    name: repo.name,
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language,
    description: repo.description
  }))

  return { data: repos, error: null }
}

/**
 * Mock Data Fallbacks - Expanded to 200+ items each
 */
const getMockJobs = () => Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  title: [
    'Senior React Developer', 'Full Stack Engineer', 'Python Backend Developer', 'DevOps Engineer',
    'Frontend Developer', 'Data Scientist', 'Mobile Developer', 'Cloud Architect',
    'UI/UX Designer', 'Product Manager', 'Machine Learning Engineer', 'Site Reliability Engineer',
    'Security Engineer', 'Database Administrator', 'QA Engineer', 'Technical Lead',
    'Principal Engineer', 'Staff Engineer', 'Engineering Manager', 'Solutions Architect'
  ][i % 20],
  company: [
    'TechFlow Systems', 'GreenPath AI', 'Spark Dynamics', 'Quantum Cloud', 'DataNexus',
    'CloudScale', 'InnovateLabs', 'FutureTech', 'DigitalEdge', 'SmartSolutions',
    'TechVision', 'CodeCraft', 'NextGen Systems', 'Innovation Hub', 'Digital Dynamics',
    'Tech Pioneers', 'Cloud Nine', 'Data Insights', 'Tech Sphere', 'Future Systems'
  ][i % 20],
  location: [
    'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA',
    'London, UK', 'Berlin, DE', 'Paris, FR', 'Amsterdam, NL', 'Stockholm, SE',
    'Toronto, CA', 'Vancouver, CA', 'Sydney, AU', 'Melbourne, AU', 'Singapore, SG',
    'Tokyo, JP', 'Seoul, KR', 'Bangalore, IN', 'Mumbai, IN', 'Tel Aviv, IL'
  ][i % 20],
  salary: `$${80 + (i % 120)}k - $${120 + (i % 150)}k`,
  description: `We are looking for a talented ${[
    'Senior React Developer', 'Full Stack Engineer', 'Python Backend Developer', 'DevOps Engineer'
  ][i % 4]} to join our growing team and help shape the future of our platform.`,
  url: '#'
}))

const getMockCountries = () => Array.from({ length: 200 }, (_, i) => {
  const countries = [
    { code: 'US', name: 'United States', region: 'Americas', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', region: 'Europe', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', region: 'Europe', flag: '🇩🇪' },
    { code: 'IN', name: 'India', region: 'Asia', flag: '🇮🇳' },
    { code: 'CA', name: 'Canada', region: 'Americas', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', region: 'Oceania', flag: '🇦🇺' },
    { code: 'SG', name: 'Singapore', region: 'Asia', flag: '🇸🇬' },
    { code: 'JP', name: 'Japan', region: 'Asia', flag: '🇯🇵' },
    { code: 'FR', name: 'France', region: 'Europe', flag: '🇫🇷' },
    { code: 'NL', name: 'Netherlands', region: 'Europe', flag: '🇳🇱' },
    { code: 'SE', name: 'Sweden', region: 'Europe', flag: '🇸🇪' },
    { code: 'NO', name: 'Norway', region: 'Europe', flag: '🇳🇴' },
    { code: 'DK', name: 'Denmark', region: 'Europe', flag: '🇩🇰' },
    { code: 'FI', name: 'Finland', region: 'Europe', flag: '🇫🇮' },
    { code: 'CH', name: 'Switzerland', region: 'Europe', flag: '🇨🇭' },
    { code: 'AT', name: 'Austria', region: 'Europe', flag: '🇦🇹' },
    { code: 'BE', name: 'Belgium', region: 'Europe', flag: '🇧🇪' },
    { code: 'IT', name: 'Italy', region: 'Europe', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', region: 'Europe', flag: '🇪🇸' },
    { code: 'PT', name: 'Portugal', region: 'Europe', flag: '🇵🇹' },
    { code: 'PL', name: 'Poland', region: 'Europe', flag: '🇵🇱' },
    { code: 'CZ', name: 'Czech Republic', region: 'Europe', flag: '🇨🇿' },
    { code: 'HU', name: 'Hungary', region: 'Europe', flag: '🇭🇺' },
    { code: 'RO', name: 'Romania', region: 'Europe', flag: '🇷🇴' },
    { code: 'BG', name: 'Bulgaria', region: 'Europe', flag: '🇧🇬' },
    { code: 'GR', name: 'Greece', region: 'Europe', flag: '🇬🇷' },
    { code: 'IE', name: 'Ireland', region: 'Europe', flag: '🇮🇪' },
    { code: 'IS', name: 'Iceland', region: 'Europe', flag: '🇮🇸' },
    { code: 'EE', name: 'Estonia', region: 'Europe', flag: '🇪🇪' },
    { code: 'LV', name: 'Latvia', region: 'Europe', flag: '🇱🇻' },
    { code: 'LT', name: 'Lithuania', region: 'Europe', flag: '🇱🇹' },
    { code: 'RU', name: 'Russia', region: 'Europe', flag: '🇷🇺' },
    { code: 'UA', name: 'Ukraine', region: 'Europe', flag: '🇺🇦' },
    { code: 'BY', name: 'Belarus', region: 'Europe', flag: '🇧🇾' },
    { code: 'KZ', name: 'Kazakhstan', region: 'Asia', flag: '🇰🇿' },
    { code: 'UZ', name: 'Uzbekistan', region: 'Asia', flag: '🇺🇿' },
    { code: 'TR', name: 'Turkey', region: 'Asia', flag: '🇹🇷' },
    { code: 'IL', name: 'Israel', region: 'Asia', flag: '🇮🇱' },
    { code: 'AE', name: 'UAE', region: 'Asia', flag: '🇦🇪' },
    { code: 'SA', name: 'Saudi Arabia', region: 'Asia', flag: '🇸🇦' },
    { code: 'QA', name: 'Qatar', region: 'Asia', flag: '🇶🇦' },
    { code: 'KW', name: 'Kuwait', region: 'Asia', flag: '🇰🇼' },
    { code: 'BH', name: 'Bahrain', region: 'Asia', flag: '🇧🇭' },
    { code: 'OM', name: 'Oman', region: 'Asia', flag: '🇴🇲' },
    { code: 'JO', name: 'Jordan', region: 'Asia', flag: '🇯🇴' },
    { code: 'LB', name: 'Lebanon', region: 'Asia', flag: '🇱🇧' },
    { code: 'EG', name: 'Egypt', region: 'Africa', flag: '🇪🇬' },
    { code: 'MA', name: 'Morocco', region: 'Africa', flag: '🇲🇦' },
    { code: 'TN', name: 'Tunisia', region: 'Africa', flag: '🇹🇳' },
    { code: 'DZ', name: 'Algeria', region: 'Africa', flag: '🇩🇿' },
    { code: 'ZA', name: 'South Africa', region: 'Africa', flag: '🇿🇦' },
    { code: 'NG', name: 'Nigeria', region: 'Africa', flag: '🇳🇬' },
    { code: 'KE', name: 'Kenya', region: 'Africa', flag: '🇰🇪' },
    { code: 'GH', name: 'Ghana', region: 'Africa', flag: '🇬🇭' },
    { code: 'ET', name: 'Ethiopia', region: 'Africa', flag: '🇪🇹' },
    { code: 'UG', name: 'Uganda', region: 'Africa', flag: '🇺🇬' },
    { code: 'TZ', name: 'Tanzania', region: 'Africa', flag: '🇹🇿' },
    { code: 'RW', name: 'Rwanda', region: 'Africa', flag: '🇷🇼' },
    { code: 'CN', name: 'China', region: 'Asia', flag: '🇨🇳' },
    { code: 'KR', name: 'South Korea', region: 'Asia', flag: '🇰🇷' },
    { code: 'TW', name: 'Taiwan', region: 'Asia', flag: '🇹🇼' },
    { code: 'HK', name: 'Hong Kong', region: 'Asia', flag: '🇭🇰' },
    { code: 'MY', name: 'Malaysia', region: 'Asia', flag: '🇲🇾' },
    { code: 'TH', name: 'Thailand', region: 'Asia', flag: '🇹🇭' },
    { code: 'VN', name: 'Vietnam', region: 'Asia', flag: '🇻🇳' },
    { code: 'PH', name: 'Philippines', region: 'Asia', flag: '🇵🇭' },
    { code: 'ID', name: 'Indonesia', region: 'Asia', flag: '🇮🇩' },
    { code: 'BD', name: 'Bangladesh', region: 'Asia', flag: '🇧🇩' },
    { code: 'LK', name: 'Sri Lanka', region: 'Asia', flag: '🇱🇰' },
    { code: 'PK', name: 'Pakistan', region: 'Asia', flag: '🇵🇰' },
    { code: 'NP', name: 'Nepal', region: 'Asia', flag: '🇳🇵' },
    { code: 'MM', name: 'Myanmar', region: 'Asia', flag: '🇲🇲' },
    { code: 'KH', name: 'Cambodia', region: 'Asia', flag: '🇰🇭' },
    { code: 'LA', name: 'Laos', region: 'Asia', flag: '🇱🇦' },
    { code: 'MN', name: 'Mongolia', region: 'Asia', flag: '🇲🇳' },
    { code: 'NZ', name: 'New Zealand', region: 'Oceania', flag: '🇳🇿' },
    { code: 'FJ', name: 'Fiji', region: 'Oceania', flag: '🇫🇯' },
    { code: 'PG', name: 'Papua New Guinea', region: 'Oceania', flag: '🇵🇬' },
    { code: 'MX', name: 'Mexico', region: 'Americas', flag: '🇲🇽' },
    { code: 'BR', name: 'Brazil', region: 'Americas', flag: '🇧🇷' },
    { code: 'AR', name: 'Argentina', region: 'Americas', flag: '🇦🇷' },
    { code: 'CL', name: 'Chile', region: 'Americas', flag: '🇨🇱' },
    { code: 'CO', name: 'Colombia', region: 'Americas', flag: '🇨🇴' },
    { code: 'PE', name: 'Peru', region: 'Americas', flag: '🇵🇪' },
    { code: 'VE', name: 'Venezuela', region: 'Americas', flag: '🇻🇪' },
    { code: 'UY', name: 'Uruguay', region: 'Americas', flag: '🇺🇾' },
    { code: 'PY', name: 'Paraguay', region: 'Americas', flag: '🇵🇾' },
    { code: 'BO', name: 'Bolivia', region: 'Americas', flag: '🇧🇴' },
    { code: 'EC', name: 'Ecuador', region: 'Americas', flag: '🇪🇨' },
    { code: 'GY', name: 'Guyana', region: 'Americas', flag: '🇬🇾' },
    { code: 'SR', name: 'Suriname', region: 'Americas', flag: '🇸🇷' },
    { code: 'GF', name: 'French Guiana', region: 'Americas', flag: '🇬🇫' },
    { code: 'CR', name: 'Costa Rica', region: 'Americas', flag: '🇨🇷' },
    { code: 'PA', name: 'Panama', region: 'Americas', flag: '🇵🇦' },
    { code: 'NI', name: 'Nicaragua', region: 'Americas', flag: '🇳🇮' },
    { code: 'HN', name: 'Honduras', region: 'Americas', flag: '🇭🇳' },
    { code: 'GT', name: 'Guatemala', region: 'Americas', flag: '🇬🇹' },
    { code: 'BZ', name: 'Belize', region: 'Americas', flag: '🇧🇿' },
    { code: 'SV', name: 'El Salvador', region: 'Americas', flag: '🇸🇻' },
    { code: 'CU', name: 'Cuba', region: 'Americas', flag: '🇨🇺' },
    { code: 'JM', name: 'Jamaica', region: 'Americas', flag: '🇯🇲' },
    { code: 'HT', name: 'Haiti', region: 'Americas', flag: '🇭🇹' },
    { code: 'DO', name: 'Dominican Republic', region: 'Americas', flag: '🇩🇴' },
    { code: 'PR', name: 'Puerto Rico', region: 'Americas', flag: '🇵🇷' },
    { code: 'TT', name: 'Trinidad and Tobago', region: 'Americas', flag: '🇹🇹' },
    { code: 'BB', name: 'Barbados', region: 'Americas', flag: '🇧🇧' },
    { code: 'LC', name: 'Saint Lucia', region: 'Americas', flag: '🇱🇨' },
    { code: 'GD', name: 'Grenada', region: 'Americas', flag: '🇬🇩' },
    { code: 'VC', name: 'Saint Vincent', region: 'Americas', flag: '🇻🇨' },
    { code: 'AG', name: 'Antigua and Barbuda', region: 'Americas', flag: '🇦🇬' },
    { code: 'DM', name: 'Dominica', region: 'Americas', flag: '🇩🇲' },
    { code: 'KN', name: 'Saint Kitts and Nevis', region: 'Americas', flag: '🇰🇳' },
    { code: 'BS', name: 'Bahamas', region: 'Americas', flag: '🇧🇸' },
    { code: 'BM', name: 'Bermuda', region: 'Americas', flag: '🇧🇲' }
  ];
  
  // Cycle through countries and add variations for 200 items
  const baseCountry = countries[i % countries.length];
  return {
    ...baseCountry,
    code: i >= countries.length ? `${baseCountry.code}${Math.floor(i / countries.length)}` : baseCountry.code,
    name: i >= countries.length ? `${baseCountry.name} ${Math.floor(i / countries.length)}` : baseCountry.name
  };
})

const getMockTrendingRepos = () => Array.from({ length: 200 }, (_, i) => {
  const frameworks = [
    'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt.js', 'gatsby', 'remix',
    'express', 'fastify', 'koa', 'nest.js', 'django', 'flask', 'fastapi', 'spring',
    'laravel', 'symfony', 'rails', 'phoenix', 'gin', 'fiber', 'echo', 'actix',
    'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'plotly',
    'kubernetes', 'docker', 'terraform', 'ansible', 'jenkins', 'gitlab-ci', 'github-actions', 'circleci',
    'aws-sdk', 'azure-sdk', 'gcp-sdk', 'firebase', 'supabase', 'planetscale', 'vercel', 'netlify',
    'webpack', 'vite', 'rollup', 'parcel', 'esbuild', 'turbopack', 'snowpack', 'rome',
    'jest', 'vitest', 'cypress', 'playwright', 'selenium', 'puppeteer', 'storybook', 'chromatic'
  ];
  
  const languages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C++', 'C#',
    'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart', 'Scala', 'Clojure', 'Elixir',
    'Haskell', 'OCaml', 'F#', 'Erlang', 'Lua', 'Perl', 'R', 'MATLAB'
  ];
  
  const descriptions = [
    'A powerful framework for building user interfaces',
    'The progressive framework for modern web development',
    'A comprehensive platform for building applications',
    'Lightweight and efficient development tools',
    'Enterprise-grade solutions for scalable applications',
    'Modern tooling for developer productivity',
    'High-performance library for data processing',
    'Cloud-native infrastructure management',
    'Machine learning and AI development platform',
    'Testing and quality assurance framework'
  ];
  
  return {
    name: frameworks[i % frameworks.length] + (i >= frameworks.length ? `-${Math.floor(i / frameworks.length)}` : ''),
    url: `https://github.com/example/${frameworks[i % frameworks.length]}`,
    stars: 50000 + (i * 1000) + Math.floor(Math.random() * 10000),
    language: languages[i % languages.length],
    description: descriptions[i % descriptions.length]
  };
})

export default {
  fetchJobsFromAdzuna,
  fetchCountries,
  fetchCompanyInfo,
  fetchGitHubTrending,
  fetchWithFallback
}
