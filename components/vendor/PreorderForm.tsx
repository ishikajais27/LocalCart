// 'use client'
// import { useState } from 'react'

// export default function AddProductForm({ stallId }: { stallId: string }) {
//   const [form, setForm] = useState({
//     name: '',
//     price: '',
//     originalPrice: '',
//     description: '',
//     variants: '',
//   })
//   const [saved, setSaved] = useState(false)
//   const [products, setProducts] = useState<any[]>([])

//   const f = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

//   const input: React.CSSProperties = {
//     width: '100%',
//     padding: '11px 14px',
//     border: '2px solid #F0E6D9',
//     borderRadius: 10,
//     fontSize: 14,
//     fontFamily: 'DM Sans, sans-serif',
//     color: '#1A1208',
//     marginBottom: 14,
//     background: '#fff',
//     outline: 'none',
//     display: 'block',
//   }
//   const label: React.CSSProperties = {
//     display: 'block',
//     fontSize: 12,
//     fontWeight: 700,
//     color: '#8B7355',
//     marginBottom: 6,
//     textTransform: 'uppercase',
//     letterSpacing: '0.5px',
//   }

//   const handleSave = async () => {
//     const newProduct = {
//       stallId,
//       name: form.name,
//       price: Number(form.price),
//       originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
//       description: form.description,
//       variants: form.variants
//         .split(',')
//         .map((v) => v.trim())
//         .filter(Boolean),
//       image:
//         'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300',
//     }

//     try {
//       const res = await fetch('/api/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newProduct),
//       })
//       const saved = await res.json()
//       setProducts((p) => [saved, ...p])
//     } catch (e) {
//       console.error(e)
//       setProducts((p) => [{ ...newProduct, id: Date.now() }, ...p])
//     }

//     setForm({
//       name: '',
//       price: '',
//       originalPrice: '',
//       description: '',
//       variants: '',
//     })
//     setSaved(true)
//     setTimeout(() => setSaved(false), 2000)
//   }

//   return (
//     <div
//       style={{
//         display: 'grid',
//         gridTemplateColumns: '1fr 1fr',
//         gap: 32,
//         alignItems: 'start',
//       }}
//     >
//       <div>
//         <h3
//           style={{
//             fontFamily: 'Syne, sans-serif',
//             fontSize: 18,
//             fontWeight: 700,
//             color: '#1A1208',
//             marginBottom: 20,
//           }}
//         >
//           Add a New Product
//         </h3>
//         <label style={label}>Product Name</label>
//         <input
//           style={input}
//           placeholder="e.g. Lavender Dream Candle"
//           value={form.name}
//           onChange={(e) => f('name', e.target.value)}
//         />
//         <div
//           style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
//         >
//           <div>
//             <label style={label}>Price (₹)</label>
//             <input
//               style={input}
//               type="number"
//               placeholder="250"
//               value={form.price}
//               onChange={(e) => f('price', e.target.value)}
//             />
//           </div>
//           <div>
//             <label style={label}>
//               Original Price (₹){' '}
//               <span style={{ color: '#C4A882' }}>optional</span>
//             </label>
//             <input
//               style={input}
//               type="number"
//               placeholder="350"
//               value={form.originalPrice}
//               onChange={(e) => f('originalPrice', e.target.value)}
//             />
//           </div>
//         </div>
//         <label style={label}>Description</label>
//         <textarea
//           style={{ ...input, minHeight: 80, resize: 'vertical' }}
//           placeholder="Describe your product..."
//           value={form.description}
//           onChange={(e) => f('description', e.target.value)}
//         />
//         <label style={label}>
//           Variants <span style={{ color: '#C4A882' }}>comma separated</span>
//         </label>
//         <input
//           style={input}
//           placeholder="Small, Medium, Large"
//           value={form.variants}
//           onChange={(e) => f('variants', e.target.value)}
//         />
//         {saved && (
//           <div
//             style={{
//               background: '#dcfce7',
//               color: '#16a34a',
//               padding: '10px 14px',
//               borderRadius: 8,
//               fontSize: 13,
//               fontWeight: 600,
//               marginBottom: 14,
//             }}
//           >
//             ✅ Product added successfully!
//           </div>
//         )}
//         <button
//           className="btn-primary"
//           style={{ width: '100%', justifyContent: 'center' }}
//           onClick={handleSave}
//           disabled={!form.name || !form.price}
//         >
//           Add Product
//         </button>
//       </div>

