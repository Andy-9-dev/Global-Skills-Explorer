import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-slate-200 dark:border-slate-800 border-t-primary rounded-full animate-spin" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ redirectTo: location.pathname }} replace />
  }

  return children
}

export default ProtectedRoute
