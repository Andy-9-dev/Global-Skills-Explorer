# 🔐 SECURITY NOTICE

## Critical: API Keys Exposed

**Status:** ⚠️ IMMEDIATE ACTION REQUIRED

### What Happened
The `.env.local` file containing real Supabase and API credentials was previously committed to the repository. This means:
- Anyone with access to git history can see your Supabase credentials
- Your database could be accessed or modified by unauthorized users
- Your API quotas could be abused

### What You Must Do NOW

#### 1. Rotate All Exposed Keys
Go to your Supabase dashboard and:
- [ ] Generate a new Anon Key
- [ ] Regenerate any exposed API keys
- [ ] Review recent access logs for suspicious activity

#### 2. Update .env.local
Replace the old credentials with new ones:
```bash
VITE_SUPABASE_URL=https://your-new-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_new_anon_key_here
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

#### 3. Enable Row-Level Security (RLS)
In Supabase dashboard:
- [ ] Go to Authentication > Policies
- [ ] Enable RLS on all tables (profiles, certifications, etc.)
- [ ] Add policies to restrict access to user's own data only

#### 4. Review Supabase Logs
- [ ] Check for unauthorized access attempts
- [ ] Review all recent database modifications
- [ ] Check API usage for anomalies

### Prevention Going Forward

1. **Never commit .env.local** - It's in .gitignore
2. **Use .env.example** - For template only
3. **Rotate keys regularly** - Every 3-6 months
4. **Use environment-specific secrets** - Different keys for dev/staging/prod
5. **Enable audit logging** - Track all database access
6. **Use Supabase RLS** - Enforce data access policies

### For Production Deployment

- Use a secrets management service (AWS Secrets Manager, HashiCorp Vault, etc.)
- Never store secrets in code or environment files
- Use CI/CD pipeline to inject secrets at runtime
- Implement secret rotation policies
- Enable audit logging and monitoring

### Questions?

If you suspect unauthorized access:
1. Immediately rotate all keys
2. Review Supabase audit logs
3. Check for unauthorized data modifications
4. Contact Supabase support if needed

---

**Last Updated:** 2024
**Status:** CRITICAL - Action Required
