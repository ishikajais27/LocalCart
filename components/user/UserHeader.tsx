'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { BBSR_LOCATIONS } from '@/lib/mockData'

export default function UserHeader() {
  const router = useRouter()
  const path = usePathname()
  const [query, setQuery] = useState('')
  const [showLocationMenu, setShowLocationMenu] = useState(false)
  const [location, setLocation] = useState('KIIT Campus, Patia')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const links = [
    { label: '🏠 Home', href: '/search' },
    { label: '📦 Track Order', href: '/orders' },
    { label: '🕓 History', href: '/history' },
    { label: '❤️ Wishlist', href: '/history?tab=wishlist' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  const handleLogout = () => {
    router.push('/account')
  }

  return (
    <div
      style={{
        background: '#fff',
        borderBottom: '1px solid #F0E6D9',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          height: 60,
        }}
      >
        {/* Logo */}
        <span
          onClick={() => router.push('/search')}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 20,
            color: '#FF6B2B',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          Bazario
        </span>

        {/* Location Picker */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div
            onClick={() => {
              setShowLocationMenu(!showLocationMenu)
              setShowUserMenu(false)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#FFF8F0',
              border: '1.5px solid #F0E6D9',
              borderRadius: 10,
              padding: '6px 12px',
              cursor: 'pointer',
              maxWidth: 180,
            }}
          >
            <span style={{ fontSize: 14 }}>📍</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#1A1208',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 120,
              }}
            >
              {location}
            </span>
            <span style={{ color: '#FF6B2B', fontSize: 10, flexShrink: 0 }}>
              ▼
            </span>
          </div>
          {showLocationMenu && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                background: '#fff',
                border: '1px solid #F0E6D9',
                borderRadius: 12,
                boxShadow: '0 8px 24px rgba(26,18,8,0.12)',
                zIndex: 300,
                minWidth: 240,
                maxHeight: 280,
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  borderBottom: '1px solid #F0E6D9',
                }}
              >
                <p style={{ fontSize: 12, fontWeight: 700, color: '#8B7355' }}>
                  SELECT AREA
                </p>
              </div>
              {BBSR_LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => {
                    setLocation(loc.label)
                    setShowLocationMenu(false)
                  }}
                  style={{
                    padding: '10px 14px',
                    cursor: 'pointer',
                    fontSize: 13,
                    color: location === loc.label ? '#FF6B2B' : '#1A1208',
                    fontWeight: location === loc.label ? 700 : 400,
                    background:
                      location === loc.label ? '#FFF0E6' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (location !== loc.label)
                      (e.currentTarget as HTMLElement).style.background =
                        '#FFF8F0'
                  }}
                  onMouseLeave={(e) => {
                    if (location !== loc.label)
                      (e.currentTarget as HTMLElement).style.background =
                        'transparent'
                  }}
                >
                  {loc.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          style={{
            flex: 1,
            maxWidth: 360,
            display: 'flex',
            alignItems: 'center',
            background: '#FFF8F0',
            border: '1.5px solid #F0E6D9',
            borderRadius: 10,
            padding: '7px 14px',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 14, color: '#C4A882' }}>🔍</span>
          <input
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 13,
              fontFamily: 'DM Sans, sans-serif',
              flex: 1,
              color: '#1A1208',
              background: 'transparent',
            }}
            placeholder="Search stalls, products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <span
              style={{ color: '#8B7355', cursor: 'pointer', fontSize: 12 }}
              onClick={() => setQuery('')}
            >
              ✕
            </span>
          )}
        </form>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => router.push(l.href)}
              style={{
                background: path === l.href.split('?')[0] ? '#FFF0E6' : 'none',
                border: 'none',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 13,
                fontWeight: 600,
                color: path === l.href.split('?')[0] ? '#FF6B2B' : '#8B7355',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* User Menu */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div
            onClick={() => {
              setShowUserMenu(!showUserMenu)
              setShowLocationMenu(false)
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#FF6B2B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 16,
              color: '#fff',
              fontWeight: 800,
            }}
          >
            U
          </div>
          {showUserMenu && (
            <div
              style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                background: '#fff',
                border: '1px solid #F0E6D9',
                borderRadius: 12,
                boxShadow: '0 8px 24px rgba(26,18,8,0.12)',
                zIndex: 300,
                minWidth: 180,
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #F0E6D9',
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1208' }}>
                  My Account
                </p>
                <p style={{ fontSize: 11, color: '#8B7355', marginTop: 2 }}>
                  user@example.com
                </p>
              </div>
              <div
                onClick={() => {
                  setShowUserMenu(false)
                  router.push('/orders')
                }}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  fontSize: 13,
                  color: '#1A1208',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    '#FFF8F0')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    'transparent')
                }
              >
                📦 Track Orders
              </div>
              <div
                onClick={() => {
                  setShowUserMenu(false)
                  router.push('/history')
                }}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  fontSize: 13,
                  color: '#1A1208',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    '#FFF8F0')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    'transparent')
                }
              >
                🕓 Order History
              </div>
              <div
                onClick={() => {
                  setShowUserMenu(false)
                  router.push('/history?tab=wishlist')
                }}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  fontSize: 13,
                  color: '#1A1208',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    '#FFF8F0')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    'transparent')
                }
              >
                ❤️ Wishlist
              </div>
              <div style={{ borderTop: '1px solid #F0E6D9' }}>
                <div
                  onClick={handleLogout}
                  style={{
                    padding: '10px 16px',
                    cursor: 'pointer',
                    fontSize: 13,
                    color: '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      '#fff5f5')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      'transparent')
                  }
                >
                  🚪 Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
