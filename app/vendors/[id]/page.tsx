// 'use client'
// import { useState, useEffect } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import UserHeader from '@/components/user/UserHeader'
// import Checkout from '@/components/user/Checkout'

// export default function VendorDetailPage() {
//   const { id } = useParams<{ id: string }>()
//   const router = useRouter()
//   const [stall, setStall] = useState<any>(null)
//   const [products, setProducts] = useState<any[]>([])
//   const [cart, setCart] = useState<any[]>([])
//   const [showCheckout, setShowCheckout] = useState(false)
//   const [orderSuccess, setOrderSuccess] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [productsLoading, setProductsLoading] = useState(true)
//   // useEffect(() => {
//   //   if (!id) return
//   //   const fetchData = async () => {
//   //     try {
//   //       const [stallRes, productsRes] = await Promise.all([
//   //         fetch(`/api/stalls/${id}`),
//   //         fetch(`/api/products?stallId=${id}`),
//   //       ])
//   //       const stallData = await stallRes.json()
//   //       const productsData = await productsRes.json()
//   //       setStall(stallData)
//   //       if (Array.isArray(productsData)) setProducts(productsData)
//   //     } catch (e) {
//   //       console.error(e)
//   //     } finally {
//   //       setLoading(false)
//   //     }
//   //   }
//   //   fetchData()
//   // }, [id])
//   useEffect(() => {
//     if (!id) return
//     const fetchData = async () => {
//       try {
//         const stallRes = await fetch(`/api/stalls/${id}`)
//         const stallData = await stallRes.json()
//         setStall(stallData)
//         setLoading(false)
//         const productsRes = await fetch(`/api/products?stallId=${id}`)
//         const productsData = await productsRes.json()
//         if (Array.isArray(productsData)) setProducts(productsData)
//       } catch (e) {
//         console.error(e)
//         setLoading(false)
//       } finally {
//         setProductsLoading(false)
//       }
//     }
//     fetchData()
//   }, [id])

//   const addToCart = (product: any, variant?: string) => {
//     setCart((prev) => {
//       const existing = prev.find(
//         (i) => i.productId === product._id && i.variant === variant,
//       )
//       if (existing)
//         return prev.map((i) =>
//           i.productId === product._id && i.variant === variant
//             ? { ...i, qty: i.qty + 1 }
//             : i,
//         )
//       return [
//         ...prev,
//         {
//           productId: product._id,
//           name: product.name,
//           price: product.price,
//           qty: 1,
//           variant,
//           image: product.image,
//           stallName: stall?.name,
//           stallId: id,
//         },
//       ]
//     })
//   }

//   const cartCount = cart.reduce((s, i) => s + i.qty, 0)
//   const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

//   if (loading)
//     return (
//       <div
//         style={{
//           minHeight: '100vh',
//           background: '#FFF8F0',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <p style={{ color: '#8B7355', fontFamily: 'DM Sans, sans-serif' }}>
//           Loading stall...
//         </p>
//       </div>
//     )

//   if (!stall)
//     return (
//       <div
//         style={{
//           minHeight: '100vh',
//           background: '#FFF8F0',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           gap: 16,
//         }}
//       >
//         <div style={{ fontSize: 48 }}>🏪</div>
//         <p style={{ color: '#8B7355', fontFamily: 'DM Sans, sans-serif' }}>
//           Stall not found.
//         </p>
//         <button
//           onClick={() => router.push('/search')}
//           style={{
//             background: '#FF6B2B',
//             color: '#fff',
//             border: 'none',
//             borderRadius: 10,
//             padding: '10px 24px',
//             fontSize: 14,
//             fontWeight: 700,
//             cursor: 'pointer',
//           }}
//         >
//           Browse Stalls
//         </button>
//       </div>
//     )

//   if (orderSuccess)
//     return (
//       <div
//         style={{
//           minHeight: '100vh',
//           background: '#FFF8F0',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           gap: 16,
//           fontFamily: 'DM Sans, sans-serif',
//         }}
//       >
//         <div style={{ fontSize: 64 }}>🎉</div>
//         <h2
//           style={{
//             fontFamily: 'Syne, sans-serif',
//             fontSize: 24,
//             fontWeight: 800,
//             color: '#1A1208',
//           }}
//         >
//           Order Placed!
//         </h2>
//         <p style={{ color: '#8B7355' }}>
//           Your order has been sent to {stall.name}
//         </p>
//         <button
//           onClick={() => router.push('/orders')}
//           style={{
//             background: '#FF6B2B',
//             color: '#fff',
//             border: 'none',
//             borderRadius: 12,
//             padding: '12px 28px',
//             fontSize: 15,
//             fontWeight: 700,
//             cursor: 'pointer',
//           }}
//         >
//           Track Order
//         </button>
//       </div>
//     )

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         background: '#FFF8F0',
//         fontFamily: 'DM Sans, sans-serif',
//       }}
//     >
//       <UserHeader />

