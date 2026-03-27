import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { onAuthStateChange, logoutUser, getCurrentSession } from '../services/auth'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      try {
        const currentSession = await getCurrentSession()
        setSession(currentSession)
        setUser(currentSession?.user || null)
      } catch (err) {
        console.error('Error checking session:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen to auth state changes
    const subscription = onAuthStateChange((event, authSession) => {
      setSession(authSession)
      setUser(authSession?.user || null)
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe?.()
    }
  }, [])

  const logout = async () => {
    setLoading(true)
    try {
      await logoutUser()
      setUser(null)
      setSession(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated: !!user,
    logout
  }
}

export default useAuth
