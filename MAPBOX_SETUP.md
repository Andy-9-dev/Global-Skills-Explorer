# Mapbox GL JS Setup Guide

## Overview
The dashboard now uses Mapbox GL JS for a professional, enterprise-grade interactive map with smooth zoom/pan controls, custom markers, and elegant UI.

## Installation

Mapbox GL JS has been installed via npm:
```bash
npm install mapbox-gl
```

## Configuration

### 1. Get Your Mapbox Token

1. Go to [mapbox.com](https://www.mapbox.com/)
2. Sign up for a free account
3. Navigate to your [Account Dashboard](https://account.mapbox.com/)
4. Go to "Tokens" section
5. Create a new token with the following scopes:
   - `styles:read`
   - `fonts:read`
   - `datasets:read`
   - `maps:read`

### 2. Add Token to Environment Variables

Create or update your `.env.local` file:

```env
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNsZXhhbXBsZSJ9.example
```

### 3. Update Component

The token is automatically loaded in `src/components/SkillsHeatmapMap.jsx`:

```javascript
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example'
```

## Features

### Map Styles
- **Light Mode**: `mapbox://styles/mapbox/light-v11`
- **Dark Mode**: `mapbox://styles/mapbox/dark-v11`
- Automatically switches based on system theme

### Custom Markers
- Circular demand indicators with glow effect
- Animated pulse rings for high-demand countries
- Smooth hover animations
- Color-coded by demand level:
  - 🔵 Blue: High Demand
  - 🟠 Amber: Growing
  - ⚫ Gray: Medium

### Interactive Features
- **Zoom Controls**: Glassmorphism-styled buttons
  - Zoom In (+)
  - Zoom Out (-)
  - Reset View (location icon)
- **Smooth Pan & Zoom**: Native Mapbox animations
- **Hover Tooltips**: Shows country, demand, salary, and top skills
- **Click to Explore**: Opens right-side sliding panel with detailed info

### Right-Side Panel
- Slides in smoothly from the right
- Shows country details:
  - Demand level with color indicator
  - Average salary
  - Top skills in demand
  - Active opportunities count
  - Market insights
- Action buttons:
  - View Jobs (navigates to jobs page)
  - Close panel
- Map remains visible and interactive

### Legend
- Positioned at bottom-left
- Shows demand level indicators
- Glassmorphism styling
- Responsive on all devices

### Zoom Controls
- Positioned at top-right
- Glassmorphism design with backdrop blur
- Smooth hover animations
- Keyboard accessible

## Styling

### Glassmorphism Design
All UI elements use modern glassmorphism:
- `backdrop-blur-md` for frosted glass effect
- `bg-white/40` or `bg-slate-800/40` for transparency
- `border-white/60` for subtle borders
- Works in both light and dark modes

### Color Scheme
- **Primary**: `#13c8ec` (Cyan blue)
- **Growing**: `#f59e0b` (Amber)
- **Medium**: `#94a3b8` (Slate)
- **Background**: Adapts to light/dark mode

### Animations
- Smooth 300ms transitions
- Pulse animation for high-demand markers
- Scale animations on hover
- Slide-in animation for side panel

## Performance

### Optimizations
- Efficient marker rendering
- GPU-accelerated CSS transforms
- Minimal re-renders
- Lazy loading of map data
- Responsive image handling

### Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support with touch controls

## Customization

### Change Map Style
Edit `src/components/SkillsHeatmapMap.jsx`:

```javascript
style: `mapbox://styles/mapbox/satellite-v9` // or other Mapbox styles
```

### Adjust Marker Size
Modify the marker CSS in the component:

```javascript
.marker-dot {
  width: 32px;  // Change size
  height: 32px;
}
```

### Change Zoom Levels
Update zoom constraints:

```javascript
zoom: 2,  // Initial zoom
minZoom: 1,  // Minimum zoom
maxZoom: 18  // Maximum zoom
```

## Troubleshooting

### Map Not Showing
1. Check Mapbox token is set correctly
2. Verify token has required scopes
3. Check browser console for errors
4. Ensure `.env.local` is loaded

### Markers Not Appearing
1. Verify country coordinates are correct
2. Check marker CSS is loaded
3. Ensure countryData is passed to component

### Performance Issues
1. Reduce number of markers
2. Disable animations on low-end devices
3. Use lighter map style
4. Check browser DevTools for bottlenecks

### Dark Mode Not Working
1. Verify dark mode class is applied to `<html>`
2. Check MutationObserver is working
3. Ensure CSS variables are defined

## API Reference

### SkillsHeatmapMap Component

```javascript
<SkillsHeatmapMap 
  countryData={countryData}
  onCountrySelect={handleCountryClick}
/>
```

**Props:**
- `countryData` (object): Country data with coordinates
- `onCountrySelect` (function): Callback when country is selected

### CountryInfoPanel Component

```javascript
<CountryInfoPanel 
  country={selectedCountry}
  countryData={countryData}
  isOpen={panelOpen}
  onClose={handlePanelClose}
  onViewJobs={handleViewJobs}
/>
```

**Props:**
- `country` (string): Selected country code
- `countryData` (object): Country data
- `isOpen` (boolean): Panel visibility
- `onClose` (function): Close callback
- `onViewJobs` (function): View jobs callback

## Data Structure

### Country Data Format

```javascript
{
  US: {
    name: 'United States',
    flag: '🇺🇸',
    demand: 'High',
    salary: '$145k',
    skills: ['React', 'Python', 'AWS'],
    jobs: 1248,
    lat: 37.0902,
    lng: -95.7129
  }
}
```

## Future Enhancements

1. **Search & Filter**: Filter countries by demand level
2. **Animated Transitions**: Smooth zoom to selected country
3. **Heatmap Overlay**: Show salary/job density as color intensity
4. **Export**: Download map as image
5. **Bookmarks**: Save favorite countries
6. **Comparison**: Compare multiple countries side-by-side
7. **Real-time Data**: Live job count updates
8. **Advanced Analytics**: Trend analysis and predictions

## Support

For issues or questions:
1. Check [Mapbox Documentation](https://docs.mapbox.com/)
2. Review component code comments
3. Check browser console for errors
4. Verify environment variables are set

---

The map is now production-ready with enterprise-grade design and functionality!