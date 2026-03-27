# How to Extend Company Profile Data

## Quick Start: Adding a New Company

### Step 1: Add Company Data
Edit `src/services/companyApi.js` and add to `mockCompanyData`:

```javascript
'your-company-slug': {
  name: 'Your Company Name',
  slug: 'your-company-slug',
  description: 'Company description here...',
  location: 'City, State (HQ)',
  size: '500 Employees',
  remotePolicy: 'Remote Friendly',
  hiringNow: true,
  icon: 'material_icon_name', // e.g., 'cloud_done', 'eco', 'bolt'
  iconBg: 'bg-color-50', // e.g., 'bg-blue-50'
  iconColor: 'text-color-600', // e.g., 'text-blue-600'
  cultureImage: 'https://image-url.jpg',
  locationImage: 'https://image-url.jpg',
  address: 'Street Address\nCity, State ZIP',
  values: [
    'Value 1',
    'Value 2',
    'Value 3'
  ],
  growthStats: [
    { label: 'Yearly Growth', value: '40%' },
    { label: 'Retention', value: '90%' },
    { label: 'Avg Tenure', value: '3.0y' },
    { label: 'Nationalities', value: '14+' }
  ],
  salaryBenchmarks: [
    { role: 'Role 1', range: '$100k - $150k', percentage: 75 },
    { role: 'Role 2', range: '$110k - $160k', percentage: 80 },
    { role: 'Role 3', range: '$120k - $170k', percentage: 85 },
    { role: 'Role 4', range: '$130k - $180k', percentage: 90 }
  ],
  openRoles: [
    {
      id: 1,
      title: 'Job Title',
      department: 'Department',
      location: 'City / Remote',
      isNew: true,
      skills: ['Skill1', 'Skill2', 'Skill3']
    }
  ]
}
```

### Step 2: Add Jobs with Company Slug
Edit `src/pages/JobsPage.jsx` and add `companySlug` to mock jobs:

```javascript
{
  id: 5,
  title: 'Your Job Title',
  company: 'Your Company Name',
  companySlug: 'your-company-slug', // ← Add this
  location: 'City, State',
  salary: '$100k - $150k',
  // ... rest of job data
}
```

### Step 3: Done!
The company profile page will automatically work at `/company/your-company-slug`

## Data Field Reference

### Company Object Structure

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `name` | string | ✅ | "TechFlow Systems" |
| `slug` | string | ✅ | "techflow-systems" |
| `description` | string | ✅ | "Innovating cloud infrastructure..." |
| `location` | string | ✅ | "San Francisco, CA (HQ)" |
| `size` | string | ✅ | "850 Employees" |
| `remotePolicy` | string | ✅ | "Remote Friendly" |
| `hiringNow` | boolean | ✅ | true |
| `icon` | string | ✅ | "cloud_done" |
| `iconBg` | string | ✅ | "bg-blue-50" |
| `iconColor` | string | ✅ | "text-blue-600" |
| `cultureImage` | string | ✅ | "https://..." |
| `locationImage` | string | ✅ | "https://..." |
| `address` | string | ✅ | "450 Mission St..." |
| `values` | array | ✅ | ["Value 1", "Value 2"] |
| `growthStats` | array | ✅ | [{label, value}] |
| `salaryBenchmarks` | array | ✅ | [{role, range, percentage}] |
| `openRoles` | array | ✅ | [{id, title, dept, loc, isNew, skills}] |

### Material Icons for Companies

Popular choices:
- `cloud_done` - Cloud/Infrastructure
- `eco` - Sustainability/Green
- `bolt` - Energy/Speed
- `hub` - Network/Infrastructure
- `token` - Finance/Crypto
- `work` - General work
- `school` - Education
- `health_and_safety` - Healthcare
- `shopping_cart` - E-commerce
- `movie` - Media/Entertainment

[Full Material Icons list](https://fonts.google.com/icons)

### Tailwind Color Combinations

Use consistent pairs:
- `bg-blue-50` + `text-blue-600` + `border-blue-100`
- `bg-emerald-50` + `text-emerald-600` + `border-emerald-100`
- `bg-orange-50` + `text-orange-600` + `border-orange-100`
- `bg-purple-50` + `text-purple-600` + `border-purple-100`
- `bg-pink-50` + `text-pink-600` + `border-pink-100`
- `bg-indigo-50` + `text-indigo-600` + `border-indigo-100`

## Integrating Real APIs

### Option 1: LinkedIn Company API

```javascript
// In companyApi.js
export const fetchCompanyFromLinkedIn = async (companyId) => {
  try {
    const response = await fetch(
      `https://api.linkedin.com/v2/companies/${companyId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_LINKEDIN_TOKEN}`
        }
      }
    )
    const data = await response.json()
    return transformLinkedInData(data)
  } catch (error) {
    console.error('LinkedIn API error:', error)
    return null
  }
}

