// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import UserHeader from './UserHeader'
// import { useAuth } from '@/lib/authContext'

// type Tab = 'history' | 'wishlist'

// export default function OrderHistory() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const { user } = useAuth()
//   const [tab, setTab] = useState<Tab>('history')
//   const [historyOrders, setHistoryOrders] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (searchParams.get('tab') === 'wishlist') setTab('wishlist')
//   }, [searchParams])

//   useEffect(() => {
//     if (!user) return
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch(`/api/orders?userId=${user.id}`)
//         const data = await res.json()
//         if (Array.isArray(data)) {
//           setHistoryOrders(data.filter((o: any) => o.status === 'delivered'))
//         }
//       } catch (e) {
//         console.error(e)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchOrders()
//   }, [user])

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         background: '#FFF8F0',
//         fontFamily: 'DM Sans, sans-serif',
//       }}
//     >
//       <UserHeader />
//       <div
//         style={{ maxWidth: 900, margin: '0 auto', padding: '28px 24px 60px' }}
//       >
//         <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
//           <button
//             onClick={() => setTab('history')}
//             style={{
//               background: tab === 'history' ? '#FFF0E6' : '#fff',
//               border: `2px solid ${tab === 'history' ? '#FF6B2B' : '#F0E6D9'}`,
//               borderRadius: 10,
//               padding: '10px 20px',
//               fontSize: 14,
//               fontWeight: 600,
//               color: tab === 'history' ? '#FF6B2B' : '#8B7355',
//               cursor: 'pointer',
//               fontFamily: 'DM Sans, sans-serif',
//             }}
//           >
//             🕓 Order History
//           </button>
//         </div>

//         {loading ? (
//           <div style={{ textAlign: 'center', padding: '80px 0' }}>
//             <p style={{ color: '#8B7355' }}>Loading orders...</p>
//           </div>
//         ) : (
//           <div>
//             <p style={{ fontSize: 13, color: '#8B7355', marginBottom: 16 }}>
//               {historyOrders.length} completed orders
//             </p>
//             {historyOrders.length === 0 ? (
//               <div style={{ textAlign: 'center', padding: '80px 0' }}>
//                 <div style={{ fontSize: 48 }}>📭</div>
//                 <p style={{ color: '#8B7355', marginTop: 12 }}>
//                   No past orders yet.
//                 </p>
//               </div>
//             ) : (
//               <div
//                 style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
//               >
//                 {historyOrders.map((o) => (
//                   <div
//                     key={o._id}
//                     style={{
//                       display: 'flex',
//                       gap: 14,
//                       background: '#fff',
//                       borderRadius: 14,
//                       border: '1px solid #F0E6D9',
//                       padding: 16,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <img
//                       src={
//                         o.items?.[0]?.image ||
//                         'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100'
//                       }
//                       alt={o.items?.[0]?.name}
//                       style={{
//                         width: 64,
//                         height: 64,
//                         borderRadius: 10,
//                         objectFit: 'cover',
//                         flexShrink: 0,
//                       }}
//                     />
//                     <div style={{ flex: 1 }}>
//                       <p
//                         style={{
//                           fontFamily: 'Syne, sans-serif',
//                           fontSize: 15,
//                           fontWeight: 700,
//                           color: '#1A1208',
//                           marginBottom: 2,
//                         }}
//                       >
//                         {o.items?.[0]?.name || 'Order'}
//                       </p>
//                       <p
//                         style={{
//                           fontSize: 12,
//                           color: '#FF6B2B',
//                           fontWeight: 600,
//                           marginBottom: 4,
//                         }}
//                       >
//                         {o.stallName}
//                       </p>
//                       <p style={{ fontSize: 12, color: '#8B7355' }}>
//                         Qty: {o.items?.[0]?.qty || 1}
//                         {o.items?.[0]?.variant
//                           ? ` · Variant: ${o.items[0].variant}`
//                           : ''}
//                       </p>
//                       <p
//                         style={{ fontSize: 11, color: '#C4A882', marginTop: 4 }}
//                       >
//                         {new Date(o.createdAt).toLocaleDateString('en-IN', {
//                           day: 'numeric',
//                           month: 'short',
//                           year: 'numeric',
//                         })}
//                       </p>
//                     </div>
//                     <div style={{ textAlign: 'right' }}>
//                       <p
//                         style={{
//                           fontFamily: 'Syne, sans-serif',
//                           fontSize: 16,
//                           fontWeight: 800,
//                           color: '#1A1208',
//                           marginBottom: 6,
//                         }}
//                       >
//                         ₹{o.total}
//                       </p>
//                       <span
//                         style={{
//                           display: 'block',
//                           fontSize: 11,
//                           color: '#16a34a',
//                           fontWeight: 600,
//                           marginBottom: 6,
//                         }}
//                       >
//                         🎉 Delivered
//                       </span>
//                       <button
//                         onClick={() => router.push(`/vendors/${o.stallId}`)}
//                         style={{
//                           background: '#FF6B2B',
//                           color: '#fff',
//                           border: 'none',
//                           borderRadius: 8,
//                           padding: '6px 14px',
//                           fontSize: 12,
//                           fontWeight: 700,
//                           cursor: 'pointer',
//                         }}
//                       >
//                         Reorder
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import UserHeader from './UserHeader'
import { useAuth } from '@/lib/authContext'
import { motion, AnimatePresence, Variants } from 'framer-motion'

