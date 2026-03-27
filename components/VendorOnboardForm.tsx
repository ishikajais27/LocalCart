'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = [
  { id: '1', name: 'Pottery', icon: '🏺' },
  { id: '2', name: 'Textiles', icon: '🧵' },
  { id: '3', name: 'Jewellery', icon: '💎' },
  { id: '4', name: 'Wood Craft', icon: '🪵' },
  { id: '5', name: 'Paintings', icon: '🎨' },
  { id: '6', name: 'Handloom', icon: '🧶' },
  { id: '7', name: 'Toys & Dolls', icon: '🪆' },
  { id: '8', name: 'Natural Care', icon: '🧴' },
  { id: '9', name: 'Home Décor', icon: '🕯️' },
  { id: '10', name: 'Gift Sets', icon: '🎁' },
]

const STEPS = [
  { label: 'Your Craft', icon: '🎨' },
  { label: 'Your Story', icon: '📖' },
  { label: 'Contact', icon: '📞' },
]

export function VendorOnboardForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    craft: '',
    location: '',
    story: '',
    image: '',
    categoryId: '',
    yearsExperience: '',
    phone: '',
    upiId: '',
    agreeToTerms: false,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement
    const value = target.type === 'checkbox' ? target.checked : target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/artisans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push('/onboard/success')
      } else {
        alert('Submission failed. Please try again.')
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const canProceedStep0 =
    formData.name && formData.craft && formData.categoryId && formData.location
  const canProceedStep1 = formData.story.length >= 30
  const canSubmit = formData.phone && formData.agreeToTerms

  return (
    <div>
      {/* Benefits banner */}
      <div className="bg-cream rounded-2xl p-4 mb-6 border border-terracotta/10">
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          {[
            { icon: '🌐', text: 'Free digital presence' },
            { icon: '💰', text: 'Earn before you make' },
            { icon: '✓', text: 'Verified badge' },
          ].map((b) => (
            <div key={b.text} className="flex flex-col items-center gap-1">
              <span className="text-xl">{b.icon}</span>
              <span className="text-charcoal font-medium leading-tight">
                {b.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                  step > i
                    ? 'bg-neem-green'
                    : step === i
                      ? 'bg-terracotta'
                      : 'bg-gray-100'
                }`}
              >
                {step > i ? '✓' : s.icon}
              </div>
              <span
                className={`text-xs mt-1 font-medium ${
                  step >= i ? 'text-charcoal' : 'text-gray-400'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-colors ${
                  step > i ? 'bg-neem-green' : 'bg-gray-100'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Craft info */}
      {step === 0 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
              placeholder="e.g., Kamla Devi"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Your Craft Category *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      categoryId: cat.id,
                      craft: cat.name,
                    })
                  }
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left ${
                    formData.categoryId === cat.id
                      ? 'bg-terracotta text-white border-terracotta'
                      : 'bg-white border-gray-200 text-charcoal hover:border-terracotta/40 hover:bg-cream'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {formData.categoryId && (
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">
                Specific craft (optional)
              </label>
              <input
                type="text"
                name="craft"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta transition-all"
                placeholder={`e.g., Blue Pottery, Pattachitra...`}
                value={formData.craft}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta transition-all"
                placeholder="City, State"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">
                Experience
              </label>
              <select
                name="yearsExperience"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta transition-all bg-white"
                value={formData.yearsExperience}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="1-3">1–3 years</option>
                <option value="3-5">3–5 years</option>
                <option value="5-10">5–10 years</option>
                <option value="10+">10+ years</option>
                <option value="inherited">Family tradition</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(1)}
            disabled={!canProceedStep0}
            className="w-full bg-terracotta text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 1: Story */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              Your Story *
            </label>
            <textarea
              name="story"
              rows={5}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all resize-none"
              placeholder="Tell us how you started, what drives you, and what makes your craft special. Customers love connecting with real stories! (min. 30 characters)"
              value={formData.story}
              onChange={handleChange}
            />
            <p
              className={`text-xs mt-1 ${formData.story.length >= 30 ? 'text-neem-green' : 'text-gray-400'}`}
            >
              {formData.story.length}/30 minimum
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              Profile / Product Photo URL (optional)
            </label>
            <input
              type="url"
              name="image"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta transition-all"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-400 mt-1">
              Upload a photo of yourself or your work to build trust with buyers
            </p>
          </div>

          {formData.image && (
            <div className="rounded-xl overflow-hidden border border-gray-100 h-32">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
              className="flex-1 bg-terracotta text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Contact */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              WhatsApp / Phone *
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Customers will reach you via WhatsApp for orders
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              UPI ID (for receiving payments, optional)
            </label>
            <input
              type="text"
              name="upiId"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-terracotta transition-all"
              placeholder="yourname@upi"
              value={formData.upiId}
              onChange={handleChange}
            />
          </div>

          {/* Summary */}
          <div className="bg-cream rounded-xl p-4 space-y-2 text-sm">
            <p className="font-semibold text-charcoal mb-2">
              📋 Review your listing
            </p>
            <div className="flex justify-between text-gray-500">
              <span>Name</span>
              <span className="text-charcoal font-medium">{formData.name}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Craft</span>
              <span className="text-charcoal font-medium">
                {formData.craft}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Location</span>
              <span className="text-charcoal font-medium">
                {formData.location}
              </span>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mt-0.5 accent-terracotta"
            />
            <span className="text-sm text-gray-600">
              I agree to KarigarMart's{' '}
              <a href="/terms" className="text-terracotta underline">
                Terms
              </a>{' '}
              and understand that my listing will be reviewed before going live.
            </span>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !canSubmit}
              className="flex-1 bg-neem-green text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Submitting...' : '🎉 Register as Vendor'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
