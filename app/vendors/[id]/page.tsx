'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { getAllStalls, getAllProducts } from '@/lib/stallsStore'
import UserHeader from '@/components/user/UserHeader'
import Checkout from '@/components/user/Checkout'
import WriteReview from '@/components/user/WriteReview'

const VENDOR_STORIES: Record<
  string,
  {
    name: string
    years: string
    highlight: string
    story: string
    stats: { orders: number; rating: number; delivery: string }
  }
> = {
  s1: {
    name: 'Meera Sharma',
    years: 'over 8 years',
    highlight: 'every candle is a little prayer she pours with her own hands.',
    story:
      'Meera started making candles in her small flat in Patia after her mother passed — it was a way to keep the warmth alive. What began as grief became her greatest gift to the world. She works late into the night, hand-pouring each candle while her daughter sleeps. Every order you place keeps her studio lit — and her dream burning.',
    stats: { orders: 124, rating: 4.8, delivery: '2–3 days' },
  },
  s2: {
    name: 'Raj Kumar',
    years: 'over 15 years',
    highlight:
      'his hands have shaped over 10,000 pieces of clay into something the earth is proud of.',
    story:
      "Raj learned pottery from his grandfather in a tiny workshop near Jaipur Haat. He moved to Bhubaneswar with nothing but a wheel and a dream. Every mug, every vase carries the fingerprints of a man who chose craft over comfort. When you hold one of his pieces, you're holding a piece of his story.",
    stats: { orders: 89, rating: 4.6, delivery: '3–5 days' },
  },
  s3: {
    name: 'Priya Kapoor',
    years: 'over 6 years',
    highlight:
      'she believes every woman deserves to wear something made just for her.',
    story:
      "Priya quit her corporate job to follow the only thing that ever made her truly happy — making jewellery. She works from a tiny table in IRC Village, surrounded by beads, wire, and dreams. Her pieces aren't just accessories; they're conversations. Each one is made to be worn by someone who knows their own worth.",
    stats: { orders: 203, rating: 4.9, delivery: '1–2 days' },
  },
  s4: {
    name: 'Arjun Sahoo',
    years: 'over 12 years',
    highlight:
      'his recipes have not changed — because some things are already perfect.',
    story:
      "Arjun's father ran a chaat stall in Chandni Chowk. When he passed, Arjun carried the recipes in his heart all the way to Bhubaneswar. His food isn't just street food — it's memory, served hot. Locals queue before he even sets up. Every bite is decades of love and a son's promise kept.",
    stats: { orders: 512, rating: 4.7, delivery: '45 min' },
  },
  s5: {
    name: 'Sunita Das',
    years: 'over 10 years',
    highlight: 'she paints the world she wishes more people could see.',
    story:
      'Sunita grew up in a small village outside Bhubaneswar, where she drew on anything she could find — newspaper margins, mud walls, scraps of fabric. Today, her watercolors hang in homes across the country. She still paints at dawn, before the world gets too loud, capturing light that most people sleep through.',
    stats: { orders: 67, rating: 4.5, delivery: '5–7 days' },
  },
  s6: {
    name: 'Deepa Mohanty',
    years: 'over 5 years',
    highlight: 'she talks to every plant before she sends it to its new home.',
    story:
      'Deepa started her plant nursery on a terrace in Niladri Vihar with 12 plants and a watering can. Now she tends to over 300 varieties. She says plants teach patience — something she also learned raising her two kids alone. Each plant she packs comes with a hand-written care note. Because growing things takes love, not just water.',
    stats: { orders: 44, rating: 4.4, delivery: '1 day' },
  },
}

const DEFAULT_STORY = (stall: any) => ({
  name: stall.name,
  years: 'several years',
  highlight: 'bringing quality handmade products to your doorstep.',
  story: `${stall.name} is a passionate local vendor based in ${stall.location}. Every product is crafted with care and love, supporting the local artisan community of Bhubaneswar.`,
  stats: {
    orders: stall.reviewCount || 10,
    rating: stall.rating || 4.5,
    delivery: stall.deliveryTime || '2-3 days',
  },
})