//       <div>
//         <h3
//           style={{
//             fontFamily: 'Syne, sans-serif',
//             fontSize: 18,
//             fontWeight: 700,
//             color: '#1A1208',
//             marginBottom: 20,
//           }}
//         >
//           Your Products{' '}
//           <span style={{ fontSize: 14, color: '#8B7355', fontWeight: 400 }}>
//             ({products.length})
//           </span>
//         </h3>
//         {products.length === 0 ? (
//           <div
//             style={{
//               textAlign: 'center',
//               padding: '48px 0',
//               background: '#FFF8F0',
//               borderRadius: 14,
//               border: '2px dashed #F0E6D9',
//             }}
//           >
//             <div style={{ fontSize: 40 }}>🛍️</div>
//             <p style={{ color: '#8B7355', marginTop: 8, fontSize: 14 }}>
//               Products you add will appear here.
//             </p>
//           </div>
//         ) : (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//             {products.map((p, i) => (
//               <div
//                 key={p._id || p.id || i}
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   background: '#fff',
//                   border: '1px solid #F0E6D9',
//                   borderRadius: 12,
//                   padding: '14px 16px',
//                   gap: 12,
//                 }}
//               >
//                 <div>
//                   <p
//                     style={{
//                       fontFamily: 'Syne, sans-serif',
//                       fontWeight: 700,
//                       fontSize: 14,
//                       color: '#1A1208',
//                       marginBottom: 4,
//                     }}
//                   >
//                     {p.name}
//                   </p>
//                   <p style={{ fontSize: 12, color: '#8B7355' }}>
//                     {p.description}
//                   </p>
//                   {p.variants?.length > 0 && (
//                     <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
//                       {p.variants.map((v: string) => (
//                         <span key={v} className="badge">
//                           {v}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                 <div style={{ textAlign: 'right', flexShrink: 0 }}>
//                   <p
//                     style={{ fontWeight: 800, fontSize: 16, color: '#FF6B2B' }}
//                   >
//                     ₹{p.price}
//                   </p>
//                   {p.originalPrice && (
//                     <p
//                       style={{
//                         fontSize: 12,
//                         color: '#C4A882',
//                         textDecoration: 'line-through',
//                       }}
//                     >
//                       ₹{p.originalPrice}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
'use client'
import { useState, useEffect } from 'react'

