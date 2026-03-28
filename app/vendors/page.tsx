// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '@/lib/authContext'
// import VendorHeader from '@/components/vendor/Header'
// import VendorOrders from '@/components/vendor/VendorOrders'
// import VendorOnboardForm from '@/components/vendor/VendorOnboardForm'
// import AddProductForm from '@/components/vendor/PreorderForm'

// export default function VendorPage() {
//   const { user, loading } = useAuth()
//   const router = useRouter()
//   const [tab, setTab] = useState('orders')
//   const [stallLive, setStallLive] = useState(false)
//   const [stallData, setStallData] = useState<any>(null)
//   const [orders, setOrders] = useState<any[]>([])

//   useEffect(() => {
//     if (!loading && !user) router.push('/account')
//     if (!loading && user?.role === 'user') router.push('/search')
//   }, [user, loading, router])

//   useEffect(() => {
//     if (!user?.stallId) return
//     setStallLive(true)
//     // Load existing stall data
//     fetch(`/api/stalls/${user.stallId}`)
//       .then((r) => r.json())
//       .then((d) => setStallData(d))
//       .catch(() => {})
//     // Load orders
//     fetch(`/api/orders?stallId=${user.stallId}`)
//       .then((r) => r.json())
//       .then((d) => {
//         if (Array.isArray(d)) setOrders(d)
//       })
//       .catch(() => {})
//   }, [user])

//   if (loading || !user) return null

//   const totalRevenue = orders
//     .filter((o) => o.status === 'delivered')
//     .reduce((s, o) => s + o.total, 0)
//   const pendingCount = orders.filter((o) => o.status === 'pending').length

//   return (
//     <div style={{ minHeight: '100vh', background: '#FFF8F0' }}>
//       <VendorHeader activeTab={tab} onTabChange={setTab} />

//       <div style={styles.container}>
//         <div style={styles.statsBar}>
//           {[
//             { label: 'Total Orders', value: orders.length, icon: '📦' },
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
//             <AddProductForm
//               stallId={
//                 stallData?.id || stallData?._id || user?.stallId || 's_new'
//               }
//             />
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
'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'
import { motion } from 'framer-motion'
import VendorHeader from '@/components/vendor/Header'
import VendorOrders from '@/components/vendor/VendorOrders'
import VendorOnboardForm from '@/components/vendor/VendorOnboardForm'
import AddProductForm from '@/components/vendor/PreorderForm'
import ProductReviews from '@/components/vendor/ProductReviews'

