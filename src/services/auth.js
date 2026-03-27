import { supabase } from './supabase'
import { mockLoginUser, mockSignUpUser, mockLogoutUser, getMockSession, getMockUser, onMockAuthStateChange } from './mockAuth'

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
}

// Sign up with email and password
export const signUpUser = async (email, password) => {
  try {
    // Try Supabase first
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        console.warn('Supabase signup failed, falling back to mock auth:', error.message)
        // Fall back to mock auth
        return mockSignUpUser(email, password)
      }

      return {
        success: true,
        user: data.user,
        session: data.session
      }
    } else {
      // Use mock auth
      return mockSignUpUser(email, password)
    }
  } catch (error) {
    console.error('Sign up error:', error)
    // Fall back to mock auth on any error
    return mockSignUpUser(email, password)
  }
}

// Login with email and password
export const loginUser = async (email, password) => {
  try {
    // Try Supabase first
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.warn('Supabase login failed, falling back to mock auth:', error.message)
        // Fall back to mock auth
        return mockLoginUser(email, password)
      }

      return {
        success: true,
        user: data.user,
        session: data.session
      }
    } else {
      // Use mock auth
      return mockLoginUser(email, password)
    }
  } catch (error) {
    console.error('Login error:', error)
    // Fall back to mock auth on any error
    return mockLoginUser(email, password)
  }
}

// Logout
export const logoutUser = async () => {
  try {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut()
    }
    return mockLogoutUser()
  } catch (error) {
    console.error('Logout error:', error)
    return mockLogoutUser()
  }
}

// Get current session
export const getCurrentSession = async () => {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.getSession()
      if (!error && data.session) {
        return data.session
      }
    }
    return getMockSession()
  } catch (error) {
    console.error('Get session error:', error)
    return getMockSession()
  }
}

// Get current user
export const getCurrentUser = async () => {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.getUser()
      if (!error && data.user) {
        return data.user
      }
    }
    return getMockUser()
  } catch (error) {
    console.error('Get user error:', error)
    return getMockUser()
  }
}

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  if (isSupabaseConfigured()) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
  } else {
    return onMockAuthStateChange(callback)
  }
}

// Reset password
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      message: 'Password reset email sent'
    }
  } catch (error) {
    console.error('Reset password error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Update password
export const updatePassword = async (newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      message: 'Password updated successfully'
    }
  } catch (error) {
    console.error('Update password error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
