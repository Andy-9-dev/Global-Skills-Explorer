import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Footer = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleAuthGatedLink = (targetRoute) => {
    if (isAuthenticated) {
      navigate(targetRoute)
    } else {
      navigate('/auth/login', { state: { redirectTo: targetRoute } })
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Global Skills Explorer',
          text: 'Master the global job market with data-driven career intelligence',
          url: window.location.origin
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.origin)
        setToastMessage('URL copied to clipboard!')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Share error:', error)
      }
    }
  }

  const handlePublicLink = () => {
    window.open(window.location.origin, '_blank')
  }

  return (
    <>
      <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-6 md:px-20 lg:px-40 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                language
              </span>
              <span className="font-bold text-xl group-hover:text-primary transition-colors">Explorer</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering the next generation of global talent through data-driven career insights.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-slate-900 dark:text-white">Product</h4>
            <button 
              onClick={() => handleAuthGatedLink('/career-path')}
              className="text-slate-500 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 bg-none border-none cursor-pointer text-left"
            >
              Career Map
            </button>
            <button 
              onClick={() => handleAuthGatedLink('/insights/salary')}
              className="text-slate-500 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 bg-none border-none cursor-pointer text-left"
            >
              Salary Data
            </button>
            <button 
              onClick={() => handleAuthGatedLink('/skill-assessments')}
              className="text-slate-500 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 bg-none border-none cursor-pointer text-left"
            >
              Skill Graph
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-slate-900 dark:text-white">Company</h4>
            <button 
              onClick={() => navigate('/about')}
              className="text-slate-500 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 bg-none border-none cursor-pointer text-left"
            >
              About Us
            </button>
            <button 
              onClick={() => navigate('/careers')}
              className="text-slate-500 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 bg-none border-none cursor-pointer text-left"
            >
              Careers
            </button>
            <button 
              onClick={() => navigate('/privacy')}
              className="text-slate-500 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 bg-none border-none cursor-pointer text-left"
            >
              Privacy
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-slate-900 dark:text-white">Social</h4>
            <div className="flex gap-4">
              <button 
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:scale-110 hover:rotate-12 transition-all duration-300 border-none cursor-pointer" 
              >
                <span className="material-symbols-outlined">share</span>
              </button>
              <button 
                onClick={handlePublicLink}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:scale-110 hover:rotate-12 transition-all duration-300 border-none cursor-pointer" 
              >
                <span className="material-symbols-outlined">public</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
          <p>© 2024 Global Skills Explorer. All rights reserved.</p>
          <div className="flex gap-8">
            <button 
              onClick={() => navigate('/terms')}
              className="hover:text-primary transition-colors bg-none border-none cursor-pointer"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => navigate('/cookie-policy')}
              className="hover:text-primary transition-colors bg-none border-none cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer
