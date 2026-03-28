// 'use client'
// import { useState, useEffect } from 'react'
// import { useAuth } from '@/lib/authContext'
// import { motion, AnimatePresence, Variants } from 'framer-motion'

// interface Review {
//   _id: string
//   stallId: string
//   productName: string
//   customerName: string
//   rating: number
//   comment: string
//   createdAt: string
//   images: string[]
//   reply?: string
// }

// const staggerParent: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
// }

// const cardItem: Variants = {
//   hidden: { opacity: 0, y: 16, scale: 0.97 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { type: 'spring', stiffness: 280, damping: 24 },
//   },
// }

// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 16 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
//   },
// }

// const headerParent: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.11 } },
// }

// const headerChild: Variants = {
//   hidden: { opacity: 0, y: 18 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
//   },
// }

// export default function ProductReviews() {
//   const { user } = useAuth()
//   const [reviews, setReviews] = useState<Review[]>([])
//   const [loading, setLoading] = useState(true)
//   const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
//   const [replyText, setReplyText] = useState('')

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const url = user?.stallId
//           ? `/api/reviews?stallId=${user.stallId}`
//           : '/api/reviews'
//         const res = await fetch(url)
//         const data = await res.json()
//         if (Array.isArray(data)) setReviews(data)
//       } catch (e) {
//         console.error(e)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchReviews()
//     const interval = setInterval(fetchReviews, 10000)
//     return () => clearInterval(interval)
//   }, [user])

//   const handleReplySubmit = async (id: string) => {
//     if (!replyText.trim()) return
//     try {
//       await fetch(`/api/reviews/${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ reply: replyText }),
//       })
//       setReviews((prev) =>
//         prev.map((r) => (r._id === id ? { ...r, reply: replyText } : r)),
//       )
//     } catch (e) {
//       console.error(e)
//     }
//     setActiveReplyId(null)
//     setReplyText('')
//   }

//   const renderStars = (rating: number) => (
//     <span>
//       {'⭐'.repeat(rating)}
//       <span style={{ opacity: 0.3 }}>{'☆'.repeat(5 - rating)}</span>
//     </span>
//   )

//   if (loading) {
//     return (
//       <motion.div
//         className="flex flex-col items-center justify-center py-16 text-center"
//         variants={fadeUp}
//         initial="hidden"
//         animate="show"
//       >
//         <motion.div
//           className="text-4xl mb-3"
//           animate={{ rotate: [0, 10, -10, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//         >
//           ⏳
//         </motion.div>
//         <p className="text-sm font-medium" style={{ color: '#6B9A7A' }}>
//           Loading reviews...
//         </p>
//       </motion.div>
//     )
//   }

//   return (
//     <div className="py-2">
//       {/* ══ HEADER ══ */}
//       <motion.div
//         className="mb-6"
//         variants={headerParent}
//         initial="hidden"
//         animate="show"
//       >
//         <motion.div variants={headerChild}>
//           <div
//             className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold mb-2"
//             style={{ background: '#D4EDD9', color: '#3A7D52' }}
//           >
//             <span
//               className="w-1.5 h-1.5 rounded-full"
//               style={{ background: '#3A7D52' }}
//             />
//             Customer Feedback
//           </div>
//         </motion.div>
//         <motion.h2
//           variants={headerChild}
//           className="text-2xl font-bold mb-1"
//           style={{ fontFamily: "'Playfair Display', serif", color: '#1C3829' }}
//         >
//           Customer Reviews
//         </motion.h2>
//         <motion.p
//           variants={headerChild}
//           className="text-sm font-medium"
//           style={{ color: '#6B9A7A' }}
//         >
//           {reviews.length} review{reviews.length !== 1 ? 's' : ''} — respond to
//           customer feedback
//         </motion.p>
//       </motion.div>

