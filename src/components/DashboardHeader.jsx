import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { runSearch } from '../data/searchData'
import { initialNotifications } from '../data/notificationsData'

const DashboardHeader = ({ onSearchChange }) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState({ jobs: [], countries: [] })
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const searchRef = useRef(null)

  // Notifications state
  const [notifications, setNotifications] = useState(initialNotifications)
  const [showNotifications, setShowNotifications] = useState(false)
  const notifRef = useRef(null)

  const unreadCount = notifications.filter(n => !n.read).length

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedDarkMode ? JSON.parse(savedDarkMode) : prefersDark
    setDarkMode(isDark)
    
    // Apply dark mode immediately on mount
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode))
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Real-time search
  const handleSearchChange = (e) => {
    const q = e.target.value
    setSearchQuery(q)
    if (q.trim().length > 1) {
      const results = runSearch(q)
      setSearchResults(results)
      setShowSuggestions(true)
    } else {
      setSearchResults({ jobs: [], countries: [] })
      setShowSuggestions(false)
    }
    // Bubble up to DashboardPage for map/job filtering
    if (onSearchChange) onSearchChange(q)
  }

  // Navigate to /search on Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setShowSuggestions(false)
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (type, item) => {
    setShowSuggestions(false)
    setSearchQuery(type === 'job' ? item.title : item.name)
    if (onSearchChange) onSearchChange(type === 'job' ? item.title : item.name)
    navigate(type === 'job' ? `/jobs` : `/search?q=${encodeURIComponent(item.name)}`)
  }

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const hasResults = searchResults.jobs.length > 0 || searchResults.countries.length > 0

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/dashboard" className="flex items-center gap-4 text-slate-900 dark:text-slate-100 group">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined">explore</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
            Global Skills Explorer
          </h2>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {[
            ['/dashboard', 'Dashboard', true],
            ['/career-path', 'Career Path', false],
            ['/insights', 'Insights', false],
            ['/certifications', 'Certifications', false],
            ['/jobs', 'Jobs', false],
            ['/settings', 'Settings', false],
          ].map(([to, label, end]) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `text-sm leading-normal transition-all duration-300 pb-1 ${
                  isActive
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-slate-600 dark:text-slate-400 font-medium hover:text-primary border-b-2 border-transparent'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex flex-1 justify-end gap-6 items-center">
        <Link
          to="/"
          className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
        >
          Back to Home
        </Link>

        {/* Search input */}
        <div ref={searchRef} className="hidden lg:flex flex-col min-w-40 h-10 max-w-64 relative">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-slate-400 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-slate-800 focus:ring-0 h-full placeholder:text-slate-400 px-4 rounded-r-lg text-base font-normal leading-normal transition-all hover:bg-slate-200 dark:hover:bg-slate-700"
              placeholder="Search skills or countries..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
            />
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && hasResults && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden max-h-72 overflow-y-auto">
              {searchResults.jobs.length > 0 && (
                <div>
                  <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800">Jobs</p>
                  {searchResults.jobs.slice(0, 4).map(job => (
                    <button
                      key={job.id}
                      onClick={() => handleSuggestionClick('job', job)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-[18px] text-blue-500">work</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{job.title}</p>
                        <p className="text-xs text-slate-500 truncate">{job.company} · {job.location}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {searchResults.countries.length > 0 && (
                <div>
                  <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800">Countries</p>
                  {searchResults.countries.slice(0, 3).map(country => (
                    <button
                      key={country.id}
                      onClick={() => handleSuggestionClick('country', country)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-[18px] text-emerald-500">public</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{country.name}</p>
                        <p className="text-xs text-slate-500 truncate">{country.skills.slice(0, 3).join(', ')} · {country.demand} demand</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => { setShowSuggestions(false); navigate(`/search?q=${encodeURIComponent(searchQuery)}`) }}
                className="w-full px-3 py-2.5 text-xs font-semibold text-primary hover:bg-primary/5 transition-colors text-left border-t border-slate-100 dark:border-slate-800"
              >
                See all results for "{searchQuery}" →
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotifications(prev => !prev)}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-300 hover:scale-110 relative"
            >
              <span className="material-symbols-outlined">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white px-0.5">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">{unreadCount}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-primary font-semibold hover:underline">
                        Mark all read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button onClick={clearAll} className="text-xs text-slate-400 hover:text-slate-600 font-semibold">
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Notification list */}
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">notifications_off</span>
                      <p className="text-sm font-semibold text-slate-500">All caught up</p>
                      <p className="text-xs text-slate-400 mt-0.5">No new notifications</p>
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <button
                        key={notif.id}
                        onClick={() => { markAsRead(notif.id); setShowNotifications(false); navigate(notif.link) }}
                        className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left border-b border-slate-50 dark:border-slate-800 last:border-0 ${!notif.read ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                      >
                        <div className={`${notif.iconBg} p-2 rounded-lg flex-shrink-0 mt-0.5`}>
                          <span className={`material-symbols-outlined text-[18px] ${notif.iconColor}`}>{notif.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{notif.title}</p>
                            {!notif.read && <span className="size-2 bg-primary rounded-full flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center size-10 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 border border-slate-200 dark:border-slate-700"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <Link to="/share-profile" className="bg-primary/20 rounded-full size-10 border-2 border-primary flex items-center justify-center overflow-hidden hover:scale-110 transition-transform duration-300">
            <img
              className="w-full h-full object-cover"
              alt="User profile avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHtMQz7FilryFDhBbe51K4RqgEC13dCKOJ2lZiWQmMb4L2-EVg9B3HFt0O9vl32r2kQ9GdbveOM3ewmFwcdTZZM93yAqy-yzRAhap1bB24rDiCt34H1SH1prIo6WR0EASVbbD6j3x-YudDau9jDYhC46iKNUl0hG9KYO5awkAu5_plDj-771m-qOvLOzbUF4NqfBwbh2qk8-RkGxtNJPirdFXwgP7ZKcwIO-by21M2H4Zg_wjvp3oS8Pn0R-7YtLX3I98VymG94guR"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
