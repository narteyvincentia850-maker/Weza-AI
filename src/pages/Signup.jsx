import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useToast } from '../lib/ToastContext'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { addToast } = useToast()

  function validate() {
    const e = {}
    if (!email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    else if (password.length < 6) e.password = 'Password must be at least 6 characters'
    if (!confirm) e.confirm = 'Please confirm your password'
    else if (confirm !== password) e.confirm = 'Passwords do not match'
    return e
  }

  async function handleSignup() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        addToast(error.message || 'Signup failed. Please try again.')
      } else {
        addToast('Account created! Please check your email to confirm, then sign in.', 'success')
        navigate('/login')
      }
    } catch {
      addToast('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSignup()
  }

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg mb-3">
            <span className="text-white font-black text-2xl">W</span>
          </div>
          <h1 className="font-black text-2xl text-gray-900">Start Free Trial</h1>
          <p className="text-gray-500 text-sm mt-1">14 days free — no credit card required</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {['AI WhatsApp Agents', 'Easy Setup', 'Cancel Anytime'].map(b => (
            <div key={b} className="text-center">
              <div className="w-2 h-2 rounded-full bg-accent mx-auto mb-1"></div>
              <p className="text-xs text-gray-500 font-medium">{b}</p>
            </div>
          ))}
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
              placeholder="At least 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="new-password"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div>
            <label className="label">Confirm password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Repeat your password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="new-password"
            />
            {errors.confirm && <p className="error-text">{errors.confirm}</p>}
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? <><div className="spinner"></div> Creating account...</> : 'Create Free Account'}
          </button>

          <p className="text-center text-xs text-gray-400">
            By signing up you agree to our Terms of Service
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
