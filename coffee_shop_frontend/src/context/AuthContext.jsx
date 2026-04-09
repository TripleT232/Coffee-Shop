import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // ===== Load user từ localStorage =====
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const parsed = JSON.parse(storedUser)

        // normalize role
        parsed.role = parsed.role?.toUpperCase?.()

        setUser(parsed)
      }
    } catch (e) {
      console.error('Parse user error', e)
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== LOGIN =====
  const login = (userData, token) => {
    const normalizedUser = {
      ...userData,
      role: userData.role?.toUpperCase?.()
    }

    localStorage.setItem('user', JSON.stringify(normalizedUser))
    localStorage.setItem('accessToken', token)

    setUser(normalizedUser)
  }

  // ===== LOGOUT =====
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ===== Hook =====
export const useAuth = () => useContext(AuthContext)