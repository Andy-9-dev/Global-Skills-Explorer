# 🔑 Supabase API Keys - Current Guide (2025)

## Overview

Supabase has updated its API key system. This guide shows you how to find and use your API keys with the current Supabase dashboard.

---

## Finding Your API Keys

### Step 1: Go to Supabase Dashboard
1. Open https://supabase.com/dashboard
2. Log in with your email/password
3. Click on your project (Global Skills Explorer)

### Step 2: Navigate to API Settings
1. In the left sidebar, click **Settings** (gear icon)
2. In the submenu, click **API**
3. You'll see the API section with your keys

---

## API Keys Section Layout

The API section has **two tabs**:

### Tab 1: API Keys (Recommended - New Format)
```
┌─────────────────────────────────────────────────┐
│ API Keys                                        │
├─────────────────────────────────────────────────┤
│                                                 │
│ Publishable key                                 │
│ sb_publishable_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx   │
│ [Copy]                                          │
│                                                 │
│ Project URL                                     │
│ https://your-project.supabase.co               │
│ [Copy]                                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Use this tab for your app.**

### Tab 2: Legacy API Keys (Old Format)
```
┌─────────────────────────────────────────────────┐
│ Legacy API Keys                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ anon public                                     │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...      │
│ [Copy]                                          │
│                                                 │
│ service_role                                    │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...      │
│ [Copy]                                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Only use this if you need legacy keys.**

---

## Which Key to Use?

### For Your App (Client-Side)
Use the **Publishable key** from the **API Keys** tab:
- Format: `sb_publishable_xxxxx`
- Safe to expose in your code
- This is what goes in `.env.local`

### For Backend/Server (Server-Side)
Use the **Secret key** from the **API Keys** tab:
- Format: `sb_secret_xxxxx`
- Keep this secret - never expose it
- Only use in backend code

### Legacy Keys (Not Recommended)
- **anon key**: Old format of publishable key
- **service_role key**: Old format of secret key
- Only use if you need backward compatibility

---

## How to Copy Your Key

### Method 1: Click Copy Button
1. Find the key you need
2. Click the **[Copy]** button next to it
3. The key is now in your clipboard
4. Paste it into `.env.local`

### Method 2: Manual Copy
1. Click on the key text to select it
2. Press Ctrl+C to copy
3. Paste it into `.env.local`

---

## Updating Your .env.local

### Step 1: Open .env.local
```
Your Project
├── src/
├── .env.local ← OPEN THIS FILE
├── .env.example
└── ...
```

### Step 2: Find the Line
```
VITE_SUPABASE_ANON_KEY=sb_publishable_Evqz9P4VByun9s7RidYRSg_Tbv-S_Mb
```

### Step 3: Replace with Your Key
```
VITE_SUPABASE_ANON_KEY=sb_publishable_YOUR_COPIED_KEY_HERE
```

### Step 4: Save
- Press Ctrl+S to save

### Step 5: Restart Dev Server
```bash
# Stop current server
Ctrl+C

# Start new server
npm run dev
```

---

## Troubleshooting

### I Can't Find the API Keys Tab
**Solution:**
1. Make sure you're in **Settings** (gear icon)
2. Click **API** in the left submenu
3. You should see two tabs: **API Keys** and **Legacy API Keys**
4. Click the **API Keys** tab

### The Key Looks Different
**Solution:**
- New keys start with `sb_publishable_` or `sb_secret_`
- Old keys are long JWT tokens
- Both work, but new keys are recommended

### I Copied the Wrong Key
**Solution:**
1. Go back to Supabase dashboard
2. Copy the correct key
3. Update `.env.local`
4. Restart dev server

### My App Still Doesn't Work
**Solution:**
1. Check that you copied the **Publishable key** (not Secret key)
2. Check that the key starts with `sb_publishable_`
3. Make sure you saved `.env.local`
4. Make sure you restarted the dev server
5. Check browser console (F12) for error messages

---

## Key Rotation (If Needed)

### Why Rotate Keys?
- If your key was exposed
- If you suspect unauthorized access
- As a security best practice

### How to Rotate Keys
1. Go to Supabase dashboard
2. Click **Settings** → **API**
3. Look for a **Rotate** or **Regenerate** button
4. Click it to generate a new key
5. Update `.env.local` with the new key
6. Restart dev server

**Note:** Old keys will stop working immediately after rotation.

---

## Security Best Practices

### ✅ DO
- Keep your publishable key in `.env.local`
- Keep your secret key in `.env.local` (server-side only)
- Rotate keys if exposed
- Use different keys for different environments

### ❌ DON'T
- Commit `.env.local` to Git
- Share your keys with others
- Use the same key for multiple projects
- Expose secret keys in client-side code

---

## Reference

### Supabase Documentation
- [API Keys Guide](https://supabase.com/docs/guides/api/api-keys)
- [Supabase Dashboard](https://supabase.com/dashboard)

### Your App Configuration
- **File:** `.env.local`
- **Key:** `VITE_SUPABASE_ANON_KEY`
- **Format:** `sb_publishable_xxxxx`

---

**Last Updated:** March 24, 2026  
**Status:** Current for 2025 Supabase UI  
**Questions?** Check the troubleshooting section above
