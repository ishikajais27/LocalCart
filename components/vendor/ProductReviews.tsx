import React, { useState } from 'react'
import { MOCK_REVIEWS } from '@/lib/mockData'

interface Review {
  id: string
  productId: string
  productName: string
  customerName: string
  rating: number
  comment: string
  date: string
  images: string[]
  reply?: string
}

export default function ProductReviews() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS)
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  const handleReplySubmit = (id: string) => {
    if (!replyText.trim()) return
    setReviews((prev: Review[]) =>
      prev.map((r: Review) => (r.id === id ? { ...r, reply: replyText } : r)),
    )
    setActiveReplyId(null)
    setReplyText('')
  }

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Customer Reviews</h2>
        <p style={styles.subtitle}>
          Manage and respond to feedback from your customers.
        </p>
      </div>

      <div style={styles.reviewList}>
        {reviews.length === 0 && (
          <div style={styles.emptyState}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
            <p style={{ color: '#8B7355' }}>No reviews yet.</p>
          </div>
        )}

        {reviews.map((review) => (
          <div key={review.id} style={styles.reviewCard}>
            <div style={styles.reviewMain}>
              <div style={styles.reviewHeader}>
                <div style={styles.reviewerInfo}>
                  <div style={styles.rating}>{renderStars(review.rating)}</div>
                  <h4 style={styles.reviewerName}>{review.customerName}</h4>
                  <span style={styles.reviewDate}>{review.date}</span>
                </div>
                <div style={styles.productBadge}>{review.productName}</div>
              </div>

              <p style={styles.comment}>{review.comment}</p>

              {review.images.length > 0 && (
                <div style={styles.imageGallery}>
                  {review.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Review image ${idx + 1}`}
                      style={styles.reviewImage}
                    />
                  ))}
                </div>
              )}

              {review.reply ? (
                <div style={styles.vendorReplyBox}>
                  <div style={styles.replyHeader}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>
                      Your Response
                    </span>
                  </div>
                  <p style={styles.replyContent}>{review.reply}</p>
                </div>
              ) : activeReplyId === review.id ? (
                <div style={styles.replyActionBox}>
                  <textarea
                    style={styles.replyTextArea}
                    placeholder="Write your response to the customer..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div style={styles.buttonGroup}>
                    <button
                      onClick={() => setActiveReplyId(null)}
                      style={{ ...styles.button, ...styles.cancelButton }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReplySubmit(review.id)}
                      style={{ ...styles.button, ...styles.submitButton }}
                    >
                      Submit Response
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setActiveReplyId(review.id)
                    setReplyText('')
                  }}
                  style={styles.replyTrigger}
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

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '8px 0',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 22,
    fontWeight: 700,
    color: '#1A1208',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8B7355',
  },
  reviewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  reviewCard: {
    background: '#fff',
    border: '1px solid #F0E6D9',
    borderRadius: 16,
    overflow: 'hidden',
    transition: 'all 0.2s',
  },
  reviewMain: {
    padding: '20px',
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  rating: {
    fontSize: 14,
    color: '#FF6B2B',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1A1208',
  },
  reviewDate: {
    fontSize: 12,
    color: '#C4A882',
  },
  productBadge: {
    background: '#FFF8F0',
    color: '#FF6B2B',
    fontSize: 11,
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: 20,
    border: '1px solid #FFEDDA',
  },
  comment: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#1A1208',
    marginBottom: 16,
  },
  imageGallery: {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  reviewImage: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    borderRadius: 8,
    border: '1px solid #F0E6D9',
  },
  replyTrigger: {
    background: 'none',
    border: 'none',
    color: '#FF6B2B',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '4px 0',
    fontFamily: 'DM Sans, sans-serif',
  },
  vendorReplyBox: {
    background: '#F9F6F2',
    borderRadius: 12,
    padding: '12px 16px',
    marginTop: 8,
    borderLeft: '4px solid #FF6B2B',
  },
  replyHeader: {
    marginBottom: 6,
    color: '#1A1208',
  },
  replyContent: {
    fontSize: 13,
    color: '#4A3728',
    fontStyle: 'italic',
    lineHeight: 1.5,
  },
  replyActionBox: {
    marginTop: 12,
  },
  replyTextArea: {
    width: '100%',
    minHeight: 80,
    padding: '12px',
    borderRadius: 10,
    border: '1px solid #F0E6D9',
    fontSize: 13,
    marginBottom: 8,
    resize: 'vertical',
  },
  buttonGroup: {
    display: 'flex',
    gap: 8,
    justifyContent: 'flex-end',
  },
  button: {
    padding: '6px 16px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif',
    transition: 'all 0.2s',
  },
  cancelButton: {
    background: 'none',
    border: '1px solid #F0E6D9',
    color: '#8B7355',
  },
  submitButton: {
    background: '#FF6B2B',
    border: 'none',
    color: '#fff',
  },
  emptyState: {
    textAlign: 'center',
    padding: '48px 0',
  },
}
