'use client'
import { useState } from 'react'
import { addProduct } from '@/lib/stallsStore'
// export default function AddProductForm() {
export default function AddProductForm({ stallId }: { stallId: string }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    variants: '',
  })
  const [saved, setSaved] = useState(false)
  const [products, setProducts] = useState<any[]>([])

  const f = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const input: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    border: '2px solid #F0E6D9',
    borderRadius: 10,
    fontSize: 14,
    fontFamily: 'DM Sans, sans-serif',
    color: '#1A1208',
    marginBottom: 14,
    background: '#fff',
    outline: 'none',
    display: 'block',
  }
  const label: React.CSSProperties = {
    display: 'block',
    fontSize: 12,
    fontWeight: 700,
    color: '#8B7355',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  // const handleSave = () => {
  //   setProducts((p) => [
  //     {
  //       id: Date.now(),
  //       name: form.name,
  //       price: Number(form.price),
  //       originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
  //       description: form.description,
  //       variants: form.variants
  //         .split(',')
  //         .map((v) => v.trim())
  //         .filter(Boolean),
  //     },
  //     ...p,
  //   ])
  //   setForm({
  //     name: '',
  //     price: '',
  //     originalPrice: '',
  //     description: '',
  //     variants: '',
  //   })
  //   setSaved(true)
  //   setTimeout(() => setSaved(false), 2000)
  // }
  const handleSave = () => {
    const newProduct = {
      id: `p_${Date.now()}`,
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
    addProduct(stallId, newProduct)
    setProducts((p) => [newProduct, ...p])
    setForm({
      name: '',
      price: '',
      originalPrice: '',
      description: '',
      variants: '',
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        alignItems: 'start',
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: '#1A1208',
            marginBottom: 20,
          }}
        >
          Add a New Product
        </h3>
        <label style={label}>Product Name</label>
        <input
          style={input}
          placeholder="e.g. Lavender Dream Candle"
          value={form.name}
          onChange={(e) => f('name', e.target.value)}
        />
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          <div>
            <label style={label}>Price (₹)</label>
            <input
              style={input}
              type="number"
              placeholder="250"
              value={form.price}
              onChange={(e) => f('price', e.target.value)}
            />
          </div>
          <div>
            <label style={label}>
              Original Price (₹){' '}
              <span style={{ color: '#C4A882' }}>optional</span>
            </label>
            <input
              style={input}
              type="number"
              placeholder="350"
              value={form.originalPrice}
              onChange={(e) => f('originalPrice', e.target.value)}
            />
          </div>
        </div>
        <label style={label}>Description</label>
        <textarea
          style={{ ...input, minHeight: 80, resize: 'vertical' }}
          placeholder="Describe your product..."
          value={form.description}
          onChange={(e) => f('description', e.target.value)}
        />
        <label style={label}>
          Variants <span style={{ color: '#C4A882' }}>comma separated</span>
        </label>
        <input
          style={input}
          placeholder="Small, Medium, Large"
          value={form.variants}
          onChange={(e) => f('variants', e.target.value)}
        />
        {saved && (
          <div
            style={{
              background: '#dcfce7',
              color: '#16a34a',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            ✅ Product added successfully!
          </div>
        )}
        <button
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={handleSave}
          disabled={!form.name || !form.price}
        >
          Add Product
        </button>
      </div>

      <div>
        <h3
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: '#1A1208',
            marginBottom: 20,
          }}
        >
          Your Products{' '}
          <span style={{ fontSize: 14, color: '#8B7355', fontWeight: 400 }}>
            ({products.length})
          </span>
        </h3>
        {products.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 0',
              background: '#FFF8F0',
              borderRadius: 14,
              border: '2px dashed #F0E6D9',
            }}
          >
            <div style={{ fontSize: 40 }}>🛍️</div>
            <p style={{ color: '#8B7355', marginTop: 8, fontSize: 14 }}>
              Products you add will appear here.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {products.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: '#fff',
                  border: '1px solid #F0E6D9',
                  borderRadius: 12,
                  padding: '14px 16px',
                  gap: 12,
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#1A1208',
                      marginBottom: 4,
                    }}
                  >
                    {p.name}
                  </p>
                  <p style={{ fontSize: 12, color: '#8B7355' }}>
                    {p.description}
                  </p>
                  {p.variants.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                      {p.variants.map((v: string) => (
                        <span key={v} className="badge">
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p
                    style={{ fontWeight: 800, fontSize: 16, color: '#FF6B2B' }}
                  >
                    ₹{p.price}
                  </p>
                  {p.originalPrice && (
                    <p
                      style={{
                        fontSize: 12,
                        color: '#C4A882',
                        textDecoration: 'line-through',
                      }}
                    >
                      ₹{p.originalPrice}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
