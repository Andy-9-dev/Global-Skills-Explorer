import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Header = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedDarkMode ? JSON.parse(savedDarkMode) : prefersDark
    
    setDarkMode(isDark)
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

  const handleAuthGatedLink = (targetRoute) => {
    if (isAuthenticated) {
      navigate(targetRoute)
    } else {
      navigate('/auth/login', { state: { redirectTo: targetRoute } })
    }
  }

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 lg:px-40 py-4 bg-white dark:bg-background-dark sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 transition-all">
      <Link to="/" className="flex items-center gap-4">
        <div className="text-primary size-8 transform hover:scale-110 hover:rotate-12 transition-all duration-300">
          <span className="material-symbols-outlined text-4xl">language</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
          Global Skills Explorer
        </h2>
      </Link>
      
      <div className="flex flex-1 justify-end gap-8 items-center">
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleAuthGatedLink('/dashboard')}
            className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-all duration-300 relative group bg-none border-none cursor-pointer" 
          >
            Explorer
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => navigate('/job-discovery')}
            className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-all duration-300 relative group bg-none border-none cursor-pointer" 
          >
            Job Map
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => handleAuthGatedLink('/skill-assessments')}
            className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-all duration-300 relative group bg-none border-none cursor-pointer" 
          >
            Insights
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => handleAuthGatedLink('/insights/salary')}
            className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-all duration-300 relative group bg-none border-none cursor-pointer" 
          >
            Salary
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <Link 
            to="/about"
            className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-all duration-300 relative group" 
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

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
        
        <Link 
          to="/auth/login"
          className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-slate-900 text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
        >
          <span>Get Started</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
