import bcryptjs from "bcryptjs"

const MOCK_USERS_KEY = "mock_users"
const MOCK_SESSION_KEY = "mock_session"

const getMockUsers = () => {
  const users = localStorage.getItem(MOCK_USERS_KEY)
  return users ? JSON.parse(users) : {}
}

const saveMockUsers = (users) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
}

export const mockSignUpUser = async (email, password) => {
  try {
    const users = getMockUsers()

    if (users[email]) {
      return {
        success: false,
        error: "User already exists"
      }
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password: hashedPassword,
      created_at: new Date().toISOString()
    }

    users[email] = newUser
    saveMockUsers(users)

    const session = {
      user: {
        id: newUser.id,
        email: newUser.email
      },
      access_token: Math.random().toString(36).substr(2),
      expires_at: Date.now() + 24 * 60 * 60 * 1000
    }

    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session))

    return {
      success: true,
      user: session.user,
      session
    }
  } catch (error) {
    console.error("Mock signup error:", error)
    return {
      success: false,
      error: error.message || "Failed to sign up"
    }
  }
}

export const mockLoginUser = async (email, password) => {
  try {
    const users = getMockUsers()

    const user = users[email]
    if (!user) {
      return {
        success: false,
        error: "User not found"
      }
    }

    const passwordMatch = await bcryptjs.compare(password, user.password)
    if (!passwordMatch) {
      return {
        success: false,
        error: "Invalid password"
      }
    }

    const session = {
      user: {
        id: user.id,
        email: user.email
      },
      access_token: Math.random().toString(36).substr(2),
      expires_at: Date.now() + 24 * 60 * 60 * 1000
    }

    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session))

    return {
      success: true,
      user: session.user,
      session
    }
  } catch (error) {
    console.error("Mock login error:", error)
    return {
      success: false,
      error: error.message || "Failed to login"
    }
  }
}

export const mockLogoutUser = async () => {
  try {
    localStorage.removeItem(MOCK_SESSION_KEY)
    return true
  } catch (error) {
    console.error("Mock logout error:", error)
    return false
  }
}

export const getMockSession = async () => {
  try {
    const session = localStorage.getItem(MOCK_SESSION_KEY)
    if (!session) return null

    const parsed = JSON.parse(session)

    if (parsed.expires_at < Date.now()) {
      localStorage.removeItem(MOCK_SESSION_KEY)
      return null
    }

    return parsed
  } catch (error) {
    console.error("Get mock session error:", error)
    return null
  }
}

export const getMockUser = async () => {
  try {
    const session = await getMockSession()
    return session?.user || null
  } catch (error) {
    console.error("Get mock user error:", error)
    return null
  }
}

export const onMockAuthStateChange = (callback) => {
  getMockSession().then(session => {
    callback("INITIAL_SESSION", session)
  })

  const handleStorageChange = (e) => {
    if (e.key === MOCK_SESSION_KEY) {
      const session = e.newValue ? JSON.parse(e.newValue) : null
      callback("SIGNED_IN", session)
    }
  }

  window.addEventListener("storage", handleStorageChange)

  return {
    unsubscribe: () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }
}
