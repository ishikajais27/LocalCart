// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '../../lib/authContext'

// type Role = 'user' | 'vendor'
// type Mode = 'choose' | 'signin' | 'signup'

// const IMAGES = [
//   '/jute.png',
//   '/momo.png',
//   '/spiderman.jpg',
//   '/earring.png',
//   '/flower.png',
//   '/handmug.png',
// ]
// const LABELS = [
//   '🌿 Jute Craft',
//   '🥟 Momos',
//   '🕷️ Spiderman',
//   '💎 Earring',
//   '🌸 Flower',
//   '☕ Hand Mug',
// ]

// export default function AccountPage() {
//   const [mode, setMode] = useState<Mode>('choose')
//   const [role, setRole] = useState<Role>('user')
//   const [form, setForm] = useState({ name: '', email: '', password: '' })
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [activeImg, setActiveImg] = useState(0)
//   const { login } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     const id = setInterval(() => {
//       setActiveImg((p) => (p + 1) % IMAGES.length)
//     }, 2500)
//     return () => clearInterval(id)
//   }, [])

//   const handleSubmit = async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const endpoint =
//         mode === 'signup' ? '/api/auth/signup' : '/api/auth/login'
//       const body =
//         mode === 'signup'
//           ? JSON.stringify({ ...form, role })
//           : JSON.stringify({ email: form.email, password: form.password })

//       const res = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body,
//       })
//       const data = await res.json()

//       if (!res.ok) {
//         setError(data.error)
//         setLoading(false)
//         return
//       }

//       login(data)
//       router.push(data.role === 'vendor' ? '/vendors' : '/search')
//     } catch {
//       setError('Something went wrong. Try again.')
//       setLoading(false)
//     }
//   }

//   const prev = () =>
//     setActiveImg((p) => (p - 1 + IMAGES.length) % IMAGES.length)
//   const next = () => setActiveImg((p) => (p + 1) % IMAGES.length)

//   return (
//     <>
//       <style>{`
//   @import url('https://fonts.googleapis.com/css2?family=Charm:wght@400;700&family=Prata&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   html, body {
//     height: 100%;
//     overflow-x: hidden;
//   }

//   .page {
//     position: relative;
//     width: 100vw;
//     height: 100vh;
//     background: linear-gradient(135deg, #6fda6f 0%, #4cae4c 50%, #2e8b2e 100%);
//     font-family: 'Roboto Condensed', sans-serif;
//     overflow-y: auto;
//     overflow-x: hidden;
//     display: flex;
//   }

//   /* Custom scrollbar */
//   .page::-webkit-scrollbar {
//     width: 8px;
//   }
//   .page::-webkit-scrollbar-track {
//     background: rgba(0,0,0,0.1);
//   }
//   .page::-webkit-scrollbar-thumb {
//     background: rgba(255,255,255,0.3);
//     border-radius: 4px;
//   }

//   /* ── LOGO ── */
//   .brand {
//     font-family: 'Prata', serif;
//     font-size: clamp(20px, 3vw, 25px);
//     color: #f7f5ef;
//     position: fixed;
//     top: 34px;
//     left: clamp(20px, 5vw, 64px);
//     letter-spacing: 2px;
//     z-index: 20;
//     background: rgba(36, 53, 41, 0.38);
//     padding: 8px 20px;
//     border-radius: 50px;
//     backdrop-filter: blur(14px);
//     border: 1px solid rgba(226, 213, 171, 0.35);
//   }
//   .brand span {
//     color: #e2d5ab;
//     font-style: italic;
//   }

//   /* ── LEFT PANEL ── */
//   .left {
//     position: relative;
//     z-index: 10;
//     width: 50%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     padding: 80px 0 80px clamp(20px, 5vw, 68px);
//     gap: 0;
//     transition: opacity 0.3s ease, visibility 0.3s ease;
//   }

//   /* Hide left panel content when form is visible */
//   .left.hidden {
//     opacity: 0;
//     visibility: hidden;
//     pointer-events: none;
//   }

//   /* Prata headline — big, static, editorial like the reference */
//   .headline {
//     font-family: 'Prata', serif;
//     font-size: clamp(36px, 5vw, 66px);
//     line-height: 1.22;
//     color: #f7f5ef;
//     margin-bottom: 22px;
//     letter-spacing: -0.5px;
//     font-weight: 400;
//   }
//   .headline em {
//     font-style: italic;
//     color: #e2d5ab;
//     display: block;
//     margin-top: 4px;
//   }

