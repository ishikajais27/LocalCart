// 'use client'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '../../lib/authContext'

// type Role = 'user' | 'vendor'
// type Mode = 'choose' | 'signin' | 'signup'

// export default function AccountPage() {
//   const [mode, setMode] = useState<Mode>('choose')
//   const [role, setRole] = useState<Role>('user')
//   const [form, setForm] = useState({ name: '', email: '', password: '' })
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const { login } = useAuth()
//   const router = useRouter()

//   const handleSubmit = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       if (mode === 'signup') {
//         const res = await fetch('/api/auth/signup', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ ...form, role }),
//         })
//         const data = await res.json()
//         if (!res.ok) {
//           setError(data.error)
//           setLoading(false)
//           return
//         }
//         login(data)
//         router.push(data.role === 'vendor' ? '/vendors' : '/search')
//       } else {
//         const res = await fetch('/api/auth/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: form.email, password: form.password }),
//         })
//         const data = await res.json()
//         if (!res.ok) {
//           setError(data.error)
//           setLoading(false)
//           return
//         }
//         login(data)
//         router.push(data.role === 'vendor' ? '/vendors' : '/search')
//       }
//     } catch {
//       setError('Something went wrong. Try again.')
//       setLoading(false)
//     }
//   }

//   return (
//     <div style={styles.page}>
//       {/* Left Panel */}
//       <div style={styles.left}>
//         <div style={styles.leftInner}>
//           <div style={styles.logo}>🛍️ LocalCart</div>
//           <h1 style={styles.headline}>
//             Your neighbourhood,
//             <br />
//             <span style={{ color: '#FF6B2B' }}>delivered.</span>
//           </h1>
//           <p style={styles.sub}>
//             Discover handmade candles, street food, jewellery, pottery and more
//             — straight from local artisans near you.
//           </p>
//           <div style={styles.pills}>
//             {[
//               '🕯️ Candles',
//               '🍢 Street Food',
//               '💍 Jewellery',
//               '🏺 Pottery',
//               '🎨 Art',
//               '🌿 Plants',
//             ].map((p) => (
//               <span key={p} style={styles.pill}>
//                 {p}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div style={styles.right}>
//         <div style={styles.formBox}>
//           {mode === 'choose' && (
//             <>
//               <h2 style={styles.formTitle}>Join GullyMarket</h2>
//               <p style={styles.formSub}>Who are you?</p>
//               <div style={styles.roleGrid}>
//                 <RoleCard
//                   emoji="🛒"
//                   title="I'm a Shopper"
//                   desc="Discover & order from local stalls near me"
//                   onClick={() => setRole('user')}
//                   selected={role === 'user'}
//                 />
//                 <RoleCard
//                   emoji="🏪"
//                   title="I'm a Vendor"
//                   desc="List my stall and take orders from customers"
//                   onClick={() => setRole('vendor')}
//                   selected={role === 'vendor'}
//                 />
//               </div>
//               <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
//                 <button
//                   className="btn-primary"
//                   style={{ flex: 1, justifyContent: 'center' }}
//                   onClick={() => setMode('signup')}
//                 >
//                   Create Account
//                 </button>
//                 <button
//                   className="btn-secondary"
//                   style={{ flex: 1 }}
//                   onClick={() => setMode('signin')}
//                 >
//                   Sign In
//                 </button>
//               </div>
//             </>
//           )}

//           {(mode === 'signin' || mode === 'signup') && (
//             <>
//               <button
//                 onClick={() => {
//                   setMode('choose')
//                   setError('')
//                 }}
//                 style={styles.back}
//               >
//                 ← Back
//               </button>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 10,
//                   marginBottom: 8,
//                 }}
//               >
//                 <span style={{ fontSize: 28 }}>
//                   {role === 'vendor' ? '🏪' : '🛒'}
//                 </span>
//                 <div>
//                   <h2 style={styles.formTitle}>
//                     {mode === 'signup' ? 'Create Account' : 'Welcome back'}
//                   </h2>
//                   <span style={styles.roleTag}>
//                     {role === 'vendor' ? 'Vendor' : 'Shopper'}
//                   </span>
//                 </div>
//               </div>

