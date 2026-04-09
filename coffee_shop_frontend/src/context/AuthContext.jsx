import React, { createContext, useCallback, useContext, useEffect,  useMemo,  useState} from 'react'
import authenticationService from '../services/authentication.service'
import { getUserProfile } from '../services/user.service'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔥 INIT AUTH (khi load app)
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken')

        if (!token) {
          setLoading(false)
          return
        }

        setAccessToken(token)

        // 👉 Lấy profile user
        const res = await getUserProfile()

        if (res?.user) {
          setUser(res.user)
        } else {
          throw new Error('Invalid token')
        }

      } catch (error) {
        console.log('Auth error:', error)

        // ❌ Token lỗi → clear
        localStorage.removeItem('accessToken')
        localStorage.removeItem('cart')

        setUser(null)
        setAccessToken(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  // 🔐 LOGIN
  const login = useCallback(async (credentials) => {
    const res = await authenticationService.login(credentials)

    const token = res?.accessToken || res?.token

    if (!token) throw new Error('Login failed')

    // lưu token
    localStorage.setItem('accessToken', token)
    setAccessToken(token)

    // lấy user
    try {
      const profile = await getUserProfile()
      if (profile?.user) {
        setUser(profile.user)
      }
    } catch (err) {
      console.log('Fetch profile failed:', err)
      if (res?.user) setUser(res.user)
    }

    return res
  }, [])

  // 🚪 LOGOUT
  const logout = useCallback(() => {
    try {
      // clear local data
      localStorage.removeItem('accessToken')
      localStorage.removeItem('cart') // 🛒 cart của cafe
      localStorage.removeItem('voucher')
    } catch (err) {
      console.error('Logout error:', err)
    }

    setUser(null)
    setAccessToken(null)
  }, [])

  // 🧠 CHECK ROLE
  const isAdmin = user?.role === 'admin'
  const isStaff = user?.role === 'staff'

  // 📦 CONTEXT VALUE
  const value = useMemo(() => ({
    user,
    accessToken,
    loading,

    isAuthenticated: !!accessToken,
    isAdmin,
    isStaff,

    login,
    logout,
    setUser
  }), [user, accessToken, loading, login, logout])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// 🔥 HOOK
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export default AuthContext