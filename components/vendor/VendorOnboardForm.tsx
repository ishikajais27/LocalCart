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

  const f = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const input: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
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

      // Link stallId to vendor account
      if (user?.id) {
        await fetch('/api/auth/update-stall', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, stallId }),
        })
        // Update local auth context so vendor can see their orders immediately
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
    <div style={{ maxWidth: 520 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
        {[1, 2, 3].map((n) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: step >= n ? '#FF6B2B' : '#F0E6D9',
                color: step >= n ? '#fff' : '#8B7355',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {n}
            </div>
            {n < 3 && (
              <div
                style={{
                  width: 60,
                  height: 2,
                  background: step > n ? '#FF6B2B' : '#F0E6D9',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <>
          <h3
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 20,
              fontWeight: 700,
              color: '#1A1208',
              marginBottom: 20,
            }}
          >
            Tell us about your stall
          </h3>
          <label style={label}>Stall Name</label>
          <input
            style={input}
            placeholder="e.g. Meera's Candle Corner"
            value={form.name}
            onChange={(e) => f('name', e.target.value)}
          />
          <label style={label}>Category</label>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 14,
            }}
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <button
                key={c.id}
                onClick={() => f('category', c.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 20,
                  fontSize: 13,
                  cursor: 'pointer',
                  border: `2px solid ${form.category === c.id ? '#FF6B2B' : '#F0E6D9'}`,
                  background: form.category === c.id ? '#FFF0E6' : '#fff',
                  color: form.category === c.id ? '#FF6B2B' : '#1A1208',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 600,
                }}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
          <label style={label}>Description</label>
          <textarea
            style={{ ...input, minHeight: 80, resize: 'vertical' }}
            placeholder="What do you sell? What makes your stall special?"
            value={form.description}
            onChange={(e) => f('description', e.target.value)}
          />
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setStep(2)}
            disabled={!form.name || !form.category}
          >
            Next →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h3
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 20,
              fontWeight: 700,
              color: '#1A1208',
              marginBottom: 20,
            }}
          >
            Location & Timings
          </h3>
          <label style={label}>Your Location / Area</label>
          <input
            style={input}
            placeholder="e.g. Lajpat Nagar, Delhi"
            value={form.location}
            onChange={(e) => f('location', e.target.value)}
          />
          <label style={label}>WhatsApp Number</label>
          <input
            style={input}
            placeholder="+91 98765 43210"
            value={form.whatsapp}
            onChange={(e) => f('whatsapp', e.target.value)}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div>
              <label style={label}>Opens At</label>
              <input
                type="time"
                style={input}
                value={form.openTime}
                onChange={(e) => f('openTime', e.target.value)}
              />
            </div>
            <div>
              <label style={label}>Closes At</label>
              <input
                type="time"
                style={input}
                value={form.closeTime}
                onChange={(e) => f('closeTime', e.target.value)}
              />
            </div>
          </div>
          <label style={label}>Minimum Order (₹)</label>
          <input
            style={input}
            type="number"
            placeholder="100"
            value={form.minOrder}
            onChange={(e) => f('minOrder', e.target.value)}
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-secondary" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => setStep(3)}
              disabled={!form.location}
            >
              Next →
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h3
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 20,
              fontWeight: 700,
              color: '#1A1208',
              marginBottom: 20,
            }}
          >
            Review & Go Live! 🚀
          </h3>
          <div
            style={{
              background: '#FFF8F0',
              border: '1px solid #F0E6D9',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
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
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderBottom: '1px solid #F0E6D9',
                }}
              >
                <span style={{ fontSize: 13, color: '#8B7355' }}>
                  {item.label}
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: '#1A1208' }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button className="btn-secondary" onClick={() => setStep(2)}>
              ← Edit
            </button>
            <button
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={submit}
              disabled={loading}
            >
              {loading ? '🚀 Going live...' : '🚀 List My Stall'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
