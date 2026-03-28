'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MOCK_ORDERS, MOCK_WISHLIST } from '@/lib/mockData'
import UserHeader from './UserHeader'

type Tab = 'history' | 'wishlist'

export default function OrderHistory() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>('history')
  const [wishlist, setWishlist] = useState(MOCK_WISHLIST)

  useEffect(() => {
    if (searchParams.get('tab') === 'wishlist') setTab('wishlist')
  }, [searchParams])

  const historyOrders = MOCK_ORDERS.filter((o) => o.status === 'delivered')

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFF8F0',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      <UserHeader />
      <div
        style={{ maxWidth: 900, margin: '0 auto', padding: '28px 24px 60px' }}
      >
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <button
            onClick={() => setTab('history')}
            style={{
              background: tab === 'history' ? '#FFF0E6' : '#fff',
              border: `2px solid ${tab === 'history' ? '#FF6B2B' : '#F0E6D9'}`,
              borderRadius: 10,
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 600,
              color: tab === 'history' ? '#FF6B2B' : '#8B7355',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            🕓 Order History
          </button>
          <button
            onClick={() => setTab('wishlist')}
            style={{
              background: tab === 'wishlist' ? '#FFF0E6' : '#fff',
              border: `2px solid ${tab === 'wishlist' ? '#FF6B2B' : '#F0E6D9'}`,
              borderRadius: 10,
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 600,
              color: tab === 'wishlist' ? '#FF6B2B' : '#8B7355',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ❤️ Wishlist
            <span
              style={{
                background: '#FF6B2B',
                color: '#fff',
                borderRadius: '50%',
                width: 18,
                height: 18,
                fontSize: 11,
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {wishlist.length}
            </span>
          </button>
        </div>

        {tab === 'history' && (
          <div>
            <p style={{ fontSize: 13, color: '#8B7355', marginBottom: 16 }}>
              {historyOrders.length} completed orders
            </p>
            {historyOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: 48 }}>📭</div>
                <p style={{ color: '#8B7355', marginTop: 12 }}>
                  No past orders yet.
                </p>
              </div>
            ) : (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                {historyOrders.map((o) => (
                  <div
                    key={o.id}
                    style={{
                      display: 'flex',
                      gap: 14,
                      background: '#fff',
                      borderRadius: 14,
                      border: '1px solid #F0E6D9',
                      padding: 16,
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={(o as any).image}
                      alt={o.product}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 10,
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontFamily: 'Syne, sans-serif',
                          fontSize: 15,
                          fontWeight: 700,
                          color: '#1A1208',
                          marginBottom: 2,
                        }}
                      >
                        {o.product}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: '#FF6B2B',
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {(o as any).stallName}
                      </p>
                      <p style={{ fontSize: 12, color: '#8B7355' }}>
                        Qty: {o.qty}
                        {o.variant !== '-' ? ` · Variant: ${o.variant}` : ''}
                      </p>
                      <p
                        style={{ fontSize: 11, color: '#C4A882', marginTop: 4 }}
                      >
                        {o.time}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p
                        style={{
                          fontFamily: 'Syne, sans-serif',
                          fontSize: 16,
                          fontWeight: 800,
                          color: '#1A1208',
                          marginBottom: 6,
                        }}
                      >
                        ₹{o.total}
                      </p>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 11,
                          color: '#16a34a',
                          fontWeight: 600,
                          marginBottom: 6,
                        }}
                      >
                        🎉 Delivered
                      </span>
                      <button
                        onClick={() =>
                          router.push(`/vendors/${(o as any).stallId}`)
                        }
                        style={{
                          background: '#FF6B2B',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '6px 14px',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Reorder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'wishlist' && (
          <div>
            <p style={{ fontSize: 13, color: '#8B7355', marginBottom: 16 }}>
              {wishlist.length} saved items
            </p>
            {wishlist.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: 48 }}>💔</div>
                <p style={{ color: '#8B7355', marginTop: 12 }}>
                  Your wishlist is empty.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: 18,
                }}
              >
                {wishlist.map((w) => (
                  <div
                    key={w.id}
                    style={{
                      background: '#fff',
                      borderRadius: 14,
                      border: '1px solid #F0E6D9',
                      overflow: 'hidden',
                      boxShadow: '0 2px 12px rgba(26,18,8,0.05)',
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img
                        src={w.image}
                        alt={w.name}
                        style={{
                          width: '100%',
                          height: 160,
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      {w.originalPrice && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            background: '#FF6B2B',
                            color: '#fff',
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 6,
                          }}
                        >
                          {Math.round((1 - w.price / w.originalPrice) * 100)}%
                          OFF
                        </div>
                      )}
                      <button
                        onClick={() =>
                          setWishlist((wl) => wl.filter((x) => x.id !== w.id))
                        }
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          background: 'rgba(0,0,0,0.5)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: 26,
                          height: 26,
                          fontSize: 12,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <div style={{ padding: '12px 14px' }}>
                      <p
                        style={{
                          fontFamily: 'Syne, sans-serif',
                          fontSize: 14,
                          fontWeight: 700,
                          color: '#1A1208',
                          marginBottom: 2,
                        }}
                      >
                        {w.name}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: '#8B7355',
                          marginBottom: 8,
                        }}
                      >
                        {w.stallName}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontFamily: 'Syne, sans-serif',
                              fontSize: 16,
                              fontWeight: 800,
                              color: '#1A1208',
                            }}
                          >
                            ₹{w.price}
                          </span>
                          {w.originalPrice && (
                            <span
                              style={{
                                fontSize: 12,
                                color: '#C4A882',
                                textDecoration: 'line-through',
                                marginLeft: 6,
                              }}
                            >
                              ₹{w.originalPrice}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => router.push(`/vendors/${w.stallId}`)}
                          style={{
                            background: '#FF6B2B',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            padding: '6px 14px',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
