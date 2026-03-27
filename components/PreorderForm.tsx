'use client'

import { useState } from 'react'

interface PreOrderFormProps {
  artisanId: string
  artisanName?: string
  craft?: string
}

export function PreOrderForm({
  artisanId,
  artisanName,
  craft,
}: PreOrderFormProps) {
  const [step, setStep] = useState(1)
  const [specs, setSpecs] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [budget, setBudget] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/preorders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artisanId,
          specs,
          quantity,
          customerName,
          customerEmail,
          phone,
          deliveryDate,
          budget,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setOrderId(data.orderId || 'KM' + Date.now().toString().slice(-6))
        setSuccess(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-neem-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h3 className="text-xl font-bold text-charcoal mb-2">
          Pre-order Placed!
        </h3>
        <p className="text-gray-500 mb-1">
          Order ID:{' '}
          <span className="font-mono font-semibold text-charcoal">
            #{orderId}
          </span>
        </p>
        <p className="text-sm text-gray-400 mt-2">
          {artisanName || 'The artisan'} will reach out to you at{' '}
          <strong>{customerEmail}</strong> within 24 hours to discuss details.
        </p>
        <div className="mt-6 bg-cream rounded-xl p-4 text-sm text-charcoal">
          <p className="font-semibold mb-1">What happens next?</p>
          <p className="text-gray-500">
            The artisan confirms availability → Discusses specs with you →
            Begins crafting → Ships directly to you 🎨
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      {artisanName && (
        <div className="bg-cream rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">🎨</span>
          <div>
            <p className="text-xs text-gray-400">Pre-ordering from</p>
            <p className="font-semibold text-charcoal">{artisanName}</p>
            {craft && <p className="text-sm text-gray-500">{craft}</p>}
          </div>
        </div>
      )}

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step >= s
                  ? 'bg-terracotta text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
            <span
              className={`text-sm ${step >= s ? 'text-charcoal font-medium' : 'text-gray-400'}`}
            >
              {s === 1 ? 'Order Details' : 'Your Info'}
            </span>
            {s < 2 && <div className="w-8 h-px bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      {/* Step 1: Order details */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              What do you want? *
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all resize-none"
              rows={3}
              placeholder="e.g., A 6-inch terracotta pot with blue glaze, hand-painted floral design..."
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Be as detailed as possible — size, colour, design, occasion
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">
                Quantity *
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-gray-500 hover:bg-gray-50 transition-colors font-bold"
                >
                  −
                </button>
                <span className="flex-1 text-center font-semibold text-charcoal">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-gray-500 hover:bg-gray-50 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">
                Budget (₹)
              </label>
              <select
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta transition-all bg-white"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">Any budget</option>
                <option value="under-500">Under ₹500</option>
                <option value="500-1000">₹500 – ₹1,000</option>
                <option value="1000-2500">₹1,000 – ₹2,500</option>
                <option value="2500-5000">₹2,500 – ₹5,000</option>
                <option value="above-5000">₹5,000+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              Needed by (optional)
            </label>
            <input
              type="date"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta transition-all"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!specs.trim()}
            className="w-full bg-terracotta text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 2: Contact info */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              Full Name *
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
              placeholder="Your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              Email *
            </label>
            <input
              type="email"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
              placeholder="you@example.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              WhatsApp / Phone
            </label>
            <input
              type="tel"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">
              Artisan may contact you via WhatsApp for quick updates
            </p>
          </div>

          {/* Order summary */}
          <div className="bg-cream rounded-xl p-4 text-sm space-y-1">
            <p className="font-semibold text-charcoal mb-2">Order Summary</p>
            <div className="flex justify-between text-gray-500">
              <span>Specs</span>
              <span className="text-charcoal max-w-[60%] text-right truncate">
                {specs}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Quantity</span>
              <span className="text-charcoal">{quantity}</span>
            </div>
            {budget && (
              <div className="flex justify-between text-gray-500">
                <span>Budget</span>
                <span className="text-charcoal">
                  {budget
                    .replace('-', ' – ')
                    .replace('under', 'Under ₹')
                    .replace('above', 'Above ₹')}
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                loading || !customerName.trim() || !customerEmail.trim()
              }
              className="flex-1 bg-terracotta text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Placing...' : 'Place Pre-order 🎨'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