//   .sub {
//     font-family: 'Roboto Condensed', sans-serif;
//     font-size: clamp(14px, 2vw, 16.5px);
//     color: rgba(247, 245, 239, 0.84);
//     line-height: 1.8;
//     max-width: 90%;
//     margin-bottom: 40px;
//     font-weight: 300;
//     letter-spacing: 0.35px;
//   }

//   /* ── ROLE CARDS ── */
//   .role-row {
//     display: flex;
//     gap: clamp(12px, 2vw, 16px);
//     margin-bottom: 28px;
//     max-width: 440px;
//     flex-wrap: wrap;
//   }
//   .role-card {
//     flex: 1;
//     min-width: 160px;
//     background: rgba(238, 244, 232, 0.16);
//     border: 1.5px solid rgba(238, 244, 232, 0.32);
//     border-radius: 22px;
//     padding: clamp(16px, 3vw, 22px) clamp(12px, 2vw, 16px);
//     cursor: pointer;
//     text-align: center;
//     backdrop-filter: blur(12px);
//     transition: all 0.3s ease;
//   }
//   .role-card:hover {
//     background: rgba(238, 244, 232, 0.26);
//     border-color: #e2d5ab;
//     transform: translateY(-3px);
//   }
//   .role-card.selected {
//     background: rgba(226, 213, 171, 0.2);
//     border-color: #e2d5ab;
//     box-shadow: 0 10px 28px rgba(0,0,0,0.16);
//   }
//   .role-emoji { font-size: clamp(28px, 4vw, 32px); margin-bottom: 12px; }
//   .role-title {
//     font-family: 'Prata', serif;
//     font-size: clamp(14px, 2vw, 15.5px);
//     color: #f7f5ef;
//     margin-bottom: 8px;
//     letter-spacing: 0.3px;
//     font-weight: 400;
//   }
//   .role-desc {
//     font-family: 'Roboto Condensed', sans-serif;
//     font-size: clamp(10px, 1.5vw, 12px);
//     color: rgba(247, 245, 239, 0.72);
//     line-height: 1.65;
//     font-weight: 300;
//     letter-spacing: 0.2px;
//   }

//   /* ── BUTTONS ── */
//   .btn-row {
//     display: flex;
//     gap: clamp(12px, 2vw, 16px);
//     max-width: 440px;
//     flex-wrap: wrap;
//   }
//   .btn-dark {
//     flex: 1;
//     min-width: 160px;
//     padding: clamp(14px, 2.5vw, 16px) 0;
//     background: #243529;
//     color: #f7f5ef;
//     border: none;
//     border-radius: 50px;
//     font-family: 'Prata', serif;
//     font-size: clamp(14px, 2vw, 16px);
//     cursor: pointer;
//     transition: all 0.3s ease;
//     text-align: center;
//     letter-spacing: 0.5px;
//     font-weight: 400;
//   }
//   .btn-dark:hover {
//     background: #162219;
//     transform: translateY(-2px);
//     box-shadow: 0 8px 22px rgba(0,0,0,0.3);
//   }

//   .btn-outline {
//     flex: 1;
//     min-width: 160px;
//     padding: clamp(14px, 2.5vw, 16px) 0;
//     background: transparent;
//     color: #f7f5ef;
//     border: 1.5px solid rgba(247, 245, 239, 0.7);
//     border-radius: 50px;
//     font-family: 'Prata', serif;
//     font-size: clamp(14px, 2vw, 16px);
//     cursor: pointer;
//     transition: all 0.3s ease;
//     text-align: center;
//     letter-spacing: 0.5px;
//     font-weight: 400;
//   }
//   .btn-outline:hover {
//     background: rgba(247, 245, 239, 0.12);
//     border-color: #e2d5ab;
//     transform: translateY(-2px);
//   }

//   /* ── FORM PANEL ── */
//   .form-panel {
//     position: fixed;
//     inset: 0;
//     z-index: 30;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     pointer-events: none;
//     opacity: 0;
//     transform: scale(0.95);
//     transition: all 0.4s ease;
//   }
//   .form-panel.visible {
//     pointer-events: all;
//     opacity: 1;
//     transform: scale(1);
//   }

//   .form-box {
//     background: rgba(247, 245, 239, 0.98);
//     backdrop-filter: blur(24px);
//     border-radius: 30px;
//     padding: clamp(32px, 5vw, 44px) clamp(24px, 4vw, 40px);
//     width: min(90%, 420px);
//     max-width: 420px;
//     box-shadow: 0 32px 70px rgba(36, 53, 41, 0.28);
//     border: 1px solid rgba(176, 204, 158, 0.35);
//     margin: auto;
//   }

