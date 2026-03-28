'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/authContext'
import VendorHeader from '../../components/vendor/Header'
import VendorOrders from '@/components/vendor/VendorOrders'
import VendorOnboardForm from '@/components/vendor/VendorOnboardForm'
import AddProductForm from '@/components/vendor/PreorderForm'
import { MOCK_ORDERS } from '@/lib/mockData'

export default function VendorPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState('orders')
  const [stallLive, setStallLive] = useState(false)
  const [stallData, setStallData] = useState<any>(null)

  useEffect(() => {
    if (!loading && !user) router.push('/account')
    if (!loading && user?.role === 'user') router.push('/search')
  }, [user, loading, router])

  if (loading || !user) return null

  const totalRevenue = MOCK_ORDERS.filter(
    (o) => o.status === 'delivered',
  ).reduce((s, o) => s + o.total, 0)
  const pendingCount = MOCK_ORDERS.filter((o) => o.status === 'pending').length

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8F0' }}>
      <VendorHeader activeTab={tab} onTabChange={setTab} />

      <div style={styles.container}>
        <div style={styles.statsBar}>
          {[
            { label: 'Total Orders', value: MOCK_ORDERS.length, icon: '📦' },
            {
              label: 'Pending',
              value: pendingCount,
              icon: '⏳',
              highlight: true,
            },
            { label: 'Revenue Today', value: `₹${totalRevenue}`, icon: '💰' },
            {
              label: 'Stall Status',
              value: stallLive ? 'Live 🟢' : 'Offline ⚫',
              icon: '🏪',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                ...styles.statCard,
                borderColor:
                  stat.highlight && pendingCount > 0 ? '#FF6B2B' : '#F0E6D9',
              }}
            >
              <div style={styles.statIcon}>{stat.icon}</div>
              <div
                style={{
                  ...styles.statValue,
                  color:
                    stat.highlight && pendingCount > 0 ? '#FF6B2B' : '#1A1208',
                }}
              >
                {stat.value}
              </div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {!stallLive && tab !== 'stall' && (
          <div style={styles.onboardBanner}>
            <div>
              <h3 style={styles.bannerTitle}>Your stall isn't live yet!</h3>
              <p style={{ color: '#fff', opacity: 0.8, fontSize: 14 }}>
                Set up your stall to start receiving orders from customers
                nearby.
              </p>
            </div>
            <button
              className="btn-primary"
              style={{ background: '#fff', color: '#FF6B2B' }}
              onClick={() => setTab('stall')}
            >
              Set Up Stall →
            </button>
          </div>
        )}

        {tab === 'orders' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Incoming Orders</h2>
            <VendorOrders />
          </div>
        )}

        {tab === 'stall' && (
          <div style={styles.section}>
            {stallLive && stallData ? (
              <div>
                <div style={styles.liveHeader}>
                  <div>
                    <h2 style={styles.sectionTitle}>Your Stall is Live! 🟢</h2>
                    <p style={{ color: '#8B7355', fontSize: 14 }}>
                      Customers can now find and order from your stall.
                    </p>
                  </div>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setStallLive(false)
                      setStallData(null)
                    }}
                  >
                    Take Offline
                  </button>
                </div>
                <div style={styles.stallPreview}>
                  {[
                    { label: 'Name', value: stallData.name },
                    { label: 'Category', value: stallData.category },
                    { label: 'Location', value: stallData.location },
                    {
                      label: 'Timings',
                      value: `${stallData.openTime} – ${stallData.closeTime}`,
                    },
                    { label: 'Min Order', value: `₹${stallData.minOrder}` },
                  ].map((item) => (
                    <div key={item.label} style={styles.previewRow}>
                      <span style={styles.previewLabel}>{item.label}</span>
                      <span style={styles.previewValue}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <h2 style={styles.sectionTitle}>Set Up Your Stall</h2>
                <VendorOnboardForm
                  onComplete={(data) => {
                    setStallData(data)
                    setStallLive(true)
                    setTab('orders')
                  }}
                />
              </>
            )}
          </div>
        )}

        {tab === 'add' && (
          <div style={styles.section}>
            <AddProductForm />
          </div>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 1200, margin: '0 auto', padding: '28px 24px 60px' },
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    background: '#fff',
    border: '2px solid #F0E6D9',
    borderRadius: 14,
    padding: '18px 16px',
    textAlign: 'center',
  },
  statIcon: { fontSize: 24, marginBottom: 8 },
  statValue: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 4,
  },
  statLabel: { fontSize: 12, color: '#8B7355', fontWeight: 500 },
  onboardBanner: {
    background: 'linear-gradient(135deg, #FF6B2B 0%, #E5500A 100%)',
    borderRadius: 16,
    padding: '20px 24px',
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  bannerTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 18,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 4,
  },
  section: {
    background: '#fff',
    border: '1px solid #F0E6D9',
    borderRadius: 16,
    padding: '24px',
  },
  sectionTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 22,
    fontWeight: 700,
    color: '#1A1208',
    marginBottom: 20,
  },
  liveHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stallPreview: {
    background: '#FFF8F0',
    borderRadius: 12,
    border: '1px solid #F0E6D9',
    overflow: 'hidden',
  },
  previewRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: '1px solid #F0E6D9',
  },
  previewLabel: { fontSize: 13, color: '#8B7355' },
  previewValue: { fontSize: 13, fontWeight: 600, color: '#1A1208' },
}
// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '../../lib/authContext'
// import VendorHeader from '../../components/vendor/Header'
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