//       {/* ══ REVIEW LIST ══ */}
//       {reviews.length === 0 ? (
//         <motion.div
//           className="flex flex-col items-center justify-center py-16 text-center rounded-2xl"
//           style={{
//             background: 'linear-gradient(135deg, #EEF7F1, #F5FBF7)',
//             border: '2px dashed #C8E6D0',
//           }}
//           variants={fadeUp}
//           initial="hidden"
//           animate="show"
//         >
//           <motion.div
//             className="text-4xl mb-3"
//             animate={{ y: [0, -8, 0] }}
//             transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//           >
//             💬
//           </motion.div>
//           <p className="text-sm font-medium" style={{ color: '#6B9A7A' }}>
//             No reviews yet. They'll appear here once customers review your
//             products.
//           </p>
//         </motion.div>
//       ) : (
//         <motion.div
//           className="flex flex-col gap-4"
//           variants={staggerParent}
//           initial="hidden"
//           animate="show"
//         >
//           {reviews.map((review) => (
//             <motion.div
//               key={review._id}
//               variants={cardItem}
//               className="rounded-2xl overflow-hidden"
//               style={{
//                 background: '#ffffff',
//                 border: '1.5px solid #E0EFE4',
//                 boxShadow: '0 2px 12px rgba(28,56,41,0.06)',
//               }}
//               whileHover={{
//                 y: -3,
//                 boxShadow: '0 10px 28px rgba(28,56,41,0.1)',
//               }}
//               transition={{ type: 'spring', stiffness: 320, damping: 22 }}
//             >
//               <div className="p-5">
//                 {/* ── Review header ── */}
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex flex-col gap-1">
//                     <div className="text-base mb-1">
//                       {renderStars(review.rating)}
//                     </div>
//                     <h4
//                       className="text-base font-bold"
//                       style={{
//                         fontFamily: "'Playfair Display', serif",
//                         color: '#1C3829',
//                       }}
//                     >
//                       {review.customerName}
//                     </h4>
//                     <span className="text-xs" style={{ color: '#A8C9B0' }}>
//                       {new Date(review.createdAt).toLocaleDateString('en-IN', {
//                         day: 'numeric',
//                         month: 'short',
//                         year: 'numeric',
//                       })}
//                     </span>
//                   </div>

//                   <motion.div
//                     className="text-xs font-bold px-3 py-1.5 rounded-full"
//                     style={{
//                       background: '#EEF7F1',
//                       color: '#4E9A6A',
//                       border: '1px solid #C8E6D0',
//                     }}
//                     initial={{ scale: 0.85, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{
//                       type: 'spring',
//                       stiffness: 400,
//                       damping: 22,
//                       delay: 0.1,
//                     }}
//                   >
//                     {review.productName}
//                   </motion.div>
//                 </div>

//                 {/* ── Comment ── */}
//                 <p
//                   className="text-sm mb-4"
//                   style={{ lineHeight: 1.65, color: '#1C3829' }}
//                 >
//                   {review.comment}
//                 </p>

//                 {/* ── Review images ── */}
//                 {review.images?.length > 0 && (
//                   <div className="flex gap-2 mb-4 flex-wrap">
//                     {review.images.map((img, idx) => (
//                       <motion.img
//                         key={idx}
//                         src={img}
//                         alt=""
//                         className="object-cover rounded-xl"
//                         style={{
//                           width: 80,
//                           height: 80,
//                           border: '1.5px solid #E0EFE4',
//                           boxShadow: '0 2px 8px rgba(28,56,41,0.08)',
//                         }}
//                         whileHover={{ scale: 1.06 }}
//                         transition={{
//                           type: 'spring',
//                           stiffness: 300,
//                           damping: 20,
//                         }}
//                       />
//                     ))}
//                   </div>
//                 )}