//   .form-back {
//     background: none; border: none; color: #5a8f64;
//     cursor: pointer; font-size: 12px; margin-bottom: 24px; padding: 0;
//     font-family: 'Roboto Condensed', sans-serif; font-weight: 600;
//     display: block; transition: color 0.2s; letter-spacing: 1.2px;
//     text-transform: uppercase;
//   }
//   .form-back:hover { color: #243529; }

//   .form-title {
//     font-family: 'Prata', serif;
//     font-size: clamp(24px, 4vw, 28px);
//     color: #243529;
//     margin-bottom: 6px;
//     letter-spacing: 0.2px;
//     line-height: 1.2;
//     font-weight: 400;
//   }
//   .form-role-header {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     margin-bottom: 28px;
//     flex-wrap: wrap;
//   }
//   .form-role-tag {
//     background: #c8dbbf;
//     color: #243529;
//     font-size: 10.5px;
//     font-weight: 700;
//     font-family: 'Roboto Condensed', sans-serif;
//     letter-spacing: 1.4px;
//     text-transform: uppercase;
//     padding: 5px 14px;
//     border-radius: 20px;
//     display: inline-block;
//     margin-top: 5px;
//   }

//   .form-input {
//     width: 100%;
//     padding: clamp(12px, 2.5vw, 14px) clamp(16px, 3vw, 20px);
//     border: 1.5px solid #c8dbbf;
//     border-radius: 14px;
//     font-size: clamp(13px, 2vw, 15px);
//     margin-bottom: 14px;
//     background: #fff;
//     color: #243529;
//     font-family: 'Roboto Condensed', sans-serif;
//     font-weight: 400;
//     outline: none;
//     transition: all 0.2s;
//     box-sizing: border-box;
//     display: block;
//     letter-spacing: 0.2px;
//   }
//   .form-input::placeholder { color: #9ab09e; }
//   .form-input:focus {
//     border-color: #7aaa7e;
//     box-shadow: 0 0 0 3px rgba(122, 170, 126, 0.14);
//   }

//   .form-btn {
//     width: 100%;
//     padding: clamp(13px, 2.5vw, 15px) 0;
//     background: linear-gradient(135deg, #7aaa7e 0%, #3d5e45 100%);
//     color: #f7f5ef;
//     border: none;
//     border-radius: 14px;
//     font-family: 'Prata', serif;
//     font-size: clamp(14px, 2vw, 16.5px);
//     cursor: pointer;
//     margin-top: 10px;
//     transition: all 0.3s ease;
//     letter-spacing: 0.5px;
//     font-weight: 400;
//   }
//   .form-btn:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 8px 22px rgba(61, 94, 69, 0.38);
//   }
//   .form-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

//   .form-error {
//     color: #a83232;
//     font-size: 13px;
//     margin-bottom: 14px;
//     padding: 11px 16px;
//     background: #fdf0f0;
//     border-radius: 10px;
//     font-family: 'Roboto Condensed', sans-serif;
//     letter-spacing: 0.2px;
//   }

//   .form-switch {
//     text-align: center;
//     font-size: clamp(12px, 1.8vw, 13px);
//     color: #5a7a60;
//     margin-top: 20px;
//     font-family: 'Roboto Condensed', sans-serif;
//     letter-spacing: 0.2px;
//     line-height: 1.8;
//   }
//   .form-link {
//     color: #3d5e45;
//     cursor: pointer;
//     font-weight: 700;
//     text-decoration: underline;
//     text-underline-offset: 3px;
//   }

//   /* ── RIGHT PANEL ── */
//   .right {
//     position: fixed;
//     right: 0;
//     top: 0;
//     bottom: 0;
//     width: 50%;
//     z-index: 5;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .flavor-dots {
//     position: absolute;
//     top: clamp(20px, 5vh, 40px);
//     right: clamp(20px, 5vw, 60px);
//     display: flex;
//     gap: clamp(8px, 1.5vw, 12px);
//     z-index: 15;
//     flex-wrap: wrap;
//     justify-content: flex-end;
//   }
//   .flavor-dot {
//     width: clamp(28px, 4vw, 36px);
//     height: clamp(28px, 4vw, 36px);
//     border-radius: 50%;
//     cursor: pointer;
//     transition: all 0.3s ease;
//     box-shadow: 0 3px 10px rgba(0,0,0,0.18);
//     border: 2px solid rgba(247, 245, 239, 0.38);
//   }
//   .flavor-dot:nth-child(1) { background: #d4c48c; }
//   .flavor-dot:nth-child(2) { background: #b0c87a; }
//   .flavor-dot:nth-child(3) { background: #88b08a; }
//   .flavor-dot:nth-child(4) { background: #b8cc9e; }
//   .flavor-dot:nth-child(5) { background: #7aaa7e; }
//   .flavor-dot:nth-child(6) { background: #5a8f64; }
//   .flavor-dot.active {
//     transform: scale(1.25);
//     border-color: #e2d5ab;
//     box-shadow: 0 0 0 3px rgba(226, 213, 171, 0.4);
//   }

