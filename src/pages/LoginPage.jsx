import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginUser, signUpUser } from '../services/auth'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Get redirect target from location state
  const redirectTo = location.state?.redirectTo || '/dashboard'

  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Password validation (minimum 6 characters)
  const validatePassword = (password) => {
    return password.length >= 6
  }

  // Check if form is valid
  const isFormValid = () => {
    if (!validateEmail(formData.email) || !validatePassword(formData.password)) {
      return false
    }
    if (activeTab === 'signup' && formData.password !== formData.confirmPassword) {
      return false
    }
    return true
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate
    const newErrors = {}
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (activeTab === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      let response
      if (activeTab === 'login') {
        response = await loginUser(formData.email, formData.password)
      } else {
        response = await signUpUser(formData.email, formData.password)
      }

      if (response.success) {
        // Check if session exists (user is logged in)
        if (response.session) {
          // Redirect to target page
          navigate(redirectTo)
        } else {
          // Email confirmation required
          setErrors({ general: 'Check your email to confirm your account before logging in.' })
        }
      } else {
        setErrors({ general: response.error || 'Authentication failed. Please try again.' })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ general: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-shadow duration-300">

        {/* Hero Section in Card */}
        <div className="p-8 pb-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
              {activeTab === 'login'
                ? 'Connect with global opportunities today.'
                : 'Start your journey to global career success.'}
            </p>
          </div>
        </div>

        {/* Toggle Tabs */}
        <div className="px-8">
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8">
            <button
              onClick={() => {
                setActiveTab('login')
                setErrors({})
              }}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 transition-all duration-300 ${
                activeTab === 'login'
                  ? 'border-primary text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-primary'
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Login</p>
            </button>
            <button
              onClick={() => {
                setActiveTab('signup')
                setErrors({})
              }}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'border-primary text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-primary'
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Sign Up</p>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Error Message */}
          {errors.general && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
            </div>
          )}

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input flex w-full rounded-lg text-slate-900 dark:text-white dark:bg-slate-800 border ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500/50'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-primary/50 focus:border-primary'
              } focus:ring-2 h-12 placeholder:text-slate-400 p-4 text-base font-normal transition-all hover:border-primary/50`}
              placeholder="name@company.com"
            />
            {errors.email && (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal">
              Password
            </label>
            <div className="relative flex w-full items-stretch">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input flex w-full rounded-lg text-slate-900 dark:text-white dark:bg-slate-800 border ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-primary/50 focus:border-primary'
                } focus:ring-2 h-12 placeholder:text-slate-400 p-4 pr-12 text-base font-normal transition-all hover:border-primary/50`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field (Sign Up Only) */}
          {activeTab === 'signup' && (
            <div className="flex flex-col gap-2">
              <label className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`form-input flex w-full rounded-lg text-slate-900 dark:text-white dark:bg-slate-800 border ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-primary/50 focus:border-primary'
                } focus:ring-2 h-12 placeholder:text-slate-400 p-4 text-base font-normal transition-all hover:border-primary/50`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={!isFormValid() || isLoading}
            className={`w-full font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              isFormValid() && !isLoading
                ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/20 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95'
                : 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{isLoading ? 'Signing In...' : activeTab === 'login' ? 'Sign In' : 'Create Account'}</span>
            {!isLoading && (
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="px-8 pb-8 space-y-4">
          <div className="text-center">
            <p className="text-slate-500 text-xs">
              By signing in, you agree to our{' '}
              <a className="text-primary hover:underline transition-colors" href="/terms">
                Terms of Service
              </a>{' '}
              and{' '}
              <a className="text-primary hover:underline transition-colors" href="/privacy">
                Privacy Policy
              </a>.
            </p>
          </div>

          {/* Skip Login Button */}
          <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-all duration-300 group bg-none border-none cursor-pointer"
            >
              <span>Back to Home</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
