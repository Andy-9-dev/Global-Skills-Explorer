# 📖 Step-by-Step Setup Guide

## 📋 Step-by-Step

### Step 1: Get Your Supabase API Keys (5 minutes)

**Why:** You need your Supabase credentials to connect your app to the database.

### How to Do It:

#### 1.1 Go to Supabase Dashboard
1. Open browser and go to: https://supabase.com/dashboard
2. Log in with your email/password
3. Click on your project (Global Skills Explorer)

#### 1.2 Find Your API Keys
1. In the left sidebar, click **Settings** (gear icon)
2. Click **API** in the submenu
3. Click the **API Keys** tab (not Legacy API Keys)
4. Look for **Publishable key** (starts with `sb_publishable_`)
5. Click the **Copy** button next to it

#### 1.3 Update Your .env.local File
1. Open your project in VS Code
2. Open `.env.local` file
3. Find this line:
   ```
   VITE_SUPABASE_ANON_KEY=sb_publishable_Evqz9P4VByun9s7RidYRSg_Tbv-S_Mb
   ```
4. Replace it with your copied key:
   ```
   VITE_SUPABASE_ANON_KEY=sb_publishable_YOUR_COPIED_KEY_HERE
   ```
5. **Save the file** (Ctrl+S)

#### 1.4 Verify It Works
1. Stop your dev server (Ctrl+C in terminal)
2. Start it again: `npm run dev`
3. Go to http://localhost:5173
4. Try to sign up with a test email
5. If it works, you're good!

**Need more help?** See `SUPABASE_API_KEYS_GUIDE.md` for detailed screenshots and troubleshooting.

---

## Step 2: Enable Supabase Row-Level Security (RLS)

### Why?
RLS ensures users can only access their own data. Without it, any authenticated user could see other users' profiles.

### How to Do It:

#### 2.1 Go to Supabase SQL Editor
1. Go to: https://supabase.com/dashboard
2. Click on your project
3. In the left sidebar, click **SQL Editor**
4. Click **New Query**

#### 2.2 Enable RLS on Profiles Table
1. Copy this SQL code:
```sql
-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can select their own profile
CREATE POLICY "Users can select their own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Policy 2: Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Policy 3: Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);
```

2. Paste it into the SQL editor
3. Click **Run** (or press Ctrl+Enter)
4. You should see: **Success. No rows returned**

#### 2.3 Verify It Works
1. Go back to your app: http://localhost:5173
2. Sign up with a test email
3. Go to your profile page
4. Try to edit your profile - it should work
5. You should NOT be able to see other users' profiles

---

## Step 3: Test All Features

### 3.1 Test Authentication
**Sign Up:**
1. Go to http://localhost:5173
2. Click **Get Started**
3. Click **Sign Up** tab
4. Enter email: `test@example.com`
5. Enter password: `password123`
6. Click **Create Account**
7. ✅ Should redirect to dashboard

**Login:**
1. Click **Logout** (top right)
2. Click **Get Started**
3. Click **Login** tab
4. Enter email: `test@example.com`
5. Enter password: `password123`
6. Click **Sign In**
7. ✅ Should redirect to dashboard

**Wrong Password:**
1. Try logging in with wrong password
2. ✅ Should show error message

### 3.2 Test Protected Routes
1. Open browser console (F12)
2. Clear localStorage: `localStorage.clear()`
3. Refresh page
4. Try going to: http://localhost:5173/dashboard
5. ✅ Should redirect to login

### 3.3 Test Dark Mode
1. Click the **moon icon** in the header
2. ✅ Page should turn dark
3. Refresh the page
4. ✅ Should still be dark (preference saved)
5. Click the **sun icon** to switch back to light

### 3.4 Test Global Map
1. Go to http://localhost:5173/dashboard
2. You should see a **world map** with countries
3. Try these interactions:
   - **Hover over a country** → ✅ Should show tooltip
   - **Click on a country** → ✅ Should highlight
   - **Scroll to zoom** → ✅ Should zoom in/out
   - **Drag to pan** → ✅ Should move around
   - **Click zoom buttons** (bottom right) → ✅ Should zoom

### 3.5 Test Error Handling
1. Go to your profile: http://localhost:5173/share-profile
2. Try uploading a file > 5MB
3. ✅ Should show error toast: "File size must be less than 5MB"
4. Try uploading a `.txt` file
5. ✅ Should show error toast: "Only JPG, PNG, and WebP images are allowed"
6. Upload a valid image (JPG/PNG < 5MB)
7. ✅ Should show success toast: "Avatar uploaded successfully!"

### 3.6 Test Profile Editing
1. Go to your profile: http://localhost:5173/share-profile
2. Click **Edit Profile**
3. Change your headline to: "Senior Developer"
4. Change your country to: "United States"
5. Click **Save**
6. ✅ Should show success toast
7. Refresh the page
8. ✅ Changes should persist

---

## Troubleshooting

### Dark Mode Not Working?
**Problem:** Dark mode toggle doesn't work

**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Try clearing localStorage: `localStorage.clear()`
4. Refresh page
5. Try toggling dark mode again

### Can't Sign Up?
**Problem:** Sign up fails with error

**Solution:**
1. Check your Supabase credentials in `.env.local`
2. Make sure URL and key are correct
3. Go to Supabase dashboard and verify project is active
4. Try signing up with a different email
5. Check browser console for error messages

### Protected Routes Not Working?
**Problem:** Can access dashboard without logging in

**Solution:**
1. Clear localStorage: `localStorage.clear()`
2. Refresh page
3. Try accessing /dashboard
4. Should redirect to login
5. If not, check browser console for errors

---

## What to Do If Something Breaks

### Step 1: Check the Error
1. Open browser console (F12)
2. Look for red error messages
3. Take a screenshot of the error

### Step 2: Check the Logs
1. Look at your terminal where dev server is running
2. Check for error messages there too

### Step 3: Restart Everything
1. Stop dev server (Ctrl+C)
2. Clear node_modules cache: `npm cache clean --force`
3. Start dev server again: `npm run dev`
4. Hard refresh browser (Ctrl+Shift+R)

### Step 4: Revert Changes
If something is broken:
1. Check `.env.local` - make sure credentials are correct
2. If you're not sure, compare with `.env.example`
3. Restore from backup if needed

---

## Verification Checklist

After completing all steps, verify:

- [ ] Supabase credentials rotated
- [ ] RLS policies enabled
- [ ] Can sign up with new account
- [ ] Can log in with credentials
- [ ] Can't access dashboard without login
- [ ] Dark mode toggle works
- [ ] Global map displays 150+ countries
- [ ] Map interactions work (zoom, pan, click)
- [ ] Error toasts show on failures
- [ ] Success toasts show on success
- [ ] Profile editing works
- [ ] Avatar upload works
- [ ] Changes persist after refresh

---

## Next Steps

Once everything is working:

1. ✅ You're ready for Phase 3 (Medium Priority Fixes)
2. ✅ You can deploy to production
3. ✅ You can invite users to test

---

## Need Help?

If you get stuck:
1. Check `SECURITY_NOTICE.md` for security questions
2. Check `PRODUCTION_READY_CHECKLIST.md` for launch prep
3. Check browser console (F12) for error messages
4. Try restarting dev server
5. Try clearing browser cache

---

**Status:** Ready to Setup  
**Time Required:** ~15 minutes  
**Difficulty:** Easy