// Transform LinkedIn data to our format
const transformLinkedInData = (linkedInData) => {
  return {
    name: linkedInData.localizedName,
    description: linkedInData.localizedDescription,
    location: linkedInData.headquarter?.city,
    size: linkedInData.staffCountRange?.start,
    // ... map other fields
  }
}
```

### Option 2: Glassdoor (via Proxy)

```javascript
// In companyApi.js
export const fetchCompanyFromGlassdoor = async (companyName) => {
  try {
    const response = await fetch(
      `/api/glassdoor/companies?name=${encodeURIComponent(companyName)}`
    )
    const data = await response.json()
    return transformGlassdoorData(data)
  } catch (error) {
    console.error('Glassdoor API error:', error)
    return null
  }
}
```

### Option 3: Crunchbase

```javascript
// In companyApi.js
export const fetchCompanyFromCrunchbase = async (companySlug) => {
  try {
    const response = await fetch(
      `https://api.crunchbase.com/v4/entities/companies/${companySlug}`,
      {
        headers: {
          'X-Cb-User-Key': process.env.REACT_APP_CRUNCHBASE_KEY
        }
      }
    )
    const data = await response.json()
    return transformCrunchbaseData(data)
  } catch (error) {
    console.error('Crunchbase API error:', error)
    return null
  }
}
```

### Option 4: Google Jobs API

```javascript
// In companyApi.js
export const fetchCompanyFromGoogleJobs = async (companyName) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/jobs/v4/companies?query=${companyName}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GOOGLE_JOBS_TOKEN}`
        }
      }
    )
    const data = await response.json()
    return transformGoogleJobsData(data)
  } catch (error) {
    console.error('Google Jobs API error:', error)
    return null
  }
}
```

## Using the API in CompanyProfilePage

### Current (Mock Data)
```javascript
const company = companyData[companySlug]
```

### With API Integration
```javascript
const [company, setCompany] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchCompany = async () => {
    setLoading(true)
    try {
      // Try API first, fall back to mock
      const apiCompany = await getCompanyBySlug(companySlug)
      setCompany(apiCompany || mockCompanyData[companySlug])
    } catch (error) {
      console.error('Error fetching company:', error)
      setCompany(mockCompanyData[companySlug])
    } finally {
      setLoading(false)
    }
  }
  
  fetchCompany()
}, [companySlug])

if (loading) return <SkeletonLoader />
if (!company) return <NotFound />
```

## Environment Variables

Add to `.env`:
```
REACT_APP_LINKEDIN_TOKEN=your_token_here
REACT_APP_CRUNCHBASE_KEY=your_key_here
REACT_APP_GOOGLE_JOBS_TOKEN=your_token_here
REACT_APP_GLASSDOOR_API_KEY=your_key_here
```

## Testing New Companies

1. Add company to `mockCompanyData`
2. Add jobs with `companySlug` to JobsPage
3. Navigate to `/company/your-slug`
4. Click company name in job card
5. Verify all sections load correctly

## Common Issues

### Company Not Found
- Check slug matches exactly (case-sensitive)
- Verify company added to `mockCompanyData`
- Check browser console for errors

### Images Not Loading
- Verify image URLs are valid HTTPS
- Check CORS headers if using external images
- Use placeholder images for testing

### Styling Issues
- Verify Tailwind classes are correct
- Check color combinations match
- Test in both light and dark modes

## Performance Tips

1. **Lazy load images**: Use `loading="lazy"` on img tags
2. **Memoize data**: Use `useMemo` for expensive calculations
3. **Pagination**: For many open roles, paginate the list
4. **Caching**: Cache API responses to reduce requests
5. **Code splitting**: Load company data on demand

## Next Steps

1. ✅ Add your companies to mock data
2. ✅ Test navigation flow
3. ✅ Add real images
4. ✅ Integrate with real API
5. ✅ Add employee reviews
6. ✅ Add salary history
7. ✅ Add company news feed

---

**Need Help?** Check the main README or integration guide for more details.
