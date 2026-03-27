import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { getProfile, updateProfile, uploadAvatar, initializeProfile } from '../services/profileApi'

export const useProfile = () => {
  const { user, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const result = await getProfile(user.id)
        if (result.success) {
          setProfile(result.data)
        } else {
          const initResult = await initializeProfile(user)
          if (initResult.success) {
            setProfile(initResult.data)
          } else {
            setError(initResult.error)
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchProfile()
    }
  }, [user, authLoading])

  const handleUpdateProfile = async (updates) => {
    if (!user) {
      return { success: false, error: 'No user logged in' }
    }

    try {
      const result = await updateProfile(user.id, updates)
      if (result.success) {
        setProfile(result.data)
      } else {
        setError(result.error)
      }
      return result
    } catch (err) {
      console.error('Error updating profile:', err)
      return { success: false, error: err.message }
    }
  }

  const handleUploadAvatar = async (file) => {
    if (!user) {
      return { success: false, error: 'No user logged in' }
    }

    try {
      const result = await uploadAvatar(user.id, file)
      if (result.success) {
        setProfile(prev => ({
          ...prev,
          avatar_url: result.data.avatar_url
        }))
      } else {
        setError(result.error)
      }
      return result
    } catch (err) {
      console.error('Error uploading avatar:', err)
      return { success: false, error: err.message }
    }
  }

  return {
    profile,
    user,
    loading: authLoading || loading,
    error,
    updateProfile: handleUpdateProfile,
    uploadAvatar: handleUploadAvatar
  }
}
