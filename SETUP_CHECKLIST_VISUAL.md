# ✅ Setup Checklist - Visual Guide

## 🔐 Step 1: Get Supabase API Keys

### Checklist
- [ ] Go to https://supabase.com/dashboard
- [ ] Log in with your account
- [ ] Click on your project
- [ ] Click **Settings** (gear icon) → **API**
- [ ] Click **API Keys** tab
- [ ] Find **Publishable key** (starts with `sb_publishable_`)
- [ ] Click **Copy** button
- [ ] Open `.env.local` in VS Code
- [ ] Replace `VITE_SUPABASE_ANON_KEY` with copied key
- [ ] Save file (Ctrl+S)
- [ ] Restart dev server (Ctrl+C, then `npm run dev`)
- [ ] Test sign up at http://localhost:5173

### Before & After
```
BEFORE:
VITE_SUPABASE_ANON_KEY=sb_publishable_Evqz9P4VByun9s7RidYRSg_Tbv-S_Mb

AFTER:
VITE_SUPABASE_ANON_KEY=sb_publishable_YOUR_COPIED_KEY_HERE
```

### ✅ Success Indicators
- ✅ No errors in browser console
- ✅ Can sign up with new email
- ✅ Can log in with credentials
- ✅ Dashboard loads after login

---

## 🔒 Step 2: Enable Supabase RLS

### Checklist
- [ ] Go to https://supabase.com/dashboard
- [ ] Click on your project
- [ ] Click **SQL Editor** in left sidebar
- [ ] Click **New Query**
- [ ] Copy the SQL code from `SETUP_GUIDE_STEP_BY_STEP.md`
- [ ] Paste into SQL editor
- [ ] Click **Run** (or Ctrl+Enter)
- [ ] Verify: "Success. No rows returned"
- [ ] Go back to your app
- [ ] Test profile editing
- [ ] Verify changes persist

### SQL Code to Run
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select their own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);
```

### ✅ Success Indicators
- ✅ SQL runs without errors
- ✅ Can edit your own profile
- ✅ Changes save to database
- ✅ Changes persist after refresh

---

## 🧪 Step 3: Test All Features

### 3.1 Authentication Tests
- [ ] **Sign Up**
  - Go to http://localhost:5173
  - Click "Get Started"
  - Enter email: `test@example.com`
  - Enter password: `password123`
  - Click "Create Account"
  - ✅ Should redirect to dashboard

- [ ] **Login**
  - Click "Logout"
  - Click "Get Started"
  - Enter same email/password
  - Click "Sign In"
  - ✅ Should redirect to dashboard

- [ ] **Wrong Password**
  - Try logging in with wrong password
  - ✅ Should show error message

### 3.2 Protected Routes Tests
- [ ] **Clear Session**
  - Open browser console (F12)
  - Type: `localStorage.clear()`
  - Press Enter

- [ ] **Try Accessing Dashboard**
  - Go to http://localhost:5173/dashboard
  - ✅ Should redirect to login

- [ ] **Try Accessing Career Path**
  - Go to http://localhost:5173/career-path
  - ✅ Should redirect to login

- [ ] **Try Accessing Certifications**
  - Go to http://localhost:5173/certifications
  - ✅ Should redirect to login

### 3.3 Dark Mode Tests
- [ ] **Toggle Dark Mode**
  - Click moon icon in header
  - ✅ Page should turn dark

- [ ] **Refresh Page**
  - Press F5 to refresh
  - ✅ Should still be dark

- [ ] **Toggle Back to Light**
  - Click sun icon in header
  - ✅ Page should turn light

- [ ] **Refresh Again**
  - Press F5 to refresh
  - ✅ Should still be light

### 3.4 Global Map Tests
- [ ] **Map Displays**
  - Go to http://localhost:5173/dashboard
  - ✅ Should see world map with countries

- [ ] **Hover Over Country**
  - Hover mouse over a country
  - ✅ Should show tooltip with country info

- [ ] **Click on Country**
  - Click on a country
  - ✅ Should highlight the country

- [ ] **Zoom In**
  - Scroll up on map
  - ✅ Should zoom in

- [ ] **Zoom Out**
  - Scroll down on map
  - ✅ Should zoom out

- [ ] **Pan**
  - Click and drag on map
  - ✅ Should move around

- [ ] **Zoom Buttons**
  - Click + button (bottom right)
  - ✅ Should zoom in
  - Click - button
  - ✅ Should zoom out

### 3.5 Error Handling Tests
- [ ] **File Too Large**
  - Go to http://localhost:5173/share-profile
  - Try uploading file > 5MB
  - ✅ Should show error toast

- [ ] **Invalid File Type**
  - Try uploading .txt file
  - ✅ Should show error toast

- [ ] **Valid Upload**
  - Upload JPG/PNG < 5MB
  - ✅ Should show success toast

### 3.6 Profile Editing Tests
- [ ] **Edit Profile**
  - Go to http://localhost:5173/share-profile
  - Click "Edit Profile"
  - Change headline to "Senior Developer"
  - Change country to "United States"
  - Click "Save"
  - ✅ Should show success toast

- [ ] **Verify Persistence**
  - Refresh page (F5)
  - ✅ Changes should still be there

---

## 📊 Final Verification

### All Tests Passed?
- [ ] Authentication works (sign up, login, logout)
- [ ] Protected routes redirect to login
- [ ] Dark mode toggles and persists
- [ ] Global map displays and works
- [ ] Error toasts show on failures
- [ ] Success toasts show on success
- [ ] Profile editing works
- [ ] Avatar upload works
- [ ] Changes persist after refresh

### If Any Test Failed
1. Check browser console (F12) for errors
2. Check terminal for error messages
3. Restart dev server (Ctrl+C, then `npm run dev`)
4. Hard refresh browser (Ctrl+Shift+R)
5. Try the test again

---

## 🎉 You're Done!

Once all tests pass:
1. ✅ Your app is production-ready
2. ✅ You can deploy to production
3. ✅ You can invite users to test
4. ✅ You can move to Phase 3 improvements

---

## 📝 Notes

- **Time Required:** ~15 minutes
- **Difficulty:** Easy
- **No coding required:** Just copy/paste and click buttons
- **All steps are reversible:** You can undo if needed

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Dark mode not working | Clear localStorage: `localStorage.clear()` |
| Can't sign up | Check Supabase credentials |
| Can access dashboard without login | Clear localStorage and refresh |
| Error toasts not showing | Restart dev server |
| Profile changes not saving | Check RLS policies are enabled |

---

**Status:** Ready to Setup  
**Next Step:** Follow the checklist above  
**Questions?** See `SETUP_GUIDE_STEP_BY_STEP.md` for detailed instructions
