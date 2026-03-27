# 🚀 START HERE - Setup in 15 Minutes

## What You Need to Do

Your app is production-ready, but you need to complete 3 quick setup steps. **No coding required!**

---

## ⏱️ Quick Timeline

| Step | Time | Difficulty |
|------|------|-----------|
| 1. Rotate Supabase Keys | 5 min | Easy |
| 2. Enable RLS | 5 min | Easy |
| 3. Test Features | 5 min | Easy |
| **Total** | **15 min** | **Easy** |

---

## 📋 Step-by-Step

### Step 1: Get Your Supabase API Keys (5 minutes)

**Why:** You need your Supabase credentials to connect your app to the database.

**How:**
1. Go to https://supabase.com/dashboard
2. Log in with your account
3. Click on your project (Global Skills Explorer)
4. In the left sidebar, click **Settings** (gear icon)
5. Click **API** in the submenu
6. Click the **API Keys** tab (not Legacy API Keys)
7. Look for **Publishable key** (starts with `sb_publishable_`)
8. Click **Copy** to copy the key
9. Open `.env.local` in VS Code
10. Find the line: `VITE_SUPABASE_ANON_KEY=...`
11. Replace it with your copied key
12. Save (Ctrl+S)
13. Restart dev server: `Ctrl+C`, then `npm run dev`

**Need more help?** See `SUPABASE_API_KEYS_GUIDE.md` for detailed screenshots and troubleshooting.

**Done!** ✅

---

### Step 2: Enable RLS (5 minutes)

**Why:** Ensures users can only access their own data.

**How:**
1. Go to https://supabase.com/dashboard
2. Click your project
3. Click **SQL Editor**
4. Click **New Query**
5. Copy this code:

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

6. Paste into SQL editor
7. Click **Run**
8. Verify: "Success. No rows returned"

**Done!** ✅

---

### Step 3: Test Features (5 minutes)

**Sign Up:**
1. Go to http://localhost:5173
2. Click **Get Started**
3. Click **Sign Up**
4. Enter email: `test@example.com`
5. Enter password: `password123`
6. Click **Create Account**
7. ✅ Should see dashboard

**Dark Mode:**
1. Click moon icon in header
2. ✅ Page should turn dark
3. Refresh page
4. ✅ Should still be dark

**Global Map:**
1. You should see a world map with countries
2. Try hovering over countries
3. Try clicking on countries
4. Try zooming in/out
5. ✅ All should work

**Error Handling:**
1. Go to http://localhost:5173/share-profile
2. Try uploading file > 5MB
3. ✅ Should show error toast
4. Upload valid image (JPG/PNG < 5MB)
5. ✅ Should show success toast

**Profile Editing:**
1. Click **Edit Profile**
2. Change headline to "Senior Developer"
3. Click **Save**
4. ✅ Should show success toast
5. Refresh page
6. ✅ Changes should persist

**Done!** ✅

---

## ✅ Verification Checklist

After completing all steps, check:

- [ ] Supabase credentials updated
- [ ] RLS policies enabled
- [ ] Can sign up
- [ ] Can log in
- [ ] Dark mode works
- [ ] Map displays countries
- [ ] Error toasts show
- [ ] Profile editing works

---

## 🎉 You're Done!

Once all steps are complete:
1. ✅ Your app is production-ready
2. ✅ You can deploy to production
3. ✅ You can invite users to test

---

## 📚 Detailed Guides

If you need more help:
- **Step-by-step guide:** See `SETUP_GUIDE_STEP_BY_STEP.md`
- **Visual checklist:** See `SETUP_CHECKLIST_VISUAL.md`
- **Visual references:** See `SETUP_VISUAL_REFERENCES.md`
- **Troubleshooting:** See `PRODUCTION_READY_CHECKLIST.md`

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Dark mode not working | Clear localStorage: `localStorage.clear()` |
| Can't sign up | Check Supabase credentials |
| Can access dashboard without login | Clear localStorage and refresh |

---

## 📞 Need Help?

1. Check browser console (F12) for errors
2. Check terminal for error messages
3. Restart dev server (Ctrl+C, then `npm run dev`)
4. Hard refresh browser (Ctrl+Shift+R)
5. See detailed guides above

---

**Time Required:** 15 minutes  
**Difficulty:** Easy  
**Status:** Ready to Setup  
**Next Step:** Follow the 3 steps above