//   .img-stage {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .img-item {
//     position: absolute;
//     transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
//     opacity: 0;
//     pointer-events: none;
//     transform: translateY(20px) scale(0.95);
//   }
//   .img-item.active {
//     opacity: 1;
//     pointer-events: all;
//     transform: translateY(0) scale(1);
//     z-index: 10;
//   }
//   .img-item img {
//     display: block;
//     width: min(480px, 60vw, 70vh);
//     height: auto;
//     max-height: 560px;
//     object-fit: contain;
//     border-radius: 28px;
//     background: transparent !important;
//   }

//   /* ── WAVE ── */
//   .wave-wrap {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     z-index: 6;
//     pointer-events: none;
//   }
//   .wave-wrap svg {
//     display: block;
//     width: 100%;
//     height: auto;
//   }

//   /* ── BOTTOM BAR ── */
//   .bottom-bar {
//     position: absolute;
//     bottom: clamp(15px, 3vh, 26px);
//     left: 0;
//     right: 0;
//     z-index: 20;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 0 clamp(20px, 5vw, 68px);
//     flex-wrap: wrap;
//     gap: 12px;
//   }

//   .reviews {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     background: rgba(36, 53, 41, 0.32);
//     padding: 6px 18px;
//     border-radius: 50px;
//     backdrop-filter: blur(12px);
//     border: 1px solid rgba(226, 213, 171, 0.22);
//   }
//   .avatars { display: flex; }
//   .avatar {
//     width: clamp(28px, 4vw, 34px);
//     height: clamp(28px, 4vw, 34px);
//     border-radius: 50%;
//     border: 2px solid #e2d5ab;
//     background: linear-gradient(135deg, #7aaa7e, #3d5e45);
//     margin-left: -8px;
//     font-size: clamp(10px, 1.5vw, 12px);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-weight: 800;
//     color: #f7f5ef;
//   }
//   .avatar:first-child { margin-left: 0; }
//   .review-text strong {
//     display: block;
//     font-size: clamp(11px, 1.8vw, 13px);
//     color: #f7f5ef;
//     font-family: 'Prata', serif;
//     font-weight: 400;
//     letter-spacing: 0.3px;
//   }
//   .review-text span {
//     font-size: clamp(9px, 1.5vw, 11px);
//     color: rgba(247, 245, 239, 0.7);
//     font-family: 'Roboto Condensed', sans-serif;
//     letter-spacing: 0.3px;
//   }

//   .nav-arrows {
//     display: flex;
//     gap: 8px;
//     background: rgba(36, 53, 41, 0.32);
//     padding: 6px 12px;
//     border-radius: 50px;
//     backdrop-filter: blur(12px);
//     border: 1px solid rgba(226, 213, 171, 0.22);
//   }
//   .arrow-btn {
//     width: clamp(32px, 5vw, 40px);
//     height: clamp(32px, 5vw, 40px);
//     border-radius: 50%;
//     border: none;
//     background: rgba(247, 245, 239, 0.9);
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: clamp(14px, 2vw, 16px);
//     color: #3d5e45;
//     transition: all 0.2s ease;
//     font-weight: bold;
//   }
//   .arrow-btn:hover { background: #e2d5ab; transform: scale(1.1); }

//   .socials {
//     display: flex;
//     gap: 8px;
//     background: rgba(36, 53, 41, 0.32);
//     padding: 6px 16px;
//     border-radius: 50px;
//     backdrop-filter: blur(12px);
//     border: 1px solid rgba(226, 213, 171, 0.22);
//   }
//   .social-icon {
//     width: clamp(26px, 4vw, 30px);
//     height: clamp(26px, 4vw, 30px);
//     border-radius: 50%;
//     background: rgba(36, 53, 41, 0.48);
//     color: #f7f5ef;
//     font-size: clamp(11px, 1.8vw, 13px);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .social-icon:hover { background: #e2d5ab; color: #243529; transform: scale(1.1); }

//   /* Responsive Design */
//   @media (max-width: 1024px) {
//     .right {
//       width: 50%;
//     }
//     .left {
//       width: 50%;
//     }
//   }

//   @media (max-width: 768px) {
//     .page {
//       flex-direction: column;
//       height: auto;
//       min-height: 100vh;
//     }

