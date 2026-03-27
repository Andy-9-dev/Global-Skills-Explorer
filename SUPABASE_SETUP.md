# Supabase Authentication Setup Guide

## Overview
This project uses Supabase for email/password authentication. Protected routes include:
- `/insights` - Insights Hub
- `/insights/salary` - Salary Insights
- `/certifications` - Certifications Page

## Prerequisites
- Supabase account (free tier available at https://supabase.com)
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign up/log in
2. Click "New Project"
3. Fill in project details:
   - **Name**: Global Skills Explorer (or your choice)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
4. Wait for project to initialize (2-3 minutes)

## Step 2: Get Your Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (under "Project URL")
   - **Anon Key** (under "Project API keys" → "anon")

## Step 3: Configure Environment Variables

1. Open `.env.local` in your project root
2. Update these values:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
3. Save the file

## Step 4: Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find "Email" provider
3. Ensure it's enabled (toggle should be ON)
4. Click "Email" to configure:
   - **Confirm email**: Toggle ON (recommended for production)
   - **Double confirm changes**: Toggle ON (recommended)
5. Save changes

## Step 5: Test Authentication

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:5173

3. Try these flows:
   - **Sign Up**: Click "Sign Up" tab, enter email/password, create account
   - **Login**: Use the credentials you just created
   - **Protected Routes**: After login, access `/insights`, `/insights/salary`, `/certifications`
   - **Logout**: Click profile → logout (when implemented)

## How It Works

### Public Routes (No Login Required)
- `/` - Landing page
- `/dashboard` - Dashboard
- `/career-path` - Career path
- `/jobs` - Job listings
- `/about` - About page
- `/auth/login` - Login page

### Protected Routes (Login Required)
- `/insights` - Redirects to login if not authenticated
- `/insights/salary` - Redirects to login if not authenticated
- `/certifications` - Redirects to login if not authenticated

### Authentication Flow
1. User clicks protected route
2. `ProtectedRoute` component checks `useAuth()` hook
3. If not authenticated, redirects to `/auth/login` with `redirectTo` state
4. After successful login, user is redirected back to original page

## File Structure

```
src/
├── services/
│   ├── supabase.js          # Supabase client initialization
│   └── auth.js              # Authentication functions
├── hooks/
│   └── useAuth.js           # Auth state management hook
├── components/
│   └── ProtectedRoute.jsx   # Route protection wrapper
└── pages/
    └── LoginPage.jsx        # Login/signup page
```

## Key Functions

### `useAuth()` Hook
Returns auth state and methods:
```javascript
const { user, session, loading, isAuthenticated, logout } = useAuth()
```

### `loginUser(email, password)`
Authenticates user with email/password

### `signUpUser(email, password)`
Creates new user account

### `logoutUser()`
Signs out current user

### `getCurrentUser()`
Gets current authenticated user

### `onAuthStateChange(callback)`
Listens to auth state changes

## Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart dev server after updating `.env.local`

### Login fails with "Invalid credentials"
- Verify email/password are correct
- Check email is confirmed (if email confirmation is enabled)
- Ensure user exists in Supabase dashboard

### Protected routes redirect to login
- This is expected behavior if not authenticated
- Login first, then access protected routes

### Session persists after logout
- Clear browser localStorage
- Check browser DevTools → Application → Cookies

## Production Deployment

Before deploying to production:

1. **Enable Email Confirmation**
   - Go to Authentication → Providers → Email
   - Toggle "Confirm email" ON
   - Set up email templates

2. **Configure Redirect URLs**
   - Go to Authentication → URL Configuration
   - Add your production domain to "Redirect URLs"
   - Example: `https://yourdomain.com/auth/callback`

3. **Update Environment Variables**
   - Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in production environment

4. **Enable RLS (Row Level Security)**
   - Go to SQL Editor
   - Run security policies for any custom tables

## Security Notes

- Never commit `.env.local` to version control
- Anon key is safe to expose (it's public)
- Session tokens are stored in browser localStorage
- Always use HTTPS in production
- Implement rate limiting for login attempts (future enhancement)

## Next Steps

- Add password reset functionality
- Implement OAuth providers (Google, GitHub, etc.)
- Add user profile management
- Set up email templates for confirmations
- Implement 2FA (two-factor authentication)

## Support

For issues or questions:
- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Project Issues: Check GitHub issues
