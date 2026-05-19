import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useToast } from '../lib/ToastContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { addToast } = useToast()

  function validate() {
    const e = {}
    if (!email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    return e
  }

  async function handleLogin() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        addToast(error.message || 'Login failed. Check your credentials.')
      } else {
        navigate('/dashboard')
      }
    } catch {
      addToast('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg mb-3">
            <span className="text-white font-black text-2xl">W</span>
          </div>
          <h1 className="font-black text-2xl text-gray-900">Weza AI</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="card space-y-4">
          <div>
            <label className="label">Email address</label>
            <input
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="current-password"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="text-right">
            <Link to="/reset-password" className="text-xs text-primary font-semibold hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? <><div className="spinner"></div> Signing in...</> : 'Sign In'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-semibold hover:underline">
            Start free trial
          </Link>
        </p>
      </div>
    </div>
  )
}
