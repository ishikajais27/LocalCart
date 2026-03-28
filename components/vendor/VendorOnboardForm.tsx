// // 'use client'
// // import { useState } from 'react'
// // import { CATEGORIES } from '@/lib/mockData'
// // import { useAuth } from '@/lib/authContext'

// // export default function VendorOnboardForm({
// //   onComplete,
// // }: {
// //   onComplete: (stall: any) => void
// // }) {
// //   const { user, login } = useAuth()
// //   const [step, setStep] = useState(1)
// //   const [form, setForm] = useState({
// //     name: '',
// //     category: '',
// //     location: '',
// //     description: '',
// //     whatsapp: '',
// //     openTime: '09:00',
// //     closeTime: '20:00',
// //     minOrder: '100',
// //   })
// //   const [loading, setLoading] = useState(false)

// //   const f = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

// //   const input: React.CSSProperties = {
// //     width: '100%',
// //     padding: '12px 14px',
// //     border: '2px solid #F0E6D9',
// //     borderRadius: 10,
// //     fontSize: 14,
// //     fontFamily: 'DM Sans, sans-serif',
// //     color: '#1A1208',
// //     marginBottom: 14,
// //     background: '#fff',
// //     outline: 'none',
// //     display: 'block',
// //   }
// //   const label: React.CSSProperties = {
// //     display: 'block',
// //     fontSize: 12,
// //     fontWeight: 700,
// //     color: '#8B7355',
// //     marginBottom: 6,
// //     textTransform: 'uppercase',
// //     letterSpacing: '0.5px',
// //   }

// //   const submit = async () => {
// //     setLoading(true)
// //     const newStall = {
// //       ...form,
// //       vendorId: user?.id,
// //       rating: 0,
// //       reviewCount: 0,
// //       isOpen: true,
// //       image:
// //         'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
// //       tags: [],
// //       distance: '0.0 km',
// //       deliveryTime: `${form.openTime}–${form.closeTime}`,
// //     }

// //     try {
// //       const res = await fetch('/api/stalls', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(newStall),
// //       })
// //       const saved = await res.json()
// //       const stallId = saved._id

// //       // Link stallId to vendor account
// //       if (user?.id) {
// //         await fetch('/api/auth/update-stall', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ userId: user.id, stallId }),
// //         })
// //         // Update local auth context so vendor can see their orders immediately
// //         login({ ...user, stallId })
// //       }

// //       onComplete({ ...newStall, id: stallId, _id: stallId })
// //     } catch (e) {
// //       console.error(e)
// //       const fallbackId = `s_new_${Date.now()}`
// //       onComplete({ ...newStall, id: fallbackId })
// //     }
// //     setLoading(false)
// //   }

// //   return (
// //     <div style={{ maxWidth: 520 }}>
// //       <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
// //         {[1, 2, 3].map((n) => (
// //           <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
// //             <div
// //               style={{
// //                 width: 32,
// //                 height: 32,
// //                 borderRadius: '50%',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 background: step >= n ? '#FF6B2B' : '#F0E6D9',
// //                 color: step >= n ? '#fff' : '#8B7355',
// //                 fontWeight: 700,
// //                 fontSize: 14,
// //               }}
// //             >
// //               {n}
// //             </div>
// //             {n < 3 && (
// //               <div
// //                 style={{
// //                   width: 60,
// //                   height: 2,
// //                   background: step > n ? '#FF6B2B' : '#F0E6D9',
// //                 }}
// //               />
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       {step === 1 && (
// //         <>
// //           <h3
// //             style={{
// //               fontFamily: 'Syne, sans-serif',
// //               fontSize: 20,
// //               fontWeight: 700,
// //               color: '#1A1208',
// //               marginBottom: 20,
// //             }}
// //           >
// //             Tell us about your stall
// //           </h3>
// //           <label style={label}>Stall Name</label>
// //           <input
// //             style={input}
// //             placeholder="e.g. Meera's Candle Corner"
// //             value={form.name}
// //             onChange={(e) => f('name', e.target.value)}
// //           />
// //           <label style={label}>Category</label>
// //           <div
// //             style={{
// //               display: 'flex',
// //               flexWrap: 'wrap',
// //               gap: 8,
// //               marginBottom: 14,
// //             }}
// //           >
// //             {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
// //               <button
// //                 key={c.id}
// //                 onClick={() => f('category', c.id)}
// //                 style={{
// //                   padding: '7px 14px',
// //                   borderRadius: 20,
// //                   fontSize: 13,
// //                   cursor: 'pointer',
// //                   border: `2px solid ${form.category === c.id ? '#FF6B2B' : '#F0E6D9'}`,
// //                   background: form.category === c.id ? '#FFF0E6' : '#fff',
// //                   color: form.category === c.id ? '#FF6B2B' : '#1A1208',
// //                   fontFamily: 'DM Sans, sans-serif',
// //                   fontWeight: 600,
// //                 }}
// //               >
// //                 {c.emoji} {c.label}
// //               </button>
// //             ))}
// //           </div>
// //           <label style={label}>Description</label>
// //           <textarea
// //             style={{ ...input, minHeight: 80, resize: 'vertical' }}
// //             placeholder="What do you sell? What makes your stall special?"
// //             value={form.description}
// //             onChange={(e) => f('description', e.target.value)}
// //           />
// //           <button
// //             className="btn-primary"
// //             style={{ width: '100%', justifyContent: 'center' }}
// //             onClick={() => setStep(2)}
// //             disabled={!form.name || !form.category}
// //           >
// //             Next →
// //           </button>
// //         </>
// //       )}

// //       {step === 2 && (
// //         <>
// //           <h3
// //             style={{
// //               fontFamily: 'Syne, sans-serif',
// //               fontSize: 20,
// //               fontWeight: 700,
// //               color: '#1A1208',
// //               marginBottom: 20,
// //             }}
// //           >
// //             Location & Timings
// //           </h3>
// //           <label style={label}>Your Location / Area</label>
// //           <input
// //             style={input}
// //             placeholder="e.g. Lajpat Nagar, Delhi"
// //             value={form.location}
// //             onChange={(e) => f('location', e.target.value)}
// //           />
// //           <label style={label}>WhatsApp Number</label>
// //           <input
// //             style={input}
// //             placeholder="+91 98765 43210"
// //             value={form.whatsapp}
// //             onChange={(e) => f('whatsapp', e.target.value)}
// //           />
// //           <div
// //             style={{
// //               display: 'grid',
// //               gridTemplateColumns: '1fr 1fr',
// //               gap: 12,
// //               marginBottom: 14,
// //             }}
// //           >
// //             <div>
// //               <label style={label}>Opens At</label>
// //               <input
// //                 type="time"
// //                 style={input}
// //                 value={form.openTime}
// //                 onChange={(e) => f('openTime', e.target.value)}
// //               />
// //             </div>
// //             <div>
// //               <label style={label}>Closes At</label>
// //               <input
// //                 type="time"
// //                 style={input}
// //                 value={form.closeTime}
// //                 onChange={(e) => f('closeTime', e.target.value)}
// //               />
// //             </div>
// //           </div>
// //           <label style={label}>Minimum Order (₹)</label>
// //           <input
// //             style={input}
// //             type="number"
// //             placeholder="100"
// //             value={form.minOrder}
// //             onChange={(e) => f('minOrder', e.target.value)}
// //           />
// //           <div style={{ display: 'flex', gap: 10 }}>
// //             <button className="btn-secondary" onClick={() => setStep(1)}>
// //               ← Back
// //             </button>
// //             <button
// //               className="btn-primary"
// //               style={{ flex: 1, justifyContent: 'center' }}
// //               onClick={() => setStep(3)}
// //               disabled={!form.location}
// //             >
// //               Next →
// //             </button>
// //           </div>
// //         </>
// //       )}

// //       {step === 3 && (
// //         <>
// //           <h3
// //             style={{
// //               fontFamily: 'Syne, sans-serif',
// //               fontSize: 20,
// //               fontWeight: 700,
// //               color: '#1A1208',
// //               marginBottom: 20,
// //             }}
// //           >
// //             Review & Go Live! 🚀
// //           </h3>
// //           <div
// //             style={{
// //               background: '#FFF8F0',
// //               border: '1px solid #F0E6D9',
// //               borderRadius: 12,
// //               overflow: 'hidden',
// //             }}
// //           >
// //             {[
// //               { label: 'Stall Name', value: form.name },
// //               {
// //                 label: 'Category',
// //                 value:
// //                   CATEGORIES.find((c) => c.id === form.category)?.label ||
// //                   form.category,
// //               },
// //               { label: 'Location', value: form.location },
// //               { label: 'WhatsApp', value: form.whatsapp || 'Not provided' },
// //               {
// //                 label: 'Timings',
// //                 value: `${form.openTime} – ${form.closeTime}`,
// //               },
// //               { label: 'Min Order', value: `₹${form.minOrder}` },
// //             ].map((item) => (
// //               <div
// //                 key={item.label}
// //                 style={{
// //                   display: 'flex',
// //                   justifyContent: 'space-between',
// //                   padding: '12px 16px',
// //                   borderBottom: '1px solid #F0E6D9',
// //                 }}
// //               >
// //                 <span style={{ fontSize: 13, color: '#8B7355' }}>
// //                   {item.label}
// //                 </span>
// //                 <span
// //                   style={{ fontSize: 13, fontWeight: 600, color: '#1A1208' }}
// //                 >
// //                   {item.value}
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //           <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
// //             <button className="btn-secondary" onClick={() => setStep(2)}>
// //               ← Edit
// //             </button>
// //             <button
// //               className="btn-primary"
// //               style={{ flex: 1, justifyContent: 'center' }}
// //               onClick={submit}
// //               disabled={loading}
// //             >
// //               {loading ? '🚀 Going live...' : '🚀 List My Stall'}
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   )
// // }
// 'use client'
// import { useState } from 'react'
// import { CATEGORIES } from '@/lib/mockData'
// import { useAuth } from '@/lib/authContext'

// export default function VendorOnboardForm({
//   onComplete,
// }: {
//   onComplete: (stall: any) => void
// }) {
//   const { user, login } = useAuth()
//   const [step, setStep] = useState(1)
//   const [form, setForm] = useState({
//     name: '',
//     category: '',
//     location: '',
//     description: '',
//     whatsapp: '',
//     openTime: '09:00',
//     closeTime: '20:00',
//     minOrder: '100',
//   })
//   const [loading, setLoading] = useState(false)

//   const f = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

//   const submit = async () => {
//     setLoading(true)
//     const newStall = {
//       ...form,
//       vendorId: user?.id,
//       rating: 0,
//       reviewCount: 0,
//       isOpen: true,
//       image:
//         'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
//       tags: [],
//       distance: '0.0 km',
//       deliveryTime: `${form.openTime}–${form.closeTime}`,
//     }
//     try {
//       const res = await fetch('/api/stalls', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newStall),
//       })
//       const saved = await res.json()
//       const stallId = saved._id
//       if (user?.id) {
//         await fetch('/api/auth/update-stall', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ userId: user.id, stallId }),
//         })
//         login({ ...user, stallId })
//       }
//       onComplete({ ...newStall, id: stallId, _id: stallId })
//     } catch (e) {
//       console.error(e)
//       const fallbackId = `s_new_${Date.now()}`
//       onComplete({ ...newStall, id: fallbackId })
//     }
//     setLoading(false)
//   }

//   return (
//     <>
//       <style>{`
//         .vo-wrap {
//           max-width: 560px;
//           font-family: 'DM Sans', sans-serif;
//           width: 100%;
//         }

//         /* Stepper */
//         .vo-stepper { display: flex; align-items: center; margin-bottom: 28px; }
//         .vo-step-item { display: flex; align-items: center; flex: 1; }
//         .vo-step-item:last-child { flex: 0; }
//         .vo-step-circle {
//           width: 32px; height: 32px; border-radius: 50%;
//           display: flex; align-items: center; justify-content: center;
//           font-weight: 700; font-size: 13px;
//           transition: background 0.25s, color 0.25s, box-shadow 0.25s;
//           flex-shrink: 0;
//         }
//         .vo-step-circle.done {
//           background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
//           color: #fff;
//           box-shadow: 0 4px 14px rgba(78,154,106,0.38);
//         }
//         .vo-step-circle.idle {
//           background: #EEF7F1; color: #A8C9B0;
//           border: 2px solid #D4EDD9;
//         }
//         .vo-step-line {
//           flex: 1; height: 2px; margin: 0 6px;
//           transition: background 0.25s;
//         }
//         .vo-step-line.done { background: linear-gradient(90deg, #4E9A6A, #7BAE8C); }
//         .vo-step-line.idle { background: #E8F2EB; }

//         .vo-heading {
//           font-family: 'Playfair Display', serif;
//           font-size: clamp(17px, 3vw, 20px); font-weight: 700;
//           color: #1C3829; margin-bottom: 20px;
//         }

//         .vo-label {
//           display: block; font-size: 11px; font-weight: 700;
//           color: #7BAE8C; margin-bottom: 7px;
//           text-transform: uppercase; letter-spacing: 0.07em;
//         }

//         .vo-input {
//           width: 100%; padding: 11px 14px;
//           border: 1.5px solid #D4EDD9; border-radius: 12px;
//           font-size: 14px; font-family: 'DM Sans', sans-serif;
//           color: #1C3829; margin-bottom: 16px;
//           background: rgba(255,255,255,0.85); outline: none; display: block;
//           transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
//           -webkit-appearance: none;
//         }
//         .vo-input:focus {
//           border-color: #4E9A6A; background: #fff;
//           box-shadow: 0 0 0 3px rgba(78,154,106,0.12);
//         }
//         .vo-input::placeholder { color: #A8C9B0; }

//         /* Category pills */
//         .vo-cats { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
//         .vo-cat {
//           padding: 7px 13px; border-radius: 20px;
//           font-size: 13px; cursor: pointer; font-weight: 600;
//           font-family: 'DM Sans', sans-serif;
//           transition: all 0.18s;
//           border: 1.5px solid #D4EDD9;
//           background: rgba(255,255,255,0.7);
//           color: #4E7A5E;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .vo-cat:hover { border-color: #7BAE8C; background: #EEF7F1; }
//         .vo-cat.sel {
//           border-color: #4E9A6A;
//           background: linear-gradient(135deg, #EEF7F1, #D4EDD9);
//           color: #1C3829;
//           box-shadow: 0 2px 10px rgba(78,154,106,0.18);
//         }

//         /* Grid */
//         .vo-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

//         /* Buttons */
//         .vo-btn-primary {
//           width: 100%; padding: 13px;
//           background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
//           color: #fff; border: none; border-radius: 14px;
//           font-size: 14px; font-weight: 700;
//           cursor: pointer; font-family: 'DM Sans', sans-serif;
//           box-shadow: 0 6px 20px rgba(78,154,106,0.35);
//           transition: opacity 0.18s, transform 0.18s, box-shadow 0.18s;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .vo-btn-primary:hover:not(:disabled) {
//           opacity: 0.92; transform: translateY(-2px);
//           box-shadow: 0 10px 28px rgba(78,154,106,0.45);
//         }
//         .vo-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }

//         .vo-btn-secondary {
//           padding: 13px 18px;
//           background: rgba(255,255,255,0.7);
//           color: #4E9A6A; border: 1.5px solid #C8E6D0;
//           border-radius: 14px; font-size: 14px; font-weight: 700;
//           cursor: pointer; font-family: 'DM Sans', sans-serif;
//           transition: background 0.18s, border-color 0.18s;
//           flex-shrink: 0;
//           -webkit-tap-highlight-color: transparent;
//         }
//         .vo-btn-secondary:hover { background: #EEF7F1; border-color: #7BAE8C; }

//         .vo-btn-row { display: flex; gap: 10px; }
//         .vo-btn-row .vo-btn-primary { flex: 1; }

//         /* Review card */
//         .vo-review {
//           background: rgba(255,255,255,0.7);
//           border: 1.5px solid #D4EDD9; border-radius: 14px;
//           overflow: hidden; margin-bottom: 20px;
//         }
//         .vo-review-row {
//           display: flex; justify-content: space-between; align-items: center;
//           padding: 12px 16px; border-bottom: 1px solid #E8F2EB;
//           gap: 12px;
//         }
//         .vo-review-row:last-child { border-bottom: none; }
//         .vo-review-key { font-size: 13px; color: #7BAE8C; flex-shrink: 0; }
//         .vo-review-val {
//           font-size: 13px; font-weight: 600; color: #1C3829;
//           text-align: right; word-break: break-word;
//         }

//         @media (max-width: 480px) {
//           .vo-wrap { max-width: 100%; }
//           .vo-grid2 { grid-template-columns: 1fr; }
//           .vo-cats { gap: 6px; }
//           .vo-cat { font-size: 12px; padding: 6px 11px; }
//         }
//       `}</style>

//       <div className="vo-wrap">
//         {/* Stepper */}
//         <div className="vo-stepper">
//           {[1, 2, 3].map((n) => (
//             <div key={n} className="vo-step-item">
//               <div className={`vo-step-circle ${step >= n ? 'done' : 'idle'}`}>
//                 {n}
//               </div>
//               {n < 3 && (
//                 <div className={`vo-step-line ${step > n ? 'done' : 'idle'}`} />
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Step 1 */}
//         {step === 1 && (
//           <>
//             <p className="vo-heading">Tell us about your stall</p>
//             <label className="vo-label">Stall Name</label>
//             <input
//               className="vo-input"
//               placeholder="e.g. Meera's Candle Corner"
//               value={form.name}
//               onChange={(e) => f('name', e.target.value)}
//             />
//             <label className="vo-label">Category</label>
//             <div className="vo-cats">
//               {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
//                 <button
//                   key={c.id}
//                   className={`vo-cat${form.category === c.id ? ' sel' : ''}`}
//                   onClick={() => f('category', c.id)}
//                 >
//                   {c.emoji} {c.label}
//                 </button>
//               ))}
//             </div>
//             <label className="vo-label">Description</label>
//             <textarea
//               className="vo-input"
//               style={{ minHeight: 80, resize: 'vertical' }}
//               placeholder="What do you sell? What makes your stall special?"
//               value={form.description}
//               onChange={(e) => f('description', e.target.value)}
//             />
//             <button
//               className="vo-btn-primary"
//               onClick={() => setStep(2)}
//               disabled={!form.name || !form.category}
//             >
//               Next →
//             </button>
//           </>
//         )}