//       {/* Stall Hero */}
//       <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
//         <img
//           src={
//             stall.image ||
//             'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800'
//           }
//           alt={stall.name}
//           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//         />
//         <div
//           style={{
//             position: 'absolute',
//             inset: 0,
//             background:
//               'linear-gradient(to top, rgba(26,18,8,0.7), transparent)',
//           }}
//         />
//         {/* <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 10,
//               marginBottom: 6,
//             }}
//           >
//             <span
//               style={{
//                 background: stall.isOpen ? '#dcfce7' : '#fee2e2',
//                 color: stall.isOpen ? '#16a34a' : '#dc2626',
//                 fontSize: 11,
//                 fontWeight: 700,
//                 padding: '4px 10px',
//                 borderRadius: 20,
//               }}
//             >
//               {stall.isOpen ? '● Open' : '● Closed'}
//             </span>
//           </div> */}
//         <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 10,
//               marginBottom: 6,
//             }}
//           >
//             <button
//               onClick={() => router.back()}
//               style={{
//                 background: 'rgba(255,255,255,0.2)',
//                 border: '1px solid rgba(255,255,255,0.4)',
//                 borderRadius: 20,
//                 padding: '4px 14px',
//                 color: '#fff',
//                 fontSize: 12,
//                 fontWeight: 700,
//                 cursor: 'pointer',
//                 backdropFilter: 'blur(8px)',
//               }}
//             >
//               ← Back
//             </button>
//             <span
//               style={{
//                 background: stall.isOpen ? '#dcfce7' : '#fee2e2',
//                 color: stall.isOpen ? '#16a34a' : '#dc2626',
//                 fontSize: 11,
//                 fontWeight: 700,
//                 padding: '4px 10px',
//                 borderRadius: 20,
//               }}
//             >
//               {stall.isOpen ? '● Open' : '● Closed'}
//             </span>
//           </div>
//           <h1
//             style={{
//               fontFamily: 'Syne, sans-serif',
//               fontSize: 28,
//               fontWeight: 800,
//               color: '#fff',
//               marginBottom: 4,
//             }}
//           >
//             {stall.name}
//           </h1>
//           <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
//             📍 {stall.location} · ⭐ {stall.rating || 'New'} · Min ₹
//             {stall.minOrder}
//           </p>
//         </div>
//       </div>

//       <div
//         style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 120px' }}
//       >
//         {stall.description && (
//           <p
//             style={{
//               fontSize: 14,
//               color: '#8B7355',
//               marginBottom: 24,
//               lineHeight: 1.6,
//             }}
//           >
//             {stall.description}
//           </p>
//         )}

//         <h2
//           style={{
//             fontFamily: 'Syne, sans-serif',
//             fontSize: 20,
//             fontWeight: 800,
//             color: '#1A1208',
//             marginBottom: 16,
//           }}
//         >
//           Menu
//         </h2>

