# Global Talent Map - Quick Reference

## 🎯 TL;DR - Get Started in 2 Minutes

### 1. Get Mapbox Token
- Go to https://account.mapbox.com/tokens
- Create token with scopes: `styles:read`, `fonts:read`, `datasets:read`, `maps:read`
- Copy token (starts with `pk.eyJ...`)

### 2. Add to `.env.local`
```env
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNsZXhhbXBsZSJ9.YOUR_TOKEN_HERE
```

### 3. Run Dev Server
```bash
npm run dev
```

### 4. View Map
- Open http://localhost:5173
- Go to Dashboard page
- Map should load with basemap, markers, and controls

---

## 🗺️ What You'll See

| Feature | What It Does |
|---------|-------------|
| **Dark Map** | Real Mapbox basemap with continents, oceans, borders |
| **Colored Circles** | Markers showing job demand (cyan=High, orange=Growing, gray=Medium) |
| **Hover Tooltip** | Shows country name, demand, jobs, salary, top skills |
| **Click Marker** | Focuses camera on country + opens side panel |
| **Zoom Controls** | +/- buttons in bottom-right corner |
| **Reset Button** | Returns to world view |
| **Legend** | Shows demand levels (bottom-left) |
| **Side Panel** | Slides in from right with country details |

---

## 🎮 Interactions

| Action | Result |
|--------|--------|
| **Scroll** | Zoom in/out |
| **Drag** | Pan around map |
| **Pinch** (mobile) | Zoom in/out |
| **Hover Marker** | Show tooltip |
| **Click Marker** | Focus + open panel |
| **Click Zoom +** | Zoom in |
| **Click Zoom -** | Zoom out |
| **Click Reset** | Return to world view |
| **Click Overlay** | Close panel |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/components/GlobalTalentMap.jsx` | Main map component |
| `src/components/CountryInfoPanel.jsx` | Side panel with country details |
| `src/data/countryCoordinates.js` | 150+ countries with coordinates |
| `src/pages/DashboardPage.jsx` | Dashboard page (uses map) |
| `.env.local` | Environment variables (add token here) |

---

## 🔍 Verification Checklist

After running `npm run dev`:

- [ ] Map loads with dark basemap
- [ ] Colored circles visible at country locations
- [ ] Scroll zooms smoothly
- [ ] Drag pans smoothly
- [ ] Hover shows tooltip
- [ ] Click focuses camera
- [ ] Click opens side panel
- [ ] Zoom buttons work
- [ ] Reset button works
- [ ] No console errors

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| **Blank map** | Check `.env.local` has correct token, restart dev server |
| **No markers** | Verify token has `styles:read` scope, check console |
| **No tooltip** | Hover directly over marker circle |
| **Panel won't open** | Check browser console for errors |
| **Dark mode not switching** | Restart dev server |

---

## 🎨 Quick Customizations

### Change Map Style
In `GlobalTalentMap.jsx` line 38:
```javascript
style: `mapbox://styles/mapbox/dark-v11`
// Options: light-v11, streets-v12, satellite-v9, outdoors-v12
```

### Change Marker Colors
In `GlobalTalentMap.jsx`, search for `circle-color`:
```javascript
'circle-color': '#13c8ec'  // High (cyan)
'circle-color': '#f59e0b'  // Growing (orange)
'circle-color': '#94a3b8'  // Medium (gray)
```

### Change Initial Zoom
In `GlobalTalentMap.jsx` line 39:
```javascript
zoom: 1.5  // Change to 1-18
```

---

## 📊 Data Structure

Each country in `countryCoordinates.js`:
```javascript
{
  name: 'Country Name',
  lat: 37.0902,
  lng: -95.7129,
  demand: 'High',           // High, Growing, Medium
  salary: '$120k - $180k',
  jobs: 15000,
  skills: ['React', 'Node.js', 'Python'],
  flag: '🇺🇸'
}
```

---

## 🚀 Production Checklist

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile (iOS, Android)
- [ ] Verify dark mode works
- [ ] Check performance (60fps)
- [ ] Test all interactions
- [ ] Set `VITE_MAPBOX_TOKEN` in hosting platform
- [ ] Monitor Mapbox usage (free tier: 50k views/month)

---

## 📞 Help

- **Mapbox Docs**: https://docs.mapbox.com/
- **Setup Guide**: See `GLOBAL_TALENT_MAP_SETUP_GUIDE.md`
- **Full Docs**: See `GLOBAL_TALENT_MAP_COMPLETE.md`

---

**Status**: ✅ Ready to Use

Get your token, add it to `.env.local`, run `npm run dev`, and you're done!
