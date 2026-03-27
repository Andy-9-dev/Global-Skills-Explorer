# 📸 Visual References & Screenshots Guide

## Step 1: Supabase - Get API Keys

### Where to Find Settings
```
Supabase Dashboard
├── Your Project
├── Settings (gear icon) ← CLICK HERE
├── API ← CLICK HERE
├── API Keys tab ← CLICK HERE
└── Publishable key [Copy] ← CLICK HERE
```

### What You'll See
```
┌─────────────────────────────────────┐
│ API Settings                        │
├─────────────────────────────────────┤
│ [API Keys] [Legacy API Keys]        │
│                                     │
│ Publishable key                     │
│ sb_publishable_Evqz9P4VByun9s7... │
│ [Copy] ← CLICK TO COPY             │
│                                     │
│ Project URL                         │
│ https://vycncpapalveygnlknps...    │
└─────────────────────────────────────┘
```

### After Clicking Copy
```
┌─────────────────────────────────────┐
│ ✅ Copied to clipboard!             │
│                                     │
│ Your key is ready to paste          │
└─────────────────────────────────────┘
```

---

## Step 2: Update .env.local

### File Location
```
Your Project Folder
├── src/
├── public/
├── .env.local ← EDIT THIS FILE
├── .env.example
├── package.json
└── ...
```

### What to Change
```
BEFORE:
─────────────────────────────────────
VITE_SUPABASE_URL=https://vycncpapalveygnlknps.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_Evqz9P4VByun9s7RidYRSg_Tbv-S_Mb

AFTER:
─────────────────────────────────────
VITE_SUPABASE_URL=https://vycncpapalveygnlknps.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_YOUR_NEW_KEY_HERE
```

### In VS Code
```
┌─────────────────────────────────────┐
│ .env.local                          │
├─────────────────────────────────────┤
│ 1  # API Configuration              │
│ 2  # Supabase Authentication        │
│ 3  VITE_SUPABASE_URL=https://...   │
│ 4  VITE_SUPABASE_ANON_KEY=sb_...   │
│ 5                                   │
│ 6  # Adzuna Job Board API           │
│ 7  VITE_ADZUNA_APP_ID=...          │
│ 8  VITE_ADZUNA_API_KEY=...         │
│                                     │
│ [Ctrl+S to Save]                    │
└─────────────────────────────────────┘
```

---

## Step 3: Supabase - Enable RLS

### Where to Find SQL Editor
```
Supabase Dashboard
├── Your Project
├── SQL Editor ← CLICK HERE
├── New Query ← CLICK HERE
└── Paste SQL Code
```

### SQL Editor Interface
```
┌─────────────────────────────────────┐
│ SQL Editor                          │
├─────────────────────────────────────┤
│ [New Query] [Save] [Run] [Format]  │
├─────────────────────────────────────┤
│ ALTER TABLE profiles ENABLE ROW...  │
│ CREATE POLICY "Users can select...  │
│ CREATE POLICY "Users can update...  │
│ CREATE POLICY "Users can insert...  │
│                                     │
│ [Run] ← CLICK HERE                 │
└─────────────────────────────────────┘
```

### Success Message
```
┌─────────────────────────────────────┐
│ ✅ Success. No rows returned        │
│                                     │
│ Query executed successfully         │
└─────────────────────────────────────┘
```

---

## Step 4: Test Your App

### Terminal Commands
```bash
# Stop dev server
Ctrl+C

# Start dev server
npm run dev

# You'll see:
  VITE v5.4.21  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Browser Console (F12)
```
┌─────────────────────────────────────┐
│ Console                             │
├─────────────────────────────────────┤
│ ✓ Supabase URL: ✓ Set              │
│ ✓ Supabase Anon Key: ✓ Set         │
│ ✓ Mapbox Token: ✓ Set              │
│                                     │
│ No errors = Good! ✅               │
└─────────────────────────────────────┘
```

---

## Testing Checklist - Visual

### Sign Up Flow
```
1. Go to http://localhost:5173
   ↓
2. Click "Get Started"
   ↓
