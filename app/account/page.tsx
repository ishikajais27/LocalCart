'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'

type Role = 'user' | 'vendor'
type Mode = 'choose' | 'signin' | 'signup'

export default function AccountPage() {
  const [mode, setMode] = useState<Mode>('choose')
  const [role, setRole] = useState<Role>('user')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      if (mode === 'signup') {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, role }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error)
          setLoading(false)
          return
        }
        login(data)
      } else {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error)
          setLoading(false)
          return
        }
        login(data)
      }
      router.push(role === 'vendor' ? '/vendors' : '/search')
    } catch {
      setError('Something went wrong. Try again.')
    }
    setLoading(false)
  }

  return (
    <div style={styles.page}>
      {/* Left Panel */}
      <div style={styles.left}>
        <div style={styles.leftInner}>
          <div style={styles.logo}>🛍️ GullyMarket</div>
          <h1 style={styles.headline}>
            Your neighbourhood,
            <br />
            <span style={{ color: '#FF6B2B' }}>delivered.</span>
          </h1>
          <p style={styles.sub}>
            Discover handmade candles, street food, jewellery, pottery and more
            — straight from local artisans near you.
          </p>
          <div style={styles.pills}>
            {[
              '🕯️ Candles',
              '🍢 Street Food',
              '💍 Jewellery',
              '🏺 Pottery',
              '🎨 Art',
              '🌿 Plants',
            ].map((p) => (
              <span key={p} style={styles.pill}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.right}>
        <div style={styles.formBox}>
          {mode === 'choose' && (
            <>
              <h2 style={styles.formTitle}>Join GullyMarket</h2>
              <p style={styles.formSub}>Who are you?</p>
              <div style={styles.roleGrid}>
                <RoleCard
                  emoji="🛒"
                  title="I'm a Shopper"
                  desc="Discover & order from local stalls near me"
                  onClick={() => setRole('user')}
                  selected={role === 'user'}
                />
                <RoleCard
                  emoji="🏪"
                  title="I'm a Vendor"
                  desc="List my stall and take orders from customers"
                  onClick={() => setRole('vendor')}
                  selected={role === 'vendor'}
                />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setMode('signup')}
                >
                  Create Account
                </button>
                <button
                  className="btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setMode('signin')}
                >
                  Sign In
                </button>
              </div>
            </>
          )}

          {(mode === 'signin' || mode === 'signup') && (
            <>
              <button onClick={() => setMode('choose')} style={styles.back}>
                ← Back
              </button>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 28 }}>
                  {role === 'vendor' ? '🏪' : '🛒'}
                </span>
                <div>
                  <h2 style={styles.formTitle}>
                    {mode === 'signup' ? 'Create Account' : 'Welcome back'}
                  </h2>
                  <span style={styles.roleTag}>
                    {role === 'vendor' ? 'Vendor' : 'Shopper'}
                  </span>
                </div>
              </div>

              {mode === 'signup' && (
                <input
                  style={styles.input}
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              )}
              <input
                style={styles.input}
                placeholder="Email Address"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
              <input
                style={styles.input}
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
              />

              {error && <p style={styles.error}>{error}</p>}

              <button
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: 8,
                }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? 'Please wait...'
                  : mode === 'signup'
                    ? 'Create Account'
                    : 'Sign In'}
              </button>

              <p style={styles.switchText}>
                {mode === 'signup'
                  ? 'Already have an account? '
                  : "Don't have one? "}
                <span
                  style={{
                    color: '#FF6B2B',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                  onClick={() =>
                    setMode(mode === 'signup' ? 'signin' : 'signup')
                  }
                >
                  {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                </span>
              </p>

              <p
                style={{
                  textAlign: 'center',
                  marginTop: 16,
                  fontSize: 13,
                  color: '#8B7355',
                }}
              >
                Wrong role?{' '}
                <span
                  style={{ color: '#FF6B2B', cursor: 'pointer' }}
                  onClick={() => setRole(role === 'vendor' ? 'user' : 'vendor')}
                >
                  Switch to {role === 'vendor' ? 'Shopper' : 'Vendor'}
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function RoleCard({ emoji, title, desc, onClick, selected }: any) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `2px solid ${selected ? '#FF6B2B' : '#F0E6D9'}`,
        background: selected ? '#FFF0E6' : '#fff',
        borderRadius: 14,
        padding: '18px 16px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }}>{emoji}</div>
      <div
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: 15,
          color: '#1A1208',
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 12, color: '#8B7355', lineHeight: 1.5 }}>
        {desc}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'DM Sans, sans-serif',
  },
  left: {
    flex: 1,
    background:
      'linear-gradient(135deg, #1A1208 0%, #2D1F0A 60%, #3D2A10 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    position: 'relative',
    overflow: 'hidden',
  },
  leftInner: { maxWidth: 460, zIndex: 1, position: 'relative' },
  logo: {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800,
    fontSize: 22,
    color: '#FF6B2B',
    marginBottom: 32,
  },
  headline: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 48,
    fontWeight: 800,
    color: '#FFF8F0',
    lineHeight: 1.15,
    marginBottom: 20,
  },
  sub: { color: '#C4A882', fontSize: 17, lineHeight: 1.7, marginBottom: 32 },
  pills: { display: 'flex', flexWrap: 'wrap', gap: 10 },
  pill: {
    background: 'rgba(255,107,43,0.15)',
    color: '#FF8F5C',
    border: '1px solid rgba(255,107,43,0.3)',
    borderRadius: 20,
    padding: '6px 14px',
    fontSize: 13,
    fontWeight: 500,
  },
  right: {
    width: 480,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 40px',
    background: '#FFF8F0',
  },
  formBox: { width: '100%', maxWidth: 380 },
  formTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 26,
    fontWeight: 800,
    color: '#1A1208',
    marginBottom: 4,
  },
  formSub: { color: '#8B7355', fontSize: 15, marginBottom: 24 },
  roleGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  input: {
    width: '100%',
    padding: '13px 16px',
    border: '2px solid #F0E6D9',
    borderRadius: 12,
    fontSize: 15,
    marginBottom: 12,
    background: '#fff',
    color: '#1A1208',
    display: 'block',
  },
  error: {
    color: '#dc2626',
    fontSize: 13,
    marginBottom: 8,
    padding: '8px 12px',
    background: '#fff1f2',
    borderRadius: 8,
  },
  switchText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#8B7355',
    marginTop: 16,
  },
  roleTag: {
    background: '#FFF0E6',
    color: '#FF6B2B',
    fontSize: 12,
    fontWeight: 600,
    padding: '2px 10px',
    borderRadius: 20,
  },
  back: {
    background: 'none',
    border: 'none',
    color: '#8B7355',
    cursor: 'pointer',
    fontSize: 14,
    marginBottom: 16,
    padding: 0,
  },
}
