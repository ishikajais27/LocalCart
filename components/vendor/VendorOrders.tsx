// 'use client'
// import { useState, useEffect } from 'react'
// import { useAuth } from '@/lib/authContext'
// import { motion, AnimatePresence, Variants } from 'framer-motion'

// const STATUS_STYLES: Record<
//   string,
//   { bg: string; color: string; border: string; label: string }
// > = {
//   pending: {
//     bg: '#fefce8',
//     color: '#a16207',
//     border: '#fde68a',
//     label: '⏳ Pending',
//   },
//   processing: {
//     bg: '#eff6ff',
//     color: '#1d4ed8',
//     border: '#bfdbfe',
//     label: '🔨 Processing',
//   },
//   ready: {
//     bg: '#f0fdf4',
//     color: '#16a34a',
//     border: '#bbf7d0',
//     label: '✅ Ready',
//   },
//   delivered: {
//     bg: '#EEF7F1',
//     color: '#3A7D52',
//     border: '#C8E6D0',
//     label: '📦 Delivered',
//   },
// }

// const next: Record<string, string> = {
//   pending: 'processing',
//   processing: 'ready',
//   ready: 'delivered',
// }

// const staggerParent: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
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
//   hidden: { opacity: 0, y: 12 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
//   },
// }

// export default function VendorOrders() {
//   const { user } = useAuth()
//   const [orders, setOrders] = useState<any[]>([])
//   const [filter, setFilter] = useState('all')

//   useEffect(() => {
//     if (!user?.stallId) return
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch(`/api/orders?stallId=${user.stallId}`)
//         const data = await res.json()
//         if (Array.isArray(data)) setOrders(data)
//         else setOrders([])
//       } catch (e) {
//         console.error(e)
//         setOrders([])
//       }
//     }
//     fetchOrders()
//     const interval = setInterval(fetchOrders, 5000)
//     return () => clearInterval(interval)
//   }, [user])

//   const updateStatus = async (id: string) => {
//     const order = orders.find((o) => o._id === id)
//     if (!order || !next[order.status]) return
//     const newStatus = next[order.status]
//     await fetch(`/api/orders/${id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: newStatus }),
//     })
//     setOrders((prev) =>
//       prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o)),
//     )
//   }

//   const filtered =
//     filter === 'all' ? orders : orders.filter((o) => o.status === filter)

//   const filterTabs = ['all', 'pending', 'processing', 'ready', 'delivered']

//   return (
//     <div>
//       {/* ══ FILTER TABS ══ */}
//       <motion.div
//         className="flex gap-2 mb-6 flex-wrap"
//         initial={{ opacity: 0, y: 12 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//       >
//         {filterTabs.map((f) => {
//           const count =
//             f === 'all'
//               ? orders.length
//               : orders.filter((o) => o.status === f).length
//           const isActive = filter === f

//           return (
//             <motion.button
//               key={f}
//               onClick={() => setFilter(f)}
//               className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
//               style={{
//                 background: isActive
//                   ? 'linear-gradient(135deg, #4E9A6A, #7BAE8C)'
//                   : '#ffffff',
//                 color: isActive ? '#ffffff' : '#6B9A7A',
//                 border: `2px solid ${isActive ? 'transparent' : '#C8E6D0'}`,
//                 boxShadow: isActive
//                   ? '0 4px 14px rgba(78,154,106,0.35)'
//                   : '0 1px 6px rgba(28,56,41,0.06)',
//                 fontFamily: "'DM Sans', sans-serif",
//                 cursor: 'pointer',
//               }}
//               whileHover={{
//                 y: -2,
//                 boxShadow: isActive
//                   ? '0 8px 20px rgba(78,154,106,0.45)'
//                   : '0 4px 14px rgba(28,56,41,0.1)',
//               }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: 'spring', stiffness: 380, damping: 20 }}
//             >
//               {f.charAt(0).toUpperCase() + f.slice(1)}
//               <motion.span
//                 className="inline-flex items-center justify-center rounded-full text-xs font-bold"
//                 style={{
//                   minWidth: 20,
//                   height: 20,
//                   padding: '0 5px',
//                   background: isActive ? 'rgba(255,255,255,0.25)' : '#E0EFE4',
//                   color: isActive ? '#ffffff' : '#4E9A6A',
//                   fontSize: 10,
//                 }}
//                 key={count}
//                 initial={{ scale: 0.7 }}
//                 animate={{ scale: 1 }}
//                 transition={{ type: 'spring', stiffness: 500, damping: 22 }}
//               >
//                 {count}
//               </motion.span>
//             </motion.button>
//           )
//         })}
//       </motion.div>

