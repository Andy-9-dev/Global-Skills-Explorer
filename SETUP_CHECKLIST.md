# ✅ Global Talent Map - Setup Checklist

## 🎯 Complete This Checklist to Get Started

### Phase 1: Get Mapbox Token (5 minutes)

- [ ] Go to https://www.mapbox.com/
- [ ] Click "Sign up" (or log in if you have account)
- [ ] Go to https://account.mapbox.com/tokens
- [ ] Click "Create a token"
- [ ] Name it: `Career Platform Dev`
- [ ] Enable these scopes:
  - [ ] `styles:read`
  - [ ] `fonts:read`
  - [ ] `datasets:read`
  - [ ] `maps:read`
- [ ] Click "Create token"
- [ ] Copy the token (starts with `pk.eyJ...`)
- [ ] Save token somewhere safe (you'll need it next)

### Phase 2: Add Token to `.env.local` (2 minutes)

- [ ] Open `.env.local` in project root
- [ ] Find this line:
  ```env
  VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNsZXhhbXBsZSJ9.example
  ```
- [ ] Replace with your actual token:
  ```env
  VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNsZXhhbXBsZSJ9.YOUR_TOKEN_HERE
  ```
- [ ] Save the file
- [ ] **Important**: Do NOT commit `.env.local` to git (it's already in `.gitignore`)

### Phase 3: Start Development Server (1 minute)

- [ ] Open terminal in project root
- [ ] Run: `npm run dev`
- [ ] Wait for server to start
- [ ] You should see: `Local: http://localhost:5173`

### Phase 4: View the Map (2 minutes)

- [ ] Open http://localhost:5173 in browser
- [ ] Navigate to Dashboard page
- [ ] Wait for map to load (2-3 seconds)
- [ ] You should see a dark map with colored circles

---

## 🗺️ Verify Map Features

### Map Display
- [ ] Map loads with dark background (not white)
- [ ] Continents and country borders visible
- [ ] Colored circles visible at country locations
- [ ] Legend visible in bottom-left corner
- [ ] Info text visible in top-left corner
- [ ] No console errors (press F12 to check)

### Interactions
- [ ] Scroll wheel zooms in/out smoothly
- [ ] Drag pans the map smoothly
- [ ] Hover over marker shows tooltip
- [ ] Tooltip shows country name, demand, jobs, salary, skills
- [ ] Click marker focuses camera on that country
- [ ] Click marker opens right-side panel

### Controls
- [ ] Zoom in button (bottom-right) works
- [ ] Zoom out button (bottom-right) works
- [ ] Reset button (bottom-right) returns to world view
- [ ] All buttons have smooth hover effects

### Side Panel
- [ ] Panel slides in from right when marker clicked
- [ ] Panel shows country flag and name
- [ ] Panel displays demand level with color
- [ ] Panel shows average salary
- [ ] Panel lists top skills
- [ ] Panel shows job count
- [ ] "View Jobs" button is clickable
- [ ] "Close" button closes panel
- [ ] Map remains visible while panel is open

### Dark Mode
- [ ] Dark mode toggle works on other pages
- [ ] Map switches to light style when dark mode enabled
- [ ] Panel background changes appropriately
- [ ] Text remains readable in both modes

### Performance
- [ ] Map loads within 2-3 seconds
- [ ] Interactions are smooth (no lag)
- [ ] No console errors
- [ ] No performance warnings

---

## 🔧 Troubleshooting

### If Map is Blank/White

- [ ] Check `.env.local` has correct token
- [ ] Verify token starts with `pk.eyJ`
- [ ] Restart dev server: `npm run dev`
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Check browser console (F12) for errors
- [ ] Try a different browser

### If No Markers Showing

- [ ] Verify token has `styles:read` scope
- [ ] Check browser console (F12) for errors
- [ ] Verify country coordinates are valid
- [ ] Try zooming in/out

### If Tooltips Not Appearing

- [ ] Hover directly over marker circle
- [ ] Check browser console (F12) for errors
- [ ] Try moving mouse slowly over marker

### If Side Panel Won't Open

- [ ] Check browser console (F12) for errors
- [ ] Verify you're clicking on a marker
- [ ] Try clicking a different marker

### If Dark Mode Not Switching

- [ ] Restart dev server: `npm run dev`
- [ ] Check dark mode toggle on other pages
- [ ] Clear browser cache

---

## 📚 Documentation to Read

### Quick Start (Recommended First)
- [ ] Read `START_HERE.md` (2 minutes)
- [ ] Read `QUICK_REFERENCE_GLOBAL_MAP.md` (3 minutes)

### Detailed Setup
- [ ] Read `GLOBAL_TALENT_MAP_SETUP_GUIDE.md` (10 minutes)
- [ ] Read `IMPLEMENTATION_STATUS.md` (8 minutes)

### Technical Details (Optional)
- [ ] Read `GLOBAL_TALENT_MAP_COMPLETE.md` (15 minutes)
- [ ] Read `GLOBAL_TALENT_MAP_IMPLEMENTATION.md` (12 minutes)

### Navigation
- [ ] Read `DOCUMENTATION_INDEX.md` for full documentation guide

---

## 🎨 Optional Customizations

### Change Map Style
- [ ] Open `src/components/GlobalTalentMap.jsx`
- [ ] Find line 38: `style: \`mapbox://styles/mapbox/dark-v11\``
- [ ] Try: `light-v11`, `streets-v12`, `satellite-v9`, `outdoors-v12`
- [ ] Save and refresh browser

### Change Marker Colors
- [ ] Open `src/components/GlobalTalentMap.jsx`
- [ ] Search for `circle-color`
- [ ] Change colors:
  - [ ] High demand: `#13c8ec` (cyan)
  - [ ] Growing: `#f59e0b` (orange)
  - [ ] Medium: `#94a3b8` (gray)
- [ ] Save and refresh browser

### Change Initial Zoom
- [ ] Open `src/components/GlobalTalentMap.jsx`
- [ ] Find line 39: `zoom: 1.5`
- [ ] Change to value between 1-18
- [ ] Save and refresh browser

---

## 🚀 Production Deployment

### Before Deploying
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile (iOS, Android)
- [ ] Verify dark mode works
- [ ] Check performance on slow networks
- [ ] Test all interactions
- [ ] No console errors

### Deploy to Production
- [ ] Set `VITE_MAPBOX_TOKEN` in hosting platform
- [ ] For Vercel: Project Settings → Environment Variables
- [ ] For Netlify: Site Settings → Build & Deploy → Environment
- [ ] Redeploy application
- [ ] Verify map works in production
- [ ] Monitor Mapbox usage (free tier: 50k views/month)

---

## 📞 Need Help?

### Check These Resources
- [ ] `GLOBAL_TALENT_MAP_SETUP_GUIDE.md` → Troubleshooting section
- [ ] `QUICK_REFERENCE_GLOBAL_MAP.md` → Troubleshooting section
- [ ] Browser console (F12) for errors
- [ ] Component code comments
- [ ] Mapbox documentation: https://docs.mapbox.com/

---

## ✅ Final Verification

- [ ] Map loads successfully
- [ ] All features work smoothly
- [ ] No console errors
- [ ] Dark mode works
- [ ] Responsive on all devices
- [ ] Ready for production

---

## 🎉 You're Done!

Once you've completed this checklist:

1. ✅ Your map is set up and working
2. ✅ All features are verified
3. ✅ You're ready to deploy to production
4. ✅ You can customize as needed

---

## 📊 Quick Reference

| Step | Time | Status |
|------|------|--------|
| Get Mapbox token | 5 min | [ ] |
| Add to `.env.local` | 2 min | [ ] |
| Start dev server | 1 min | [ ] |
| View map | 2 min | [ ] |
| Verify features | 10 min | [ ] |
| Read documentation | 15 min | [ ] |
| **Total** | **~35 min** | [ ] |

---

## 🚀 Next Steps

1. Complete this checklist
2. Read `START_HERE.md`
3. Explore the map
4. Customize as needed
5. Deploy to production

---

**Happy exploring! 🌍**

Print this checklist and check off each item as you complete it.
