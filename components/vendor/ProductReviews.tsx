'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/authContext'

interface Review {
  _id: string
  stallId: string
  productName: string
  customerName: string
  rating: number
  comment: string
  createdAt: string
  images: string[]
  reply?: string
}

export default function ProductReviews() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = user?.stallId
          ? `/api/reviews?stallId=${user.stallId}`
          : '/api/reviews'
        const res = await fetch(url)
        const data = await res.json()
        if (Array.isArray(data)) setReviews(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
    const interval = setInterval(fetchReviews, 10000)
    return () => clearInterval(interval)
  }, [user])

  const handleReplySubmit = async (id: string) => {
    if (!replyText.trim()) return
    try {
      await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: replyText }),
      })
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, reply: replyText } : r)),
      )
    } catch (e) {
      console.error(e)
    }
    setActiveReplyId(null)
    setReplyText('')
  }

  const renderStars = (rating: number) =>
    '⭐'.repeat(rating) + '☆'.repeat(5 - rating)

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <div style={{ fontSize: 32 }}>⏳</div>
        <p style={{ color: '#8B7355', marginTop: 12 }}>Loading reviews...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 22,
            fontWeight: 700,
            color: '#1A1208',
            marginBottom: 4,
          }}
        >
          Customer Reviews
        </h2>
        <p style={{ fontSize: 14, color: '#8B7355' }}>
          {reviews.length} review{reviews.length !== 1 ? 's' : ''} — respond to
          customer feedback
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {reviews.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
            <p style={{ color: '#8B7355' }}>
              No reviews yet. They'll appear here once customers review your
              products.
            </p>
          </div>
        )}

        {reviews.map((review) => (
          <div
            key={review._id}
            style={{
              background: '#fff',
              border: '1px solid #F0E6D9',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <div
                    style={{ fontSize: 14, color: '#FF6B2B', marginBottom: 4 }}
                  >
                    {renderStars(review.rating)}
                  </div>
                  <h4
                    style={{ fontSize: 16, fontWeight: 700, color: '#1A1208' }}
                  >
                    {review.customerName}
                  </h4>
                  <span style={{ fontSize: 12, color: '#C4A882' }}>
                    {new Date(review.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div
                  style={{
                    background: '#FFF8F0',
                    color: '#FF6B2B',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 20,
                    border: '1px solid #FFEDDA',
                  }}
                >
                  {review.productName}
                </div>
              </div>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#1A1208',
                  marginBottom: 16,
                }}
              >
                {review.comment}
              </p>

              {review.images?.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 16,
                    flexWrap: 'wrap',
                  }}
                >
                  {review.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 8,
                        border: '1px solid #F0E6D9',
                      }}
                    />
                  ))}
                </div>
              )}

              {review.reply ? (
                <div
                  style={{
                    background: '#F9F6F2',
                    borderRadius: 12,
                    padding: '12px 16px',
                    marginTop: 8,
                    borderLeft: '4px solid #FF6B2B',
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#1A1208',
                      marginBottom: 6,
                    }}
                  >
                    Your Response
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: '#4A3728',
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                    }}
                  >
                    {review.reply}
                  </p>
                </div>
              ) : activeReplyId === review._id ? (
                <div style={{ marginTop: 12 }}>
                  <textarea
                    style={{
                      width: '100%',
                      minHeight: 80,
                      padding: '12px',
                      borderRadius: 10,
                      border: '1px solid #F0E6D9',
                      fontSize: 13,
                      marginBottom: 8,
                      resize: 'vertical',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                    placeholder="Write your response to the customer..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <button
                      onClick={() => setActiveReplyId(null)}
                      style={{
                        padding: '6px 16px',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif',
                        background: 'none',
                        border: '1px solid #F0E6D9',
                        color: '#8B7355',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReplySubmit(review._id)}
                      style={{
                        padding: '6px 16px',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif',
                        background: '#FF6B2B',
                        border: 'none',
                        color: '#fff',
                      }}
                    >
                      Submit Response
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setActiveReplyId(review._id)
                    setReplyText('')
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FF6B2B',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '4px 0',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  ↩️ Reply to Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