//     .left {
//       width: 100%;
//       padding: 100px 24px 60px 24px;
//       min-height: auto;
//     }

//     .right {
//       position: relative;
//       width: 100%;
//       height: 400px;
//       margin-top: 0;
//     }

//     .form-panel {
//       justify-content: center;
//       align-items: center;
//       padding: 20px;
//     }

//     .form-box {
//       margin: 0;
//       width: 100%;
//       max-width: 500px;
//     }

//     .bottom-bar {
//       position: relative;
//       margin-top: 20px;
//       padding: 16px 20px;
//       flex-direction: column;
//       align-items: center;
//       gap: 12px;
//     }

//     .brand {
//       position: fixed;
//       top: 20px;
//       left: 20px;
//       font-size: 18px;
//       padding: 6px 16px;
//       z-index: 25;
//     }

//     .flavor-dots {
//       top: 80px;
//       right: 20px;
//     }

//     .img-item img {
//       width: min(280px, 70vw);
//       height: auto;
//     }
//   }

//   @media (max-width: 480px) {
//     .role-card {
//       min-width: 100%;
//     }

//     .btn-dark, .btn-outline {
//       min-width: 100%;
//     }

//     .role-row, .btn-row {
//       flex-direction: column;
//     }

//     .right {
//       height: 320px;
//     }

//     .flavor-dots {
//       top: 60px;
//       right: 15px;
//     }

//     .flavor-dot {
//       width: 24px;
//       height: 24px;
//     }

//     .form-box {
//       padding: 28px 20px;
//     }
//   }
// `}</style>

//       <div className="page">
//         {/* ── LOGO ── */}
//         <div className="brand">
//           Local<span>Cart</span>
//         </div>

//         {/* ── LEFT ── */}
//         <div className={`left ${mode !== 'choose' ? 'hidden' : ''}`}>
//           <h1 className="headline">
//             Your neighbourhood,
//             <br />
//             <em>delivered.</em>
//           </h1>
//           <p className="sub">
//             Discover handmade crafts, street food, jewellery, pottery and more —
//             straight from local artisans near you.
//           </p>

//           {mode === 'choose' && (
//             <>
//               <div className="role-row">
//                 <div
//                   className={`role-card${role === 'user' ? ' selected' : ''}`}
//                   onClick={() => setRole('user')}
//                 >
//                   <div className="role-emoji">🛒</div>
//                   <div className="role-title">I'm a Shopper</div>
//                   <div className="role-desc">
//                     Discover & order from local stalls near me
//                   </div>
//                 </div>
//                 <div
//                   className={`role-card${role === 'vendor' ? ' selected' : ''}`}
//                   onClick={() => setRole('vendor')}
//                 >
//                   <div className="role-emoji">🏪</div>
//                   <div className="role-title">I'm a Vendor</div>
//                   <div className="role-desc">
//                     List my stall and take orders from customers
//                   </div>
//                 </div>
//               </div>

//               <div className="btn-row">
//                 <button className="btn-dark" onClick={() => setMode('signup')}>
//                   Create Account
//                 </button>
//                 <button
//                   className="btn-outline"
//                   onClick={() => setMode('signin')}
//                 >
//                   Sign In
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* ── FORM PANEL ── */}
//         <div className={`form-panel${mode !== 'choose' ? ' visible' : ''}`}>
//           <div className="form-box">
//             <button
//               className="form-back"
//               onClick={() => {
//                 setMode('choose')
//                 setError('')
//               }}
//             >
//               ← Back
//             </button>
//             <div className="form-role-header">
//               <span style={{ fontSize: 'clamp(28px, 5vw, 32px)' }}>
//                 {role === 'vendor' ? '🏪' : '🛒'}
//               </span>
//               <div>
//                 <div className="form-title">
//                   {mode === 'signup' ? 'Create Account' : 'Welcome back'}
//                 </div>
//                 <span className="form-role-tag">
//                   {role === 'vendor' ? 'Vendor' : 'Shopper'}
//                 </span>
//               </div>
//             </div>

//             {mode === 'signup' && (
//               <input
//                 className="form-input"
//                 placeholder="Full Name"
//                 value={form.name}
//                 autoFocus
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, name: e.target.value }))
//                 }
//               />
//             )}
//             <input
//               className="form-input"
//               placeholder="Email Address"
//               type="email"
//               value={form.email}
//               autoFocus={mode === 'signin'}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, email: e.target.value }))
//               }
//               onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
//             />
//             <input
//               className="form-input"
//               placeholder="Password"
//               type="password"
//               value={form.password}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, password: e.target.value }))
//               }
//               onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
//             />