export default function VendorPage() {
  const { user, loading, login } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState('orders')
  const [stalls, setStalls] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/account')
    if (!loading && user?.role === 'user') router.push('/search')
  }, [user, loading, router])

  const fetchStalls = useCallback(async () => {
    if (!user?.id) return
    try {
      const res = await fetch(`/api/stalls?vendorId=${user.id}`)
      const data = await res.json()
      if (Array.isArray(data)) setStalls(data)
    } catch (e) {
      console.error(e)
    }
  }, [user?.id])

  useEffect(() => {
    if (!user?.id) return
    fetchStalls()
    if (user?.stallId) {
      fetch(`/api/orders?stallId=${user.stallId}`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d)) setOrders(d)
        })
        .catch(() => {})
    }
  }, [user, fetchStalls])

  if (loading || !user) return null

  const totalRevenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((s, o) => s + o.total, 0)
  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const stallLive = stalls.length > 0

  const handleDeleteStall = async (stallId: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this stall? This cannot be undone.',
      )
    )
      return
    try {
      await fetch(`/api/stalls/${stallId}`, { method: 'DELETE' })
      await fetch('/api/auth/update-stall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, stallId: undefined }),
      })
      login({ ...user, stallId: undefined })
      setStalls((prev) => prev.filter((s) => (s._id || s.id) !== stallId))
    } catch (e) {
      console.error(e)
    }
  }

  const handleStallComplete = async (data: any) => {
    if (!data) return
    await fetchStalls()
    setShowAddForm(false)
    setTab('orders')
  }

  const STATS = [
    {
      label: 'Total Orders',
      value: orders.length,
      icon: '📦',
      highlight: false,
    },
    {
      label: 'Pending',
      value: pendingCount,
      icon: '⏳',
      highlight: pendingCount > 0,
    },
    {
      label: 'Revenue Today',
      value: `₹${totalRevenue}`,
      icon: '💰',
      highlight: false,
    },
    {
      label: 'Stall Status',
      value: stallLive ? 'Live 🟢' : 'Offline ⚫',
      icon: '🏪',
      highlight: false,
    },
  ]

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .vp-root {
          min-height: 100vh; position: relative; overflow-x: hidden;
          background: linear-gradient(160deg, #EEF7F1 0%, #F5FBF7 45%, #ffffff 100%);
          font-family: 'DM Sans', sans-serif;
        }
        @keyframes vpPulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.6; transform:scale(1.3); } }
        .vp-inner { max-width: 1140px; margin: 0 auto; padding: 32px 24px 64px; position: relative; z-index: 5; }
        .vp-page-hd { margin-bottom: 28px; }
        .vp-live-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 4px 14px; border-radius: 20px;
          background: #D4EDD9; color: #3A7D52;
          font-size: 12px; font-weight: 700; margin-bottom: 12px;
          font-family: 'DM Sans',sans-serif;
        }
        .vp-live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #3A7D52; display: inline-block; animation: vpPulse 2s infinite;
        }
        .vp-greeting {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 4vw, 30px); font-weight: 700;
          color: #1C3829; margin-bottom: 4px; line-height: 1.25;
        }
        .vp-greeting-sub { font-size: 14px; color: #7BAE8C; }
        .vp-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
        .vp-stat {
          background: rgba(255,255,255,0.85); border: 1.5px solid #D4EDD9;
          border-radius: 18px; padding: 18px 14px; text-align: center;
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
        }
        .vp-stat:hover { box-shadow: 0 10px 32px rgba(28,56,41,0.11); border-color: #A8C9B0; transform: translateY(-2px); }
        .vp-stat.highlight { border-color: #4E9A6A; box-shadow: 0 4px 18px rgba(78,154,106,0.18); }
        .vp-stat-icon { font-size: 24px; margin-bottom: 8px; }
        .vp-stat-value { font-family: 'Playfair Display', serif; font-size: clamp(18px, 3vw, 24px); font-weight: 700; color: #1C3829; margin-bottom: 4px; }
        .vp-stat-value.pending-val { color: #4E9A6A; }
        .vp-stat-label { font-size: 11px; color: #7BAE8C; font-weight: 600; letter-spacing: 0.04em; }
        .vp-banner {
          background: linear-gradient(135deg, #4E9A6A 0%, #3A7D52 100%);
          border-radius: 18px; padding: 18px 22px; margin-bottom: 24px;
          display: flex; align-items: center; justify-content: space-between; gap: 14px;
          box-shadow: 0 8px 28px rgba(78,154,106,0.28);
        }
        .vp-banner-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 3px; }
        .vp-banner-sub { color: rgba(255,255,255,0.82); font-size: 13px; }
        .vp-banner-btn {
          background: rgba(255,255,255,0.95); color: #2D7A4A;
          border: none; border-radius: 12px; padding: 10px 18px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif; white-space: nowrap; flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(0,0,0,0.1); transition: opacity 0.18s, transform 0.18s;
        }
        .vp-banner-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .vp-section {
          background: rgba(255,255,255,0.85); border: 1.5px solid #D4EDD9;
          border-radius: 22px; padding: 26px 28px;
          box-shadow: 0 16px 56px rgba(28,56,41,0.08);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        }
        .vp-section-title { font-family: 'Playfair Display', serif; font-size: clamp(18px, 3vw, 22px); font-weight: 700; color: #1C3829; margin-bottom: 18px; }
        .vp-live-pill {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #D4EDD9, #B8E0C4);
          color: #1C3829; font-size: 12px; font-weight: 700;
          padding: 5px 14px; border-radius: 20px;
          border: 1px solid #A8D5B5; margin-bottom: 6px;
          font-family: 'DM Sans',sans-serif;
        }
        .vp-stall-subtitle { color: #7BAE8C; font-size: 13px; margin-top: 3px; margin-bottom: 18px; }
        .vp-stall-preview { background: rgba(238,247,241,0.7); border-radius: 14px; border: 1.5px solid #D4EDD9; overflow: hidden; }
        .vp-preview-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #E8F2EB; gap: 12px; }
        .vp-preview-row:last-child { border-bottom: none; }
        .vp-preview-key { font-size: 13px; color: #7BAE8C; flex-shrink: 0; }
        .vp-preview-val { font-size: 13px; font-weight: 700; color: #1C3829; text-align: right; word-break: break-word; }
        .vp-stall-card {
          background: rgba(255,255,255,0.9); border: 1.5px solid #D4EDD9;
          border-radius: 18px; padding: 20px; margin-bottom: 16px;
          box-shadow: 0 4px 16px rgba(28,56,41,0.06);
        }
        .vp-stall-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; gap: 12px; }
        .vp-stall-card-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #1C3829; }
        .vp-delete-btn {
          background: transparent; color: #C0392B;
          border: 1.5px solid #E8B4B0; border-radius: 10px;
          padding: 6px 12px; font-size: 12px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans, sans-serif';
          transition: background 0.18s; white-space: nowrap; flex-shrink: 0;
        }
        .vp-delete-btn:hover { background: #FDF0EF; }
        .vp-add-stall-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
          color: #fff; border: none; border-radius: 14px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 6px 20px rgba(78,154,106,0.35);
          transition: opacity 0.18s, transform 0.18s;
          margin-top: 8px;
        }
        .vp-add-stall-btn:hover { opacity: 0.92; transform: translateY(-2px); }
        .vp-blob { pointer-events: none; position: absolute; z-index: 0; }
        @media (max-width: 900px) { .vp-stats { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) {
          .vp-inner { padding: 20px 16px 48px; }
          .vp-stats { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .vp-stat { padding: 14px 10px; border-radius: 14px; }
          .vp-stat-icon { font-size: 20px; margin-bottom: 6px; }
          .vp-section { padding: 18px 16px; border-radius: 18px; }
          .vp-banner { flex-direction: column; align-items: flex-start; }
          .vp-banner-btn { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="vp-root">
        <motion.svg
          className="vp-blob"
          style={{
            top: 0,
            right: 0,
            width: 'min(480px, 60vw)',
            height: 'min(480px, 60vw)',
          }}
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ opacity: [0.18, 0.26, 0.18], y: [0, -14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M320,80 Q380,140 360,220 Q340,300 260,340 Q180,380 120,320 Q60,260 80,180 Q100,100 180,60 Q260,20 320,80Z"
            fill="#7BAE8C"
          />
        </motion.svg>
        <motion.svg
          className="vp-blob"
          style={{
            bottom: 0,
            left: 0,
            width: 'min(340px, 50vw)',
            height: 'min(340px, 50vw)',
          }}
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ opacity: [0.1, 0.18, 0.1], y: [0, 12, 0] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <path
            d="M240,60 Q290,120 270,190 Q250,260 180,280 Q110,300 60,240 Q10,180 40,110 Q70,40 150,30 Q230,20 240,60Z"
            fill="#A8D5B5"
          />
        </motion.svg>

        <div style={{ position: 'relative', zIndex: 10 }}>
          <VendorHeader activeTab={tab} onTabChange={setTab} />
        </div>

        <div className="vp-inner">
          <motion.div
            className="vp-page-hd"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="vp-live-chip">
              <span className="vp-live-dot" />
              Vendor Dashboard
            </div>
            <h1 className="vp-greeting">
              Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! 👋
            </h1>
            <p className="vp-greeting-sub">
              Here's what's happening with your stall today.
            </p>
          </motion.div>

          <motion.div
            className="vp-stats"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className={`vp-stat${stat.highlight ? ' highlight' : ''}`}
              >
                <div className="vp-stat-icon">{stat.icon}</div>
                <div
                  className={`vp-stat-value${stat.highlight ? ' pending-val' : ''}`}
                >
                  {stat.value}
                </div>
                <div className="vp-stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {!stallLive && tab !== 'stall' && (
            <motion.div
              className="vp-banner"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div>
                <p className="vp-banner-title">Your stall isn't live yet!</p>
                <p className="vp-banner-sub">
                  Set up your stall to start receiving orders from customers
                  nearby.
                </p>
              </div>
              <button className="vp-banner-btn" onClick={() => setTab('stall')}>
                Set Up Stall →
              </button>
            </motion.div>
          )}

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === 'orders' && (
              <div className="vp-section">
                <p className="vp-section-title">Incoming Orders</p>
                <VendorOrders />
              </div>
            )}

            {tab === 'stall' && (
              <div className="vp-section">
                <p className="vp-section-title">My Stalls</p>

                {stalls.length > 0 &&
                  stalls.map((stall) => {
                    const stallId = stall._id || stall.id
                    return (
                      <div key={stallId} className="vp-stall-card">
                        <div className="vp-stall-card-header">
                          <div>
                            <div className="vp-live-pill">
                              <span className="vp-live-dot" />
                              Live
                            </div>
                            <p className="vp-stall-card-name">{stall.name}</p>
                            <p className="vp-stall-subtitle">
                              Customers can now find and order from your stall.
                            </p>
                          </div>
                          <button
                            className="vp-delete-btn"
                            onClick={() => handleDeleteStall(stallId)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                        <div className="vp-stall-preview">
                          {[
                            { label: 'Name', value: stall.name },
                            { label: 'Category', value: stall.category },
                            { label: 'Location', value: stall.location },
                            {
                              label: 'Timings',
                              value: `${stall.openTime} – ${stall.closeTime}`,
                            },
                            { label: 'Min Order', value: `₹${stall.minOrder}` },
                          ].map((item) => (
                            <div key={item.label} className="vp-preview-row">
                              <span className="vp-preview-key">
                                {item.label}
                              </span>
                              <span className="vp-preview-val">
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}

                {showAddForm ? (
                  <>
                    <p className="vp-section-title" style={{ marginTop: 24 }}>
                      Add New Stall
                    </p>
                    <VendorOnboardForm onComplete={handleStallComplete} />
                  </>
                ) : (
                  <button
                    className="vp-add-stall-btn"
                    onClick={() => setShowAddForm(true)}
                  >
                    + Add {stalls.length > 0 ? 'Another' : 'Your First'} Stall
                  </button>
                )}
              </div>
            )}

            {tab === 'add' && (
              <div className="vp-section">
                <AddProductForm
                  stallId={
                    stalls[0]?.id || stalls[0]?._id || user?.stallId || 's_new'
                  }
                />
              </div>
            )}

            {tab === 'reviews' && (
              <div className="vp-section">
                <ProductReviews />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}