export default function PreorderForm({ stallId }: { stallId: string }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    variants: '',
  })
  const [saved, setSaved] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const f = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  useEffect(() => {
    if (!stallId) {
      setLoading(false)
      return
    }
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?stallId=${stallId}`)
        const data = await res.json()
        if (Array.isArray(data)) setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [stallId])

  const handleSave = async () => {
    if (!form.name || !form.price) return
    const newProduct = {
      stallId,
      name: form.name,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      description: form.description,
      variants: form.variants
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean),
      image:
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300',
    }
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      const data = await res.json()
      setProducts((p) => [data, ...p])
    } catch (e) {
      console.error(e)
      setProducts((p) => [{ ...newProduct, _id: Date.now() }, ...p])
    }
    setForm({
      name: '',
      price: '',
      originalPrice: '',
      description: '',
      variants: '',
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
    } catch (e) {
      console.error(e)
    }
    setProducts((p) => p.filter((x) => x._id !== id))
  }

  return (
    <>
      <style>{`
        .ap-wrap { font-family: 'DM Sans', sans-serif; }

        .ap-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }

        .ap-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(17px, 3vw, 20px); font-weight: 700;
          color: #1C3829; margin-bottom: 18px;
        }
        .ap-sub { font-size: 14px; color: #7BAE8C; font-weight: 400; }

        .ap-label {
          display: block; font-size: 11px; font-weight: 700;
          color: #7BAE8C; margin-bottom: 7px;
          text-transform: uppercase; letter-spacing: 0.07em;
        }
        .ap-opt { color: #A8C9B0; font-weight: 400; }

        .ap-input {
          width: 100%; padding: 11px 14px;
          border: 1.5px solid #D4EDD9; border-radius: 12px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: #1C3829; margin-bottom: 15px;
          background: rgba(255,255,255,0.85); outline: none; display: block;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          -webkit-appearance: none;
        }
        .ap-input:focus {
          border-color: #4E9A6A; background: #fff;
          box-shadow: 0 0 0 3px rgba(78,154,106,0.12);
        }
        .ap-input::placeholder { color: #A8C9B0; }

        .ap-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .ap-success {
          background: linear-gradient(135deg, #D4EDD9, #B8E0C4);
          color: #1C3829; padding: 11px 16px;
          border-radius: 12px; font-size: 13px; font-weight: 700;
          margin-bottom: 15px; border: 1px solid #A8D5B5;
        }

        .ap-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #4E9A6A, #7BAE8C);
          color: #fff; border: none; border-radius: 13px;
          font-size: 14px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 6px 20px rgba(78,154,106,0.35);
          transition: opacity 0.18s, transform 0.18s, box-shadow 0.18s;
          -webkit-tap-highlight-color: transparent;
        }
        .ap-btn:hover:not(:disabled) {
          opacity: 0.92; transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(78,154,106,0.45);
        }
        .ap-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        /* Product list */
        .ap-empty {
          text-align: center; padding: 48px 16px;
          background: rgba(255,255,255,0.5);
          border-radius: 14px;
          border: 2px dashed #C8E6D0;
        }
        .ap-empty-icon { font-size: 36px; margin-bottom: 10px; }
        .ap-empty-txt { color: #7BAE8C; font-size: 13px; }

        .ap-loading { text-align: center; padding: 48px 0; color: #7BAE8C; font-size: 14px; }

        .ap-product-list { display: flex; flex-direction: column; gap: 10px; max-height: 500px; overflow-y: auto; padding-right: 2px; }
        .ap-product-list::-webkit-scrollbar { width: 4px; }
        .ap-product-list::-webkit-scrollbar-thumb { background: #D4EDD9; border-radius: 4px; }

        .ap-product {
          display: flex; justify-content: space-between; gap: 12px;
          background: rgba(255,255,255,0.85);
          border: 1.5px solid #D4EDD9; border-radius: 13px;
          padding: 13px 15px;
          transition: box-shadow 0.18s, border-color 0.18s;
        }
        .ap-product:hover {
          box-shadow: 0 6px 24px rgba(28,56,41,0.09);
          border-color: #A8C9B0;
        }
        .ap-product-left { flex: 1; min-width: 0; }
        .ap-pname {
          font-family: 'Playfair Display', serif;
          font-weight: 700; font-size: 14px; color: #1C3829;
          margin-bottom: 3px; word-break: break-word;
        }
        .ap-pdesc { font-size: 12px; color: #7BAE8C; word-break: break-word; }
        .ap-variants { display: flex; gap: 5px; margin-top: 6px; flex-wrap: wrap; }
        .ap-badge {
          background: linear-gradient(135deg, #EEF7F1, #D4EDD9);
          color: #3A7D52; border-radius: 20px;
          font-size: 10px; font-weight: 600; padding: 2px 9px;
          border: 1px solid #C8E6D0;
        }
        .ap-product-right { text-align: right; flex-shrink: 0; }
        .ap-price { font-weight: 800; font-size: 15px; color: #1C3829; }
        .ap-orig { font-size: 11px; color: #A8C9B0; text-decoration: line-through; }
        .ap-del {
          margin-top: 7px;
          background: none;
          border: 1.5px solid #fecaca;
          color: #dc2626; border-radius: 7px;
          padding: 3px 9px; font-size: 11px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .ap-del:hover { background: #fff5f5; border-color: #dc2626; }

        /* Responsive */
        @media (max-width: 768px) {
          .ap-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .ap-product-list { max-height: none; }
        }
        @media (max-width: 480px) {
          .ap-grid2 { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ap-wrap">
        <div className="ap-grid">
          {/* Left: Add form */}
          <div>
            <p className="ap-heading">Add a New Product</p>

            <label className="ap-label">Product Name</label>
            <input
              className="ap-input"
              placeholder="e.g. Lavender Dream Candle"
              value={form.name}
              onChange={(e) => f('name', e.target.value)}
            />

            <div className="ap-grid2">
              <div>
                <label className="ap-label">Price (₹)</label>
                <input
                  className="ap-input"
                  type="number"
                  inputMode="numeric"
                  placeholder="250"
                  value={form.price}
                  onChange={(e) => f('price', e.target.value)}
                />
              </div>
              <div>
                <label className="ap-label">
                  Original Price (₹) <span className="ap-opt">optional</span>
                </label>
                <input
                  className="ap-input"
                  type="number"
                  inputMode="numeric"
                  placeholder="350"
                  value={form.originalPrice}
                  onChange={(e) => f('originalPrice', e.target.value)}
                />
              </div>
            </div>

            <label className="ap-label">Description</label>
            <textarea
              className="ap-input"
              style={{ minHeight: 80, resize: 'vertical' }}
              placeholder="Describe your product..."
              value={form.description}
              onChange={(e) => f('description', e.target.value)}
            />

            <label className="ap-label">
              Variants <span className="ap-opt">comma separated</span>
            </label>
            <input
              className="ap-input"
              placeholder="Small, Medium, Large"
              value={form.variants}
              onChange={(e) => f('variants', e.target.value)}
            />

            {saved && (
              <div className="ap-success">✅ Product added successfully!</div>
            )}

            <button
              className="ap-btn"
              onClick={handleSave}
              disabled={!form.name || !form.price}
            >
              Add Product
            </button>
          </div>

          {/* Right: Product list */}
          <div>
            <p className="ap-heading">
              Your Products <span className="ap-sub">({products.length})</span>
            </p>

            {loading ? (
              <div className="ap-loading">
                <div style={{ fontSize: 32, marginBottom: 10 }}>⏳</div>
                Loading products…
              </div>
            ) : products.length === 0 ? (
              <div className="ap-empty">
                <div className="ap-empty-icon">🛍️</div>
                <p className="ap-empty-txt">
                  Products you add will appear here.
                </p>
              </div>
            ) : (
              <div className="ap-product-list">
                {products.map((p, i) => (
                  <div key={p._id || p.id || i} className="ap-product">
                    <div className="ap-product-left">
                      <p className="ap-pname">{p.name}</p>
                      {p.description && (
                        <p className="ap-pdesc">{p.description}</p>
                      )}
                      {p.variants?.length > 0 && (
                        <div className="ap-variants">
                          {p.variants.map((v: string) => (
                            <span key={v} className="ap-badge">
                              {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="ap-product-right">
                      <p className="ap-price">₹{p.price}</p>
                      {p.originalPrice && (
                        <p className="ap-orig">₹{p.originalPrice}</p>
                      )}
                      <button
                        className="ap-del"
                        onClick={() => handleDelete(p._id)}
                      >
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