//             {error && <p className="form-error">{error}</p>}

//             <button
//               className="form-btn"
//               onClick={handleSubmit}
//               disabled={loading}
//             >
//               {loading
//                 ? '⏳ Please wait...'
//                 : mode === 'signup'
//                   ? 'Create Account'
//                   : 'Sign In'}
//             </button>

//             <p className="form-switch">
//               {mode === 'signup'
//                 ? 'Already have an account? '
//                 : "Don't have one? "}
//               <span
//                 className="form-link"
//                 onClick={() => {
//                   setMode(mode === 'signup' ? 'signin' : 'signup')
//                   setError('')
//                   setForm({ name: '', email: '', password: '' })
//                 }}
//               >
//                 {mode === 'signup' ? 'Sign In' : 'Sign Up'}
//               </span>
//             </p>
//             <p
//               style={{
//                 textAlign: 'center',
//                 marginTop: 14,
//                 fontSize: 'clamp(11px, 1.8vw, 12.5px)',
//                 color: '#5a7a60',
//                 fontFamily: "'Roboto Condensed', sans-serif",
//                 letterSpacing: '0.2px',
//               }}
//             >
//               Wrong role?{' '}
//               <span
//                 className="form-link"
//                 onClick={() => setRole(role === 'vendor' ? 'user' : 'vendor')}
//               >
//                 Switch to {role === 'vendor' ? 'Shopper' : 'Vendor'}
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* ── RIGHT ── */}
//         <div className="right">
//           <div className="flavor-dots">
//             {IMAGES.map((_, i) => (
//               <button
//                 key={i}
//                 className={`flavor-dot${i === activeImg ? ' active' : ''}`}
//                 onClick={() => setActiveImg(i)}
//                 title={LABELS[i]}
//               />
//             ))}
//           </div>

//           <div className="img-stage">
//             {IMAGES.map((src, i) => (
//               <div
//                 key={src}
//                 className={`img-item ${i === activeImg ? 'active' : ''}`}
//               >
//                 <img src={src} alt={LABELS[i]} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ── WAVE ── */}
//         <div className="wave-wrap">
//           <svg
//             viewBox="0 0 1440 190"
//             preserveAspectRatio="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M0,95 C130,35 260,155 420,95 C540,48 640,138 780,90 C900,50 1000,138 1120,84 C1220,44 1330,118 1440,78 L1440,190 L0,190 Z"
//               fill="rgba(238, 244, 232, 0.9)"
//             />
//           </svg>
//         </div>

//         {/* ── BOTTOM BAR ── */}
//         <div className="bottom-bar">
//           <div className="reviews">
//             <div className="avatars">
//               {['⭐', '✨', '🌿'].map((l, idx) => (
//                 <div key={idx} className="avatar">
//                   {l}
//                 </div>
//               ))}
//             </div>
//             <div className="review-text">
//               <strong>10K+ Happy Customers</strong>
//               <span>Loved by local communities</span>
//             </div>
//           </div>

//           <div className="nav-arrows">
//             <button className="arrow-btn" onClick={prev}>
//               ←
//             </button>
//             <button className="arrow-btn" onClick={next}>
//               →
//             </button>
//           </div>

