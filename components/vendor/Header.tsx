'use client'
import { useAuth } from '../../lib/authContext'
import { useRouter } from 'next/navigation'

const TABS = [
  { id: 'orders', label: '📦 Orders' },
  { id: 'stall', label: '🏪 My Stall' },
  { id: 'add', label: '➕ Add Products' },
]

export default function VendorHeader({
  activeTab,
  onTabChange,
}: {
  activeTab: string
  onTabChange: (t: string) => void
}) {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <header
      style={{
        background: '#fff',
        borderBottom: '1px solid #F0E6D9',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 18,
            color: '#FF6B2B',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          🛍️ GullyMarket{' '}
          <span
            style={{
              background: '#1A1208',
              color: '#FF6B2B',
              fontSize: 10,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 4,
              letterSpacing: 1,
            }}
          >
            Vendor
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#1A1208' }}>
            {user?.name}
          </span>
          <button
            style={{
              background: 'none',
              border: '1.5px solid #F0E6D9',
              borderRadius: 8,
              padding: '5px 12px',
              fontSize: 12,
              cursor: 'pointer',
              color: '#8B7355',
              fontFamily: 'DM Sans, sans-serif',
            }}
            onClick={() => {
              logout()
              router.push('/account')
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              padding: '14px 20px',
              background: 'none',
              border: 'none',
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'all 0.15s',
              borderBottom: `3px solid ${activeTab === tab.id ? '#FF6B2B' : 'transparent'}`,
              color: activeTab === tab.id ? '#FF6B2B' : '#8B7355',
              fontWeight: activeTab === tab.id ? 700 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  )
}