//               {mode === 'signup' && (
//                 <input
//                   style={styles.input}
//                   placeholder="Full Name"
//                   value={form.name}
//                   autoFocus
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, name: e.target.value }))
//                   }
//                 />
//               )}
//               <input
//                 style={styles.input}
//                 placeholder="Email Address"
//                 type="email"
//                 value={form.email}
//                 autoFocus={mode === 'signin'}
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, email: e.target.value }))
//                 }
//                 onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
//               />
//               <input
//                 style={styles.input}
//                 placeholder="Password"
//                 type="password"
//                 value={form.password}
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, password: e.target.value }))
//                 }
//                 onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
//               />

//               {error && <p style={styles.error}>{error}</p>}

//               <button
//                 className="btn-primary"
//                 style={{
//                   width: '100%',
//                   justifyContent: 'center',
//                   marginTop: 8,
//                   opacity: loading ? 0.7 : 1,
//                   cursor: loading ? 'not-allowed' : 'pointer',
//                 }}
//                 onClick={handleSubmit}
//                 disabled={loading}
//               >
//                 {loading
//                   ? '⏳ Please wait...'
//                   : mode === 'signup'
//                     ? 'Create Account'
//                     : 'Sign In'}
//               </button>

//               <p style={styles.switchText}>
//                 {mode === 'signup'
//                   ? 'Already have an account? '
//                   : "Don't have one? "}
//                 <span
//                   style={{
//                     color: '#FF6B2B',
//                     cursor: 'pointer',
//                     fontWeight: 600,
//                   }}
//                   onClick={() => {
//                     setMode(mode === 'signup' ? 'signin' : 'signup')
//                     setError('')
//                     setForm({ name: '', email: '', password: '' })
//                   }}
//                 >
//                   {mode === 'signup' ? 'Sign In' : 'Sign Up'}
//                 </span>
//               </p>

//               <p
//                 style={{
//                   textAlign: 'center',
//                   marginTop: 16,
//                   fontSize: 13,
//                   color: '#8B7355',
//                 }}
//               >
//                 Wrong role?{' '}
//                 <span
//                   style={{ color: '#FF6B2B', cursor: 'pointer' }}
//                   onClick={() => setRole(role === 'vendor' ? 'user' : 'vendor')}
//                 >
//                   Switch to {role === 'vendor' ? 'Shopper' : 'Vendor'}
//                 </span>
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// function RoleCard({ emoji, title, desc, onClick, selected }: any) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         border: `2px solid ${selected ? '#FF6B2B' : '#F0E6D9'}`,
//         background: selected ? '#FFF0E6' : '#fff',
//         borderRadius: 14,
//         padding: '18px 16px',
//         cursor: 'pointer',
//         transition: 'all 0.2s',
//         textAlign: 'center',
//       }}
//     >
//       <div style={{ fontSize: 32, marginBottom: 8 }}>{emoji}</div>
//       <div
//         style={{
//           fontFamily: 'Syne, sans-serif',
//           fontWeight: 700,
//           fontSize: 15,
//           color: '#1A1208',
//           marginBottom: 4,
//         }}
//       >
//         {title}
//       </div>
//       <div style={{ fontSize: 12, color: '#8B7355', lineHeight: 1.5 }}>
//         {desc}
//       </div>
//     </div>
//   )
// }