//         {/* Step 2 */}
//         {step === 2 && (
//           <>
//             <p className="vo-heading">Location & Timings</p>
//             <label className="vo-label">Your Location / Area</label>
//             <input
//               className="vo-input"
//               placeholder="e.g. Lajpat Nagar, Delhi"
//               value={form.location}
//               onChange={(e) => f('location', e.target.value)}
//             />
//             <label className="vo-label">WhatsApp Number</label>
//             <input
//               className="vo-input"
//               placeholder="+91 98765 43210"
//               value={form.whatsapp}
//               onChange={(e) => f('whatsapp', e.target.value)}
//             />
//             <div className="vo-grid2">
//               <div>
//                 <label className="vo-label">Opens At</label>
//                 <input
//                   type="time"
//                   className="vo-input"
//                   value={form.openTime}
//                   onChange={(e) => f('openTime', e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="vo-label">Closes At</label>
//                 <input
//                   type="time"
//                   className="vo-input"
//                   value={form.closeTime}
//                   onChange={(e) => f('closeTime', e.target.value)}
//                 />
//               </div>
//             </div>
//             <label className="vo-label">Minimum Order (₹)</label>
//             <input
//               className="vo-input"
//               type="number"
//               inputMode="numeric"
//               placeholder="100"
//               value={form.minOrder}
//               onChange={(e) => f('minOrder', e.target.value)}
//             />
//             <div className="vo-btn-row">
//               <button className="vo-btn-secondary" onClick={() => setStep(1)}>
//                 ← Back
//               </button>
//               <button
//                 className="vo-btn-primary"
//                 onClick={() => setStep(3)}
//                 disabled={!form.location}
//               >
//                 Next →
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 3 */}
//         {step === 3 && (
//           <>
//             <p className="vo-heading">Review & Go Live 🚀</p>
//             <div className="vo-review">
//               {[
//                 { label: 'Stall Name', value: form.name },
//                 {
//                   label: 'Category',
//                   value:
//                     CATEGORIES.find((c) => c.id === form.category)?.label ||
//                     form.category,
//                 },
//                 { label: 'Location', value: form.location },
//                 { label: 'WhatsApp', value: form.whatsapp || 'Not provided' },
//                 {
//                   label: 'Timings',
//                   value: `${form.openTime} – ${form.closeTime}`,
//                 },
//                 { label: 'Min Order', value: `₹${form.minOrder}` },
//               ].map((item) => (
//                 <div key={item.label} className="vo-review-row">
//                   <span className="vo-review-key">{item.label}</span>
//                   <span className="vo-review-val">{item.value}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="vo-btn-row">
//               <button className="vo-btn-secondary" onClick={() => setStep(2)}>
//                 ← Edit
//               </button>
//               <button
//                 className="vo-btn-primary"
//                 onClick={submit}
//                 disabled={loading}
//               >
//                 {loading ? '🚀 Going live…' : '🚀 List My Stall'}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   )
// }
'use client'
import { useState } from 'react'
import { CATEGORIES } from '@/lib/mockData'
import { useAuth } from '@/lib/authContext'

