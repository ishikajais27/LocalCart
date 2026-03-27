'use client'
import { useAuth } from '@/lib/authContext'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <div
          style={styles.logo}
          onClick={() =>
            router.push(user?.role === 'vendor' ? '/vendors' : '/search')
          }
        >
          🛍️ <span>GullyMarket</span>
        </div>
        <div style={styles.right}>
          {user && (
            <>
              <span style={styles.name}>
                Hey, {user.name.split(' ')[0]}{' '}
                {user.role === 'vendor' ? '🏪' : '🛒'}
              </span>
              <button
                style={styles.logout}
                onClick={() => {
                  logout()
                  router.push('/account')
                }}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    background: '#fff',
    borderBottom: '1px solid #F0E6D9',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(26,18,8,0.06)',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800,
    fontSize: 20,
    color: '#FF6B2B',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  right: { display: 'flex', alignItems: 'center', gap: 16 },
  name: { fontSize: 14, fontWeight: 500, color: '#1A1208' },
  logout: {
    background: 'none',
    border: '1.5px solid #F0E6D9',
    borderRadius: 8,
    padding: '6px 14px',
    fontSize: 13,
    cursor: 'pointer',
    color: '#8B7355',
    fontFamily: 'DM Sans, sans-serif',
  },
}