//       {/* ══ ORDER LIST ══ */}
//       <AnimatePresence mode="wait">
//         {filtered.length === 0 ? (
//           <motion.div
//             key="empty"
//             className="flex flex-col items-center justify-center py-16 text-center rounded-2xl"
//             style={{
//               background: 'linear-gradient(135deg, #EEF7F1, #F5FBF7)',
//               border: '2px dashed #C8E6D0',
//             }}
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             exit={{ opacity: 0, transition: { duration: 0.15 } }}
//           >
//             <motion.div
//               className="text-4xl mb-3"
//               animate={{ y: [0, -8, 0] }}
//               transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//             >
//               📭
//             </motion.div>
//             <p className="text-sm font-medium" style={{ color: '#6B9A7A' }}>
//               No orders here yet.
//             </p>
//           </motion.div>
//         ) : (
//           <motion.div
//             key={filter}
//             className="flex flex-col gap-3"
//             variants={staggerParent}
//             initial="hidden"
//             animate="show"
//             exit={{ opacity: 0, transition: { duration: 0.15 } }}
//           >
//             {filtered.map((order) => {
//               const s = STATUS_STYLES[order.status] || STATUS_STYLES.pending
//               const isPending = order.status === 'pending'

//               return (
//                 <motion.div
//                   key={order._id}
//                   variants={cardItem}
//                   layout
//                   className="rounded-2xl overflow-hidden"
//                   style={{
//                     background: '#ffffff',
//                     border: `1.5px solid ${isPending ? '#C8E6D0' : '#E0EFE4'}`,
//                     boxShadow: isPending
//                       ? '0 4px 18px rgba(78,154,106,0.1)'
//                       : '0 2px 10px rgba(28,56,41,0.05)',
//                   }}
//                   whileHover={{
//                     y: -3,
//                     boxShadow: '0 10px 28px rgba(28,56,41,0.1)',
//                   }}
//                   transition={{ type: 'spring', stiffness: 320, damping: 22 }}
//                 >
//                   {/* Card header band for pending */}
//                   {isPending && (
//                     <div
//                       className="px-5 py-1.5 text-xs font-bold"
//                       style={{
//                         background: 'linear-gradient(135deg, #D4EDD9, #EEF7F1)',
//                         color: '#3A7D52',
//                         borderBottom: '1px solid #C8E6D0',
//                       }}
//                     >
//                       🔔 New order — action needed
//                     </div>
//                   )}

//                   <div className="p-5">
//                     <div className="flex justify-between gap-4">
//                       {/* Left: order info */}
//                       <div className="min-w-0 flex-1">
//                         <p
//                           className="text-base font-bold mb-1 truncate"
//                           style={{
//                             fontFamily: "'Playfair Display', serif",
//                             color: '#1C3829',
//                           }}
//                         >
//                           {order.items?.[0]?.name ?? 'Order'}
//                         </p>

//                         <p
//                           className="text-xs mb-1"
//                           style={{ color: '#7BAE8C' }}
//                         >
//                           👤 {order.name} · Qty: {order.items?.[0]?.qty ?? 1}
//                           {order.items?.[0]?.variant
//                             ? ` · ${order.items[0].variant}`
//                             : ''}
//                         </p>
//                         <p
//                           className="text-xs mb-1"
//                           style={{ color: '#7BAE8C' }}
//                         >
//                           {order.orderType === 'preorder'
//                             ? '📅 Pre-order'
//                             : '⚡ Immediate'}{' '}
//                           · 🕐 {order.slot}
//                         </p>
//                         {order.address && (
//                           <p
//                             className="text-xs mb-1"
//                             style={{ color: '#7BAE8C' }}
//                           >
//                             📍 {order.address}
//                           </p>
//                         )}
//                         {order.phone && (
//                           <p className="text-xs" style={{ color: '#7BAE8C' }}>
//                             📞 +91 {order.phone}
//                           </p>
//                         )}
//                       </div>

//                       {/* Right: status + total */}
//                       <div className="text-right shrink-0">
//                         <motion.span
//                           className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full mb-2"
//                           style={{
//                             background: s.bg,
//                             color: s.color,
//                             border: `1px solid ${s.border}`,
//                           }}
//                           key={order.status}
//                           initial={{ scale: 0.85, opacity: 0 }}
//                           animate={{ scale: 1, opacity: 1 }}
//                           transition={{
//                             type: 'spring',
//                             stiffness: 400,
//                             damping: 22,
//                           }}
//                         >
//                           {s.label}
//                         </motion.span>

//                         <motion.p
//                           className="text-xl font-bold mb-1"
//                           style={{
//                             fontFamily: "'Playfair Display', serif",
//                             color: '#1C3829',
//                           }}
//                           key={`total-${order._id}`}
//                           initial={{ opacity: 0, scale: 0.85 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{
//                             type: 'spring',
//                             stiffness: 340,
//                             damping: 20,
//                           }}
//                         >
//                           ₹{order.total}
//                         </motion.p>