// const styles: Record<string, React.CSSProperties> = {
//   page: {
//     display: 'flex',
//     minHeight: '100vh',
//     fontFamily: 'DM Sans, sans-serif',
//   },
//   left: {
//     flex: 1,
//     background:
//       'linear-gradient(135deg, #1A1208 0%, #2D1F0A 60%, #3D2A10 100%)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '48px',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   leftInner: { maxWidth: 460, zIndex: 1, position: 'relative' },
//   logo: {
//     fontFamily: 'Syne, sans-serif',
//     fontWeight: 800,
//     fontSize: 22,
//     color: '#FF6B2B',
//     marginBottom: 32,
//   },
//   headline: {
//     fontFamily: 'Syne, sans-serif',
//     fontSize: 48,
//     fontWeight: 800,
//     color: '#FFF8F0',
//     lineHeight: 1.15,
//     marginBottom: 20,
//   },
//   sub: { color: '#C4A882', fontSize: 17, lineHeight: 1.7, marginBottom: 32 },
//   pills: { display: 'flex', flexWrap: 'wrap', gap: 10 },
//   pill: {
//     background: 'rgba(255,107,43,0.15)',
//     color: '#FF8F5C',
//     border: '1px solid rgba(255,107,43,0.3)',
//     borderRadius: 20,
//     padding: '6px 14px',
//     fontSize: 13,
//     fontWeight: 500,
//   },
//   right: {
//     width: 480,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '48px 40px',
//     background: '#FFF8F0',
//   },
//   formBox: { width: '100%', maxWidth: 380 },
//   formTitle: {
//     fontFamily: 'Syne, sans-serif',
//     fontSize: 26,
//     fontWeight: 800,
//     color: '#1A1208',
//     marginBottom: 4,
//   },
//   formSub: { color: '#8B7355', fontSize: 15, marginBottom: 24 },
//   roleGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
//   input: {
//     width: '100%',
//     padding: '13px 16px',
//     border: '2px solid #F0E6D9',
//     borderRadius: 12,
//     fontSize: 15,
//     marginBottom: 12,
//     background: '#fff',
//     color: '#1A1208',
//     display: 'block',
//     outline: 'none',
//     boxSizing: 'border-box',
//   },
//   error: {
//     color: '#dc2626',
//     fontSize: 13,
//     marginBottom: 8,
//     padding: '8px 12px',
//     background: '#fff1f2',
//     borderRadius: 8,
//   },
//   switchText: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#8B7355',
//     marginTop: 16,
//   },
//   roleTag: {
//     background: '#FFF0E6',
//     color: '#FF6B2B',
//     fontSize: 12,
//     fontWeight: 600,
//     padding: '2px 10px',
//     borderRadius: 20,
//   },
//   back: {
//     background: 'none',
//     border: 'none',
//     color: '#8B7355',
//     cursor: 'pointer',
//     fontSize: 14,
//     marginBottom: 16,
//     padding: 0,
//   },
// }
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/authContext'

type Role = 'user' | 'vendor'
type Mode = 'choose' | 'signin' | 'signup'

const IMAGES = [
  '/jute.png',
  '/momo.png',
  '/spiderman.jpg',
  '/earring.png',
  '/flower.png',
  '/handmug.png',
]
const LABELS = [
  '🌿 Jute Craft',
  '🥟 Momos',
  '🕷️ Spiderman',
  '💎 Earring',
  '🌸 Flower',
  '☕ Hand Mug',
]

