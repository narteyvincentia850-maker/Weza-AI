import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useToast } from '../lib/ToastContext'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const { addToast } = useToast()

  async function handleReset() {
    if (!email.trim()) { setError('Email is required'); return }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email'); return }
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })
      if (error) {
        addToast(error.message || 'Failed to send reset email.')
      } else {
        setSent(true)
      }
    } catch {
      addToast('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg mb-3">
            <span className="text-white font-black text-2xl">W</span>
          </div>
          <h1 className="font-black text-2xl text-gray-900">Reset Password</h1>
          <p className="text-gray-500 text-sm mt-1">We'll send a reset link to your email</p>
        </div>

        {sent ? (
          <div className="card text-center space-y-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg width="24" height="24" fill="none" stroke="#16a34a" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <p className="font-bold text-gray-800">Reset link sent!</p>
            <p className="text-sm text-gray-500">Check your email for a password reset link.</p>
            <Link to="/login" className="text-primary font-semibold text-sm hover:underline block">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <div className="card space-y-4">
            <div>
              <label className="label">Email address</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleReset()}
              />
              {error && <p className="error-text">{error}</p>}
            </div>

            <button onClick={handleReset} disabled={loading} className="btn-primary w-full">
              {loading ? <><div className="spinner"></div> Sending...</> : 'Send Reset Link'}
            </button>

            <Link to="/login" className="text-center text-sm text-gray-500 hover:text-primary block">
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
