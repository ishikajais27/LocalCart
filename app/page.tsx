'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/authContext'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) router.push('/account')
      else if (user.role === 'vendor') router.push('/vendors')
      else router.push('/search')
    }
  }, [user, loading, router])

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🛍️</div>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#8B7355' }}>
          Loading LocalCart...
        </p>
      </div>
    </div>
  )
}
