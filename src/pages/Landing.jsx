import { Link, Routes, Route, useNavigate } from 'react-router-dom'

const FEATURES = [
  {
    icon: '🤖',
    title: 'AI-Powered Agents',
    desc: 'Build a smart customer service bot trained on your FAQs — no coding needed.',
  },
  {
    icon: '📱',
    title: 'WhatsApp Ready',
    desc: 'Preview exactly how your agent will respond to customers on WhatsApp.',
  },
  {
    icon: '⚡',
    title: 'Set Up in Minutes',
    desc: 'Add your business info, set your FAQs, and your agent is ready to go.',
  },
  {
    icon: '🌍',
    title: 'Built for Africa',
    desc: 'Designed for Ghanaian and African small businesses. Pay in GHS.',
  },
]

function Footer() {
  return (
    <footer className="text-center py-8 px-5 border-t border-gray-100">
      <p className="text-xs text-gray-400 mb-3">Weza AI — Built for African Businesses</p>
      <p className="text-xs text-gray-400 mb-3">Payments powered by Paystack</p>
      <div className="flex justify-center gap-4 text-xs text-gray-400">
        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
      </div>
      <p className="text-xs text-gray-300 mt-3">© {new Date().getFullYear()} Weza AI by Centia Labs</p>
    </footer>
  )
}

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-bg-main px-5 py-10 max-w-2xl mx-auto">
      <Link to="/" className="text-primary text-sm font-semibold hover:underline block mb-6">← Back to Home</Link>
      <h1 className="text-2xl font-black text-gray-900 mb-6">Privacy Policy</h1>
      <div className="space-y-5 text-sm text-gray-600 leading-relaxed">
        <div>
          <h2 className="font-bold text-gray-800 mb-1">1. Information We Collect</h2>
          <p>We collect your email address when you create an account. We also store the business information and FAQs you enter to build your AI agents.</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">2. How We Use Your Information</h2>
          <p>Your information is used solely to provide the Weza AI service — powering your AI agents and managing your account. We do not sell your data to third parties.</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">3. Data Storage</h2>
          <p>Your data is stored securely using Supabase, a trusted cloud database provider. All data is encrypted in transit and at rest.</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">4. Payments</h2>
          <p>Payments are processed by Paystack. We do not store your card details. Paystack's privacy policy applies to all payment transactions.</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">5. Your Rights</h2>
          <p>You can request deletion of your account and all associated data at any time by contacting us at centialabs@gmail.com.</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">6. Contact</h2>
          <p>For privacy-related questions, email us at <a href="mailto:centialabs@gmail.com" className="text-primary hover:underline">centialabs@gmail.com</a></p>
        </div>
        <p className="text-xs text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-bg-main px-5 py-10 max-w-2xl mx-auto">
      <Link to="/" className="text-primary text-sm font-semibold hover:underline block mb-6">← Back to Home</Link>
      <h1 className="text-2xl font-black text-gray-900 mb-6">Terms of Service</h1>
      <div className="space-y-5 text-sm text-gray-600 leading-relaxed">
        <div>
          <h2 className="font-bold text-gray-800 mb-1">1. Acceptance of Terms</h2>
          <p>By creating an account on Weza AI, you agree to these Terms of Service. If you do not agree, do not use the service.</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">2. Free Trial</h2>
          <p>New accounts receive a 14-day free trial with full access. No credit card is required to start. After the trial, a subscription of GHS 199/month is required to continue using the service.</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">3. Subscriptions and Payments</h2>
          <p>Subscriptions are billed monthly. You may cancel at any time. Refunds are handled on a case-by-case basis — contact us at centialabs@gmail.com.</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">4. Acceptable Use</h2>
          <p>You may not use Weza AI for illegal activities, spam, or any purpose that violates applicable laws. We reserve the right to suspend accounts that violate these terms.</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">5. Service Availability</h2>
          <p>We strive for high availability but do not guarantee uninterrupted service. We are not liable for any losses caused by downtime.</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">6. Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of the service after changes means you accept the new terms.</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">7. Contact</h2>
          <p>Questions? Email <a href="mailto:centialabs@gmail.com" className="text-primary hover:underline">centialabs@gmail.com</a></p>
        </div>
        <p className="text-xs text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-main px-5 py-10 max-w-md mx-auto">
      <Link to="/" className="text-primary text-sm font-semibold hover:underline block mb-6">← Back to Home</Link>
      <h1 className="text-2xl font-black text-gray-900 mb-2">Contact Us</h1>
      <p className="text-gray-500 text-sm mb-8">We'd love to hear from you.</p>

      <div className="space-y-4">
        <div className="card flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" fill="none" stroke="#6C3FC5" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Email</p>
            <a href="mailto:centialabs@gmail.com" className="text-primary font-semibold text-sm hover:underline">
              centialabs@gmail.com
            </a>
          </div>
        </div>

        <div className="card flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" fill="none" stroke="#6C3FC5" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Based in</p>
            <p className="text-gray-800 font-semibold text-sm">Ghana, West Africa</p>
          </div>
        </div>

        <div className="card flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" fill="none" stroke="#6C3FC5" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Response Time</p>
            <p className="text-gray-800 font-semibold text-sm">Within 24 hours</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-8">
        Weza AI is a product of Centia Labs
      </p>
    </div>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg-main">
      <nav className="flex items-center justify-between px-5 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-lg">W</span>
          </div>
          <span className="font-black text-gray-900 text-lg">Weza AI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="btn-primary text-sm py-2 px-4">
            Start Free
          </Link>
        </div>
      </nav>

      <section className="px-5 py-16 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-4 py-1.5 mb-5">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs font-semibold text-primary">14-day free trial — no card needed</span>
        </div>
        <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">
          AI Customer Service for Your<br />
          <span className="text-primary">WhatsApp Business</span>
        </h1>
        <p className="text-gray-500 text-base mb-8 max-w-md mx-auto">
          Build smart WhatsApp agents that answer customer questions 24/7 — tailored to your African small business.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/signup" className="btn-primary text-base px-8 py-3">
            Start Free Trial
          </Link>
          <Link to="/login" className="btn-secondary text-base px-8 py-3">
            Sign In
          </Link>
        </div>
      </section>

      <section className="px-5 py-10 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="card">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-10 max-w-sm mx-auto text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Simple Pricing</h2>
        <p className="text-gray-500 text-sm mb-6">One plan. Everything included.</p>
        <div className="card border-2 border-primary">
          <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
            Most Popular
          </div>
          <p className="text-4xl font-black text-gray-900 mb-1">
            GHS 199<span className="text-lg font-normal text-gray-400">/mo</span>
          </p>
          <p className="text-gray-500 text-sm mb-5">after your 14-day free trial</p>
          <ul className="space-y-2 text-sm text-left mb-6">
            {['Unlimited agents', 'AI-powered responses', 'WhatsApp preview', 'FAQ management', 'Cancel anytime'].map(f => (
              <li key={f} className="flex items-center gap-2 text-gray-700">
                <svg width="16" height="16" fill="none" stroke="#6C3FC5" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <Link to="/signup" className="btn-primary w-full">
            Get Started Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
