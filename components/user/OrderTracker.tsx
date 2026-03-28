// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import UserHeader from './UserHeader'
// import { useAuth } from '@/lib/authContext'

// const STEPS = [
//   { label: 'Order Placed', icon: '🧾' },
//   { label: 'Confirmed', icon: '✅' },
//   { label: 'Preparing', icon: '👨‍🍳' },
//   { label: 'Out for Delivery', icon: '🚴' },
//   { label: 'Delivered', icon: '🎉' },
// ]

// const STATUS_STEP: Record<string, number> = {
//   pending: 0,
//   processing: 2,
//   ready: 3,
//   delivered: 4,
// }

// export default function OrderTracker() {
//   const router = useRouter()
//   const { user } = useAuth()
//   const [allOrders, setAllOrders] = useState<any[]>([])
//   const [selected, setSelected] = useState('')

//   useEffect(() => {
//     if (!user) return
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch(`/api/orders?userId=${user.id}`)
//         const data = await res.json()
//         if (Array.isArray(data)) {
//           setAllOrders(data)
//           if (data.length > 0 && !selected) setSelected(data[0]._id)
//         }
//       } catch (e) {
//         console.error(e)
//       }
//     }
//     fetchOrders()
//     const interval = setInterval(fetchOrders, 5000)
//     return () => clearInterval(interval)
//   }, [user])

//   const activeOrders = allOrders.filter((o) => o.status !== 'delivered')
//   const order = allOrders.find((o) => o._id === selected)
//   const stepIndex = order ? (STATUS_STEP[order.status] ?? 0) : 0

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
//         <h1
//           style={{
//             fontFamily: 'Syne, sans-serif',
//             fontSize: 22,
//             fontWeight: 800,
//             color: '#1A1208',
//             marginBottom: 6,
//           }}
//         >
//           Track Orders
//         </h1>
//         <p style={{ fontSize: 13, color: '#8B7355', marginBottom: 24 }}>
//           {activeOrders.length} active order
//           {activeOrders.length !== 1 ? 's' : ''}
//         </p>

//         {activeOrders.length === 0 ? (
//           <div style={{ textAlign: 'center', padding: '80px 0' }}>
//             <div style={{ fontSize: 48 }}>📭</div>
//             <p style={{ color: '#8B7355', marginTop: 12 }}>
//               No active orders right now.
//             </p>
//             <button
//               onClick={() => router.push('/search')}
//               style={{
//                 marginTop: 16,
//                 background: '#FF6B2B',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: 10,
//                 padding: '10px 24px',
//                 fontSize: 14,
//                 fontWeight: 700,
//                 cursor: 'pointer',
//               }}
//             >
//               Browse Stalls
//             </button>
//           </div>
//         ) : (
//           <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 12,
//                 minWidth: 240,
//               }}
//             >
//               {activeOrders.map((o) => (
//                 <div
//                   key={o._id}
//                   onClick={() => setSelected(o._id)}
//                   style={{
//                     background: '#fff',
//                     border: `2px solid ${selected === o._id ? '#FF6B2B' : '#F0E6D9'}`,
//                     borderRadius: 12,
//                     padding: '12px 16px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     gap: 12,
//                     alignItems: 'center',
//                   }}
//                 >
//                   <img
//                     src={
//                       o.items?.[0]?.image ||
//                       'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100'
//                     }
//                     alt={o.items?.[0]?.name}
//                     style={{
//                       width: 48,
//                       height: 48,
//                       borderRadius: 8,
//                       objectFit: 'cover',
//                       flexShrink: 0,
//                     }}
//                   />
//                   <div>
//                     <p
//                       style={{
//                         fontFamily: 'Syne, sans-serif',
//                         fontSize: 14,
//                         fontWeight: 700,
//                         color: '#1A1208',
//                         marginBottom: 2,
//                       }}
//                     >
//                       {o.items?.[0]?.name || 'Order'}
//                     </p>
//                     <p
//                       style={{
//                         fontSize: 11,
//                         color: '#FF6B2B',
//                         fontWeight: 600,
//                       }}
//                     >
//                       {o.stallName}
//                     </p>
//                     <p style={{ fontSize: 11, color: '#8B7355', marginTop: 2 }}>
//                       ₹{o.total}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {order && (
//               <div
//                 style={{
//                   flex: 1,
//                   background: '#fff',
//                   borderRadius: 16,
//                   border: '1px solid #F0E6D9',
//                   padding: '24px',
//                   minWidth: 280,
//                 }}
//               >
//                 <div
//                   style={{
//                     display: 'flex',
//                     gap: 14,
//                     alignItems: 'center',
//                     marginBottom: 24,
//                   }}
//                 >
//                   <img
//                     src={
//                       order.items?.[0]?.image ||
//                       'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100'
//                     }
//                     alt={order.items?.[0]?.name}
//                     style={{
//                       width: 64,
//                       height: 64,
//                       borderRadius: 10,
//                       objectFit: 'cover',
//                     }}
//                   />
//                   <div>
//                     <p
//                       style={{
//                         fontFamily: 'Syne, sans-serif',
//                         fontSize: 16,
//                         fontWeight: 800,
//                         color: '#1A1208',
//                       }}
//                     >
//                       {order.items?.[0]?.name || 'Order'}
//                     </p>
//                     <p
//                       style={{
//                         fontSize: 12,
//                         color: '#FF6B2B',
//                         fontWeight: 600,
//                       }}
//                     >
//                       {order.stallName}
//                     </p>
//                     <p style={{ fontSize: 12, color: '#8B7355' }}>
//                       Qty: {order.items?.[0]?.qty || 1}
//                       {order.items?.[0]?.variant
//                         ? ` · ${order.items[0].variant}`
//                         : ''}
//                     </p>
//                   </div>
//                 </div>

