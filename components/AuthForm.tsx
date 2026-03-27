'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<'consumer' | 'vendor'>('consumer')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name, role, location }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || 'Failed to sign up')
          setLoading(false)
          return
        }
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push(role === 'consumer' ? '/user' : '/vendor')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white/50 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-sora text-ink mb-2">
          {isSignUp ? 'Join LocalMart' : 'Welcome Back'}
        </h1>
        <p className="text-muted text-sm">
          {isSignUp ? 'Create an account to continue' : 'Sign in to access your account'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50/50 border border-red-100 text-red-600 text-sm rounded-xl text-center backdrop-blur-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all placeholder:text-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
            <div className="flex gap-3 p-1 bg-gray-100/50 rounded-xl">
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  role === 'consumer'
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-gray-500 hover:text-ink'
                }`}
                onClick={() => setRole('consumer')}
              >
                Consumer
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  role === 'vendor'
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-gray-500 hover:text-ink'
                }`}
                onClick={() => setRole('vendor')}
              >
                Vendor
              </button>
            </div>

            <input
              type="text"
              placeholder="Location (e.g., Downtown, City Name)"
              className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all placeholder:text-gray-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all placeholder:text-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all placeholder:text-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-400 to-amber-500 text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-sm"
        >
          {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}
