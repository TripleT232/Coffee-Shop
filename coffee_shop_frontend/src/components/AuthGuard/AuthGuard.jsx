import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AuthGuard({ roles = [] }) {
  const { user, isAuthenticated } = useAuth()

  // ❌ chưa login → đá về login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace />
  }

  // ❌ không đúng role → 403
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />
  }

  return <Outlet />
}

export default AuthGuard