//                 {/* ── Reply area ── */}
//                 <AnimatePresence mode="wait">
//                   {review.reply ? (
//                     <motion.div
//                       key="reply-exists"
//                       className="rounded-xl px-4 py-3 mt-2"
//                       style={{
//                         background: 'linear-gradient(135deg, #EEF7F1, #F5FBF7)',
//                         borderLeft: '3px solid #4E9A6A',
//                         border: '1.5px solid #C8E6D0',
//                         borderLeftWidth: 3,
//                       }}
//                       initial={{ opacity: 0, y: 8 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -8 }}
//                       transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
//                     >
//                       <p
//                         className="text-xs font-bold uppercase tracking-widest mb-2"
//                         style={{ color: '#4E9A6A' }}
//                       >
//                         Your Response
//                       </p>
//                       <p
//                         className="text-sm italic"
//                         style={{ color: '#1C3829', lineHeight: 1.6 }}
//                       >
//                         {review.reply}
//                       </p>
//                     </motion.div>
//                   ) : activeReplyId === review._id ? (
//                     <motion.div
//                       key="reply-form"
//                       className="mt-3"
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
//                     >
//                       <textarea
//                         className="w-full rounded-xl text-sm mb-3"
//                         style={{
//                           minHeight: 80,
//                           padding: '12px 16px',
//                           border: '2px solid #C8E6D0',
//                           outline: 'none',
//                           resize: 'vertical',
//                           fontFamily: "'DM Sans', sans-serif",
//                           color: '#1C3829',
//                           background: '#ffffff',
//                           lineHeight: 1.55,
//                         }}
//                         placeholder="Write your response to the customer..."
//                         value={replyText}
//                         onChange={(e) => setReplyText(e.target.value)}
//                         onFocus={(e) =>
//                           (e.target.style.borderColor = '#7BAE8C')
//                         }
//                         onBlur={(e) => (e.target.style.borderColor = '#C8E6D0')}
//                       />
//                       <div className="flex gap-2 justify-end">
//                         <motion.button
//                           onClick={() => setActiveReplyId(null)}
//                           className="px-5 py-2 rounded-full text-xs font-semibold"
//                           style={{
//                             background: '#ffffff',
//                             border: '2px solid #C8E6D0',
//                             color: '#6B9A7A',
//                             cursor: 'pointer',
//                             fontFamily: "'DM Sans', sans-serif",
//                           }}
//                           whileHover={{
//                             y: -1,
//                             boxShadow: '0 4px 12px rgba(28,56,41,0.08)',
//                           }}
//                           whileTap={{ scale: 0.96 }}
//                           transition={{
//                             type: 'spring',
//                             stiffness: 380,
//                             damping: 20,
//                           }}
//                         >
//                           Cancel
//                         </motion.button>
//                         <motion.button
//                           onClick={() => handleReplySubmit(review._id)}
//                           className="px-5 py-2 rounded-full text-xs font-bold text-white"
//                           style={{
//                             background:
//                               'linear-gradient(135deg, #4E9A6A, #7BAE8C)',
//                             border: 'none',
//                             cursor: 'pointer',
//                             boxShadow: '0 4px 14px rgba(78,154,106,0.35)',
//                             fontFamily: "'DM Sans', sans-serif",
//                           }}
//                           whileHover={{
//                             scale: 1.04,
//                             y: -1,
//                             boxShadow: '0 8px 20px rgba(78,154,106,0.45)',
//                           }}
//                           whileTap={{ scale: 0.96 }}
//                           transition={{
//                             type: 'spring',
//                             stiffness: 380,
//                             damping: 20,
//                           }}
//                         >
//                           Submit Response
//                         </motion.button>
//                       </div>
//                     </motion.div>
//                   ) : (
//                     <motion.button
//                       key="reply-trigger"
//                       onClick={() => {
//                         setActiveReplyId(review._id)
//                         setReplyText('')
//                       }}
//                       className="text-xs font-bold mt-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
//                       style={{
//                         background: '#EEF7F1',
//                         color: '#4E9A6A',
//                         border: '1px solid #C8E6D0',
//                         cursor: 'pointer',
//                         fontFamily: "'DM Sans', sans-serif",
//                       }}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       whileHover={{
//                         y: -1,
//                         boxShadow: '0 4px 12px rgba(78,154,106,0.2)',
//                       }}
//                       whileTap={{ scale: 0.96 }}
//                       transition={{
//                         type: 'spring',
//                         stiffness: 380,
//                         damping: 20,
//                       }}
//                     >
//                       ↩️ Reply to Review
//                     </motion.button>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   )
// }
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/authContext'

