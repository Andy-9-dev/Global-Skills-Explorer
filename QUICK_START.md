# Company Profile Page - Quick Start Guide

## 🚀 Get Started in 30 Seconds

### View a Company Profile
1. Go to `/jobs`
2. Click any company name
3. You're on the company profile page!

### Test URLs
- `http://localhost:5173/company/techflow-systems`
- `http://localhost:5173/company/greenpath-ai`
- `http://localhost:5173/company/spark-dynamics`
- `http://localhost:5173/company/quantum-cloud`

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/pages/CompanyProfilePage.jsx` | Main company profile component |
| `src/services/companyApi.js` | Company data & API helpers |
| `src/pages/JobsPage.jsx` | Updated with company navigation |
| `src/App.jsx` | Route already configured |

## 🎯 What Works

✅ Click company name → View profile
✅ Tab navigation → Scroll to sections
✅ "View all jobs" → Back to jobs page
✅ Browser back button → Back to jobs page
✅ Responsive design → Works on mobile
✅ Dark mode → Full support
✅ All animations → Smooth transitions

## 🔧 Add a New Company

### 1. Add to Mock Data
Edit `src/services/companyApi.js`:
```javascript
'new-company-slug': {
  name: 'New Company',
  slug: 'new-company-slug',
  description: 'Description...',
  location: 'City, State',
  size: '500 Employees',
  remotePolicy: 'Remote Friendly',
  hiringNow: true,
  icon: 'cloud_done',
  iconBg: 'bg-blue-50',
  iconColor: 'text-blue-600',
  // ... rest of fields
}
```

### 2. Add Jobs
Edit `src/pages/JobsPage.jsx`:
```javascript
{
  id: 5,
  title: 'Job Title',
  company: 'New Company',
  companySlug: 'new-company-slug', // ← Add this
  // ... rest of job data
}
```

### 3. Done!
Visit `/company/new-company-slug`

## 📊 Data Structure

```javascript
{
  name: string,
  slug: string,
  description: string,
  location: string,
  size: string,
  remotePolicy: string,
  hiringNow: boolean,
  icon: string,
  iconBg: string,
  iconColor: string,
  cultureImage: string,
  locationImage: string,
  address: string,
  values: string[],
  growthStats: { label, value }[],
  salaryBenchmarks: { role, range, percentage }[],
  openRoles: { id, title, department, location, isNew, skills }[]
}
```

## 🎨 Material Icons

Popular choices:
- `cloud_done` - Cloud
- `eco` - Green/Sustainability
- `bolt` - Energy/Speed
- `hub` - Network
- `token` - Finance
- `work` - General
- `school` - Education

[Full list](https://fonts.google.com/icons)

## 🎯 Tailwind Colors

Use consistent pairs:
- `bg-blue-50` + `text-blue-600`
- `bg-emerald-50` + `text-emerald-600`
- `bg-orange-50` + `text-orange-600`
- `bg-purple-50` + `text-purple-600`

## 🔗 Navigation

```
/jobs
  ↓ (click company name)
/company/{slug}
  ↓ (click "View all jobs" or back button)
/jobs
```

## 📱 Responsive

- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)
- ✅ Dark mode

## 🧪 Quick Test

1. Go to `/jobs`
2. Click "TechFlow Systems" in any job card
3. You should see the company profile
4. Click tabs to scroll sections
5. Click "View all jobs" to go back
6. Use browser back button

## 📚 Full Documentation

- `COMPANY_PROFILE_INTEGRATION.md` - Detailed integration
- `COMPANY_PROFILE_README.md` - Feature overview
- `EXTENDING_COMPANY_DATA.md` - How to extend
- `IMPLEMENTATION_COMPLETE.md` - Full summary

## 🚨 Troubleshooting

### Company not found?
- Check slug matches exactly (case-sensitive)
- Verify company in `mockCompanyData`
- Check browser console

### Images not loading?
- Verify HTTPS URLs
- Check CORS headers
- Use placeholder images

### Styling issues?
- Check Tailwind classes
- Verify color combinations
- Test dark mode

## 💡 Tips

1. **Add images**: Use HTTPS URLs only
2. **Test mobile**: Use browser dev tools
3. **Dark mode**: Toggle in browser
4. **Performance**: Images are the main factor
5. **Extend**: Follow `EXTENDING_COMPANY_DATA.md`

## 🎓 Learning Path

1. ✅ View existing companies
2. ✅ Add a new company
3. ✅ Customize company data
4. ✅ Integrate real API
5. ✅ Add new features

## 📞 Need Help?

1. Check the full documentation files
2. Review source code comments
3. Check browser console for errors
4. Verify data structure matches

---

**Status**: ✅ Ready to Use
**Version**: 1.0.0
