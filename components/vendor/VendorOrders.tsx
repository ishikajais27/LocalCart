'use client'
import { useState } from 'react'
import { MOCK_ORDERS } from '@/lib/mockData'

const STATUS_STYLES: Record<
  string,
  { bg: string; color: string; label: string }
> = {
  pending: { bg: '#fef9c3', color: '#a16207', label: '⏳ Pending' },
  processing: { bg: '#dbeafe', color: '#1d4ed8', label: '🔨 Processing' },
  ready: { bg: '#dcfce7', color: '#16a34a', label: '✅ Ready' },
  delivered: { bg: '#f3f4f6', color: '#6b7280', label: '📦 Delivered' },
}

export default function VendorOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [filter, setFilter] = useState('all')

  const next: Record<string, string> = {
    pending: 'processing',
    processing: 'ready',
    ready: 'delivered',
  }

  const updateStatus = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id && next[o.status] ? { ...o, status: next[o.status] } : o,
      ),
    )
  }

  const filtered =
    filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  return (
    <div>
      <div
        style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}
      >
        {['all', 'pending', 'processing', 'ready', 'delivered'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '7px 14px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              display: 'flex',
              alignItems: 'center',
              background: filter === f ? '#FF6B2B' : '#fff',
              color: filter === f ? '#fff' : '#8B7355',
              border: `2px solid ${filter === f ? '#FF6B2B' : '#F0E6D9'}`,
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span
              style={{
                marginLeft: 6,
                background: filter === f ? 'rgba(255,255,255,0.25)' : '#F0E6D9',
                color: filter === f ? '#fff' : '#8B7355',
                padding: '1px 7px',
                borderRadius: 10,
                fontSize: 11,
              }}
            >
              {f === 'all'
                ? orders.length
                : orders.filter((o) => o.status === f).length}
            </span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: 40 }}>📭</div>
            <p style={{ color: '#8B7355', marginTop: 8 }}>
              No orders here yet.
            </p>
          </div>
        )}
        {filtered.map((order) => {
          const s = STATUS_STYLES[order.status]
          return (
            <div
              key={order.id}
              style={{
                background: '#fff',
                border: '1px solid #F0E6D9',
                borderRadius: 14,
                padding: '16px 18px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <div>
                  <h4
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#1A1208',
                      marginBottom: 4,
                    }}
                  >
                    {order.product}
                  </h4>
                  <p style={{ fontSize: 12, color: '#8B7355', marginTop: 3 }}>
                    👤 {order.customer} ·{' '}
                    {order.variant !== '-'
                      ? `Variant: ${order.variant} · `
                      : ''}
                    Qty: {order.qty}
                  </p>
                  <p style={{ fontSize: 12, color: '#8B7355', marginTop: 3 }}>
                    {order.type === 'preorder'
                      ? '📅 Pre-order'
                      : '⚡ Immediate'}{' '}
                    · 🕐 {order.slot}
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 20,
                      display: 'inline-block',
                      marginBottom: 6,
                      background: s.bg,
                      color: s.color,
                    }}
                  >
                    {s.label}
                  </span>
                  <p
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: 18,
                      color: '#FF6B2B',
                      marginBottom: 2,
                    }}
                  >
                    ₹{order.total}
                  </p>
                  <p style={{ fontSize: 11, color: '#C4A882' }}>{order.time}</p>
                </div>
              </div>
              {order.status !== 'delivered' && (
                <button
                  onClick={() => updateStatus(order.id)}
                  className="btn-primary"
                  style={{
                    marginTop: 14,
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: 13,
                  }}
                >
                  Mark as{' '}
                  {next[order.status]?.charAt(0).toUpperCase() +
                    next[order.status]?.slice(1)}{' '}
                  →
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