//                         <p className="text-xs" style={{ color: '#A8C9B0' }}>
//                           {new Date(order.createdAt).toLocaleDateString(
//                             'en-IN',
//                             {
//                               day: 'numeric',
//                               month: 'short',
//                             },
//                           )}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Action button */}
//                     <AnimatePresence>
//                       {order.status !== 'delivered' && (
//                         <motion.button
//                           onClick={() => updateStatus(order._id)}
//                           className="w-full mt-4 py-2.5 rounded-full text-sm font-bold text-white"
//                           style={{
//                             background:
//                               'linear-gradient(135deg, #4E9A6A, #7BAE8C)',
//                             border: 'none',
//                             cursor: 'pointer',
//                             boxShadow: '0 4px 14px rgba(78,154,106,0.35)',
//                             fontFamily: "'DM Sans', sans-serif",
//                           }}
//                           initial={{ opacity: 0, y: 8 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: 8 }}
//                           transition={{ duration: 0.22 }}
//                           whileHover={{
//                             scale: 1.02,
//                             y: -2,
//                             boxShadow: '0 8px 22px rgba(78,154,106,0.45)',
//                           }}
//                           whileTap={{ scale: 0.97 }}
//                         >
//                           Mark as{' '}
//                           {next[order.status]?.charAt(0).toUpperCase() +
//                             next[order.status]?.slice(1)}{' '}
//                           →
//                         </motion.button>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 </motion.div>
//               )
//             })}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/authContext'

const STATUS_STYLES: Record<
  string,
  { bg: string; color: string; border: string; label: string }
> = {
  pending: {
    bg: '#fefce8',
    color: '#a16207',
    border: '#fde68a',
    label: '⏳ Pending',
  },
  processing: {
    bg: '#eff6ff',
    color: '#1d4ed8',
    border: '#bfdbfe',
    label: '🔨 Processing',
  },
  ready: {
    bg: '#f0fdf4',
    color: '#16a34a',
    border: '#bbf7d0',
    label: '✅ Ready',
  },
  delivered: {
    bg: '#EEF7F1',
    color: '#3A7D52',
    border: '#C8E6D0',
    label: '📦 Delivered',
  },
}

const next: Record<string, string> = {
  pending: 'processing',
  processing: 'ready',
  ready: 'delivered',
}

const FILTER_TABS = ['all', 'pending', 'processing', 'ready', 'delivered']

