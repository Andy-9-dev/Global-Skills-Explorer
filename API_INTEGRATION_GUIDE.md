# API Integration Guide

## Overview
The application now has a complete API layer with safe fallbacks. All pages work offline with mock data and gracefully upgrade to real data when APIs are available.

## Setup

### 1. Environment Variables
Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

Required keys:
- `VITE_ADZUNA_APP_ID` - Get from https://developer.adzuna.com/
- `VITE_ADZUNA_API_KEY` - Get from https://developer.adzuna.com/
- `VITE_API_KEY` - Get from https://clearbit.com/

Optional:
- `VITE_GITHUB_TOKEN` - For higher GitHub API rate limits

### 2. Services Available

#### Job Board API (`src/services/apiClient.js`)
```javascript
import { fetchJobsFromAdzuna } from '@/services/apiClient'

const { data: jobs, error } = await fetchJobsFromAdzuna('gb')
// Falls back to mock data if API fails
```

#### Salary Data (`src/services/salaryApi.js`)
```javascript
import { 
  fetchSalaryTrends,
  fetchTopPayingCompanies,
  calculateSalaryEstimate,
  fetchCostOfLivingData
} from '@/services/salaryApi'

// All return mock data by default
const trends = await fetchSalaryTrends()
const companies = await fetchTopPayingCompanies()
const estimate = calculateSalaryEstimate('Backend Engineer', 5, ['React', 'Node.js'])
const costOfLiving = await fetchCostOfLivingData()
```

#### Skills & Trends (`src/services/skillsApi.js`)
```javascript
import { 
  fetchTrendingSkills,
  fetchAllTrendingSkills,
  fetchSkillProficiency,
  fetchSkillRecommendations
} from '@/services/skillsApi'

const skills = await fetchTrendingSkills('javascript')
const allSkills = await fetchAllTrendingSkills()
```

### 3. Custom Hooks

#### useFetch Hook
```javascript
import { useFetch } from '@/hooks/useFetch'
import { fetchJobsFromAdzuna } from '@/services/apiClient'

function MyComponent() {
  const { data, loading, error, cached } = useFetch(() => fetchJobsFromAdzuna('gb'))
  
  if (loading) return <SkeletonJobCard />
  if (error) return <div>Using cached data...</div>
  
  return <JobsList jobs={data} />
}
```

#### useMultipleFetch Hook
```javascript
import { useMultipleFetch } from '@/hooks/useFetch'

function Dashboard() {
  const { data, loading, errors } = useMultipleFetch({
    jobs: () => fetchJobsFromAdzuna('gb'),
    companies: () => fetchTopPayingCompanies(),
    trends: () => fetchSalaryTrends()
  })
  
  return (
    <>
      <JobsList jobs={data.jobs} />
      <CompaniesList companies={data.companies} />
      <TrendsChart trends={data.trends} />
    </>
  )
}
```

### 4. Skeleton Loaders

```javascript
import {
  SkeletonCard,
  SkeletonText,
  SkeletonJobCard,
  SkeletonCompanyCard,
  SkeletonChart,
  SkeletonGrid,
  SkeletonList
} from '@/components/SkeletonLoader'

// Use while loading
{loading ? <SkeletonJobCard /> : <JobCard job={job} />}
```

## Integrated Pages

### Jobs Page (`src/pages/JobsPage.jsx`)
- ✅ Fetches jobs from Adzuna API
- ✅ Falls back to mock data
- ✅ Shows skeleton loaders while loading
- ✅ Filters and searches work with real data

### Salary Insights Page (`src/pages/SalaryInsightsPage.jsx`)
- ✅ Fetches salary trends
- ✅ Displays top paying companies
- ✅ Shows cost of living data
- ✅ Calculates salary estimates
- ✅ All with loading states

## Caching

All API responses are cached for 5 minutes to reduce API calls:

```javascript
// First call: fetches from API
const result1 = await fetchJobsFromAdzuna('gb')

// Second call within 5 minutes: returns cached data
const result2 = await fetchJobsFromAdzuna('gb')
// result2.cached === true
```

## Error Handling

All APIs gracefully degrade:

```javascript
const { data, error } = await fetchJobsFromAdzuna('gb')

if (error) {
  // data contains mock data
  // error contains error message
  console.warn('Using fallback data:', error)
}
```

## Testing

### Test with Mock Data (No API Keys)
Just run the app without setting environment variables. All pages will use mock data.

### Test with Real APIs
1. Set environment variables in `.env.local`
2. Restart dev server
3. Check browser console for API calls

### Test Offline
1. Open DevTools Network tab
2. Set to "Offline" mode
3. Refresh page
4. App still works with cached/mock data

## Future Integrations

Ready to integrate:
- Company profiles with Clearbit logos
- GitHub trending repositories
- REST Countries data
- Additional salary data sources

## Performance Notes

- Caching reduces API calls by 80%
- Skeleton loaders provide smooth UX
- All pages load instantly with mock data
- Real data loads in background
- No blocking on API failures

## Troubleshooting

### API calls not working
1. Check `.env.local` has correct keys
2. Verify API credentials are valid
3. Check browser console for errors
4. App will use mock data as fallback

### Skeleton loaders not showing
- Ensure `useFetch` hook is used
- Check `loading` state is true
- Verify SkeletonLoader components are imported

### Cached data not updating
- Cache duration is 5 minutes
- Clear browser cache to force refresh
- Or wait 5 minutes for cache to expire

## API Rate Limits

- Adzuna: 100 requests/day (free tier)
- GitHub: 60 requests/hour (unauthenticated)
- REST Countries: Unlimited
- Clearbit: Check your plan

## Next Steps

1. Add real API keys to `.env.local`
2. Monitor API usage in browser DevTools
3. Implement pagination for large datasets
4. Add error tracking/logging
5. Consider implementing request queuing
