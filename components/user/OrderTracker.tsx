'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MOCK_ORDERS } from '@/lib/mockData'
import UserHeader from './UserHeader'

const STEPS = [
  'Order Placed',
  'Confirmed',
  'Preparing',
  'Out for Delivery',
  'Delivered',
]

const STATUS_STEP: Record<string, number> = {
  placed: 0,
  confirmed: 1,
  preparing: 2,
  'out-for-delivery': 3,
  delivered: 4,
}

export default function OrderTracker() {
  const router = useRouter()
  const activeOrders = MOCK_ORDERS.filter((o) => o.status !== 'delivered')
  const [selected, setSelected] = useState(activeOrders[0]?.id || '')

  const order = MOCK_ORDERS.find((o) => o.id === selected)
  const stepIndex = order ? (STATUS_STEP[order.status] ?? 0) : 0

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
        <h1
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: '#1A1208',
            marginBottom: 6,
          }}
        >
          Track Orders
        </h1>
        <p style={{ fontSize: 13, color: '#8B7355', marginBottom: 24 }}>
          {activeOrders.length} active order
          {activeOrders.length !== 1 ? 's' : ''}
        </p>

        {activeOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48 }}>📭</div>
            <p style={{ color: '#8B7355', marginTop: 12 }}>
              No active orders right now.
            </p>
            <button
              onClick={() => router.push('/search')}
              style={{
                marginTop: 16,
                background: '#FF6B2B',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 24px',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Browse Stalls
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                minWidth: 240,
              }}
            >
              {activeOrders.map((o) => (
                <div
                  key={o.id}
                  onClick={() => setSelected(o.id)}
                  style={{
                    background: '#fff',
                    border: `2px solid ${selected === o.id ? '#FF6B2B' : '#F0E6D9'}`,
                    borderRadius: 12,
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={(o as any).image}
                    alt={o.product}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#1A1208',
                        marginBottom: 2,
                      }}
                    >
                      {o.product}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: '#FF6B2B',
                        fontWeight: 600,
                      }}
                    >
                      {(o as any).stallName}
                    </p>
                    <p style={{ fontSize: 11, color: '#8B7355', marginTop: 2 }}>
                      ₹{o.total}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {order && (
              <div
                style={{
                  flex: 1,
                  background: '#fff',
                  borderRadius: 16,
                  border: '1px solid #F0E6D9',
                  padding: '24px',
                  minWidth: 280,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'center',
                    marginBottom: 24,
                  }}
                >
                  <img
                    src={(order as any).image}
                    alt={order.product}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 10,
                      objectFit: 'cover',
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: 16,
                        fontWeight: 800,
                        color: '#1A1208',
                      }}
                    >
                      {order.product}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: '#FF6B2B',
                        fontWeight: 600,
                      }}
                    >
                      {(order as any).stallName}
                    </p>
                    <p style={{ fontSize: 12, color: '#8B7355' }}>
                      Qty: {order.qty}
                      {order.variant !== '-' ? ` · ${order.variant}` : ''}
                    </p>
                  </div>
                </div>

                <div style={{ position: 'relative', paddingLeft: 32 }}>
                  {STEPS.map((step, i) => {
                    const done = i <= stepIndex
                    const active = i === stepIndex
                    return (
                      <div
                        key={step}
                        style={{
                          position: 'relative',
                          paddingBottom: i < STEPS.length - 1 ? 28 : 0,
                        }}
                      >
                        {i < STEPS.length - 1 && (
                          <div
                            style={{
                              position: 'absolute',
                              left: -20,
                              top: 20,
                              width: 2,
                              height: '100%',
                              background: done ? '#FF6B2B' : '#F0E6D9',
                            }}
                          />
                        )}
                        <div
                          style={{
                            position: 'absolute',
                            left: -26,
                            top: 2,
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            background: done ? '#FF6B2B' : '#F0E6D9',
                            border: `2px solid ${done ? '#FF6B2B' : '#C4A882'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {done && (
                            <div
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: '#fff',
                              }}
                            />
                          )}
                        </div>
                        <p
                          style={{
                            fontSize: 14,
                            fontWeight: active ? 700 : 500,
                            color: done ? '#1A1208' : '#C4A882',
                            fontFamily: active
                              ? 'Syne, sans-serif'
                              : 'DM Sans, sans-serif',
                          }}
                        >
                          {step}
                        </p>
                        {active && (
                          <p
                            style={{
                              fontSize: 11,
                              color: '#FF6B2B',
                              fontWeight: 600,
                              marginTop: 2,
                            }}
                          >
                            Current status
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div
                  style={{
                    marginTop: 24,
                    paddingTop: 16,
                    borderTop: '1px solid #F0E6D9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <p style={{ fontSize: 12, color: '#8B7355' }}>
                    Est. delivery:{' '}
                    <strong style={{ color: '#1A1208' }}>
                      {(order as any).eta || 'Today'}
                    </strong>
                  </p>
                  <p
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 16,
                      fontWeight: 800,
                      color: '#1A1208',
                    }}
                  >
                    ₹{order.total}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