//         {/* {products.length === 0 ? (
//           <div style={{ textAlign: 'center', padding: '60px 0' }}>
//             <div style={{ fontSize: 48 }}>📦</div>
//             <p style={{ color: '#8B7355', marginTop: 12 }}>
//               No products listed yet.
//             </p>
//           </div>
//         ) : (
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
//               gap: 18,
//             }}
//           > */}
//         {productsLoading ? (
//           <div style={{ textAlign: 'center', padding: '40px 0' }}>
//             <div style={{ fontSize: 24 }}>⏳</div>
//             <p style={{ color: '#8B7355', marginTop: 8, fontSize: 13 }}>
//               Loading menu...
//             </p>
//           </div>
//         ) : products.length === 0 ? (
//           <div style={{ textAlign: 'center', padding: '60px 0' }}>
//             <div style={{ fontSize: 48 }}>📦</div>
//             <p style={{ color: '#8B7355', marginTop: 12 }}>
//               No products listed yet.
//             </p>
//           </div>
//         ) : (
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
//               gap: 18,
//             }}
//           >
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 style={{
//                   background: '#fff',
//                   borderRadius: 14,
//                   border: '1px solid #F0E6D9',
//                   overflow: 'hidden',
//                   boxShadow: '0 2px 12px rgba(26,18,8,0.05)',
//                 }}
//               >
//                 <div style={{ position: 'relative', height: 160 }}>
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                     }}
//                   />
//                   {product.originalPrice && (
//                     <div
//                       style={{
//                         position: 'absolute',
//                         top: 8,
//                         left: 8,
//                         background: '#FF6B2B',
//                         color: '#fff',
//                         fontSize: 11,
//                         fontWeight: 700,
//                         padding: '3px 8px',
//                         borderRadius: 6,
//                       }}
//                     >
//                       {Math.round(
//                         (1 - product.price / product.originalPrice) * 100,
//                       )}
//                       % OFF
//                     </div>
//                   )}
//                 </div>
//                 <div style={{ padding: '12px 14px' }}>
//                   <p
//                     style={{
//                       fontFamily: 'Syne, sans-serif',
//                       fontSize: 15,
//                       fontWeight: 700,
//                       color: '#1A1208',
//                       marginBottom: 4,
//                     }}
//                   >
//                     {product.name}
//                   </p>
//                   {product.description && (
//                     <p
//                       style={{
//                         fontSize: 12,
//                         color: '#8B7355',
//                         marginBottom: 8,
//                         lineHeight: 1.5,
//                       }}
//                     >
//                       {product.description}
//                     </p>
//                   )}
//                   {product.variants?.length > 0 && (
//                     <div
//                       style={{
//                         display: 'flex',
//                         gap: 6,
//                         flexWrap: 'wrap',
//                         marginBottom: 8,
//                       }}
//                     >
//                       {product.variants.map((v: string) => (
//                         <span
//                           key={v}
//                           style={{
//                             fontSize: 11,
//                             background: '#FFF8F0',
//                             border: '1px solid #F0E6D9',
//                             borderRadius: 6,
//                             padding: '3px 8px',
//                             color: '#8B7355',
//                           }}
//                         >
//                           {v}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                   <div
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                     }}
//                   >
//                     <div>
//                       <span
//                         style={{
//                           fontFamily: 'Syne, sans-serif',
//                           fontSize: 17,
//                           fontWeight: 800,
//                           color: '#1A1208',
//                         }}
//                       >
//                         ₹{product.price}
//                       </span>
//                       {product.originalPrice && (
//                         <span
//                           style={{
//                             fontSize: 12,
//                             color: '#C4A882',
//                             textDecoration: 'line-through',
//                             marginLeft: 6,
//                           }}
//                         >
//                           ₹{product.originalPrice}
//                         </span>
//                       )}
//                     </div>
//                     <button
//                       onClick={() => addToCart(product)}
//                       style={{
//                         background: '#FF6B2B',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: 8,
//                         padding: '7px 16px',
//                         fontSize: 13,
//                         fontWeight: 700,
//                         cursor: 'pointer',
//                       }}
//                     >
//                       + Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Cart Bar */}
//       {cartCount > 0 && !showCheckout && (
//         <div
//           style={{
//             position: 'fixed',
//             bottom: 24,
//             left: '50%',
//             transform: 'translateX(-50%)',
//             zIndex: 200,
//           }}
//         >
//           <button
//             onClick={() => setShowCheckout(true)}
//             style={{
//               background: '#FF6B2B',
//               color: '#fff',
//               border: 'none',
//               borderRadius: 14,
//               padding: '14px 28px',
//               fontSize: 15,
//               fontWeight: 800,
//               cursor: 'pointer',
//               fontFamily: 'Syne, sans-serif',
//               boxShadow: '0 8px 32px rgba(255,107,43,0.4)',
//               display: 'flex',
//               alignItems: 'center',
//               gap: 12,
//             }}
//           >
//             <span
//               style={{
//                 background: 'rgba(255,255,255,0.2)',
//                 borderRadius: '50%',
//                 width: 26,
//                 height: 26,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: 13,
//                 fontWeight: 800,
//               }}
//             >
//               {cartCount}
//             </span>
//             View Cart · ₹{cartTotal}
//           </button>
//         </div>
//       )}