//                 <div style={{ position: 'relative', paddingLeft: 32 }}>
//                   {STEPS.map(({ label, icon }, i) => {
//                     const done = i <= stepIndex
//                     const active = i === stepIndex
//                     return (
//                       <div
//                         key={label}
//                         style={{
//                           position: 'relative',
//                           paddingBottom: i < STEPS.length - 1 ? 28 : 0,
//                         }}
//                       >
//                         {i < STEPS.length - 1 && (
//                           <div
//                             style={{
//                               position: 'absolute',
//                               left: -20,
//                               top: 20,
//                               width: 2,
//                               height: '100%',
//                               background: done ? '#FF6B2B' : '#F0E6D9',
//                             }}
//                           />
//                         )}
//                         <div
//                           style={{
//                             position: 'absolute',
//                             left: -26,
//                             top: 2,
//                             width: 14,
//                             height: 14,
//                             borderRadius: '50%',
//                             background: done ? '#FF6B2B' : '#F0E6D9',
//                             border: `2px solid ${done ? '#FF6B2B' : '#C4A882'}`,
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                           }}
//                         >
//                           {done && (
//                             <div
//                               style={{
//                                 width: 6,
//                                 height: 6,
//                                 borderRadius: '50%',
//                                 background: '#fff',
//                               }}
//                             />
//                           )}
//                         </div>
//                         <p
//                           style={{
//                             fontSize: 14,
//                             fontWeight: active ? 700 : 500,
//                             color: done ? '#1A1208' : '#C4A882',
//                             fontFamily: active
//                               ? 'Syne, sans-serif'
//                               : 'DM Sans, sans-serif',
//                           }}
//                         >
//                           {icon} {label}
//                         </p>
//                         {active && (
//                           <p
//                             style={{
//                               fontSize: 11,
//                               color: '#FF6B2B',
//                               fontWeight: 600,
//                               marginTop: 2,
//                             }}
//                           >
//                             Current status
//                           </p>
//                         )}
//                       </div>
//                     )
//                   })}
//                 </div>