3. Click "Sign Up" tab
   ↓
4. Enter email: test@example.com
   ↓
5. Enter password: password123
   ↓
6. Click "Create Account"
   ↓
7. ✅ Should see Dashboard
```

### Dark Mode Toggle
```
Light Mode                Dark Mode
┌──────────────┐         ┌──────────────┐
│ ☀️ Header    │ Click   │ 🌙 Header    │
│ White bg     │ Moon ──→│ Dark bg      │
│ Dark text    │         │ Light text   │
└──────────────┘         └──────────────┘
     ↓                         ↓
  Refresh              Refresh (stays dark)
```

### Global Map
```
Dashboard View:
┌─────────────────────────────────────┐
│ Global Talent Insights              │
├─────────────────────────────────────┤
│                                     │
│  🗺️  World Map with Countries      │
│  ┌─────────────────────────────┐   │
│  │ 🔵 High Demand (Blue)       │   │
│  │ 🟠 Growing (Orange)         │   │
│  │ ⚫ Medium (Gray)            │   │
│  │                             │   │
│  │ [+] [-] [Reset] Buttons     │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Error Toast
```
When uploading file > 5MB:

┌─────────────────────────────────────┐
│ ❌ File size must be less than 5MB  │ ← Red toast
│ [X]                                 │
└─────────────────────────────────────┘
```

### Success Toast
```
When uploading valid image:

┌─────────────────────────────────────┐
│ ✅ Avatar uploaded successfully!    │ ← Green toast
│ [X]                                 │
└─────────────────────────────────────┘
```

---

## File Structure Reference

### Where Files Are Located
```
Project Root
├── .env.local ← EDIT THIS
├── .env.example ← REFERENCE ONLY
├── src/
│   ├── components/
│   │   ├── Header.jsx (dark mode toggle)
│   │   ├── DashboardHeader.jsx (dark mode toggle)
│   │   ├── GlobalTalentMap.jsx (world map)
│   │   └── Toast.jsx (error messages)
│   ├── pages/
│   │   ├── DashboardPage.jsx (uses GlobalTalentMap)
│   │   ├── LoginPage.jsx (sign up/login)
│   │   └── ShareProfilePage.jsx (profile editing)
│   ├── services/
│   │   ├── auth.js (authentication)
│   │   ├── profileApi.js (profile management)
│   │   └── supabase.js (Supabase client)
│   ├── context/
│   │   └── ToastContext.jsx (error notifications)
│   └── main.jsx (app entry point)
├── package.json
└── ...
```

---

## Common Issues - Visual Troubleshooting

### Issue: Can Access Dashboard Without Login
```
PROBLEM:
Go to http://localhost:5173/dashboard
→ Should redirect to login
→ But it doesn't

SOLUTION:
1. Open browser console (F12)
2. Type: localStorage.clear()
3. Press Enter
4. Refresh page
5. Try again
```

### Issue: Dark Mode Not Persisting
```
PROBLEM:
Toggle dark mode
→ Refresh page
→ Back to light mode

SOLUTION:
1. Check browser allows localStorage
2. Check privacy settings
3. Try in incognito mode
4. Clear browser cache
5. Restart browser
```

---

## Success Indicators Checklist

### ✅ Everything Working
```
✅ Supabase credentials updated
✅ Mapbox token added
✅ RLS policies enabled
✅ Can sign up
✅ Can log in
✅ Can't access dashboard without login
✅ Dark mode works
✅ Map displays countries
✅ Map interactions work
✅ Error toasts show
✅ Success toasts show
✅ Profile editing works
✅ Avatar upload works
✅ Changes persist
```

### ❌ Something Not Working
```
❌ Check browser console (F12)
❌ Check terminal for errors
❌ Restart dev server
❌ Hard refresh browser (Ctrl+Shift+R)
❌ Clear localStorage
❌ Check .env.local credentials
❌ Try in incognito mode
```

---

**Time to Complete:** ~15 minutes  
**Difficulty:** Easy (no coding)  
**Next Step:** Follow the checklist above