export default function VendorOnboardForm({
  onComplete,
}: {
  onComplete: (stall: any) => void
}) {
  const { user, login } = useAuth()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
    whatsapp: '',
    openTime: '09:00',
    closeTime: '20:00',
    minOrder: '100',
  })
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const f = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const deleteBtn: React.CSSProperties = {
    marginTop: 12,
    width: '100%',
    padding: '12px',
    background: 'transparent',
    color: '#C0392B',
    border: '1.5px solid #E8B4B0',
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif',
    transition: 'background 0.18s',
  }

  const deleteStall = async () => {
    if (!user?.stallId) return
    if (
      !confirm(
        'Are you sure you want to delete your stall? This cannot be undone.',
      )
    )
      return
    setDeleting(true)
    try {
      await fetch(`/api/stalls/${user.stallId}`, { method: 'DELETE' })
      await fetch('/api/auth/update-stall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, stallId: undefined }),
      })
      login({ ...user, stallId: undefined })
      onComplete(null)
    } catch (e) {
      console.error(e)
    }
    setDeleting(false)
  }

  const submit = async () => {
    setLoading(true)
    const newStall = {
      ...form,
      vendorId: user?.id,
      rating: 0,
      reviewCount: 0,
      isOpen: true,
      image:
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
      tags: [],
      distance: '0.0 km',
      deliveryTime: `${form.openTime}–${form.closeTime}`,
    }
    try {
      const res = await fetch('/api/stalls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStall),
      })
      const saved = await res.json()
      const stallId = saved._id
      if (user?.id) {
        await fetch('/api/auth/update-stall', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, stallId }),
        })
        login({ ...user, stallId })
      }
      onComplete({ ...newStall, id: stallId, _id: stallId })
    } catch (e) {
      console.error(e)
      const fallbackId = `s_new_${Date.now()}`
      onComplete({ ...newStall, id: fallbackId })
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        .vo-wrap {
          max-width: 560px;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
        }

        /* Stepper */
        .vo-stepper { display: flex; align-items: center; margin-bottom: 28px; }
        .vo-step-item { display: flex; align-items: center; flex: 1; }
        .vo-step-item:last-child { flex: 0; }
        .vo-step-circle {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 13px;
          transition: background 0.25s, color 0.25s, box-shadow 0.25s;
          flex-shrink: 0;
        }
        .vo-step-circle.done {
          background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
          color: #fff;
          box-shadow: 0 4px 14px rgba(78,154,106,0.38);
        }
        .vo-step-circle.idle {
          background: #EEF7F1; color: #A8C9B0;
          border: 2px solid #D4EDD9;
        }
        .vo-step-line {
          flex: 1; height: 2px; margin: 0 6px;
          transition: background 0.25s;
        }
        .vo-step-line.done { background: linear-gradient(90deg, #4E9A6A, #7BAE8C); }
        .vo-step-line.idle { background: #E8F2EB; }

        .vo-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(17px, 3vw, 20px); font-weight: 700;
          color: #1C3829; margin-bottom: 20px;
        }

        .vo-label {
          display: block; font-size: 11px; font-weight: 700;
          color: #7BAE8C; margin-bottom: 7px;
          text-transform: uppercase; letter-spacing: 0.07em;
        }

        .vo-input {
          width: 100%; padding: 11px 14px;
          border: 1.5px solid #D4EDD9; border-radius: 12px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: #1C3829; margin-bottom: 16px;
          background: rgba(255,255,255,0.85); outline: none; display: block;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          -webkit-appearance: none;
        }
        .vo-input:focus {
          border-color: #4E9A6A; background: #fff;
          box-shadow: 0 0 0 3px rgba(78,154,106,0.12);
        }
        .vo-input::placeholder { color: #A8C9B0; }

        /* Category pills */
        .vo-cats { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .vo-cat {
          padding: 7px 13px; border-radius: 20px;
          font-size: 13px; cursor: pointer; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.18s;
          border: 1.5px solid #D4EDD9;
          background: rgba(255,255,255,0.7);
          color: #4E7A5E;
          -webkit-tap-highlight-color: transparent;
        }
        .vo-cat:hover { border-color: #7BAE8C; background: #EEF7F1; }
        .vo-cat.sel {
          border-color: #4E9A6A;
          background: linear-gradient(135deg, #EEF7F1, #D4EDD9);
          color: #1C3829;
          box-shadow: 0 2px 10px rgba(78,154,106,0.18);
        }

        /* Grid */
        .vo-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* Buttons */
        .vo-btn-primary {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
          color: #fff; border: none; border-radius: 14px;
          font-size: 14px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 6px 20px rgba(78,154,106,0.35);
          transition: opacity 0.18s, transform 0.18s, box-shadow 0.18s;
          -webkit-tap-highlight-color: transparent;
        }
        .vo-btn-primary:hover:not(:disabled) {
          opacity: 0.92; transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(78,154,106,0.45);
        }
        .vo-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }

        .vo-btn-secondary {
          padding: 13px 18px;
          background: rgba(255,255,255,0.7);
          color: #4E9A6A; border: 1.5px solid #C8E6D0;
          border-radius: 14px; font-size: 14px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.18s, border-color 0.18s;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
        }
        .vo-btn-secondary:hover { background: #EEF7F1; border-color: #7BAE8C; }

        .vo-btn-row { display: flex; gap: 10px; }
        .vo-btn-row .vo-btn-primary { flex: 1; }

        /* Review card */
        .vo-review {
          background: rgba(255,255,255,0.7);
          border: 1.5px solid #D4EDD9; border-radius: 14px;
          overflow: hidden; margin-bottom: 20px;
        }
        .vo-review-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 16px; border-bottom: 1px solid #E8F2EB;
          gap: 12px;
        }
        .vo-review-row:last-child { border-bottom: none; }
        .vo-review-key { font-size: 13px; color: #7BAE8C; flex-shrink: 0; }
        .vo-review-val {
          font-size: 13px; font-weight: 600; color: #1C3829;
          text-align: right; word-break: break-word;
        }

        @media (max-width: 480px) {
          .vo-wrap { max-width: 100%; }
          .vo-grid2 { grid-template-columns: 1fr; }
          .vo-cats { gap: 6px; }
          .vo-cat { font-size: 12px; padding: 6px 11px; }
        }
      `}</style>

      <div className="vo-wrap">
        {/* Stepper */}
        <div className="vo-stepper">
          {[1, 2, 3].map((n) => (
            <div key={n} className="vo-step-item">
              <div className={`vo-step-circle ${step >= n ? 'done' : 'idle'}`}>
                {n}
              </div>
              {n < 3 && (
                <div className={`vo-step-line ${step > n ? 'done' : 'idle'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <p className="vo-heading">Tell us about your stall</p>
            <label className="vo-label">Stall Name</label>
            <input
              className="vo-input"
              placeholder="e.g. Meera's Candle Corner"
              value={form.name}
              onChange={(e) => f('name', e.target.value)}
            />
            <label className="vo-label">Category</label>
            <div className="vo-cats">
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <button
                  key={c.id}
                  className={`vo-cat${form.category === c.id ? ' sel' : ''}`}
                  onClick={() => f('category', c.id)}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
            <label className="vo-label">Description</label>
            <textarea
              className="vo-input"
              style={{ minHeight: 80, resize: 'vertical' }}
              placeholder="What do you sell? What makes your stall special?"
              value={form.description}
              onChange={(e) => f('description', e.target.value)}
            />
            <button
              className="vo-btn-primary"
              onClick={() => setStep(2)}
              disabled={!form.name || !form.category}
            >
              Next →
            </button>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <p className="vo-heading">Location & Timings</p>
            <label className="vo-label">Your Location / Area</label>
            <input
              className="vo-input"
              placeholder="e.g. Lajpat Nagar, Delhi"
              value={form.location}
              onChange={(e) => f('location', e.target.value)}
            />
            <label className="vo-label">WhatsApp Number</label>
            <input
              className="vo-input"
              placeholder="+91 98765 43210"
              value={form.whatsapp}
              onChange={(e) => f('whatsapp', e.target.value)}
            />
            <div className="vo-grid2">
              <div>
                <label className="vo-label">Opens At</label>
                <input
                  type="time"
                  className="vo-input"
                  value={form.openTime}
                  onChange={(e) => f('openTime', e.target.value)}
                />
              </div>
              <div>
                <label className="vo-label">Closes At</label>
                <input
                  type="time"
                  className="vo-input"
                  value={form.closeTime}
                  onChange={(e) => f('closeTime', e.target.value)}
                />
              </div>
            </div>
            <label className="vo-label">Minimum Order (₹)</label>
            <input
              className="vo-input"
              type="number"
              inputMode="numeric"
              placeholder="100"
              value={form.minOrder}
              onChange={(e) => f('minOrder', e.target.value)}
            />
            <div className="vo-btn-row">
              <button className="vo-btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button
                className="vo-btn-primary"
                onClick={() => setStep(3)}
                disabled={!form.location}
              >
                Next →
              </button>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <p className="vo-heading">Review & Go Live 🚀</p>
            <div className="vo-review">
              {[
                { label: 'Stall Name', value: form.name },
                {
                  label: 'Category',
                  value:
                    CATEGORIES.find((c) => c.id === form.category)?.label ||
                    form.category,
                },
                { label: 'Location', value: form.location },
                { label: 'WhatsApp', value: form.whatsapp || 'Not provided' },
                {
                  label: 'Timings',
                  value: `${form.openTime} – ${form.closeTime}`,
                },
                { label: 'Min Order', value: `₹${form.minOrder}` },
              ].map((item) => (
                <div key={item.label} className="vo-review-row">
                  <span className="vo-review-key">{item.label}</span>
                  <span className="vo-review-val">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="vo-btn-row">
              <button className="vo-btn-secondary" onClick={() => setStep(2)}>
                ← Edit
              </button>
              <button
                className="vo-btn-primary"
                onClick={submit}
                disabled={loading}
              >
                {loading ? '🚀 Going live…' : '🚀 List My Stall'}
              </button>
            </div>
            <button
              style={deleteBtn}
              onClick={deleteStall}
              disabled={deleting}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = '#FDF0EF')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              {deleting ? 'Deleting…' : '🗑️ Delete My Stall'}
            </button>
          </>
        )}
      </div>
    </>
  )
}