//                 <div
//                   style={{
//                     marginTop: 24,
//                     paddingTop: 16,
//                     borderTop: '1px solid #F0E6D9',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <p style={{ fontSize: 12, color: '#8B7355' }}>
//                     Type:{' '}
//                     <strong style={{ color: '#1A1208' }}>
//                       {order.orderType === 'preorder'
//                         ? '📅 Pre-order'
//                         : '⚡ Immediate'}
//                     </strong>
//                   </p>
//                   <p
//                     style={{
//                       fontFamily: 'Syne, sans-serif',
//                       fontSize: 16,
//                       fontWeight: 800,
//                       color: '#1A1208',
//                     }}
//                   >
//                     ₹{order.total}
//                   </p>
//                 </div>
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
import { useRouter } from 'next/navigation'
import UserHeader from './UserHeader'
import { useAuth } from '@/lib/authContext'

const STEPS = [
  { label: 'Order Placed', icon: '🧾' },
  { label: 'Confirmed', icon: '✅' },
  { label: 'Preparing', icon: '👨‍🍳' },
  { label: 'Out for Delivery', icon: '🚴' },
  { label: 'Delivered', icon: '🎉' },
]

const STATUS_STEP: Record<string, number> = {
  pending: 0,
  processing: 2,
  ready: 3,
  delivered: 4,
}