interface CartItem {
  productId: string
  name: string
  price: number
  qty: number
  variant?: string
  image: string
  stallName: string
}

export default function VendorDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const allStalls = getAllStalls()
  const allProducts = getAllProducts()

  const stall = allStalls.find((s) => s.id === id)
  const products = allProducts[id] || []
  const story = VENDOR_STORIES[id] || (stall ? DEFAULT_STORY(stall) : null)

  const [cart, setCart] = useState<Record<string, number>>({})
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({})
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [showReview, setShowReview] = useState(false)

  if (!stall || !story) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#FFF8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48 }}>🏪</div>
          <p style={{ color: '#8B7355', marginTop: 12 }}>Stall not found.</p>
          <button onClick={() => router.push('/search')} style={styles.backBtn}>
            ← Back to Search
          </button>
        </div>
      </div>
    )
  }

  const addToCart = (productId: string) =>
    setCart((c) => ({ ...c, [productId]: (c[productId] || 0) + 1 }))
  const removeFromCart = (productId: string) => {
    setCart((c) => {
      const next = { ...c }
      if (next[productId] > 1) next[productId]--
      else delete next[productId]
      return next
    })
  }

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)
  const totalPrice = Object.entries(cart).reduce((sum, [pid, qty]) => {
    const p = products.find((x: any) => x.id === pid)
    return sum + (p ? p.price * qty : 0)
  }, 0)

  const buildCartItems = (): CartItem[] =>
    Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([pid, qty]) => {
        const p = products.find((x: any) => x.id === pid)
        return {
          productId: pid,
          name: p?.name || '',
          price: p?.price || 0,
          qty,
          variant: selectedVariants[pid],
          image: p?.image || '',
          stallName: stall.name,
        }
      })

  const handleCheckoutSuccess = () => {
    setShowCheckout(false)
    setOrderSuccess(true)
    setCart({})
    setSelectedVariants({})
  }

  if (orderSuccess) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#FFF8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 28,
              fontWeight: 800,
              color: '#1A1208',
              marginBottom: 8,
            }}
          >
            Order Placed!
          </h2>
          <p
            style={{
              fontSize: 15,
              color: '#8B7355',
              marginBottom: 8,
              lineHeight: 1.7,
            }}
          >
            Your order from{' '}
            <strong style={{ color: '#FF6B2B' }}>{stall.name}</strong> has been
            placed successfully.
          </p>
          <p style={{ fontSize: 13, color: '#C4A882', marginBottom: 32 }}>
            {story.name.split(' ')[0]} will get to work on it right away 🙏
          </p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => router.push('/orders')}
              style={{
                background: '#1A1208',
                color: '#fff',
                border: 'none',
                borderRadius: 14,
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              Track Order →
            </button>
            <button
              onClick={() => {
                setOrderSuccess(false)
                router.push('/search')
              }}
              style={{
                background: '#FF6B2B',
                color: '#fff',
                border: 'none',
                borderRadius: 14,
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              Explore More Stalls
            </button>
          </div>
          <div style={{ marginTop: 16 }}>
            <button
              onClick={() => setOrderSuccess(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#8B7355',
                fontSize: 13,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Back to {stall.name}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFF8F0',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      <UserHeader />

      {/* Hero Banner */}
      <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
        <img
          src={stall.image}
          alt={stall.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(26,18,8,0.2) 0%, rgba(26,18,8,0.75) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px 32px',
          }}
        >
          <button
            onClick={() => router.push('/search')}
            style={styles.backBtnWhite}
          >
            ← Back
          </button>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginTop: 12,
            }}
          >
            <div>
              <h1 style={styles.stallTitle}>{stall.name}</h1>
              <p style={styles.stallLocation}>
                📍 {stall.location} · {stall.distance}
              </p>
            </div>
            <div
              style={{
                background: stall.isOpen ? '#dcfce7' : '#fee2e2',
                color: stall.isOpen ? '#16a34a' : '#dc2626',
                fontWeight: 700,
                fontSize: 13,
                padding: '6px 14px',
                borderRadius: 20,
              }}
            >
              {stall.isOpen ? '● Open Now' : '● Closed'}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        {/* Story */}
        <div style={styles.storyCard}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={styles.avatarWrap}>
              <img src={stall.image} alt={story.name} style={styles.avatar} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={styles.storyText}>
                <strong style={{ color: '#1A1208' }}>{story.name}</strong> has
                been crafting{' '}
                <span style={{ color: '#FF6B2B', fontWeight: 600 }}>
                  for {story.years}
                </span>{' '}
                — {story.highlight}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: '#6B5744',
                  lineHeight: 1.8,
                  marginTop: 8,
                }}
              >
                {story.story}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: '#FF6B2B',
                  fontWeight: 700,
                  marginTop: 10,
                  lineHeight: 1.6,
                }}
              >
                Every order you place{' '}
                <span style={{ textDecoration: 'underline' }}>
                  goes directly to {story.name.split(' ')[0]}.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{story.stats.orders}</div>
            <div style={styles.statLabel}>Orders done</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{story.stats.rating}★</div>
            <div style={styles.statLabel}>Avg rating</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{story.stats.delivery}</div>
            <div style={styles.statLabel}>Delivery time</div>
          </div>
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 28,
          }}
        >
          {stall.tags?.map((t: string) => (
            <span key={t} style={styles.tag}>
              {t}
            </span>
          ))}
        </div>

        {/* Products */}
        <h2 style={styles.sectionTitle}>Products</h2>
        {products.length === 0 ? (
          <div
            style={{ textAlign: 'center', padding: '40px 0', color: '#8B7355' }}
          >
            <div style={{ fontSize: 40 }}>📦</div>
            <p style={{ marginTop: 12 }}>No products listed yet.</p>
          </div>
        ) : (
          <div style={styles.productsGrid}>
            {products.map((p: any) => (
              <div key={p.id} style={styles.productCard}>
                <div
                  style={{
                    position: 'relative',
                    height: 180,
                    overflow: 'hidden',
                    borderRadius: '12px 12px 0 0',
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {p.originalPrice && (
                    <div style={styles.discountBadge}>
                      {Math.round((1 - p.price / p.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <h3 style={styles.productName}>{p.name}</h3>
                  <p style={styles.productDesc}>{p.description}</p>
                  {p.variants && p.variants.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        gap: 6,
                        flexWrap: 'wrap',
                        marginBottom: 12,
                      }}
                    >
                      {p.variants.map((v: string) => (
                        <span
                          key={v}
                          onClick={() =>
                            setSelectedVariants((sv) => ({ ...sv, [p.id]: v }))
                          }
                          style={{
                            ...styles.variantChip,
                            background:
                              selectedVariants[p.id] === v
                                ? '#FF6B2B'
                                : '#F0E6D9',
                            color:
                              selectedVariants[p.id] === v ? '#fff' : '#8B7355',
                          }}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 8,
                    }}
                  >
                    <div>
                      <span style={styles.price}>₹{p.price}</span>
                      {p.originalPrice && (
                        <span style={styles.originalPrice}>
                          ₹{p.originalPrice}
                        </span>
                      )}
                    </div>
                    {cart[p.id] ? (
                      <div style={styles.qtyControl}>
                        <button
                          onClick={() => removeFromCart(p.id)}
                          style={styles.qtyBtn}
                        >
                          −
                        </button>
                        <span style={styles.qtyNum}>{cart[p.id]}</span>
                        <button
                          onClick={() => addToCart(p.id)}
                          style={styles.qtyBtn}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(p.id)}
                        style={styles.addBtn}
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart */}
      {totalItems > 0 && (
        <div style={styles.floatingCart}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={styles.cartBadge}>{totalItems}</div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
              {totalItems} item{totalItems > 1 ? 's' : ''} in cart
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>
              ₹{totalPrice}
            </span>
            <button
              style={styles.checkoutBtn}
              onClick={() => setShowCheckout(true)}
            >
              Checkout →
            </button>
          </div>
        </div>
      )}
      {/* Review Button */}
      <button
        onClick={() => setShowReview(true)}
        style={{
          position: 'fixed',
          bottom: totalItems > 0 ? 90 : 24,
          right: 24,
          zIndex: 150,
          background: '#1A1208',
          color: '#fff',
          border: 'none',
          borderRadius: 50,
          padding: '12px 18px',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'Syne, sans-serif',
          boxShadow: '0 8px 24px rgba(26,18,8,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          transition: 'bottom 0.2s',
        }}
      >
        ✍️ Review
      </button>

      {showReview && <WriteReview onClose={() => setShowReview(false)} />}

      {showCheckout && (
        <Checkout
          cart={buildCartItems()}
          stallName={stall.name}
          stallCategory={stall.category || 'default'}
          onClose={() => setShowCheckout(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 900, margin: '0 auto', padding: '28px 24px 100px' },
  backBtn: {
    background: 'none',
    border: '1px solid #F0E6D9',
    borderRadius: 8,
    color: '#8B7355',
    cursor: 'pointer',
    fontSize: 14,
    padding: '8px 16px',
    marginTop: 12,
  },
  backBtnWhite: {
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: 8,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 13,
    padding: '6px 14px',
  },
  stallTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 26,
    fontWeight: 800,
    color: '#fff',
    marginBottom: 4,
  },
  stallLocation: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  storyCard: {
    background: '#fff',
    borderRadius: 16,
    padding: '24px',
    border: '1px solid #F0E6D9',
    marginBottom: 0,
    borderLeft: '4px solid #FF6B2B',
  },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    border: '3px solid #FF6B2B',
  },
  avatar: { width: '100%', height: '100%', objectFit: 'cover' },
  storyText: { fontSize: 15, color: '#3D2A10', lineHeight: 1.75 },
  statsRow: {
    display: 'flex',
    background: '#fff',
    borderRadius: 14,
    border: '1px solid #F0E6D9',
    margin: '20px 0 24px',
    overflow: 'hidden',
  },
  statBox: { flex: 1, padding: '20px 16px', textAlign: 'center' },
  statNumber: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 22,
    fontWeight: 800,
    color: '#FF6B2B',
    marginBottom: 4,
  },
  statLabel: { fontSize: 12, color: '#8B7355', fontWeight: 500 },
  statDivider: { width: 1, background: '#F0E6D9', margin: '12px 0' },
  tag: {
    background: '#FFF0E6',
    color: '#FF6B2B',
    border: '1px solid rgba(255,107,43,0.2)',
    borderRadius: 20,
    padding: '4px 12px',
    fontSize: 12,
    fontWeight: 500,
  },
  sectionTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 20,
    fontWeight: 800,
    color: '#1A1208',
    marginBottom: 16,
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 20,
  },
  productCard: {
    background: '#fff',
    borderRadius: 14,
    border: '1px solid #F0E6D9',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(26,18,8,0.05)',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    background: '#FF6B2B',
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: 6,
  },
  productName: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 15,
    fontWeight: 700,
    color: '#1A1208',
    marginBottom: 4,
  },
  productDesc: {
    fontSize: 12,
    color: '#8B7355',
    marginBottom: 10,
    lineHeight: 1.5,
  },
  variantChip: {
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: 20,
    cursor: 'pointer',
  },
  price: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 17,
    fontWeight: 800,
    color: '#1A1208',
  },
  originalPrice: {
    fontSize: 12,
    color: '#C4A882',
    textDecoration: 'line-through',
    marginLeft: 6,
  },
  addBtn: {
    background: '#FF6B2B',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '7px 16px',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
  },
  qtyControl: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#FFF0E6',
    borderRadius: 8,
    padding: '4px 8px',
  },
  qtyBtn: {
    background: '#FF6B2B',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    width: 26,
    height: 26,
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyNum: {
    fontWeight: 700,
    fontSize: 15,
    color: '#1A1208',
    minWidth: 16,
    textAlign: 'center',
  },
  floatingCart: {
    position: 'fixed',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#1A1208',
    borderRadius: 16,
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    boxShadow: '0 8px 32px rgba(26,18,8,0.35)',
    minWidth: 340,
    zIndex: 200,
  },
  cartBadge: {
    background: '#FF6B2B',
    color: '#fff',
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 800,
  },
  checkoutBtn: {
    background: '#FF6B2B',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '8px 20px',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
  },
}

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '../../../lib/authContext'
// import VendorHeader from '../../../components/vendor/Header'
// import VendorOrders from '@/components/vendor/VendorOrders'
// import VendorOnboardForm from '@/components/vendor/VendorOnboardForm'
// import AddProductForm from '@/components/vendor/PreorderForm'
// import ProductReviews from '@/components/vendor/ProductReviews'
// import { MOCK_ORDERS } from '@/lib/mockData'

// export default function VendorPage() {
//   const { user, loading } = useAuth()
//   const router = useRouter()
//   const [tab, setTab] = useState('orders')
//   const [stallLive, setStallLive] = useState(false)
//   const [stallData, setStallData] = useState<any>(null)

//   useEffect(() => {
//     if (!loading && !user) router.push('/account')
//     if (!loading && user?.role === 'user') router.push('/search')
//   }, [user, loading, router])

//   if (loading || !user) return null

//   const totalRevenue = MOCK_ORDERS.filter(
//     (o) => o.status === 'delivered',
//   ).reduce((s, o) => s + o.total, 0)
//   const pendingCount = MOCK_ORDERS.filter((o) => o.status === 'pending').length

//   return (
//     <div style={{ minHeight: '100vh', background: '#FFF8F0' }}>
//       <VendorHeader activeTab={tab} onTabChange={setTab} />

//       <div style={styles.container}>
//         <div style={styles.statsBar}>
//           {[
//             { label: 'Total Orders', value: MOCK_ORDERS.length, icon: '📦' },
//             {
//               label: 'Pending',
//               value: pendingCount,
//               icon: '⏳',
//               highlight: true,
//             },
//             { label: 'Revenue Today', value: `₹${totalRevenue}`, icon: '💰' },
//             {
//               label: 'Stall Status',
//               value: stallLive ? 'Live 🟢' : 'Offline ⚫',
//               icon: '🏪',
//             },
//           ].map((stat) => (
//             <div
//               key={stat.label}
//               style={{
//                 ...styles.statCard,
//                 borderColor:
//                   stat.highlight && pendingCount > 0 ? '#FF6B2B' : '#F0E6D9',
//               }}
//             >
//               <div style={styles.statIcon}>{stat.icon}</div>
//               <div
//                 style={{
//                   ...styles.statValue,
//                   color:
//                     stat.highlight && pendingCount > 0 ? '#FF6B2B' : '#1A1208',
//                 }}
//               >
//                 {stat.value}
//               </div>
//               <div style={styles.statLabel}>{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {!stallLive && tab !== 'stall' && (
//           <div style={styles.onboardBanner}>
//             <div>
//               <h3 style={styles.bannerTitle}>Your stall isn't live yet!</h3>
//               <p style={{ color: '#fff', opacity: 0.8, fontSize: 14 }}>
//                 Set up your stall to start receiving orders from customers
//                 nearby.
//               </p>
//             </div>
//             <button
//               className="btn-primary"
//               style={{ background: '#fff', color: '#FF6B2B' }}
//               onClick={() => setTab('stall')}
//             >
//               Set Up Stall →
//             </button>
//           </div>
//         )}

//         {tab === 'orders' && (
//           <div style={styles.section}>
//             <h2 style={styles.sectionTitle}>Incoming Orders</h2>
//             <VendorOrders />
//           </div>
//         )}

//         {tab === 'stall' && (
//           <div style={styles.section}>
//             {stallLive && stallData ? (
//               <div>
//                 <div style={styles.liveHeader}>
//                   <div>
//                     <h2 style={styles.sectionTitle}>Your Stall is Live! 🟢</h2>
//                     <p style={{ color: '#8B7355', fontSize: 14 }}>
//                       Customers can now find and order from your stall.
//                     </p>
//                   </div>
//                   <button
//                     className="btn-secondary"
//                     onClick={() => {
//                       setStallLive(false)
//                       setStallData(null)
//                     }}
//                   >
//                     Take Offline
//                   </button>
//                 </div>
//                 <div style={styles.stallPreview}>
//                   {[
//                     { label: 'Name', value: stallData.name },
//                     { label: 'Category', value: stallData.category },
//                     { label: 'Location', value: stallData.location },
//                     {
//                       label: 'Timings',
//                       value: `${stallData.openTime} – ${stallData.closeTime}`,
//                     },
//                     { label: 'Min Order', value: `₹${stallData.minOrder}` },
//                   ].map((item) => (
//                     <div key={item.label} style={styles.previewRow}>
//                       <span style={styles.previewLabel}>{item.label}</span>
//                       <span style={styles.previewValue}>{item.value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <h2 style={styles.sectionTitle}>Set Up Your Stall</h2>
//                 <VendorOnboardForm
//                   onComplete={(data) => {
//                     setStallData(data)
//                     setStallLive(true)
//                     setTab('orders')
//                   }}
//                 />
//               </>
//             )}
//           </div>
//         )}

//         {tab === 'add' && (
//           <div style={styles.section}>
//             <AddProductForm />
//           </div>
//         )}

//         {tab === 'reviews' && (
//           <div style={styles.section}>
//             <ProductReviews />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// const styles: Record<string, React.CSSProperties> = {
//   container: { maxWidth: 1200, margin: '0 auto', padding: '28px 24px 60px' },
//   statsBar: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(4, 1fr)',
//     gap: 16,
//     marginBottom: 24,
//   },
//   statCard: {
//     background: '#fff',
//     border: '2px solid #F0E6D9',
//     borderRadius: 14,
//     padding: '18px 16px',
//     textAlign: 'center',
//   },
//   statIcon: { fontSize: 24, marginBottom: 8 },
//   statValue: {
//     fontFamily: 'Syne, sans-serif',
//     fontSize: 22,
//     fontWeight: 800,
//     marginBottom: 4,
//   },
//   statLabel: { fontSize: 12, color: '#8B7355', fontWeight: 500 },
//   onboardBanner: {
//     background: 'linear-gradient(135deg, #FF6B2B 0%, #E5500A 100%)',
//     borderRadius: 16,
//     padding: '20px 24px',
//     marginBottom: 24,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     gap: 16,
//   },
//   bannerTitle: {
//     fontFamily: 'Syne, sans-serif',
//     fontSize: 18,
//     fontWeight: 700,
//     color: '#fff',
//     marginBottom: 4,
//   },
//   section: {
//     background: '#fff',
//     border: '1px solid #F0E6D9',
//     borderRadius: 16,
//     padding: '24px',
//   },
//   sectionTitle: {
//     fontFamily: 'Syne, sans-serif',
//     fontSize: 22,
//     fontWeight: 700,
//     color: '#1A1208',
//     marginBottom: 20,
//   },
//   liveHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 20,
//   },
//   stallPreview: {
//     background: '#FFF8F0',
//     borderRadius: 12,
//     border: '1px solid #F0E6D9',
//     overflow: 'hidden',
//   },
//   previewRow: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: '12px 16px',
//     borderBottom: '1px solid #F0E6D9',
//   },
//   previewLabel: { fontSize: 13, color: '#8B7355' },
//   previewValue: { fontSize: 13, fontWeight: 600, color: '#1A1208' },
// }
