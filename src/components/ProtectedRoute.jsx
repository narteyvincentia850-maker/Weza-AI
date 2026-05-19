import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" style={{ borderWidth: '3px' }}></div>
          <p className="text-gray-500 text-sm">Loading Weza AI...</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return children
}
