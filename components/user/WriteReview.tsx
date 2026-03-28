'use client'
import { useState } from 'react'
import { STALLS, PRODUCTS } from '@/lib/mockData'

interface WriteReviewProps {
  onClose: () => void
}

export default function WriteReview({ onClose }: WriteReviewProps) {
  const [step, setStep] = useState<'stall' | 'product' | 'review'>('stall')
  const [selectedStall, setSelectedStall] = useState<string>('')
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [stallSearch, setStallSearch] = useState('')

  const filteredStalls = STALLS.filter(
    (s) =>
      s.name.toLowerCase().includes(stallSearch.toLowerCase()) ||
      s.location.toLowerCase().includes(stallSearch.toLowerCase()),
  ).slice(0, 20)

  const stallProducts = selectedStall ? PRODUCTS[selectedStall] || [] : []
  const currentStall = STALLS.find((s) => s.id === selectedStall)
  const currentProduct = stallProducts.find(
    (p: any) => p.id === selectedProduct,
  )

  const handleSubmit = () => {
    if (!rating || !comment.trim()) return
    setSubmitted(true)
  }

  const resetAll = () => {
    setStep('stall')
    setSelectedStall('')
    setSelectedProduct('')
    setRating(0)
    setHoverRating(0)
    setComment('')
    setSubmitted(false)
    setStallSearch('')
  }

  if (submitted) {
    return (
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={{ textAlign: 'center', padding: '40px 24px' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🌟</div>
            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 24,
                fontWeight: 800,
                color: '#1A1208',
                marginBottom: 8,
              }}
            >
              Review Submitted!
            </h2>
            <p style={{ fontSize: 14, color: '#8B7355', marginBottom: 8 }}>
              Thank you for reviewing{' '}
              <strong style={{ color: '#FF6B2B' }}>
                {currentProduct?.name}
              </strong>
            </p>
            <p style={{ fontSize: 13, color: '#C4A882', marginBottom: 32 }}>
              from {currentStall?.name}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={resetAll} style={styles.btnSecondary}>
                Write Another
              </button>
              <button onClick={onClose} style={styles.btnPrimary}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Write a Review</h2>
            <div style={styles.stepIndicator}>
              {['stall', 'product', 'review'].map((s, i) => (
                <div
                  key={s}
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background:
                        step === s
                          ? '#FF6B2B'
                          : (s === 'product' &&
                                (step === 'product' || step === 'review')) ||
                              (s === 'review' && step === 'review') ||
                              (s === 'stall' && selectedStall)
                            ? '#FF6B2B'
                            : '#F0E6D9',
                      color: step === s || selectedStall ? '#fff' : '#C4A882',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 800,
                      transition: 'all 0.2s',
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: step === s ? '#FF6B2B' : '#C4A882',
                      fontWeight: step === s ? 700 : 400,
                      textTransform: 'capitalize',
                    }}
                  >
                    {s}
                  </span>
                  {i < 2 && (
                    <div
                      style={{
                        width: 20,
                        height: 1,
                        background: '#F0E6D9',
                        margin: '0 4px',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>
            ✕
          </button>
        </div>

        <div
          style={{
            padding: '0 24px 24px',
            overflowY: 'auto',
            maxHeight: 'calc(90vh - 120px)',
          }}
        >
          {/* STEP 1: Select Stall */}
          {step === 'stall' && (
            <div>
              <p style={styles.stepLabel}>Select a Stall</p>
              <div style={styles.searchBox}>
                <span style={{ color: '#C4A882', fontSize: 14 }}>🔍</span>
                <input
                  style={styles.searchInput}
                  placeholder="Search stalls…"
                  value={stallSearch}
                  onChange={(e) => setStallSearch(e.target.value)}
                  autoFocus
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  marginTop: 12,
                }}
              >
                {filteredStalls.map((stall) => (
                  <div
                    key={stall.id}
                    onClick={() => {
                      setSelectedStall(stall.id)
                      setSelectedProduct('')
                      setStep('product')
                    }}
                    style={{
                      ...styles.listItem,
                      border: `1.5px solid ${selectedStall === stall.id ? '#FF6B2B' : '#F0E6D9'}`,
                      background:
                        selectedStall === stall.id ? '#FFF0E6' : '#fff',
                    }}
                  >
                    <img
                      src={stall.image}
                      alt={stall.name}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: '#1A1208',
                          fontFamily: 'Syne, sans-serif',
                        }}
                      >
                        {stall.name}
                      </p>
                      <p
                        style={{ fontSize: 12, color: '#8B7355', marginTop: 2 }}
                      >
                        📍 {stall.location}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        color: '#FF6B2B',
                        fontWeight: 700,
                      }}
                    >
                      ⭐ {stall.rating}
                    </span>
                  </div>
                ))}
                {filteredStalls.length === 0 && (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '40px 0',
                      color: '#8B7355',
                    }}
                  >
                    <div style={{ fontSize: 32 }}>🏪</div>
                    <p style={{ marginTop: 8, fontSize: 13 }}>
                      No stalls found
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Select Product */}
          {step === 'product' && (
            <div>
              <button onClick={() => setStep('stall')} style={styles.backBtn}>
                ← Back
              </button>
              <div style={styles.selectedBanner}>
                <img
                  src={currentStall?.image}
                  alt=""
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    objectFit: 'cover',
                  }}
                />
                <div>
                  <p
                    style={{ fontSize: 13, fontWeight: 700, color: '#1A1208' }}
                  >
                    {currentStall?.name}
                  </p>
                  <p style={{ fontSize: 11, color: '#8B7355' }}>
                    📍 {currentStall?.location}
                  </p>
                </div>
              </div>
              <p style={styles.stepLabel}>Select a Product</p>
              {stallProducts.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '40px 0',
                    color: '#8B7355',
                  }}
                >
                  <div style={{ fontSize: 32 }}>📦</div>
                  <p style={{ marginTop: 8, fontSize: 13 }}>
                    No products available for this stall
                  </p>
                  <button
                    onClick={() => setStep('stall')}
                    style={{ ...styles.btnSecondary, marginTop: 16 }}
                  >
                    Choose another stall
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    marginTop: 12,
                  }}
                >
                  {stallProducts.map((product: any) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product.id)
                        setStep('review')
                      }}
                      style={{
                        ...styles.listItem,
                        border: `1.5px solid ${selectedProduct === product.id ? '#FF6B2B' : '#F0E6D9'}`,
                        background:
                          selectedProduct === product.id ? '#FFF0E6' : '#fff',
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 10,
                          objectFit: 'cover',
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: '#1A1208',
                            fontFamily: 'Syne, sans-serif',
                          }}
                        >
                          {product.name}
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            color: '#8B7355',
                            marginTop: 2,
                          }}
                        >
                          ₹{product.price}
                        </p>
                      </div>
                      {product.originalPrice && (
                        <span style={styles.discountTag}>
                          {Math.round(
                            (1 - product.price / product.originalPrice) * 100,
                          )}
                          % OFF
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Write Review */}
          {step === 'review' && (
            <div>
              <button onClick={() => setStep('product')} style={styles.backBtn}>
                ← Back
              </button>
              <div style={styles.selectedBanner}>
                <img
                  src={currentProduct?.image}
                  alt=""
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    objectFit: 'cover',
                  }}
                />
                <div>
                  <p
                    style={{ fontSize: 13, fontWeight: 700, color: '#1A1208' }}
                  >
                    {currentProduct?.name}
                  </p>
                  <p style={{ fontSize: 11, color: '#8B7355' }}>
                    from {currentStall?.name}
                  </p>
                </div>
              </div>

              <p style={styles.stepLabel}>Rate this product</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 36,
                      transition: 'transform 0.1s',
                      transform:
                        (hoverRating || rating) >= star
                          ? 'scale(1.15)'
                          : 'scale(1)',
                      filter:
                        (hoverRating || rating) >= star
                          ? 'none'
                          : 'grayscale(1) opacity(0.3)',
                    }}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p
                  style={{
                    fontSize: 13,
                    color: '#FF6B2B',
                    fontWeight: 700,
                    marginBottom: 16,
                    marginTop: -16,
                  }}
                >
                  {
                    [
                      '',
                      'Poor 😞',
                      'Fair 😐',
                      'Good 🙂',
                      'Great 😊',
                      'Excellent 🤩',
                    ][rating]
                  }
                </p>
              )}

              <p style={styles.stepLabel}>Your Review</p>
              <textarea
                style={styles.textarea}
                placeholder="Tell others what you loved (or didn't love) about this product…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                maxLength={500}
              />
              <p
                style={{
                  fontSize: 11,
                  color: '#C4A882',
                  textAlign: 'right',
                  marginTop: 4,
                }}
              >
                {comment.length}/500
              </p>

              <button
                onClick={handleSubmit}
                disabled={!rating || !comment.trim()}
                style={{
                  ...styles.btnPrimary,
                  width: '100%',
                  marginTop: 16,
                  opacity: !rating || !comment.trim() ? 0.5 : 1,
                  cursor:
                    !rating || !comment.trim() ? 'not-allowed' : 'pointer',
                }}
              >
                Submit Review ✨
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(26,18,8,0.55)',
    zIndex: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    background: '#fff',
    borderRadius: 20,
    width: '100%',
    maxWidth: 520,
    maxHeight: '90vh',
    boxShadow: '0 24px 80px rgba(26,18,8,0.25)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '20px 24px 16px',
    borderBottom: '1px solid #F0E6D9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    background: '#FFF8F0',
    flexShrink: 0,
  },
  title: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 20,
    fontWeight: 800,
    color: '#1A1208',
    marginBottom: 8,
  },
  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  closeBtn: {
    background: '#F0E6D9',
    border: 'none',
    borderRadius: 8,
    width: 32,
    height: 32,
    cursor: 'pointer',
    fontSize: 13,
    color: '#8B7355',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: '#8B7355',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 12,
    marginTop: 20,
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#FFF8F0',
    border: '1.5px solid #F0E6D9',
    borderRadius: 10,
    padding: '10px 14px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: 14,
    background: 'transparent',
    fontFamily: 'DM Sans, sans-serif',
    flex: 1,
    color: '#1A1208',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  selectedBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#FFF0E6',
    border: '1px solid rgba(255,107,43,0.2)',
    borderRadius: 10,
    padding: '10px 14px',
    marginTop: 12,
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#8B7355',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '4px 0',
    marginTop: 8,
    fontFamily: 'DM Sans, sans-serif',
  },
  discountTag: {
    background: '#FF6B2B',
    color: '#fff',
    fontSize: 10,
    fontWeight: 700,
    padding: '2px 7px',
    borderRadius: 6,
    flexShrink: 0,
  },
  textarea: {
    width: '100%',
    border: '1.5px solid #F0E6D9',
    borderRadius: 12,
    padding: '12px 14px',
    fontSize: 14,
    fontFamily: 'DM Sans, sans-serif',
    color: '#1A1208',
    background: '#FFF8F0',
    resize: 'vertical',
    lineHeight: 1.6,
  },
  btnPrimary: {
    background: '#FF6B2B',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '13px 24px',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Syne, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnSecondary: {
    background: 'transparent',
    color: '#FF6B2B',
    border: '2px solid #FF6B2B',
    borderRadius: 12,
    padding: '10px 22px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif',
  },
}