//           <div className="socials">
//             <div className="social-icon">📘</div>
//             <div className="social-icon">📷</div>
//             <div className="social-icon">🐦</div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
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
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  html, body {
    height: 100%;
    overflow-x: hidden;
  }

  .page {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background: linear-gradient(145deg, #5db85c 0%, #3e9a3e 40%, #2b6e2b 100%);
    font-family: 'DM Sans', sans-serif;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
  }

  /* Dark overlay for better text contrast */
  .page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 30%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.2) 100%);
    pointer-events: none;
    z-index: 1;
  }

  /* Custom scrollbar */
  .page::-webkit-scrollbar {
    width: 5px;
  }
  .page::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.15);
  }
  .page::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.4);
    border-radius: 4px;
  }

  /* ── LOGO ── */
  .brand {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: #ffffff;
    position: fixed;
    top: 16px;
    left: 24px;
    letter-spacing: 1.5px;
    z-index: 20;
    background: rgba(0, 0, 0, 0.4);
    padding: 8px 20px;
    border-radius: 50px;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .brand span {
    color: #ffefb9;
    font-style: italic;
    font-weight: 600;
  }

  /* ── LEFT PANEL ── */
  .left {
    position: relative;
    z-index: 10;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 0 40px 40px;
    gap: 0;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
 
  .left.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .headline {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    line-height: 1.2;
    color: #ffffff;
    margin-bottom: 12px;
    letter-spacing: -0.3px;
    font-weight: 700;
    text-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .headline em {
    font-style: italic;
    color: #ffefb9;
    display: block;
    margin-top: 2px;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.92);
    line-height: 1.5;
    max-width: 85%;
    margin-bottom: 28px;
    font-weight: 400;
    letter-spacing: 0.2px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }

  /* ── ROLE CARDS ── */
  .role-row {
    display: flex;
    gap: 14px;
    margin-bottom: 20px;
    max-width: 420px;
    flex-wrap: wrap;
  }
  .role-card {
    flex: 1;
    min-width: 140px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 20px;
    padding: 14px 10px;
    cursor: pointer;
    text-align: center;
    backdrop-filter: blur(12px);
    transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .role-card:hover {
    background: rgba(255, 255, 255, 0.22);
    border-color: rgba(255, 239, 185, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }
  .role-card.selected {
    background: rgba(255, 239, 185, 0.25);
    border-color: #ffefb9;
    box-shadow: 0 6px 14px rgba(0,0,0,0.15);
  }
  .role-emoji { 
    font-size: 28px; 
    margin-bottom: 8px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  }
  .role-title {
    font-family: 'Playfair Display', serif;
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 4px;
    letter-spacing: 0.2px;
    font-weight: 600;
  }
  .role-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.4;
    font-weight: 400;
    letter-spacing: 0.2px;
  }

  /* ── BUTTONS ── */
  .btn-row {
    display: flex;
    gap: 14px;
    max-width: 420px;
    flex-wrap: wrap;
  }
  .btn-dark {
    flex: 1;
    min-width: 140px;
    padding: 10px 0;
    background: #1a2a1f;
    color: #ffffff;
    border: none;
    border-radius: 40px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    letter-spacing: 0.3px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .btn-dark:hover {
    background: #0f1a0e;
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.2);
  }

  .btn-outline {
    flex: 1;
    min-width: 140px;
    padding: 10px 0;
    background: transparent;
    color: #ffffff;
    border: 1.5px solid rgba(255, 255, 255, 0.8);
    border-radius: 40px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    letter-spacing: 0.3px;
  }
  .btn-outline:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #ffefb9;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.12);
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
    transform: scale(0.96);
    transition: all 0.4s ease;
  }
  .form-panel.visible {
    pointer-events: all;
    opacity: 1;
    transform: scale(1);
  }

  .form-box {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    border-radius: 28px;
    padding: 28px 28px;
    width: 340px;
    max-width: 340px;
    box-shadow: 0 24px 48px rgba(0,0,0,0.2);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .form-back {
    background: none;
    border: none;
    color: #4a6b3c;
    cursor: pointer;
    font-size: 10px;
    margin-bottom: 16px;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    display: block;
    transition: color 0.2s;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }
  .form-back:hover { color: #1a2a1f; }

  .form-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    color: #1a2a1f;
    margin-bottom: 2px;
    letter-spacing: -0.2px;
    line-height: 1.2;
    font-weight: 700;
  }
  .form-role-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .form-role-tag {
    background: #e8f0e3;
    color: #2d4a2a;
    font-size: 9px;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 16px;
    display: inline-block;
    margin-top: 2px;
  }

  .form-input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #d4e2ca;
    border-radius: 14px;
    font-size: 13px;
    margin-bottom: 10px;
    background: #ffffff;
    color: #1a2a1f;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
    display: block;
    letter-spacing: 0.2px;
  }
  .form-input::placeholder { color: #9abf8f; }
  .form-input:focus {
    border-color: #5b8c4e;
    box-shadow: 0 0 0 2px rgba(91, 140, 78, 0.15);
  }

  .form-btn {
    width: 100%;
    padding: 10px 0;
    background: linear-gradient(105deg, #2d5a2a 0%, #1a3a18 100%);
    color: #ffffff;
    border: none;
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 6px;
    transition: all 0.3s ease;
    letter-spacing: 0.3px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
  .form-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.18);
    background: linear-gradient(105deg, #236620 0%, #123011 100%);
  }
  .form-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .form-error {
    color: #c7362b;
    font-size: 11px;
    margin-bottom: 10px;
    padding: 8px 12px;
    background: #ffe8e6;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.2px;
    font-weight: 500;
  }

  .form-switch {
    text-align: center;
    font-size: 12px;
    color: #5a7a50;
    margin-top: 14px;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.2px;
    line-height: 1.5;
  }
  .form-link {
    color: #2d5a2a;
    cursor: pointer;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s;
  }
  .form-link:hover { color: #1a3a18; }

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
    top: 20px;
    right: 28px;
    display: flex;
    gap: 8px;
    z-index: 15;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .flavor-dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  .flavor-dot:nth-child(1) { background: #e8d8a8; }
  .flavor-dot:nth-child(2) { background: #c5e0a4; }
  .flavor-dot:nth-child(3) { background: #a8c9a0; }
  .flavor-dot:nth-child(4) { background: #d4e2b5; }
  .flavor-dot:nth-child(5) { background: #9bc48b; }
  .flavor-dot:nth-child(6) { background: #7baa6e; }
  .flavor-dot.active {
    transform: scale(1.2);
    border-color: #ffefb9;
    box-shadow: 0 0 0 2px rgba(255, 239, 185, 0.5);
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
    transform: translateY(12px) scale(0.97);
  }
  .img-item.active {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0) scale(1);
    z-index: 10;
  }
  .img-item img {
    display: block;
    width: 320px;
    height: auto;
    max-height: 380px;
    object-fit: contain;
    border-radius: 20px;
    filter: drop-shadow(0 10px 24px rgba(0,0,0,0.2));
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
    filter: drop-shadow(0 -2px 4px rgba(0,0,0,0.05));
  }

  /* ── BOTTOM BAR ── */
  .bottom-bar {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .reviews {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.4);
    padding: 4px 14px;
    border-radius: 40px;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .avatars { display: flex; }
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #ffefb9;
    background: linear-gradient(135deg, #7aab6a, #4a7a3a);
    margin-left: -6px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #ffffff;
  }
  .avatar:first-child { margin-left: 0; }
  .review-text strong {
    display: block;
    font-size: 11px;
    color: #ffffff;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    letter-spacing: 0.2px;
  }
  .review-text span {
    font-size: 9px;
    color: rgba(255, 255, 255, 0.85);
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.2px;
  }

  .nav-arrows {
    display: flex;
    gap: 6px;
    background: rgba(0, 0, 0, 0.4);
    padding: 4px 10px;
    border-radius: 40px;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .arrow-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.95);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #2d5a2a;
    transition: all 0.2s ease;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .arrow-btn:hover { background: #ffefb9; transform: scale(1.05); box-shadow: 0 3px 8px rgba(0,0,0,0.12); }

  .socials {
    display: flex;
    gap: 6px;
    background: rgba(0, 0, 0, 0.4);
    padding: 4px 12px;
    border-radius: 40px;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .social-icon {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.45);
    color: #ffffff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  .social-icon:hover { background: #ffefb9; color: #1a2a1f; transform: scale(1.05); }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .right {
      width: 50%;
    }
    .left {
      width: 50%;
    }
    .img-item img {
      width: 280px;
      max-height: 340px;
    }
    .headline {
      font-size: 38px;
    }
    .brand {
      font-size: 18px;
      padding: 7px 18px;
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
      padding: 70px 24px 40px 24px;
      min-height: auto;
    }
   
    .right {
      position: relative;
      width: 100%;
      height: 300px;
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
      max-width: 380px;
    }
   
    .bottom-bar {
      position: relative;
      margin-top: 20px;
      padding: 12px 20px;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
   
    .brand {
      position: fixed;
      top: 14px;
      left: 16px;
      font-size: 16px;
      padding: 6px 16px;
      z-index: 25;
    }
   
    .flavor-dots {
      top: 12px;
      right: 16px;
    }
    .flavor-dot {
      width: 20px;
      height: 20px;
    }
   
    .img-item img {
      width: 240px;
      height: auto;
      max-height: 260px;
    }
    .headline {
      font-size: 32px;
    }
    .sub {
      max-width: 100%;
      font-size: 13px;
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
      height: 260px;
    }
   
    .flavor-dots {
      top: 10px;
      right: 12px;
    }
   
    .flavor-dot {
      width: 18px;
      height: 18px;
    }
   
    .form-box {
      padding: 22px 20px;
      width: 300px;
    }
   
    .img-item img {
      width: 200px;
      max-height: 220px;
    }
    .headline {
      font-size: 28px;
    }
    .left {
      padding: 60px 20px 32px 20px;
    }
    .brand {
      font-size: 14px;
      padding: 5px 14px;
    }
  }
`}</style>

      <div className="page">
        {/* ── LOGO ── */}
        <div className="brand">
          Karigar<span>Connect</span>
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
              <span style={{ fontSize: '26px' }}>
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
                marginTop: 10,
                fontSize: '11px',
                color: '#5a7a50',
                fontFamily: "'DM Sans', sans-serif",
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
              fill="rgba(238, 244, 232, 0.92)"
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
          </div>
        </div>
      </div>
    </>
  )
}