type Tab = 'history' | 'wishlist'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.18 } },
}

const cardItem: Variants = {
  hidden: { opacity: 0, x: -20, scale: 0.96 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
}

const headerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}

const headerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function OrderHistory() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [tab, setTab] = useState<Tab>('history')
  const [historyOrders, setHistoryOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (searchParams.get('tab') === 'wishlist') setTab('wishlist')
  }, [searchParams])

  useEffect(() => {
    if (!user) return
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?userId=${user.id}`)
        const data = await res.json()
        if (Array.isArray(data)) {
          setHistoryOrders(data.filter((o: any) => o.status === 'delivered'))
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #EEF7F1 0%, #F5FBF7 45%, #ffffff 100%)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ══ ANIMATED BACKGROUND BLOBS ══ */}
      <motion.svg
        className="absolute top-0 right-0 pointer-events-none"
        style={{ width: 420, height: 420, opacity: 0 }}
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          opacity: 0.28,
          y: [0, -18, 0, 10, 0],
          x: [0, 8, 0, -6, 0],
          rotate: [0, 3, -2, 1, 0],
        }}
        transition={{
          opacity: { duration: 1.2 },
          y: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <motion.path
          fill="#7BAE8C"
          animate={{
            d: [
              'M320,80 Q380,140 360,220 Q340,300 260,340 Q180,380 120,320 Q60,260 80,180 Q100,100 180,60 Q260,20 320,80Z',
              'M310,70 Q390,150 355,230 Q325,310 250,345 Q175,380 115,315 Q55,250 85,170 Q110,95 190,55 Q270,15 310,70Z',
              'M320,80 Q380,140 360,220 Q340,300 260,340 Q180,380 120,320 Q60,260 80,180 Q100,100 180,60 Q260,20 320,80Z',
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>

      <motion.svg
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{ width: 300, height: 300 }}
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.18,
          y: [0, 14, 0, -10, 0],
          x: [0, -8, 0, 6, 0],
        }}
        transition={{
          opacity: { duration: 1.4, delay: 0.3 },
          y: { duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          x: { duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 },
        }}
      >
        <path
          d="M240,60 Q290,120 270,190 Q250,260 180,280 Q110,300 60,240 Q10,180 40,110 Q70,40 150,30 Q230,20 240,60Z"
          fill="#A8D5B5"
        />
      </motion.svg>

      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: 96,
          left: 32,
          width: 96,
          height: 96,
          background: '#7BAE8C',
        }}
        animate={{ opacity: [0.08, 0.17, 0.08], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ══ HEADER ══ */}
      <div className="relative z-10 shrink-0">
        <UserHeader />
      </div>

      {/* ══ CONTENT ══ */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 py-6 pb-16">
        {/* Page Header */}
        <motion.div
          className="mb-6"
          variants={headerParent}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={headerChild}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold mb-2"
              style={{ background: '#D4EDD9', color: '#3A7D52' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#3A7D52' }}
              />
              My Account
            </div>
          </motion.div>

          <motion.h1
            variants={headerChild}
            className="text-3xl font-bold tracking-tight mb-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#1C3829',
            }}
          >
            Order History
          </motion.h1>

          <motion.p
            variants={headerChild}
            className="text-sm font-medium"
            style={{ color: '#6B9A7A' }}
          >
            {loading
              ? 'Fetching your orders…'
              : `${historyOrders.length} completed order${historyOrders.length !== 1 ? 's' : ''}`}
          </motion.p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          className="flex gap-3 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            onClick={() => setTab('history')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{
              background:
                tab === 'history'
                  ? 'linear-gradient(135deg, #4E9A6A, #7BAE8C)'
                  : '#ffffff',
              color: tab === 'history' ? '#ffffff' : '#6B9A7A',
              border: `2px solid ${tab === 'history' ? 'transparent' : '#C8E6D0'}`,
              boxShadow:
                tab === 'history'
                  ? '0 6px 20px rgba(78,154,106,0.35)'
                  : '0 2px 8px rgba(28,56,41,0.06)',
              fontFamily: "'DM Sans', sans-serif",
              cursor: 'pointer',
            }}
            whileHover={{
              y: -2,
              boxShadow:
                tab === 'history'
                  ? '0 10px 28px rgba(78,154,106,0.45)'
                  : '0 6px 18px rgba(28,56,41,0.1)',
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
          >
            🕓 Order History
          </motion.button>
        </motion.div>

        {/* ══ CONTENT AREA ══ */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="flex flex-col items-center justify-center py-24 text-center"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4"
                style={{
                  background: 'linear-gradient(135deg, #D4EDD9, #B8E0C4)',
                  boxShadow: '0 8px 28px rgba(123,174,140,0.3)',
                }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ⏳
              </motion.div>
              <p className="text-sm font-medium" style={{ color: '#6B9A7A' }}>
                Loading orders...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="orders"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            >
              <motion.p
                className="text-xs font-bold uppercase tracking-widest mb-4 px-1"
                style={{ color: '#7BAE8C' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 }}
              >
                {historyOrders.length} completed order
                {historyOrders.length !== 1 ? 's' : ''}
              </motion.p>

              {historyOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <motion.div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6"
                    style={{
                      background: 'linear-gradient(135deg, #D4EDD9, #B8E0C4)',
                      boxShadow: '0 8px 32px rgba(123,174,140,0.3)',
                    }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    📭
                  </motion.div>
                  <p
                    className="text-2xl font-bold mb-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: '#1C3829',
                    }}
                  >
                    No past orders yet
                  </p>
                  <p className="text-sm" style={{ color: '#6B9A7A' }}>
                    Your completed orders will appear here.
                  </p>
                </div>
              ) : (
                <motion.div
                  className="flex flex-col gap-3"
                  variants={staggerParent}
                  initial="hidden"
                  animate="show"
                >
                  {historyOrders.map((o) => (
                    <motion.div
                      key={o._id}
                      variants={cardItem}
                      className="flex gap-4 items-center rounded-2xl p-4"
                      style={{
                        background: '#ffffff',
                        border: '1.5px solid #E0EFE4',
                        boxShadow: '0 2px 12px rgba(28,56,41,0.06)',
                      }}
                      whileHover={{
                        y: -3,
                        boxShadow: '0 10px 32px rgba(28,56,41,0.11)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 20,
                      }}
                    >
                      {/* Image */}
                      <motion.img
                        src={
                          o.items?.[0]?.image ||
                          'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100'
                        }
                        alt={o.items?.[0]?.name}
                        className="rounded-xl object-cover shrink-0"
                        style={{
                          width: 64,
                          height: 64,
                          boxShadow: '0 4px 12px rgba(28,56,41,0.12)',
                        }}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                      />

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          className="text-sm font-bold truncate mb-0.5"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            color: '#1C3829',
                          }}
                        >
                          {o.items?.[0]?.name || 'Order'}
                        </p>
                        <p
                          className="text-xs font-semibold mb-1"
                          style={{ color: '#4E9A6A' }}
                        >
                          {o.stallName}
                        </p>
                        <p
                          className="text-xs font-medium"
                          style={{ color: '#7BAE8C' }}
                        >
                          Qty: {o.items?.[0]?.qty || 1}
                          {o.items?.[0]?.variant
                            ? ` · Variant: ${o.items[0].variant}`
                            : ''}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: '#A8C9B0' }}
                        >
                          {new Date(o.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>

                      {/* Right side */}
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <motion.p
                          className="text-lg font-bold mb-1"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            color: '#1C3829',
                          }}
                          key={`total-${o._id}`}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 340,
                            damping: 20,
                          }}
                        >
                          ₹{o.total}
                        </motion.p>
                        <span
                          className="block text-xs font-semibold mb-2"
                          style={{ color: '#4E9A6A' }}
                        >
                          🎉 Delivered
                        </span>
                        <motion.button
                          onClick={() => router.push(`/vendors/${o.stallId}`)}
                          className="px-4 py-1.5 rounded-full text-xs font-bold text-white"
                          style={{
                            background:
                              'linear-gradient(135deg, #4E9A6A, #7BAE8C)',
                            boxShadow: '0 4px 12px rgba(78,154,106,0.35)',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          whileHover={{
                            scale: 1.06,
                            y: -1,
                            boxShadow: '0 8px 20px rgba(78,154,106,0.45)',
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 18,
                          }}
                        >
                          Reorder
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
