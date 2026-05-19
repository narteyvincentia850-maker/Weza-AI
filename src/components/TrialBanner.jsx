import { useAuth } from '../lib/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function TrialBanner() {
  const { profile, getTrialDaysLeft } = useAuth()
  const navigate = useNavigate()

  if (!profile) return null
  if (profile.subscription_status === 'active') return null

  const daysLeft = getTrialDaysLeft()
  if (daysLeft <= 0) {
    return (
      <div className="rounded-xl px-4 py-3 mb-5 bg-red-600 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="font-bold text-sm">Your free trial has ended</p>
          <p className="text-xs opacity-90">Subscribe to keep creating and managing agents</p>
        </div>
        <button
          onClick={() => navigate('/account')}
          className="bg-white text-red-600 font-bold text-xs px-4 py-2 rounded-lg whitespace-nowrap hover:bg-red-50 transition-colors"
        >
          Subscribe — GHS 199/mo
        </button>
      </div>
    )
  }

  const isUrgent = daysLeft <= 5

  return (
    <div className={`rounded-xl px-4 py-3 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${
      isUrgent ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
    }`}>
      <div>
        <p className={`font-bold text-sm ${isUrgent ? 'text-red-700' : 'text-yellow-800'}`}>
          {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left in your free trial
        </p>
        <p className={`text-xs ${isUrgent ? 'text-red-600' : 'text-yellow-700'}`}>
          {isUrgent ? 'Subscribe now to avoid losing access to your agents' : 'Enjoying Weza AI? Subscribe to keep going after your trial'}
        </p>
      </div>
      <button
        onClick={() => navigate('/account')}
        className={`font-bold text-xs px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
          isUrgent
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-yellow-500 text-white hover:bg-yellow-600'
        }`}
      >
        Subscribe — GHS 199/mo
      </button>
    </div>
  )
}
