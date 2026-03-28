'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import UserHeader from '@/components/user/UserHeader'
import { getAllStalls } from '@/lib/stallsStore'
import { CATEGORIES } from '@/lib/mockData'

export default function SearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const allStalls = getAllStalls()

  const filtered = allStalls.filter((s) => {
    const matchCat = category === 'all' || s.category === category
    const matchQ =
      !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.location.toLowerCase().includes(query.toLowerCase()) ||
      s.tags?.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
    return matchCat && matchQ
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFF8F0',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      <UserHeader />

      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FF6B2B 0%, #e85d20 100%)',
          padding: '40px 24px 32px',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 30,
              fontWeight: 800,
              color: '#fff',
              marginBottom: 8,
            }}
          >
            Discover Local Stalls 🛍️
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 14,
              marginBottom: 24,
            }}
          >
            Handmade, homegrown, and just around the corner.
          </p>
          {/* Search Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              borderRadius: 14,
              padding: '12px 18px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            }}
          >
            <span style={{ fontSize: 18, color: '#C4A882' }}>🔍</span>
            <input
              style={{
                border: 'none',
                outline: 'none',
                fontSize: 15,
                fontFamily: 'DM Sans, sans-serif',
                flex: 1,
                color: '#1A1208',
                background: 'transparent',
              }}
              placeholder="Search stalls, products, categories…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <span
                style={{ color: '#8B7355', cursor: 'pointer', fontSize: 14 }}
                onClick={() => setQuery('')}
              >
                ✕
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 60px' }}
      >
        {/* Categories */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 8,
            marginBottom: 24,
          }}
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              style={{
                background: category === c.id ? '#FF6B2B' : '#fff',
                color: category === c.id ? '#fff' : '#8B7355',
                border: `2px solid ${category === c.id ? '#FF6B2B' : '#F0E6D9'}`,
                borderRadius: 20,
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ fontSize: 13, color: '#8B7355', marginBottom: 16 }}>
          {filtered.length} stall{filtered.length !== 1 ? 's' : ''} found
          {query ? ` for "${query}"` : ''}
        </p>

        {/* Stall Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48 }}>🏪</div>
            <p style={{ color: '#8B7355', marginTop: 12 }}>
              No stalls found. Try a different search.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 18,
            }}
          >
            {filtered.map((stall) => (
              <div
                key={stall.id}
                onClick={() => router.push(`/vendors/${stall.id}`)}
                style={{
                  background: '#fff',
                  borderRadius: 14,
                  border: '1px solid #F0E6D9',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 2px 12px rgba(26,18,8,0.05)',
                  transition: 'transform 0.15s',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    height: 160,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={stall.image}
                    alt={stall.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: stall.isOpen ? '#dcfce7' : '#fee2e2',
                      color: stall.isOpen ? '#16a34a' : '#dc2626',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 20,
                    }}
                  >
                    {stall.isOpen ? '● Open' : '● Closed'}
                  </div>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <h3
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#1A1208',
                      marginBottom: 4,
                    }}
                  >
                    {stall.name}
                  </h3>
                  <p
                    style={{ fontSize: 12, color: '#8B7355', marginBottom: 8 }}
                  >
                    📍 {stall.location} · {stall.distance}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: 6,
                      flexWrap: 'wrap',
                      marginBottom: 10,
                    }}
                  >
                    {stall.tags?.slice(0, 3).map((t: string) => (
                      <span
                        key={t}
                        style={{
                          background: '#FFF0E6',
                          color: '#FF6B2B',
                          border: '1px solid rgba(255,107,43,0.2)',
                          borderRadius: 20,
                          padding: '2px 10px',
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#1A1208',
                      }}
                    >
                      ⭐ {stall.rating} ({stall.reviewCount})
                    </span>
                    <span style={{ fontSize: 12, color: '#8B7355' }}>
                      🚚 {stall.deliveryTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
