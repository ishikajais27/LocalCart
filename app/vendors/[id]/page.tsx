'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import UserHeader from '@/components/user/UserHeader'
import Checkout from '@/components/user/Checkout'

export default function VendorDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [stall, setStall] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [cart, setCart] = useState<any[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      try {
        const [stallRes, productsRes] = await Promise.all([
          fetch(`/api/stalls/${id}`),
          fetch(`/api/products?stallId=${id}`),
        ])
        const stallData = await stallRes.json()
        const productsData = await productsRes.json()
        setStall(stallData)
        if (Array.isArray(productsData)) setProducts(productsData)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const addToCart = (product: any, variant?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === product._id && i.variant === variant,
      )
      if (existing)
        return prev.map((i) =>
          i.productId === product._id && i.variant === variant
            ? { ...i, qty: i.qty + 1 }
            : i,
        )
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          qty: 1,
          variant,
          image: product.image,
          stallName: stall?.name,
          stallId: id,
        },
      ]
    })
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  if (loading)
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
        <p style={{ color: '#8B7355', fontFamily: 'DM Sans, sans-serif' }}>
          Loading stall...
        </p>
      </div>
    )

  if (!stall)
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#FFF8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 48 }}>🏪</div>
        <p style={{ color: '#8B7355', fontFamily: 'DM Sans, sans-serif' }}>
          Stall not found.
        </p>
        <button
          onClick={() => router.push('/search')}
          style={{
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
    )

  if (orderSuccess)
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#FFF8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 16,
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        <div style={{ fontSize: 64 }}>🎉</div>
        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 24,
            fontWeight: 800,
            color: '#1A1208',
          }}
        >
          Order Placed!
        </h2>
        <p style={{ color: '#8B7355' }}>
          Your order has been sent to {stall.name}
        </p>
        <button
          onClick={() => router.push('/orders')}
          style={{
            background: '#FF6B2B',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '12px 28px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Track Order
        </button>
      </div>
    )

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFF8F0',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      <UserHeader />

      {/* Stall Hero */}
      <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
        <img
          src={
            stall.image ||
            'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800'
          }
          alt={stall.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(26,18,8,0.7), transparent)',
          }}
        />
        <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                background: stall.isOpen ? '#dcfce7' : '#fee2e2',
                color: stall.isOpen ? '#16a34a' : '#dc2626',
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 20,
              }}
            >
              {stall.isOpen ? '● Open' : '● Closed'}
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 28,
              fontWeight: 800,
              color: '#fff',
              marginBottom: 4,
            }}
          >
            {stall.name}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
            📍 {stall.location} · ⭐ {stall.rating || 'New'} · Min ₹
            {stall.minOrder}
          </p>
        </div>
      </div>

      <div
        style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 120px' }}
      >
        {stall.description && (
          <p
            style={{
              fontSize: 14,
              color: '#8B7355',
              marginBottom: 24,
              lineHeight: 1.6,
            }}
          >
            {stall.description}
          </p>
        )}

        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 20,
            fontWeight: 800,
            color: '#1A1208',
            marginBottom: 16,
          }}
        >
          Menu
        </h2>

        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48 }}>📦</div>
            <p style={{ color: '#8B7355', marginTop: 12 }}>
              No products listed yet.
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
            {products.map((product) => (
              <div
                key={product._id}
                style={{
                  background: '#fff',
                  borderRadius: 14,
                  border: '1px solid #F0E6D9',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(26,18,8,0.05)',
                }}
              >
                <div style={{ position: 'relative', height: 160 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {product.originalPrice && (
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
                      {Math.round(
                        (1 - product.price / product.originalPrice) * 100,
                      )}
                      % OFF
                    </div>
                  )}
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <p
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#1A1208',
                      marginBottom: 4,
                    }}
                  >
                    {product.name}
                  </p>
                  {product.description && (
                    <p
                      style={{
                        fontSize: 12,
                        color: '#8B7355',
                        marginBottom: 8,
                        lineHeight: 1.5,
                      }}
                    >
                      {product.description}
                    </p>
                  )}
                  {product.variants?.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        gap: 6,
                        flexWrap: 'wrap',
                        marginBottom: 8,
                      }}
                    >
                      {product.variants.map((v: string) => (
                        <span
                          key={v}
                          style={{
                            fontSize: 11,
                            background: '#FFF8F0',
                            border: '1px solid #F0E6D9',
                            borderRadius: 6,
                            padding: '3px 8px',
                            color: '#8B7355',
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
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: 'Syne, sans-serif',
                          fontSize: 17,
                          fontWeight: 800,
                          color: '#1A1208',
                        }}
                      >
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span
                          style={{
                            fontSize: 12,
                            color: '#C4A882',
                            textDecoration: 'line-through',
                            marginLeft: 6,
                          }}
                        >
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        background: '#FF6B2B',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '7px 16px',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Bar */}
      {cartCount > 0 && !showCheckout && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 200,
          }}
        >
          <button
            onClick={() => setShowCheckout(true)}
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
              boxShadow: '0 8px 32px rgba(255,107,43,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: 26,
                height: 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              {cartCount}
            </span>
            View Cart · ₹{cartTotal}
          </button>
        </div>
      )}

      {showCheckout && (
        <Checkout
          cart={cart}
          stallName={stall.name}
          stallId={id}
          stallCategory={stall.category}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false)
            setCart([])
            setOrderSuccess(true)
          }}
        />
      )}
    </div>
  )
}
