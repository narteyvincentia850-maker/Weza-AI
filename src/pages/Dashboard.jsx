import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import { useToast } from '../lib/ToastContext'
import TrialBanner from '../components/TrialBanner'

function AgentCard({ agent, onDelete, onToggle, onPreview }) {
  const [deleting, setDeleting] = useState(false)
  const [toggling, setToggling] = useState(false)
  const navigate = useNavigate()

  async function handleDelete() {
    if (!confirm(`Delete "${agent.business_name}"? This cannot be undone.`)) return
    setDeleting(true)
    await onDelete(agent.id)
    setDeleting(false)
  }

  async function handleToggle() {
    setToggling(true)
    await onToggle(agent.id, agent.is_active)
    setToggling(false)
  }

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-bold text-gray-900 truncate">{agent.business_name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{agent.business_type}</p>
        </div>
        <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
          agent.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}>
          {agent.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>

      <p className="text-xs text-gray-500 line-clamp-2 italic">
        "{agent.greeting_message || 'No greeting set'}"
      </p>

      <div className="text-xs text-gray-400">
        {agent.faqs?.length || 0} FAQ{agent.faqs?.length !== 1 ? 's' : ''} · {agent.agent_personality}
      </div>

      <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-50">
        <button
          onClick={() => navigate(`/agents/${agent.id}/edit`)}
          className="flex-1 text-xs font-semibold text-primary border border-primary px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onPreview(agent)}
          className="flex-1 text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Preview
        </button>
        <button
          onClick={handleToggle}
          disabled={toggling}
          className="flex-1 text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {toggling ? '...' : agent.is_active ? 'Deactivate' : 'Activate'}
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs font-semibold text-red-500 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          {deleting ? '...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user, profile, hasAccess } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [agents, setAgents] = useState([])
  const [loadingAgents, setLoadingAgents] = useState(true)

  const fetchAgents = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setAgents(data || [])
    } catch (err) {
      addToast('Failed to load agents. Please refresh.')
    } finally {
      setLoadingAgents(false)
    }
  }, [addToast])

  useEffect(() => { fetchAgents() }, [fetchAgents])

  async function handleDelete(id) {
    try {
      const { error } = await supabase.from('agents').delete().eq('id', id)
      if (error) throw error
      setAgents(prev => prev.filter(a => a.id !== id))
      addToast('Agent deleted.', 'success')
    } catch {
      addToast('Failed to delete agent. Please try again.')
    }
  }

  async function handleToggle(id, currentState) {
    try {
      const { error } = await supabase
        .from('agents')
        .update({ is_active: !currentState })
        .eq('id', id)
      if (error) throw error
      setAgents(prev => prev.map(a => a.id === id ? { ...a, is_active: !currentState } : a))
    } catch {
      addToast('Failed to update agent status.')
    }
  }

  function handlePreview(agent) {
    navigate(`/agents/${agent.id}/preview`)
  }

  const firstName = user?.email?.split('@')[0] || 'there'

  return (
    <div className="max-w-2xl mx-auto">
      <TrialBanner />

      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900">
          Hey, {firstName}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {agents.length === 0
            ? 'Create your first AI WhatsApp agent below'
            : `You have ${agents.length} agent${agents.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      <div className="mb-6">
        {hasAccess() ? (
          <Link to="/agents/new" className="btn-primary inline-flex">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create New Agent
          </Link>
        ) : (
          <button
            onClick={() => navigate('/account')}
            className="btn-primary inline-flex bg-gray-400 cursor-not-allowed"
            disabled
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path strokeLinecap="round" d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            Create New Agent (Subscribe to Unlock)
          </button>
        )}
      </div>

      {loadingAgents ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : agents.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" fill="none" stroke="#6C3FC5" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-800 mb-1">No agents yet</h3>
          <p className="text-sm text-gray-500 mb-4">Create your first AI WhatsApp agent to get started</p>
          {hasAccess() && (
            <Link to="/agents/new" className="btn-primary inline-flex text-sm">
              Create My First Agent
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {agents.map(agent => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onPreview={handlePreview}
            />
          ))}
        </div>
      )}
    </div>
  )
    }
