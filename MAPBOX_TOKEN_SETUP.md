# Mapbox Token Setup - Quick Guide

## Get Your Free Mapbox Token

### Step 1: Create Mapbox Account
1. Go to https://www.mapbox.com/
2. Click "Sign up"
3. Create account with email or GitHub

### Step 2: Generate Access Token
1. Log in to https://account.mapbox.com/
2. Go to "Tokens" section (left sidebar)
3. Click "Create a token"
4. Name it: `Career Platform Dev`
5. Enable these scopes:
   - ✅ `styles:read`
   - ✅ `fonts:read`
   - ✅ `datasets:read`
   - ✅ `maps:read`
6. Click "Create token"
7. Copy the token (starts with `pk.eyJ...`)

### Step 3: Add to Environment
Create or update `.env.local` in project root:

```env
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNsZXhhbXBsZSJ9.example
```

Replace `pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNsZXhhbXBsZSJ9.example` with your actual token.

### Step 4: Restart Development Server
```bash
npm run dev
```

The map should now load with the Mapbox basemap showing continents, oceans, and country borders.

## Verify It's Working

1. Open http://localhost:5173
2. Navigate to Dashboard page
3. You should see:
   - ✅ A dark world map with geographic features
   - ✅ Colored circles at country locations
   - ✅ Zoom controls (bottom-right)
   - ✅ Legend (bottom-left)
   - ✅ Ability to scroll/zoom/pan
   - ✅ Hover tooltips on markers
   - ✅ Click to focus on countries

## Troubleshooting

### "Map is not defined" or blank map
- Check `.env.local` has correct token
- Verify token starts with `pk.eyJ`
- Restart dev server after adding token
- Check browser console for errors

### "Mapbox GL JS not loaded"
- Verify `npm install mapbox-gl` was successful
- Check `node_modules/mapbox-gl` exists
- Clear node_modules and reinstall if needed

### Map shows but no basemap
- Token might not have `styles:read` scope
- Regenerate token with correct scopes
- Check token is not expired

### Markers not showing
- Verify country coordinates are correct
- Check GeoJSON data is valid
- Ensure map has loaded before adding layers
- Check browser DevTools for layer visibility

## Free Tier Limits

Mapbox free tier includes:
- ✅ 50,000 map views/month
- ✅ All map styles
- ✅ Unlimited markers/layers
- ✅ Full API access
- ✅ Perfect for development

This is more than enough for development and testing.

## Production Deployment

For production:
1. Use environment variables in your hosting platform
2. Set `VITE_MAPBOX_TOKEN` in deployment settings
3. Consider upgrading to paid plan if exceeding free tier limits
4. Monitor usage in Mapbox dashboard

## Support

- Mapbox Docs: https://docs.mapbox.com/
- Mapbox Support: https://support.mapbox.com/
- GitHub Issues: https://github.com/mapbox/mapbox-gl-js/issues

---

Once token is set up, the Global Talent Map is ready to use!