interface Review {
  _id: string
  customerName: string
  rating: number
  comment: string
  productName: string
  createdAt: string
  images?: string[]
  reply?: string
}

export default function ProductReviews() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
    setSubmitting(true)
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
    setSubmitting(false)
    setActiveReplyId(null)
    setReplyText('')
  }

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{ color: i < rating ? '#4E9A6A' : '#D4EDD9', fontSize: 15 }}
      >
        {i < rating ? '★' : '☆'}
      </span>
    ))

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
        <p style={{ color: '#7BAE8C', fontFamily: 'DM Sans, sans-serif' }}>
          Loading reviews…
        </p>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .pr-wrap { font-family: 'DM Sans', sans-serif; }

        .pr-header { margin-bottom: 22px; }
        .pr-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(18px, 3vw, 22px); font-weight: 700;
          color: #1C3829; margin-bottom: 4px;
        }
        .pr-subtitle { font-size: 13px; color: #7BAE8C; }

        .pr-list { display: flex; flex-direction: column; gap: 14px; }

        .pr-empty {
          text-align: center; padding: 60px 16px;
          background: rgba(238,247,241,0.5);
          border-radius: 16px; border: 2px dashed #C8E6D0;
        }
        .pr-empty-icon { font-size: 36px; margin-bottom: 10px; }
        .pr-empty-txt { color: #7BAE8C; font-size: 13px; max-width: 260px; margin: 0 auto; line-height: 1.5; }

        .pr-card {
          background: rgba(255,255,255,0.9);
          border: 1.5px solid #D4EDD9; border-radius: 16px;
          overflow: hidden;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .pr-card:hover { box-shadow: 0 8px 32px rgba(28,56,41,0.1); border-color: #A8C9B0; }

        .pr-card-body { padding: 18px 20px; }

        .pr-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 12px; gap: 12px;
        }
        .pr-top-left { flex: 1; min-width: 0; }
        .pr-stars { display: flex; gap: 1px; margin-bottom: 5px; }
        .pr-cname {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-weight: 700; color: #1C3829; margin-bottom: 2px;
          word-break: break-word;
        }
        .pr-date { font-size: 11px; color: #A8C9B0; }

        .pr-product-tag {
          background: linear-gradient(135deg, #EEF7F1, #D4EDD9);
          color: #3A7D52; font-size: 11px; font-weight: 700;
          padding: 5px 11px; border-radius: 20px;
          border: 1px solid #C8E6D0; white-space: nowrap; flex-shrink: 0;
          align-self: flex-start;
        }

        .pr-comment {
          font-size: 14px; line-height: 1.65; color: #2A4A35;
          margin-bottom: 14px;
        }

        .pr-imgs { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
        .pr-img {
          width: 72px; height: 72px; object-fit: cover;
          border-radius: 10px; border: 1.5px solid #D4EDD9;
          transition: transform 0.18s;
        }
        .pr-img:hover { transform: scale(1.05); }

        /* Reply */
        .pr-reply-existing {
          background: linear-gradient(135deg, #EEF7F1, #E0F0E6);
          border-radius: 12px; padding: 13px 15px; margin-top: 8px;
          border-left: 4px solid #4E9A6A;
        }
        .pr-reply-label {
          font-size: 11px; font-weight: 700; color: #3A7D52; margin-bottom: 5px;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .pr-reply-text { font-size: 13px; color: #2A4A35; font-style: italic; line-height: 1.55; }

        .pr-reply-form { margin-top: 10px; }
        .pr-reply-input {
          width: 100%; min-height: 76px;
          padding: 11px 14px; border-radius: 11px;
          border: 1.5px solid #D4EDD9;
          font-size: 13px; margin-bottom: 10px; resize: vertical;
          font-family: 'DM Sans', sans-serif; color: #1C3829;
          background: rgba(255,255,255,0.9); outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .pr-reply-input:focus {
          border-color: #4E9A6A;
          box-shadow: 0 0 0 3px rgba(78,154,106,0.12);
        }
        .pr-reply-input::placeholder { color: #A8C9B0; }

        .pr-reply-actions { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
        .pr-cancel {
          padding: 7px 16px; border-radius: 10px;
          font-size: 13px; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          background: rgba(255,255,255,0.7); border: 1.5px solid #D4EDD9;
          color: #7BAE8C; transition: background 0.15s, border-color 0.15s;
        }
        .pr-cancel:hover { background: #EEF7F1; border-color: #A8C9B0; }
        .pr-submit {
          padding: 7px 16px; border-radius: 10px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
          border: none; color: #fff;
          box-shadow: 0 4px 14px rgba(78,154,106,0.3);
          transition: opacity 0.15s, transform 0.15s;
        }
        .pr-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .pr-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .pr-reply-btn {
          background: none; border: none;
          color: #4E9A6A; font-size: 13px; font-weight: 600;
          cursor: pointer; padding: 4px 0;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.15s;
          -webkit-tap-highlight-color: transparent;
        }
        .pr-reply-btn:hover { color: #1C3829; }

        @media (max-width: 480px) {
          .pr-card-body { padding: 14px 14px; }
          .pr-top { flex-wrap: wrap; }
          .pr-product-tag { order: -1; }
          .pr-img { width: 60px; height: 60px; }
          .pr-reply-actions { justify-content: stretch; }
          .pr-cancel, .pr-submit { flex: 1; text-align: center; }
        }
      `}</style>

      <div className="pr-wrap">
        <div className="pr-header">
          <p className="pr-title">Customer Reviews</p>
          <p className="pr-subtitle">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''} — respond
            to customer feedback
          </p>
        </div>

        <div className="pr-list">
          {reviews.length === 0 ? (
            <div className="pr-empty">
              <div className="pr-empty-icon">💬</div>
              <p className="pr-empty-txt">
                No reviews yet. They'll appear here once customers review your
                products.
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="pr-card">
                <div className="pr-card-body">
                  <div className="pr-top">
                    <div className="pr-top-left">
                      <div className="pr-stars">
                        {renderStars(review.rating)}
                      </div>
                      <p className="pr-cname">{review.customerName}</p>
                      <p className="pr-date">
                        {new Date(review.createdAt).toLocaleDateString(
                          'en-IN',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          },
                        )}
                      </p>
                    </div>
                    <span className="pr-product-tag">{review.productName}</span>
                  </div>

                  <p className="pr-comment">{review.comment}</p>

                  {review.images && review.images.length > 0 && (
                    <div className="pr-imgs">
                      {review.images.map((img, idx) => (
                        <img key={idx} src={img} alt="" className="pr-img" />
                      ))}
                    </div>
                  )}

                  {review.reply ? (
                    <div className="pr-reply-existing">
                      <p className="pr-reply-label">Your Response</p>
                      <p className="pr-reply-text">{review.reply}</p>
                    </div>
                  ) : activeReplyId === review._id ? (
                    <div className="pr-reply-form">
                      <textarea
                        className="pr-reply-input"
                        placeholder="Write your response to the customer…"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        autoFocus
                      />
                      <div className="pr-reply-actions">
                        <button
                          className="pr-cancel"
                          onClick={() => {
                            setActiveReplyId(null)
                            setReplyText('')
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="pr-submit"
                          onClick={() => handleReplySubmit(review._id)}
                          disabled={submitting || !replyText.trim()}
                        >
                          {submitting ? 'Submitting…' : 'Submit Response'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="pr-reply-btn"
                      onClick={() => {
                        setActiveReplyId(review._id)
                        setReplyText('')
                      }}
                    >
                      ↩ Reply to Review
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
