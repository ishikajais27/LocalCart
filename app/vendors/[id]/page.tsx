'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Header from '@/components/common/Header'
import { STALLS, PRODUCTS, TIME_SLOTS } from '@/lib/mockData'

export default function StallPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const stall = STALLS.find((s) => s.id === id)
  const products = PRODUCTS[id] || []

  const [selected, setSelected] = useState<any>(null)
  const [variant, setVariant] = useState('')
  const [orderType, setOrderType] = useState<'immediate' | 'preorder'>(
    'immediate',
  )
  const [slot, setSlot] = useState(TIME_SLOTS[0])
  const [qty, setQty] = useState(1)
  const [ordered, setOrdered] = useState(false)

  if (!stall)
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>Stall not found</div>
    )

  const openModal = (p: any) => {
    setSelected(p)
    setVariant(p.variants[0] || '')
    setQty(1)
    setOrdered(false)
  }
  const placeOrder = () => {
    setOrdered(true)
    setTimeout(() => {
      setSelected(null)
      setOrdered(false)
    }, 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8F0' }}>
      <Header />

      <div style={styles.banner}>
        <img src={stall.image} alt={stall.name} style={styles.bannerImg} />
        <div style={styles.bannerOverlay} />
        <div style={styles.bannerContent}>
          <button onClick={() => router.back()} style={styles.backBtn}>
            ← Back
          </button>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
              }}
            >
              <h1 style={styles.stallName}>{stall.name}</h1>
              <span
                style={{
                  background: stall.isOpen ? '#dcfce7' : '#fee2e2',
                  color: stall.isOpen ? '#16a34a' : '#dc2626',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                }}
              >
                {stall.isOpen ? '● Open' : '● Closed'}
              </span>
            </div>
            <p style={styles.stallInfo}>
              📍 {stall.location} · {stall.distance} · ⭐ {stall.rating} (
              {stall.reviewCount} reviews)
            </p>
            <p style={styles.stallInfo}>
              🕐 Delivery: {stall.deliveryTime} · Min order: ₹{stall.minOrder}
            </p>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>What's available 🛍️</h2>
        <div style={styles.productGrid}>
          {products.map((p: any) => (
            <div
              key={p.id}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => openModal(p)}
            >
              <div style={{ position: 'relative', height: 160 }}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {p.originalPrice && (
                  <span
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
                    {Math.round((1 - p.price / p.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              <div style={{ padding: '12px 14px' }}>
                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 15,
                    fontWeight: 700,
                    marginBottom: 4,
                    color: '#1A1208',
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: '#8B7355',
                    marginBottom: 10,
                    lineHeight: 1.5,
                  }}
                >
                  {p.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{ fontWeight: 800, fontSize: 18, color: '#1A1208' }}
                  >
                    ₹{p.price}
                  </span>
                  {p.originalPrice && (
                    <span
                      style={{
                        fontSize: 13,
                        color: '#C4A882',
                        textDecoration: 'line-through',
                      }}
                    >
                      ₹{p.originalPrice}
                    </span>
                  )}
                  <button
                    className="btn-primary"
                    style={{
                      marginLeft: 'auto',
                      padding: '6px 14px',
                      fontSize: 13,
                    }}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div style={styles.modalBg} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            {ordered ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 56 }}>✅</div>
                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 24,
                    fontWeight: 800,
                    color: '#1A1208',
                    margin: '16px 0 8px',
                  }}
                >
                  Order Placed!
                </h3>
                <p style={{ color: '#8B7355' }}>
                  The vendor will prepare your order shortly.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                  <img
                    src={selected.image}
                    alt={selected.name}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 12,
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <h3
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: 18,
                        fontWeight: 700,
                        marginBottom: 4,
                        color: '#1A1208',
                      }}
                    >
                      {selected.name}
                    </h3>
                    <p
                      style={{
                        color: '#8B7355',
                        fontSize: 13,
                        marginBottom: 8,
                      }}
                    >
                      {selected.description}
                    </p>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 18,
                        color: '#1A1208',
                      }}
                    >
                      ₹{selected.price}
                    </span>
                    {selected.originalPrice && (
                      <span
                        style={{
                          fontSize: 13,
                          color: '#C4A882',
                          textDecoration: 'line-through',
                          marginLeft: 8,
                        }}
                      >
                        ₹{selected.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {selected.variants.length > 0 && (
                  <div style={styles.field}>
                    <label style={styles.label}>Variant</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {selected.variants.map((v: string) => (
                        <button
                          key={v}
                          onClick={() => setVariant(v)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            fontSize: 13,
                            cursor: 'pointer',
                            border: `2px solid ${variant === v ? '#FF6B2B' : '#F0E6D9'}`,
                            background: variant === v ? '#FFF0E6' : '#fff',
                            color: variant === v ? '#FF6B2B' : '#1A1208',
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 600,
                          }}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div style={styles.field}>
                  <label style={styles.label}>Quantity</label>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                  >
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      style={styles.qtyBtn}
                    >
                      −
                    </button>
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        minWidth: 24,
                        textAlign: 'center',
                      }}
                    >
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      style={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Order Type</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {(['immediate', 'preorder'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setOrderType(t)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: 10,
                          cursor: 'pointer',
                          fontSize: 13,
                          border: `2px solid ${orderType === t ? '#FF6B2B' : '#F0E6D9'}`,
                          background: orderType === t ? '#FFF0E6' : '#fff',
                          color: orderType === t ? '#FF6B2B' : '#1A1208',
                          fontFamily: 'DM Sans, sans-serif',
                          fontWeight: 600,
                        }}
                      >
                        {t === 'immediate' ? '⚡ Immediate' : '📅 Pre-Order'}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Delivery Slot</label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      border: '2px solid #F0E6D9',
                      borderRadius: 10,
                      fontSize: 14,
                      fontFamily: 'DM Sans, sans-serif',
                      color: '#1A1208',
                      background: '#fff',
                      outline: 'none',
                    }}
                  >
                    {TIME_SLOTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderTop: '1px solid #F0E6D9',
                    marginBottom: 16,
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#1A1208',
                  }}
                >
                  <span>Total</span>
                  <span
                    style={{ color: '#FF6B2B', fontWeight: 800, fontSize: 20 }}
                  >
                    ₹{selected.price * qty}
                  </span>
                </div>

                <button
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={placeOrder}
                >
                  Place Order →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  banner: { position: 'relative', height: 280, overflow: 'hidden' },
  bannerImg: { width: '100%', height: '100%', objectFit: 'cover' },
  bannerOverlay: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(to top, rgba(26,18,8,0.85) 0%, transparent 50%)',
  },
  bannerContent: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px 28px',
  },
  backBtn: {
    alignSelf: 'flex-start',
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
    padding: '7px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13,
    fontFamily: 'DM Sans, sans-serif',
    backdropFilter: 'blur(8px)',
  },
  stallName: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 28,
    fontWeight: 800,
    color: '#fff',
  },
  stallInfo: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 },
  container: { maxWidth: 1200, margin: '0 auto', padding: '28px 24px 48px' },
  sectionTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 20,
    color: '#1A1208',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 20,
  },
  modalBg: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(26,18,8,0.6)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
  },
  modal: {
    background: '#fff',
    borderRadius: '20px 20px 0 0',
    padding: '28px 24px 40px',
    width: '100%',
    maxWidth: 520,
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  field: { marginBottom: 18 },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 700,
    color: '#1A1208',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  qtyBtn: {
    width: 36,
    height: 36,
    border: '2px solid #F0E6D9',
    borderRadius: 8,
    background: '#fff',
    fontSize: 20,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