export default function OrderTracker() {
  const router = useRouter()
  const { user } = useAuth()
  const [allOrders, setAllOrders] = useState<any[]>([])
  const [selected, setSelected] = useState('')

  useEffect(() => {
    if (!user) return
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?userId=${user.id}`)
        const data = await res.json()
        if (Array.isArray(data)) {
          setAllOrders(data)
          if (data.length > 0 && !selected) setSelected(data[0]._id)
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchOrders()
    const interval = setInterval(fetchOrders, 5000)
    return () => clearInterval(interval)
  }, [user])

  const activeOrders = allOrders.filter((o) => o.status !== 'delivered')
  const order = allOrders.find((o) => o._id === selected)
  const stepIndex = order ? (STATUS_STEP[order.status] ?? 0) : 0

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes otPulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.6;transform:scale(1.3);} }
        .ot-root {
          min-height: 100vh;
          background: linear-gradient(160deg, #EEF7F1 0%, #F5FBF7 45%, #ffffff 100%);
          font-family: 'DM Sans', sans-serif;
          position: relative; overflow-x: hidden;
        }
        .ot-blob { pointer-events: none; position: absolute; z-index: 0; }
        .ot-inner { max-width: 960px; margin: 0 auto; padding: 32px 24px 64px; position: relative; z-index: 5; }
        .ot-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 4px 14px; border-radius: 20px;
          background: #D4EDD9; color: #3A7D52;
          font-size: 12px; font-weight: 700; margin-bottom: 12px;
        }
        .ot-chip-dot { width:6px;height:6px;border-radius:50%;background:#3A7D52;display:inline-block;animation:otPulse 2s infinite; }
        .ot-title { font-family:'Playfair Display',serif; font-size:clamp(22px,4vw,30px); font-weight:700; color:#1C3829; margin-bottom:4px; }
        .ot-subtitle { font-size:14px; color:#7BAE8C; margin-bottom:28px; }
        .ot-empty {
          text-align:center; padding:80px 0;
          background:rgba(255,255,255,0.85); border:1.5px solid #D4EDD9; border-radius:22px;
          backdrop-filter:blur(8px); box-shadow:0 16px 56px rgba(28,56,41,0.08);
        }
        .ot-empty-icon { font-size:52px; margin-bottom:14px; }
        .ot-empty-text { color:#7BAE8C; font-size:15px; margin-bottom:18px; }
        .ot-empty-btn {
          background:linear-gradient(135deg,#4E9A6A,#7BAE8C); color:#fff; border:none; border-radius:14px;
          padding:11px 26px; font-size:14px; font-weight:700; cursor:pointer;
          font-family:'DM Sans',sans-serif; box-shadow:0 6px 20px rgba(78,154,106,0.35);
          transition:opacity 0.18s,transform 0.18s;
        }
        .ot-empty-btn:hover { opacity:0.9; transform:translateY(-2px); }
        .ot-layout { display:flex; gap:20px; flex-wrap:wrap; align-items:flex-start; }
        .ot-list { display:flex; flex-direction:column; gap:10px; min-width:240px; flex-shrink:0; }
        .ot-order-card {
          background:rgba(255,255,255,0.85); border:1.5px solid #D4EDD9; border-radius:16px;
          padding:14px 16px; cursor:pointer; display:flex; gap:12px; align-items:center;
          backdrop-filter:blur(8px); transition:box-shadow 0.2s,border-color 0.2s,transform 0.2s;
        }
        .ot-order-card:hover { box-shadow:0 8px 24px rgba(28,56,41,0.1); transform:translateY(-2px); }
        .ot-order-card.active { border-color:#4E9A6A; box-shadow:0 4px 18px rgba(78,154,106,0.2); }
        .ot-order-img { width:50px;height:50px;border-radius:10px;object-fit:cover;flex-shrink:0;border:1.5px solid #D4EDD9; }
        .ot-order-name { font-family:'Playfair Display',serif; font-size:14px; font-weight:700; color:#1C3829; margin-bottom:2px; }
        .ot-order-stall { font-size:11px; color:#4E9A6A; font-weight:600; margin-bottom:2px; }
        .ot-order-total { font-size:11px; color:#7BAE8C; }
        .ot-detail {
          flex:1; min-width:280px;
          background:rgba(255,255,255,0.85); border:1.5px solid #D4EDD9; border-radius:22px;
          padding:26px 28px; backdrop-filter:blur(8px); box-shadow:0 16px 56px rgba(28,56,41,0.08);
        }
        .ot-detail-header { display:flex;gap:16px;align-items:center;margin-bottom:26px;padding-bottom:18px;border-bottom:1.5px solid #E8F2EB; }
        .ot-detail-img { width:68px;height:68px;border-radius:14px;object-fit:cover;border:1.5px solid #D4EDD9;flex-shrink:0; }
        .ot-detail-name { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#1C3829; margin-bottom:3px; }
        .ot-detail-stall { font-size:12px; color:#4E9A6A; font-weight:600; margin-bottom:3px; }
        .ot-detail-meta { font-size:12px; color:#7BAE8C; }
        .ot-steps { position:relative; padding-left:32px; }
        .ot-step { position:relative; padding-bottom:26px; }
        .ot-step:last-child { padding-bottom:0; }
        .ot-step-line { position:absolute;left:-20px;top:20px;width:2px;height:100%;border-radius:2px; }
        .ot-step-dot { position:absolute;left:-26px;top:3px;width:14px;height:14px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid; }
        .ot-step-dot-inner { width:6px;height:6px;border-radius:50%;background:#fff; }
        .ot-step-label { font-size:14px; }
        .ot-step-current { font-size:11px; color:#4E9A6A; font-weight:700; margin-top:2px; }
        .ot-detail-footer { margin-top:24px;padding-top:16px;border-top:1.5px solid #E8F2EB;display:flex;justify-content:space-between;align-items:center; }
        .ot-footer-type { font-size:12px; color:#7BAE8C; }
        .ot-footer-total { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#1C3829; }
        @media(max-width:640px){
          .ot-inner{padding:20px 16px 48px;}
          .ot-layout{flex-direction:column;}
          .ot-list{min-width:unset;width:100%;}
          .ot-detail{padding:18px 16px;}
        }
      `}</style>

      <div className="ot-root">
        <svg
          className="ot-blob"
          style={{
            top: 0,
            right: 0,
            width: 'min(480px,60vw)',
            height: 'min(480px,60vw)',
            opacity: 0.18,
          }}
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M320,80 Q380,140 360,220 Q340,300 260,340 Q180,380 120,320 Q60,260 80,180 Q100,100 180,60 Q260,20 320,80Z"
            fill="#7BAE8C"
          />
        </svg>
        <svg
          className="ot-blob"
          style={{
            bottom: 0,
            left: 0,
            width: 'min(340px,50vw)',
            height: 'min(340px,50vw)',
            opacity: 0.13,
          }}
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M240,60 Q290,120 270,190 Q250,260 180,280 Q110,300 60,240 Q10,180 40,110 Q70,40 150,30 Q230,20 240,60Z"
            fill="#A8D5B5"
          />
        </svg>

        <UserHeader />

        <div className="ot-inner">
          <div className="ot-chip">
            <span className="ot-chip-dot" />
            Live Tracking
          </div>
          <h1 className="ot-title">Track Orders</h1>
          <p className="ot-subtitle">
            {activeOrders.length} active order
            {activeOrders.length !== 1 ? 's' : ''}
          </p>

          {activeOrders.length === 0 ? (
            <div className="ot-empty">
              <div className="ot-empty-icon">📭</div>
              <p className="ot-empty-text">No active orders right now.</p>
              <button
                className="ot-empty-btn"
                onClick={() => router.push('/search')}
              >
                Browse Stalls
              </button>
            </div>
          ) : (
            <div className="ot-layout">
              <div className="ot-list">
                {activeOrders.map((o) => (
                  <div
                    key={o._id}
                    className={`ot-order-card${selected === o._id ? ' active' : ''}`}
                    onClick={() => setSelected(o._id)}
                  >
                    <img
                      className="ot-order-img"
                      src={
                        o.items?.[0]?.image ||
                        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100'
                      }
                      alt={o.items?.[0]?.name}
                    />
                    <div>
                      <p className="ot-order-name">
                        {o.items?.[0]?.name || 'Order'}
                      </p>
                      <p className="ot-order-stall">{o.stallName}</p>
                      <p className="ot-order-total">₹{o.total}</p>
                    </div>
                  </div>
                ))}
              </div>

              {order && (
                <div className="ot-detail">
                  <div className="ot-detail-header">
                    <img
                      className="ot-detail-img"
                      src={
                        order.items?.[0]?.image ||
                        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100'
                      }
                      alt={order.items?.[0]?.name}
                    />
                    <div>
                      <p className="ot-detail-name">
                        {order.items?.[0]?.name || 'Order'}
                      </p>
                      <p className="ot-detail-stall">{order.stallName}</p>
                      <p className="ot-detail-meta">
                        Qty: {order.items?.[0]?.qty || 1}
                        {order.items?.[0]?.variant
                          ? ` · ${order.items[0].variant}`
                          : ''}
                      </p>
                    </div>
                  </div>

                  <div className="ot-steps">
                    {STEPS.map(({ label, icon }, i) => {
                      const done = i <= stepIndex
                      const active = i === stepIndex
                      return (
                        <div key={label} className="ot-step">
                          {i < STEPS.length - 1 && (
                            <div
                              className="ot-step-line"
                              style={{
                                background: done
                                  ? 'linear-gradient(180deg,#4E9A6A,#7BAE8C)'
                                  : '#E8F2EB',
                              }}
                            />
                          )}
                          <div
                            className="ot-step-dot"
                            style={{
                              background: done ? '#4E9A6A' : '#EEF7F1',
                              borderColor: done ? '#4E9A6A' : '#D4EDD9',
                              boxShadow: active
                                ? '0 0 0 3px rgba(78,154,106,0.18)'
                                : 'none',
                            }}
                          >
                            {done && <div className="ot-step-dot-inner" />}
                          </div>
                          <p
                            className="ot-step-label"
                            style={{
                              fontWeight: active ? 700 : 500,
                              color: done ? '#1C3829' : '#A8C9B0',
                              fontFamily: active
                                ? "'Playfair Display',serif"
                                : "'DM Sans',sans-serif",
                            }}
                          >
                            {icon} {label}
                          </p>
                          {active && (
                            <p className="ot-step-current">Current status</p>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="ot-detail-footer">
                    <p className="ot-footer-type">
                      Type:{' '}
                      <strong style={{ color: '#1C3829' }}>
                        {order.orderType === 'preorder'
                          ? '📅 Pre-order'
                          : '⚡ Immediate'}
                      </strong>
                    </p>
                    <p className="ot-footer-total">₹{order.total}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