export default function VendorOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [filter, setFilter] = useState('all')
  const [fetchLoading, setFetchLoading] = useState(true)

  useEffect(() => {
    if (!user?.stallId) {
      setFetchLoading(false)
      return
    }
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?stallId=${user.stallId}`)
        const data = await res.json()
        if (Array.isArray(data)) setOrders(data)
        else setOrders([])
      } catch (e) {
        console.error(e)
        setOrders([])
      } finally {
        setFetchLoading(false)
      }
    }
    fetchOrders()
    const interval = setInterval(fetchOrders, 5000)
    return () => clearInterval(interval)
  }, [user])

  const updateStatus = async (id: string) => {
    const order = orders.find((o) => o._id === id)
    if (!order || !next[order.status]) return
    const newStatus = next[order.status]
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
    } catch (e) {
      console.error(e)
    }
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o)),
    )
  }

  const filtered =
    filter === 'all' ? orders : orders.filter((o) => o.status === filter)
  const countFor = (f: string) =>
    f === 'all' ? orders.length : orders.filter((o) => o.status === f).length

  if (fetchLoading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '48px 0',
          color: '#7BAE8C',
          fontFamily: 'DM Sans,sans-serif',
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 10 }}>⏳</div>
        Loading orders…
      </div>
    )
  }

  return (
    <>
      <style>{`
        .vo-orders { font-family: 'DM Sans', sans-serif; }

        /* Filter bar */
        .vo-filters {
          display: flex; gap: 8px; margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .vo-filter-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 11px;
          font-size: 12px; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.18s; border: 1.5px solid transparent;
          white-space: nowrap;
        }
        .vo-filter-btn.active {
          background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
          color: #fff; border-color: transparent;
          box-shadow: 0 4px 14px rgba(78,154,106,0.32);
        }
        .vo-filter-btn.inactive {
          background: rgba(255,255,255,0.7);
          color: #4E7A5E; border-color: #D4EDD9;
        }
        .vo-filter-btn.inactive:hover { background: #EEF7F1; border-color: #A8C9B0; }
        .vo-count {
          padding: 1px 7px; border-radius: 10px; font-size: 11px; font-weight: 700;
        }
        .vo-count.active { background: rgba(255,255,255,0.25); color: #fff; }
        .vo-count.inactive { background: #D4EDD9; color: #4E7A5E; }

        /* Order list */
        .vo-list { display: flex; flex-direction: column; gap: 12px; }

        .vo-empty {
          text-align: center; padding: 48px 16px;
          background: rgba(238,247,241,0.5);
          border-radius: 16px; border: 2px dashed #C8E6D0;
        }
        .vo-empty-icon { font-size: 36px; margin-bottom: 10px; }
        .vo-empty-txt { color: #7BAE8C; font-size: 14px; }

        .vo-card {
          background: rgba(255,255,255,0.9);
          border: 1.5px solid #D4EDD9; border-radius: 16px;
          padding: 16px 18px;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .vo-card:hover { box-shadow: 0 8px 30px rgba(28,56,41,0.1); border-color: #A8C9B0; }

        .vo-card-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 14px;
        }
        .vo-card-left { flex: 1; min-width: 0; }

        .vo-order-name {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-weight: 700; color: #1C3829; margin-bottom: 5px;
          word-break: break-word;
        }
        .vo-meta {
          font-size: 12px; color: #7BAE8C; margin-top: 3px; line-height: 1.5;
        }

        .vo-card-right { text-align: right; flex-shrink: 0; }
        .vo-status-pill {
          font-size: 11px; font-weight: 700;
          padding: 4px 11px; border-radius: 20px;
          display: inline-block; margin-bottom: 6px;
          border: 1px solid transparent; white-space: nowrap;
        }
        .vo-total {
          font-family: 'Playfair Display', serif;
          font-weight: 800; font-size: 18px; color: #1C3829;
        }
        .vo-order-date { font-size: 11px; color: #A8C9B0; margin-top: 2px; }

        .vo-advance-btn {
          margin-top: 12px; width: 100%; padding: 11px;
          background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
          color: #fff; border: none; border-radius: 11px;
          font-size: 13px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 14px rgba(78,154,106,0.28);
          transition: opacity 0.18s, transform 0.18s, box-shadow 0.18s;
        }
        .vo-advance-btn:hover {
          opacity: 0.9; transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(78,154,106,0.38);
        }

        @media (max-width: 480px) {
          .vo-filters { gap: 6px; }
          .vo-filter-btn { padding: 6px 11px; font-size: 11px; }
          .vo-card { padding: 14px 14px; }
          .vo-card-top { flex-direction: column; gap: 10px; }
          .vo-card-right { text-align: left; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        }
      `}</style>

      <div className="vo-orders">
        {/* Filter tabs */}
        <div className="vo-filters">
          {FILTER_TABS.map((f) => (
            <button
              key={f}
              className={`vo-filter-btn ${filter === f ? 'active' : 'inactive'}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span
                className={`vo-count ${filter === f ? 'active' : 'inactive'}`}
              >
                {countFor(f)}
              </span>
            </button>
          ))}
        </div>

        {/* Order cards */}
        <div className="vo-list">
          {filtered.length === 0 ? (
            <div className="vo-empty">
              <div className="vo-empty-icon">📭</div>
              <p className="vo-empty-txt">No orders here yet.</p>
            </div>
          ) : (
            filtered.map((order) => {
              const s = STATUS_STYLES[order.status] || STATUS_STYLES.pending
              return (
                <div key={order._id} className="vo-card">
                  <div className="vo-card-top">
                    <div className="vo-card-left">
                      <p className="vo-order-name">
                        {order.items?.[0]?.name ?? 'Order'}
                      </p>
                      <p className="vo-meta">
                        👤 {order.name} · Qty: {order.items?.[0]?.qty ?? 1}
                        {order.items?.[0]?.variant
                          ? ` · ${order.items[0].variant}`
                          : ''}
                      </p>
                      <p className="vo-meta">
                        {order.orderType === 'preorder'
                          ? '📅 Pre-order'
                          : '⚡ Immediate'}{' '}
                        · 🕐 {order.slot}
                      </p>
                      {order.address && (
                        <p className="vo-meta">📍 {order.address}</p>
                      )}
                      {order.phone && (
                        <p className="vo-meta">📞 +91 {order.phone}</p>
                      )}
                    </div>

                    <div className="vo-card-right">
                      <span
                        className="vo-status-pill"
                        style={{
                          background: s.bg,
                          color: s.color,
                          borderColor: s.border,
                        }}
                      >
                        {s.label}
                      </span>
                      <p className="vo-total">₹{order.total}</p>
                      <p className="vo-order-date">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    </div>
                  </div>

                  {order.status !== 'delivered' && (
                    <button
                      className="vo-advance-btn"
                      onClick={() => updateStatus(order._id)}
                    >
                      Mark as{' '}
                      {next[order.status]?.charAt(0).toUpperCase() +
                        next[order.status]?.slice(1)}{' '}
                      →
                    </button>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}