//       {showCheckout && (
//         <Checkout
//           cart={cart}
//           stallName={stall.name}
//           stallId={id}
//           stallCategory={stall.category}
//           onClose={() => setShowCheckout(false)}
//           onSuccess={() => {
//             setShowCheckout(false)
//             setCart([])
//             setOrderSuccess(true)
//           }}
//         />
//       )}
//     </div>
//   )
// }
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
  const [productsLoading, setProductsLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      try {
        const stallRes = await fetch(`/api/stalls/${id}`)
        const stallData = await stallRes.json()
        setStall(stallData)
        setLoading(false)
        const productsRes = await fetch(`/api/products?stallId=${id}`)
        const productsData = await productsRes.json()
        if (Array.isArray(productsData)) setProducts(productsData)
      } catch (e) {
        console.error(e)
        setLoading(false)
      } finally {
        setProductsLoading(false)
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
      <>
        <style>{`
          .vd-loading {
            min-height: 100vh;
            background: linear-gradient(160deg, #EEF7F1 0%, #F5FBF7 45%, #ffffff 100%);
            display: flex; align-items: center; justify-content: center;
            font-family: 'DM Sans', sans-serif;
          }
          @keyframes vdSpin { to { transform: rotate(360deg); } }
          .vd-spinner {
            width: 36px; height: 36px; border-radius: 50%;
            border: 3px solid #D4EDD9; border-top-color: #4E9A6A;
            animation: vdSpin 0.8s linear infinite; margin-bottom: 14px;
          }
          .vd-loading-text { color: #7BAE8C; font-size: 14px; }
        `}</style>
        <div className="vd-loading">
          <div style={{ textAlign: 'center' }}>
            <div className="vd-spinner" style={{ margin: '0 auto 14px' }} />
            <p className="vd-loading-text">Loading stall...</p>
          </div>
        </div>
      </>
    )

  if (!stall)
    return (
      <>
        <style>{`
          .vd-notfound {
            min-height: 100vh;
            background: linear-gradient(160deg, #EEF7F1 0%, #F5FBF7 45%, #ffffff 100%);
            display: flex; align-items: center; justify-content: center;
            flex-direction: column; gap: 16px;
            font-family: 'DM Sans', sans-serif;
          }
          .vd-notfound-btn {
            background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
            color: #fff; border: none; border-radius: 14px;
            padding: 11px 26px; font-size: 14px; font-weight: 700;
            cursor: pointer; font-family: 'DM Sans', sans-serif;
            box-shadow: 0 6px 20px rgba(78,154,106,0.35);
            transition: opacity 0.18s, transform 0.18s;
          }
          .vd-notfound-btn:hover { opacity: 0.9; transform: translateY(-2px); }
        `}</style>
        <div className="vd-notfound">
          <div style={{ fontSize: 52 }}>🏪</div>
          <p style={{ color: '#7BAE8C', fontSize: 15 }}>Stall not found.</p>
          <button
            className="vd-notfound-btn"
            onClick={() => router.push('/search')}
          >
            Browse Stalls
          </button>
        </div>
      </>
    )

  if (orderSuccess)
    return (
      <>
        <style>{`
          .vd-success {
            min-height: 100vh;
            background: linear-gradient(160deg, #EEF7F1 0%, #F5FBF7 45%, #ffffff 100%);
            display: flex; align-items: center; justify-content: center;
            flex-direction: column; gap: 16px;
            font-family: 'DM Sans', sans-serif;
          }
          .vd-success-title {
            font-family: 'Playfair Display', serif;
            font-size: 26px; font-weight: 700; color: #1C3829;
          }
          .vd-success-sub { color: #7BAE8C; font-size: 14px; }
          .vd-success-btn {
            background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
            color: #fff; border: none; border-radius: 14px;
            padding: 12px 28px; font-size: 15px; font-weight: 700;
            cursor: pointer; font-family: 'DM Sans', sans-serif;
            box-shadow: 0 6px 20px rgba(78,154,106,0.35);
            transition: opacity 0.18s, transform 0.18s;
          }
          .vd-success-btn:hover { opacity: 0.9; transform: translateY(-2px); }
        `}</style>
        <div className="vd-success">
          <div style={{ fontSize: 64 }}>🎉</div>
          <h2 className="vd-success-title">Order Placed!</h2>
          <p className="vd-success-sub">
            Your order has been sent to {stall.name}
          </p>
          <button
            className="vd-success-btn"
            onClick={() => router.push('/orders')}
          >
            Track Order
          </button>
        </div>
      </>
    )

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .vd-root {
          min-height: 100vh;
          background: linear-gradient(160deg, #EEF7F1 0%, #F5FBF7 45%, #ffffff 100%);
          font-family: 'DM Sans', sans-serif;
          position: relative; overflow-x: hidden;
        }

        .vd-blob { pointer-events: none; position: absolute; z-index: 0; }

        /* Hero */
        .vd-hero { position: relative; height: 280px; overflow: hidden; z-index: 1; }
        .vd-hero img { width: 100%; height: 100%; object-fit: cover; }
        .vd-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,30,15,0.75), rgba(0,0,0,0.15));
        }
        .vd-hero-content { position: absolute; bottom: 24px; left: 24px; right: 24px; }
        .vd-hero-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }

        .vd-back-btn {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.35);
          border-radius: 20px; padding: 5px 16px;
          color: #fff; font-size: 12px; font-weight: 700;
          cursor: pointer; backdrop-filter: blur(8px);
          font-family: 'DM Sans', sans-serif;
          transition: background 0.18s;
        }
        .vd-back-btn:hover { background: rgba(255,255,255,0.25); }

        .vd-open-chip {
          font-size: 11px; font-weight: 700;
          padding: 4px 12px; border-radius: 20px;
          backdrop-filter: blur(4px);
        }

        .vd-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 5vw, 32px); font-weight: 700;
          color: #fff; margin-bottom: 6px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.2);
        }
        .vd-hero-meta { font-size: 13px; color: rgba(255,255,255,0.88); }

        /* Body */
        .vd-body {
          max-width: 960px; margin: 0 auto;
          padding: 28px 24px 120px;
          position: relative; z-index: 1;
        }

        .vd-description {
          font-size: 14px; color: #5A7A5E;
          margin-bottom: 24px; line-height: 1.7;
          background: rgba(255,255,255,0.7);
          border: 1.5px solid #D4EDD9; border-radius: 14px;
          padding: 14px 18px;
          backdrop-filter: blur(8px);
        }

        .vd-menu-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 700;
          color: #1C3829; margin-bottom: 18px;
        }

        /* Loading / empty states */
        .vd-state {
          text-align: center; padding: 56px 0;
          background: rgba(255,255,255,0.7);
          border: 1.5px solid #D4EDD9; border-radius: 18px;
          backdrop-filter: blur(8px);
        }
        .vd-state-icon { font-size: 44px; margin-bottom: 12px; }
        .vd-state-text { color: #7BAE8C; font-size: 14px; }

        /* Product grid */
        .vd-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 18px;
        }

        .vd-card {
          background: rgba(255,255,255,0.92);
          border-radius: 20px; border: 1.5px solid #D4EDD9;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(28,56,41,0.07);
          backdrop-filter: blur(8px);
          transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
        }
        .vd-card:hover {
          box-shadow: 0 12px 36px rgba(28,56,41,0.13);
          transform: translateY(-4px);
          border-color: #A8C9B0;
        }

        .vd-card-img-wrap { position: relative; height: 168px; }
        .vd-card-img { width: 100%; height: 100%; object-fit: cover; }
        .vd-card-badge {
          position: absolute; top: 10px; left: 10px;
          background: linear-gradient(135deg, #4E9A6A, #3A7D52);
          color: #fff; font-size: 11px; font-weight: 700;
          padding: 3px 9px; border-radius: 8px;
          box-shadow: 0 2px 8px rgba(78,154,106,0.3);
        }

        .vd-card-body { padding: 14px 16px; }
        .vd-card-name {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-weight: 700;
          color: #1C3829; margin-bottom: 4px;
        }
        .vd-card-desc {
          font-size: 12px; color: #7BAE8C;
          margin-bottom: 10px; line-height: 1.5;
        }
        .vd-card-variants { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
        .vd-variant-chip {
          font-size: 11px;
          background: #EEF7F1; border: 1px solid #D4EDD9;
          border-radius: 6px; padding: 3px 9px; color: #4E7A5E;
        }
        .vd-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .vd-price {
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 700; color: #1C3829;
        }
        .vd-original-price {
          font-size: 12px; color: #A8C9B0;
          text-decoration: line-through; margin-left: 6px;
        }
        .vd-add-btn {
          background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
          color: #fff; border: none; border-radius: 20px;
          padding: 8px 18px; font-size: 13px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 14px rgba(78,154,106,0.3);
          transition: opacity 0.18s, transform 0.18s, box-shadow 0.18s;
        }
        .vd-add-btn:hover {
          opacity: 0.9; transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(78,154,106,0.4);
        }

        /* Cart bar */
        .vd-cart-bar {
          position: fixed; bottom: 24px;
          left: 50%; transform: translateX(-50%);
          z-index: 200;
        }
        .vd-cart-btn {
          background: #1C3829;
          color: #fff; border: none; border-radius: 60px;
          padding: 14px 28px; font-size: 15px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 8px 32px rgba(28,56,41,0.35);
          display: flex; align-items: center; gap: 12px;
          transition: opacity 0.18s, transform 0.18s;
          white-space: nowrap;
        }
        .vd-cart-btn:hover { opacity: 0.9; transform: translateY(-2px); }
        .vd-cart-count {
          background: rgba(255,255,255,0.15);
          border-radius: 50%; width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800;
        }

        @media (max-width: 640px) {
          .vd-body { padding: 20px 16px 100px; }
          .vd-hero { height: 240px; }
          .vd-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
        }
      `}</style>

      <div className="vd-root">
        {/* Background blobs */}
        <svg
          className="vd-blob"
          style={{
            top: 0,
            right: 0,
            width: 'min(480px, 60vw)',
            height: 'min(480px, 60vw)',
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
          className="vd-blob"
          style={{
            bottom: 0,
            left: 0,
            width: 'min(340px, 50vw)',
            height: 'min(340px, 50vw)',
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

        {/* Hero */}
        <div className="vd-hero">
          <img
            src={
              stall.image ||
              'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800'
            }
            alt={stall.name}
          />
          <div className="vd-hero-overlay" />
          <div className="vd-hero-content">
            <div className="vd-hero-top">
              <button className="vd-back-btn" onClick={() => router.back()}>
                ← Back
              </button>
              <span
                className="vd-open-chip"
                style={{
                  background: stall.isOpen
                    ? 'rgba(220,252,231,0.9)'
                    : 'rgba(254,226,226,0.9)',
                  color: stall.isOpen ? '#166534' : '#991b1b',
                }}
              >
                {stall.isOpen ? '● Open' : '● Closed'}
              </span>
            </div>
            <h1 className="vd-hero-title">{stall.name}</h1>
            <p className="vd-hero-meta">
              📍 {stall.location} · ⭐ {stall.rating || 'New'} · Min ₹
              {stall.minOrder}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="vd-body">
          {stall.description && (
            <p className="vd-description">{stall.description}</p>
          )}

          <h2 className="vd-menu-title">Menu</h2>

          {productsLoading ? (
            <div className="vd-state">
              <div className="vd-state-icon">⏳</div>
              <p className="vd-state-text">Loading menu...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="vd-state">
              <div className="vd-state-icon">📦</div>
              <p className="vd-state-text">No products listed yet.</p>
            </div>
          ) : (
            <div className="vd-grid">
              {products.map((product) => (
                <div key={product._id} className="vd-card">
                  <div className="vd-card-img-wrap">
                    <img
                      className="vd-card-img"
                      src={product.image}
                      alt={product.name}
                    />
                    {product.originalPrice && (
                      <div className="vd-card-badge">
                        {Math.round(
                          (1 - product.price / product.originalPrice) * 100,
                        )}
                        % OFF
                      </div>
                    )}
                  </div>
                  <div className="vd-card-body">
                    <p className="vd-card-name">{product.name}</p>
                    {product.description && (
                      <p className="vd-card-desc">{product.description}</p>
                    )}
                    {product.variants?.length > 0 && (
                      <div className="vd-card-variants">
                        {product.variants.map((v: string) => (
                          <span key={v} className="vd-variant-chip">
                            {v}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="vd-card-footer">
                      <div>
                        <span className="vd-price">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="vd-original-price">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <button
                        className="vd-add-btn"
                        onClick={() => addToCart(product)}
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
          <div className="vd-cart-bar">
            <button
              className="vd-cart-btn"
              onClick={() => setShowCheckout(true)}
            >
              <span className="vd-cart-count">{cartCount}</span>
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
    </>
  )
}
