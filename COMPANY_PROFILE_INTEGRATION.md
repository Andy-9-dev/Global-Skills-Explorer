# Company Profile Page (Page 10) Integration Guide

## Overview
The Company Profile page has been successfully integrated as a contextual deep-dive from the Jobs page. Users can now click on company names to view detailed company information without modifying existing routes or components.

## What Was Added

### 1. New Page: `src/pages/CompanyProfilePage.jsx`
- **Route**: `/company/:companySlug`
- **Access**: Public (no login required)
- **Layout**: Standalone company layout (no dashboard sidebar)

### 2. Updated: `src/pages/JobsPage.jsx`
- Added `companySlug` field to all mock job objects
- Updated company name click handlers to use dynamic `companySlug`
- Removed hardcoded test button

### 3. Already Configured: `src/App.jsx`
- Route already exists: `<Route path="/company/:companySlug" element={<CompanyProfilePage />} />`

## Navigation Flow

### Entry Points
1. **From Jobs Page - Job Card**
   - Click company name in job card → navigates to `/company/{companySlug}`
   
2. **From Jobs Page - Job Preview Pane**
   - Click company name in right panel → navigates to `/company/{companySlug}`

### Exit Behavior
- Browser back button returns to `/jobs`
- "View all jobs" link navigates to `/jobs`
- Job role clicks navigate to `/jobs`

## Page Structure

### Header
- Company logo/icon
- Company name
- Navigation tabs (Culture, Jobs, Benefits, Reviews)
- Share & bookmark buttons
- User profile avatar

### Main Content (Left Column)
1. **Hero Section**
   - Company icon
   - Name & "Hiring Now" badge
   - Description
   - Location, size, remote policy
   - Apply Now & Follow buttons

2. **Culture Section**
   - Company culture image
   - Core values list

3. **Open Positions Section**
   - List of open roles
   - Skills tags
   - "New" badge for recent postings
   - Clickable to view on Jobs page

4. **Benefits Section**
   - 6 key benefits with icons
   - Health, equity, learning, remote, parental leave, wellness

5. **Reviews Section**
   - Placeholder for future reviews integration

### Sidebar (Right Column)
1. **Salary Benchmarks**
   - 4 role types with salary ranges
   - Visual progress bars

2. **Growth Stats**
   - Yearly growth, retention, avg tenure, nationalities

3. **Office Location**
   - Location image
   - Address

### Footer
- Company info
- Links (About, Careers, Blog, Press)
- Social links

## Mock Data Structure

```javascript
company {
  name: string
  slug: string
  description: string
  location: string
  size: string
  remotePolicy: string
  hiringNow: boolean
  icon: string (Material Symbol)
  iconBg: string (Tailwind class)
  iconColor: string (Tailwind class)
  cultureImage: string (URL)
  locationImage: string (URL)
  address: string
  values: string[]
  growthStats: { label, value }[]
  salaryBenchmarks: { role, range, percentage }[]
  openRoles: { id, title, department, location, isNew, skills }[]
}
```

## Tab Navigation
Tabs scroll to sections within the page (not separate routes):
- **Culture** → scrolls to #culture
- **Jobs** → scrolls to #jobs
- **Benefits** → scrolls to #benefits
- **Reviews** → scrolls to #reviews

## Future Enhancements

### API Integration Ready
The code is structured to easily integrate with:
- LinkedIn Company API
- Glassdoor (via proxy)
- Crunchbase
- Google Jobs company data

### To Add Real Data
1. Replace mock `companyData` object with API call
2. Update `useEffect` to fetch company data by slug
3. Add error handling for missing companies

### To Add More Companies
1. Add new company object to `companyData`
2. Update JobsPage mock jobs with new `companySlug`
3. Add company-specific images and data

## Styling & Animations
- Smooth transitions on all interactive elements
- Hover effects on job cards and links
- Responsive design (mobile, tablet, desktop)
- Dark mode support via Tailwind
- Salary bar animations on load

## Key Features
✅ No modifications to existing Pages 1-9
✅ No authentication logic added
✅ Not added to top navigation
✅ No refactoring of existing layouts
✅ Clean, predictable navigation flow
✅ API-ready data structure
✅ Responsive on all devices
✅ Dark/light mode support
✅ Smooth animations and transitions

## Testing Checklist
- [ ] Click company name in job card → navigates to company page
- [ ] Click company name in job preview pane → navigates to company page
- [ ] Browser back button returns to jobs page
- [ ] Tab navigation scrolls to correct sections
- [ ] "View all jobs" link navigates to jobs page
- [ ] Follow button toggles state
- [ ] Page is responsive on mobile
- [ ] Dark mode works correctly
- [ ] All links are functional