export default function AccountPage() {
  const [mode, setMode] = useState<Mode>('choose')
  const [role, setRole] = useState<Role>('user')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const { login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const id = setInterval(() => {
      setActiveImg((p) => (p + 1) % IMAGES.length)
    }, 2500)
    return () => clearInterval(id)
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const endpoint =
        mode === 'signup' ? '/api/auth/signup' : '/api/auth/login'
      const body =
        mode === 'signup'
          ? JSON.stringify({ ...form, role })
          : JSON.stringify({ email: form.email, password: form.password })

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        setLoading(false)
        return
      }

      login(data)
      router.push(data.role === 'vendor' ? '/vendors' : '/search')
    } catch {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  const prev = () =>
    setActiveImg((p) => (p - 1 + IMAGES.length) % IMAGES.length)
  const next = () => setActiveImg((p) => (p + 1) % IMAGES.length)

  return (
    <>
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Charm:wght@400;700&family=Prata&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');


  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  html, body {
    height: 100%;
    overflow-x: hidden;
  }


  .page {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #6fda6f 0%, #4cae4c 50%, #2e8b2e 100%);
    font-family: 'Roboto Condensed', sans-serif;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
  }


  /* Custom scrollbar */
  .page::-webkit-scrollbar {
    width: 8px;
  }
  .page::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.1);
  }
  .page::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.3);
    border-radius: 4px;
  }


  /* ── LOGO ── */
  .brand {
    font-family: 'Prata', serif;
    font-size: clamp(20px, 3vw, 25px);
    color: #f7f5ef;
    position: fixed;
    top: 34px;
    left: clamp(20px, 5vw, 64px);
    letter-spacing: 2px;
    z-index: 20;
    background: rgba(36, 53, 41, 0.38);
    padding: 8px 20px;
    border-radius: 50px;
    backdrop-filter: blur(14px);
    border: 1px solid rgba(226, 213, 171, 0.35);
  }
  .brand span {
    color: #e2d5ab;
    font-style: italic;
  }


  /* ── LEFT PANEL ── */
  .left {
    position: relative;
    z-index: 10;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 0 80px clamp(20px, 5vw, 68px);
    gap: 0;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
 
  /* Hide left panel content when form is visible */
  .left.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }


  /* Prata headline — big, static, editorial like the reference */
  .headline {
    font-family: 'Prata', serif;
    font-size: clamp(36px, 5vw, 66px);
    line-height: 1.22;
    color: #f7f5ef;
    margin-bottom: 22px;
    letter-spacing: -0.5px;
    font-weight: 400;
  }
  .headline em {
    font-style: italic;
    color: #e2d5ab;
    display: block;
    margin-top: 4px;
  }


  .sub {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: clamp(14px, 2vw, 16.5px);
    color: rgba(247, 245, 239, 0.84);
    line-height: 1.8;
    max-width: 90%;
    margin-bottom: 40px;
    font-weight: 300;
    letter-spacing: 0.35px;
  }


  /* ── ROLE CARDS ── */
  .role-row {
    display: flex;
    gap: clamp(12px, 2vw, 16px);
    margin-bottom: 28px;
    max-width: 440px;
    flex-wrap: wrap;
  }
  .role-card {
    flex: 1;
    min-width: 160px;
    background: rgba(238, 244, 232, 0.16);
    border: 1.5px solid rgba(238, 244, 232, 0.32);
    border-radius: 22px;
    padding: clamp(16px, 3vw, 22px) clamp(12px, 2vw, 16px);
    cursor: pointer;
    text-align: center;
    backdrop-filter: blur(12px);
    transition: all 0.3s ease;
  }
  .role-card:hover {
    background: rgba(238, 244, 232, 0.26);
    border-color: #e2d5ab;
    transform: translateY(-3px);
  }
  .role-card.selected {
    background: rgba(226, 213, 171, 0.2);
    border-color: #e2d5ab;
    box-shadow: 0 10px 28px rgba(0,0,0,0.16);
  }
  .role-emoji { font-size: clamp(28px, 4vw, 32px); margin-bottom: 12px; }
  .role-title {
    font-family: 'Prata', serif;
    font-size: clamp(14px, 2vw, 15.5px);
    color: #f7f5ef;
    margin-bottom: 8px;
    letter-spacing: 0.3px;
    font-weight: 400;
  }
  .role-desc {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: clamp(10px, 1.5vw, 12px);
    color: rgba(247, 245, 239, 0.72);
    line-height: 1.65;
    font-weight: 300;
    letter-spacing: 0.2px;
  }


  /* ── BUTTONS ── */
  .btn-row {
    display: flex;
    gap: clamp(12px, 2vw, 16px);
    max-width: 440px;
    flex-wrap: wrap;
  }
  .btn-dark {
    flex: 1;
    min-width: 160px;
    padding: clamp(14px, 2.5vw, 16px) 0;
    background: #243529;
    color: #f7f5ef;
    border: none;
    border-radius: 50px;
    font-family: 'Prata', serif;
    font-size: clamp(14px, 2vw, 16px);
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    letter-spacing: 0.5px;
    font-weight: 400;
  }
  .btn-dark:hover {
    background: #162219;
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(0,0,0,0.3);
  }


  .btn-outline {
    flex: 1;
    min-width: 160px;
    padding: clamp(14px, 2.5vw, 16px) 0;
    background: transparent;
    color: #f7f5ef;
    border: 1.5px solid rgba(247, 245, 239, 0.7);
    border-radius: 50px;
    font-family: 'Prata', serif;
    font-size: clamp(14px, 2vw, 16px);
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    letter-spacing: 0.5px;
    font-weight: 400;
  }
  .btn-outline:hover {
    background: rgba(247, 245, 239, 0.12);
    border-color: #e2d5ab;
    transform: translateY(-2px);
  }


  /* ── FORM PANEL ── */
  .form-panel {
    position: fixed;
    inset: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.4s ease;
  }
  .form-panel.visible {
    pointer-events: all;
    opacity: 1;
    transform: scale(1);
  }


  .form-box {
    background: rgba(247, 245, 239, 0.98);
    backdrop-filter: blur(24px);
    border-radius: 30px;
    padding: clamp(32px, 5vw, 44px) clamp(24px, 4vw, 40px);
    width: min(90%, 420px);
    max-width: 420px;
    box-shadow: 0 32px 70px rgba(36, 53, 41, 0.28);
    border: 1px solid rgba(176, 204, 158, 0.35);
    margin: auto;
  }


  .form-back {
    background: none; border: none; color: #5a8f64;
    cursor: pointer; font-size: 12px; margin-bottom: 24px; padding: 0;
    font-family: 'Roboto Condensed', sans-serif; font-weight: 600;
    display: block; transition: color 0.2s; letter-spacing: 1.2px;
    text-transform: uppercase;
  }
  .form-back:hover { color: #243529; }


  .form-title {
    font-family: 'Prata', serif;
    font-size: clamp(24px, 4vw, 28px);
    color: #243529;
    margin-bottom: 6px;
    letter-spacing: 0.2px;
    line-height: 1.2;
    font-weight: 400;
  }
  .form-role-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .form-role-tag {
    background: #c8dbbf;
    color: #243529;
    font-size: 10.5px;
    font-weight: 700;
    font-family: 'Roboto Condensed', sans-serif;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
    display: inline-block;
    margin-top: 5px;
  }


  .form-input {
    width: 100%;
    padding: clamp(12px, 2.5vw, 14px) clamp(16px, 3vw, 20px);
    border: 1.5px solid #c8dbbf;
    border-radius: 14px;
    font-size: clamp(13px, 2vw, 15px);
    margin-bottom: 14px;
    background: #fff;
    color: #243529;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 400;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
    display: block;
    letter-spacing: 0.2px;
  }
  .form-input::placeholder { color: #9ab09e; }
  .form-input:focus {
    border-color: #7aaa7e;
    box-shadow: 0 0 0 3px rgba(122, 170, 126, 0.14);
  }


  .form-btn {
    width: 100%;
    padding: clamp(13px, 2.5vw, 15px) 0;
    background: linear-gradient(135deg, #7aaa7e 0%, #3d5e45 100%);
    color: #f7f5ef;
    border: none;
    border-radius: 14px;
    font-family: 'Prata', serif;
    font-size: clamp(14px, 2vw, 16.5px);
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
    font-weight: 400;
  }
  .form-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(61, 94, 69, 0.38);
  }
  .form-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }


  .form-error {
    color: #a83232;
    font-size: 13px;
    margin-bottom: 14px;
    padding: 11px 16px;
    background: #fdf0f0;
    border-radius: 10px;
    font-family: 'Roboto Condensed', sans-serif;
    letter-spacing: 0.2px;
  }


  .form-switch {
    text-align: center;
    font-size: clamp(12px, 1.8vw, 13px);
    color: #5a7a60;
    margin-top: 20px;
    font-family: 'Roboto Condensed', sans-serif;
    letter-spacing: 0.2px;
    line-height: 1.8;
  }
  .form-link {
    color: #3d5e45;
    cursor: pointer;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
  }


  /* ── RIGHT PANEL ── */
  .right {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 50%;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .flavor-dots {
    position: absolute;
    top: clamp(20px, 5vh, 40px);
    right: clamp(20px, 5vw, 60px);
    display: flex;
    gap: clamp(8px, 1.5vw, 12px);
    z-index: 15;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .flavor-dot {
    width: clamp(28px, 4vw, 36px);
    height: clamp(28px, 4vw, 36px);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 10px rgba(0,0,0,0.18);
    border: 2px solid rgba(247, 245, 239, 0.38);
  }
  .flavor-dot:nth-child(1) { background: #d4c48c; }
  .flavor-dot:nth-child(2) { background: #b0c87a; }
  .flavor-dot:nth-child(3) { background: #88b08a; }
  .flavor-dot:nth-child(4) { background: #b8cc9e; }
  .flavor-dot:nth-child(5) { background: #7aaa7e; }
  .flavor-dot:nth-child(6) { background: #5a8f64; }
  .flavor-dot.active {
    transform: scale(1.25);
    border-color: #e2d5ab;
    box-shadow: 0 0 0 3px rgba(226, 213, 171, 0.4);
  }


  .img-stage {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .img-item {
    position: absolute;
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px) scale(0.95);
  }
  .img-item.active {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0) scale(1);
    z-index: 10;
  }
  .img-item img {
    display: block;
    width: min(480px, 60vw, 70vh);
    height: auto;
    max-height: 560px;
    object-fit: contain;
    border-radius: 28px;
    background: transparent !important;
  }


  /* ── WAVE ── */
  .wave-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 6;
    pointer-events: none;
  }
  .wave-wrap svg {
    display: block;
    width: 100%;
    height: auto;
  }


  /* ── BOTTOM BAR ── */
  .bottom-bar {
    position: absolute;
    bottom: clamp(15px, 3vh, 26px);
    left: 0;
    right: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 clamp(20px, 5vw, 68px);
    flex-wrap: wrap;
    gap: 12px;
  }


  .reviews {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(36, 53, 41, 0.32);
    padding: 6px 18px;
    border-radius: 50px;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(226, 213, 171, 0.22);
  }
  .avatars { display: flex; }
  .avatar {
    width: clamp(28px, 4vw, 34px);
    height: clamp(28px, 4vw, 34px);
    border-radius: 50%;
    border: 2px solid #e2d5ab;
    background: linear-gradient(135deg, #7aaa7e, #3d5e45);
    margin-left: -8px;
    font-size: clamp(10px, 1.5vw, 12px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    color: #f7f5ef;
  }
  .avatar:first-child { margin-left: 0; }
  .review-text strong {
    display: block;
    font-size: clamp(11px, 1.8vw, 13px);
    color: #f7f5ef;
    font-family: 'Prata', serif;
    font-weight: 400;
    letter-spacing: 0.3px;
  }
  .review-text span {
    font-size: clamp(9px, 1.5vw, 11px);
    color: rgba(247, 245, 239, 0.7);
    font-family: 'Roboto Condensed', sans-serif;
    letter-spacing: 0.3px;
  }


  .nav-arrows {
    display: flex;
    gap: 8px;
    background: rgba(36, 53, 41, 0.32);
    padding: 6px 12px;
    border-radius: 50px;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(226, 213, 171, 0.22);
  }
  .arrow-btn {
    width: clamp(32px, 5vw, 40px);
    height: clamp(32px, 5vw, 40px);
    border-radius: 50%;
    border: none;
    background: rgba(247, 245, 239, 0.9);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(14px, 2vw, 16px);
    color: #3d5e45;
    transition: all 0.2s ease;
    font-weight: bold;
  }
  .arrow-btn:hover { background: #e2d5ab; transform: scale(1.1); }


  .socials {
    display: flex;
    gap: 8px;
    background: rgba(36, 53, 41, 0.32);
    padding: 6px 16px;
    border-radius: 50px;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(226, 213, 171, 0.22);
  }
  .social-icon {
    width: clamp(26px, 4vw, 30px);
    height: clamp(26px, 4vw, 30px);
    border-radius: 50%;
    background: rgba(36, 53, 41, 0.48);
    color: #f7f5ef;
    font-size: clamp(11px, 1.8vw, 13px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  .social-icon:hover { background: #e2d5ab; color: #243529; transform: scale(1.1); }


  /* Responsive Design */
  @media (max-width: 1024px) {
    .right {
      width: 50%;
    }
    .left {
      width: 50%;
    }
  }


  @media (max-width: 768px) {
    .page {
      flex-direction: column;
      height: auto;
      min-height: 100vh;
    }
   
    .left {
      width: 100%;
      padding: 100px 24px 60px 24px;
      min-height: auto;
    }
   
    .right {
      position: relative;
      width: 100%;
      height: 400px;
      margin-top: 0;
    }
   
    .form-panel {
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
   
    .form-box {
      margin: 0;
      width: 100%;
      max-width: 500px;
    }
   
    .bottom-bar {
      position: relative;
      margin-top: 20px;
      padding: 16px 20px;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
   
    .brand {
      position: fixed;
      top: 20px;
      left: 20px;
      font-size: 18px;
      padding: 6px 16px;
      z-index: 25;
    }
   
    .flavor-dots {
      top: 80px;
      right: 20px;
    }
   
    .img-item img {
      width: min(280px, 70vw);
      height: auto;
    }
  }


  @media (max-width: 480px) {
    .role-card {
      min-width: 100%;
    }
   
    .btn-dark, .btn-outline {
      min-width: 100%;
    }
   
    .role-row, .btn-row {
      flex-direction: column;
    }
   
    .right {
      height: 320px;
    }
   
    .flavor-dots {
      top: 60px;
      right: 15px;
    }
   
    .flavor-dot {
      width: 24px;
      height: 24px;
    }
   
    .form-box {
      padding: 28px 20px;
    }
  }
`}</style>

      <div className="page">
        {/* ── LOGO ── */}
        <div className="brand">
          Local<span>Cart</span>
        </div>

        {/* ── LEFT ── */}
        <div className={`left ${mode !== 'choose' ? 'hidden' : ''}`}>
          <h1 className="headline">
            Your neighbourhood,
            <br />
            <em>delivered.</em>
          </h1>
          <p className="sub">
            Discover handmade crafts, street food, jewellery, pottery and more —
            straight from local artisans near you.
          </p>

          {mode === 'choose' && (
            <>
              <div className="role-row">
                <div
                  className={`role-card${role === 'user' ? ' selected' : ''}`}
                  onClick={() => setRole('user')}
                >
                  <div className="role-emoji">🛒</div>
                  <div className="role-title">I'm a Shopper</div>
                  <div className="role-desc">
                    Discover & order from local stalls near me
                  </div>
                </div>
                <div
                  className={`role-card${role === 'vendor' ? ' selected' : ''}`}
                  onClick={() => setRole('vendor')}
                >
                  <div className="role-emoji">🏪</div>
                  <div className="role-title">I'm a Vendor</div>
                  <div className="role-desc">
                    List my stall and take orders from customers
                  </div>
                </div>
              </div>

              <div className="btn-row">
                <button className="btn-dark" onClick={() => setMode('signup')}>
                  Create Account
                </button>
                <button
                  className="btn-outline"
                  onClick={() => setMode('signin')}
                >
                  Sign In
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── FORM PANEL ── */}
        <div className={`form-panel${mode !== 'choose' ? ' visible' : ''}`}>
          <div className="form-box">
            <button
              className="form-back"
              onClick={() => {
                setMode('choose')
                setError('')
              }}
            >
              ← Back
            </button>
            <div className="form-role-header">
              <span style={{ fontSize: 'clamp(28px, 5vw, 32px)' }}>
                {role === 'vendor' ? '🏪' : '🛒'}
              </span>
              <div>
                <div className="form-title">
                  {mode === 'signup' ? 'Create Account' : 'Welcome back'}
                </div>
                <span className="form-role-tag">
                  {role === 'vendor' ? 'Vendor' : 'Shopper'}
                </span>
              </div>
            </div>

            {mode === 'signup' && (
              <input
                className="form-input"
                placeholder="Full Name"
                value={form.name}
                autoFocus
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            )}
            <input
              className="form-input"
              placeholder="Email Address"
              type="email"
              value={form.email}
              autoFocus={mode === 'signin'}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <input
              className="form-input"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />

            {error && <p className="form-error">{error}</p>}

            <button
              className="form-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? '⏳ Please wait...'
                : mode === 'signup'
                  ? 'Create Account'
                  : 'Sign In'}
            </button>

            <p className="form-switch">
              {mode === 'signup'
                ? 'Already have an account? '
                : "Don't have one? "}
              <span
                className="form-link"
                onClick={() => {
                  setMode(mode === 'signup' ? 'signin' : 'signup')
                  setError('')
                  setForm({ name: '', email: '', password: '' })
                }}
              >
                {mode === 'signup' ? 'Sign In' : 'Sign Up'}
              </span>
            </p>
            <p
              style={{
                textAlign: 'center',
                marginTop: 14,
                fontSize: 'clamp(11px, 1.8vw, 12.5px)',
                color: '#5a7a60',
                fontFamily: "'Roboto Condensed', sans-serif",
                letterSpacing: '0.2px',
              }}
            >
              Wrong role?{' '}
              <span
                className="form-link"
                onClick={() => setRole(role === 'vendor' ? 'user' : 'vendor')}
              >
                Switch to {role === 'vendor' ? 'Shopper' : 'Vendor'}
              </span>
            </p>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="right">
          <div className="flavor-dots">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                className={`flavor-dot${i === activeImg ? ' active' : ''}`}
                onClick={() => setActiveImg(i)}
                title={LABELS[i]}
              />
            ))}
          </div>

          <div className="img-stage">
            {IMAGES.map((src, i) => (
              <div
                key={src}
                className={`img-item ${i === activeImg ? 'active' : ''}`}
              >
                <img src={src} alt={LABELS[i]} />
              </div>
            ))}
          </div>
        </div>

        {/* ── WAVE ── */}
        <div className="wave-wrap">
          <svg
            viewBox="0 0 1440 190"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,95 C130,35 260,155 420,95 C540,48 640,138 780,90 C900,50 1000,138 1120,84 C1220,44 1330,118 1440,78 L1440,190 L0,190 Z"
              fill="rgba(238, 244, 232, 0.9)"
            />
          </svg>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="bottom-bar">
          <div className="reviews">
            <div className="avatars">
              {['⭐', '✨', '🌿'].map((l, idx) => (
                <div key={idx} className="avatar">
                  {l}
                </div>
              ))}
            </div>
            <div className="review-text">
              <strong>10K+ Happy Customers</strong>
              <span>Loved by local communities</span>
            </div>
          </div>

          <div className="nav-arrows">
            <button className="arrow-btn" onClick={prev}>
              ←
            </button>
            <button className="arrow-btn" onClick={next}>
              →
            </button>
          </div>

          <div className="socials">
            <div className="social-icon">📘</div>
            <div className="social-icon">📷</div>
            <div className="social-icon">🐦</div>
          </div>
        </div>
      </div>
    </>
  )
}

