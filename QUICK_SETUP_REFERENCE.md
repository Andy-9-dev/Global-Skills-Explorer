# ⚡ Quick Setup Reference Card

## 3-Step Setup (15 minutes)

### Step 1: Get Supabase API Key (5 min)
```
1. Go to https://supabase.com/dashboard
2. Click your project
3. Settings → API → API Keys tab
4. Copy "Publishable key" (sb_publishable_...)
5. Paste into .env.local: VITE_SUPABASE_ANON_KEY=...
6. Save & restart dev server
```

### Step 2: Enable RLS (5 min)
```
1. Go to https://supabase.com/dashboard
2. Click your project
3. SQL Editor → New Query
4. Paste RLS policies (see SETUP_GUIDE_STEP_BY_STEP.md)
5. Click Run
6. Verify: "Success. No rows returned"
```

### Step 3: Test Features (5 min)
```
1. Sign up at http://localhost:5173
2. Test dark mode toggle
3. Test map on dashboard
4. Test profile editing
5. Test error handling
```

---

## Key Files

| File | Purpose |
|------|---------|
| `START_HERE_SETUP.md` | Quick 15-min setup guide |
| `SETUP_GUIDE_STEP_BY_STEP.md` | Detailed instructions |
| `SUPABASE_API_KEYS_GUIDE.md` | Current Supabase UI (2025) |
| `SETUP_CHECKLIST_VISUAL.md` | Visual checklist |
| `SETUP_VISUAL_REFERENCES.md` | Diagrams & screenshots |

---

## Supabase API Keys (Current UI)

### Where to Find
```
Dashboard → Your Project → Settings (gear) → API
```

### Two Tabs
- **API Keys** (new format) ← USE THIS
  - Publishable key: `sb_publishable_...`
  - Secret key: `sb_secret_...`
  
- **Legacy API Keys** (old format)
  - anon key: JWT token
  - service_role key: JWT token

### For Your App
Use: **Publishable key** from **API Keys** tab

---

## Environment File

### Location
```
.env.local (in project root)
```

### What to Update
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_YOUR_KEY_HERE
```

### Don't Commit
```
.env.local ← Add to .gitignore
.env.example ← Reference only
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't find API Keys tab | Make sure you're in Settings → API, then click "API Keys" tab |
| Key looks wrong | Should start with `sb_publishable_` (not JWT token) |
| App still doesn't work | Restart dev server after updating .env.local |
| Dark mode not working | Clear localStorage: `localStorage.clear()` |
| Can access dashboard without login | Clear localStorage and refresh |

---

## Success Checklist

- [ ] Supabase API key copied
- [ ] .env.local updated
- [ ] Dev server restarted
- [ ] Can sign up
- [ ] Can log in
- [ ] Dark mode works
- [ ] Map displays
- [ ] Profile editing works

---

## Need Help?

1. **Setup questions** → `SETUP_GUIDE_STEP_BY_STEP.md`
2. **Supabase UI questions** → `SUPABASE_API_KEYS_GUIDE.md`
3. **Visual help** → `SETUP_VISUAL_REFERENCES.md`
4. **Troubleshooting** → Check troubleshooting section above

---

**Time:** 15 minutes  
**Difficulty:** Easy  
**Status:** Ready to go!
