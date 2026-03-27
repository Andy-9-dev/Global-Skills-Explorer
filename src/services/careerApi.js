// Career Path API Service
// Handles API calls for career path data, skill gaps, and course recommendations

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com'

// Helper to get auth token if available
const getAuthToken = () => {
  return localStorage.getItem('authToken') || null
}

// Helper to build headers with optional auth
const buildHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  }
  
  const token = getAuthToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}

// Fetch career path data for the current user
export const fetchCareerPath = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/career/path`, {
      method: 'GET',
      headers: buildHeaders(),
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch career path')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching career path:', error)
    return null
  }
}

// Fetch skill gaps for the current milestone
export const fetchSkillGaps = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/career/skill-gaps`, {
      method: 'GET',
      headers: buildHeaders(),
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch skill gaps')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching skill gaps:', error)
    return []
  }
}

// Fetch recommended courses based on career goals
export const fetchRecommendedCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/career/recommended-courses`, {
      method: 'GET',
      headers: buildHeaders(),
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommended courses')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching recommended courses:', error)
    return []
  }
}

// Update active career target
export const setActiveTarget = async (targetId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/career/active-target`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({ targetId }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to set active target')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error setting active target:', error)
    throw error
  }
}

// Generate and download career path PDF
export const downloadCareerPathPDF = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/career/download-pdf`, {
      method: 'GET',
      headers: buildHeaders(),
    })
    
    if (!response.ok) {
      throw new Error('Failed to download PDF')
    }
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'career-path.pdf'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    console.error('Error downloading PDF:', error)
    throw error
  }
}
