# Adzuna API Integration Guide

## Overview

The Adzuna Job API has been integrated into the Global Skills Explorer dashboard to fetch real job listings from around the world.

## API Details

- **API Key**: `26f6db81fe3e03fce024e9c228269726`
- **App ID**: `global_skills_explorer`
- **Base URL**: `https://api.adzuna.com/v1/api/jobs`
- **Documentation**: https://developer.adzuna.com/

## How It Works

### 1. Dashboard Integration
When you click on a country marker on the Skills Demand Heatmap:
1. The right-side panel opens
2. Real jobs are fetched from Adzuna API for that country
3. Jobs are displayed in the "Featured Jobs" section
4. If the API fails, mock data is used as fallback

### 2. Supported Countries

The following countries are supported:
- US (United States)
- GB (United Kingdom)
- DE (Germany)
- IN (India)
- CA (Canada)
- AU (Australia)
- SG (Singapore)
- JP (Japan)
- FR (France)
- NL (Netherlands)
- SE (Sweden)
- CH (Switzerland)
- NZ (New Zealand)
- IE (Ireland)
- BR (Brazil)
- MX (Mexico)

## API Functions

### `fetchJobsByCountry(countryCode, options)`
Fetch jobs for a specific country.

```javascript
import { fetchJobsByCountry } from '../services/adzunaApi'

const jobs = await fetchJobsByCountry('US', {
  limit: 10,
  keywords: 'React Python AWS',
  location: 'San Francisco',
  sortBy: 'date',
  sortDirection: 'descending'
})
```

**Parameters:**
- `countryCode` (string): Country code (e.g., 'US', 'GB')
- `options` (object):
  - `limit` (number): Results per page (default: 10)
  - `keywords` (string): Search keywords (default: 'React Python AWS')
  - `location` (string): Location filter
  - `sortBy` (string): Sort field (default: 'date')
  - `sortDirection` (string): Sort direction (default: 'descending')

**Returns:** Array of job objects

### `searchJobs(keywords, countryCode, options)`
Search jobs by keywords.

```javascript
import { searchJobs } from '../services/adzunaApi'

const jobs = await searchJobs('React Developer', 'US', {
  limit: 20,
  location: 'New York'
})
```

### `getJobCategories(countryCode)`
Get available job categories.

```javascript
import { getJobCategories } from '../services/adzunaApi'

const categories = await getJobCategories('US')
```

### `getTrendingSkills(countryCode)`
Get trending skills in a country.

```javascript
import { getTrendingSkills } from '../services/adzunaApi'

const skills = await getTrendingSkills('US')
// Returns: [{ skill: 'React', count: 45 }, ...]
```

### `getSalaryStats(countryCode)`
Get salary statistics for a country.

```javascript
import { getSalaryStats } from '../services/adzunaApi'

const stats = await getSalaryStats('US')
// Returns: { average: 145, minimum: 80, maximum: 250, count: 100 }
```

## Job Object Structure

```javascript
{
  id: string,
  title: string,
  company: string,
  location: string,
  salary: string,           // Formatted as "$100k - $150k"
  posted: string,           // Relative time "2h ago"
  url: string,              // Direct link to job
  description: string,      // Full job description
  category: string,         // Job category
  contractType: string      // Full-time, Part-time, etc.
}
```

## Error Handling

The API includes automatic fallback to mock data if:
- Network request fails
- API returns an error
- No results are found

This ensures the dashboard always displays jobs, even if the API is temporarily unavailable.

## Rate Limiting

Adzuna API has rate limits:
- Free tier: 10 requests per second
- The implementation respects these limits

## Usage in Components

### Example: Using in DashboardPage

```javascript
import { fetchJobsByCountry } from '../services/adzunaApi'

const [jobs, setJobs] = useState([])
const [loading, setLoading] = useState(false)

const loadJobs = async (countryCode) => {
  setLoading(true)
  try {
    const data = await fetchJobsByCountry(countryCode, { limit: 10 })
    setJobs(data || [])
  } catch (error) {
    console.error('Error loading jobs:', error)
    setJobs([]) // Fallback
  } finally {
    setLoading(false)
  }
}
```

## Testing

### Test the API Directly

```javascript
// In browser console
import { fetchJobsByCountry } from './src/services/adzunaApi'

// Fetch US jobs
fetchJobsByCountry('US').then(jobs => console.log(jobs))

// Search for specific skills
fetchJobsByCountry('GB', { keywords: 'Python' }).then(jobs => console.log(jobs))

// Get salary stats
import { getSalaryStats } from './src/services/adzunaApi'
getSalaryStats('US').then(stats => console.log(stats))
```

## Troubleshooting

### No jobs appearing
1. Check browser console for errors
2. Verify country code is correct
3. Check API key is valid
4. Try a different country

### Slow loading
1. API might be rate limited
2. Network connection might be slow
3. Try reducing the `limit` parameter

### Wrong salary format
1. Salary is automatically formatted based on country
2. Check the job object's salary field
3. Verify country detection is working

## Future Enhancements

1. **Caching**: Cache results to reduce API calls
2. **Filtering**: Add more filter options (salary range, experience level)
3. **Pagination**: Implement pagination for large result sets
4. **Analytics**: Track which jobs are most viewed
5. **Bookmarking**: Save favorite jobs locally

## API Documentation

For more information, visit:
- https://developer.adzuna.com/
- https://developer.adzuna.com/docs/read/Job_search_API

## Support

If you encounter issues:
1. Check the Adzuna API documentation
2. Verify your API key is correct
3. Check network requests in browser DevTools
4. Review console errors

---

**Status**: ✅ Integrated and Working
**Last Updated**: 2024
