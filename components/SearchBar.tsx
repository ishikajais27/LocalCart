'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const QUICK_SEARCHES = [
  '🎁 Gift under ₹500',
  '🏺 Handmade pottery',
  '🧵 Silk saree',
  '🪵 Wooden toys',
  '💎 Silver jewellery',
  '🎨 Pattachitra painting',
]

const AI_SUGGESTIONS = [
  'Gift for mom under ₹1000',
  'Eco-friendly home decor',
  'Wedding return gifts',
  'Office desk art piece',
  'Kids wooden toys',
]

interface SearchBarProps {
  size?: 'default' | 'large'
  showAI?: boolean
}

export default function SearchBar({
  size = 'default',
  showAI = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState('')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setFocused(false)
    }
  }

  const handleQuickSearch = (term: string) => {
    const clean = term.replace(/^[^\s]+\s/, '') // remove emoji prefix
    setQuery(clean)
    router.push(`/search?q=${encodeURIComponent(clean)}`)
  }

  const handleAIGift = async () => {
    if (!query.trim()) return
    setAiLoading(true)
    setAiResult('')
    try {
      const res = await fetch('/api/ai-gift-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      })
      const data = await res.json()
      setAiResult(
        data.suggestion ||
          'Try searching for handmade pottery or silk textiles!',
      )
    } catch {
      setAiResult('Try our categories to find the perfect gift!')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch}>
        <div
          className={`flex items-center bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ${
            focused
              ? 'border-terracotta ring-4 ring-terracotta/10'
              : 'border-gray-200'
          } ${size === 'large' ? 'text-base' : 'text-sm'}`}
        >
          <span
            className={`pl-4 text-gray-400 ${size === 'large' ? 'text-2xl' : 'text-lg'}`}
          >
            🔍
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder={
              size === 'large'
                ? 'Find anything — "Gift for mom", "Pottery", "Silk saree under ₹2000"...'
                : 'Search artisans, crafts, gifts...'
            }
            className={`flex-1 bg-transparent outline-none text-charcoal placeholder-gray-400 ${
              size === 'large' ? 'px-4 py-4' : 'px-3 py-2.5'
            }`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
          />
          {showAI && (
            <button
              type="button"
              onClick={handleAIGift}
              disabled={aiLoading || !query}
              className="hidden sm:flex items-center gap-1 border-l border-gray-100 px-3 py-2 text-xs font-medium text-neem-green hover:bg-cream disabled:opacity-40 transition-colors"
            >
              {aiLoading ? '⏳' : '✨'} AI Pick
            </button>
          )}
          <button
            type="submit"
            className={`bg-terracotta text-white font-semibold hover:bg-opacity-90 transition-colors ${
              size === 'large' ? 'px-6 py-4' : 'px-4 py-2.5'
            }`}
          >
            Search
          </button>
        </div>
      </form>

      {/* AI Result */}
      {aiResult && (
        <div className="mt-2 bg-neem-green/10 border border-neem-green/30 rounded-xl p-3 text-sm text-charcoal">
          <p className="font-medium text-neem-green text-xs mb-1">
            ✨ AI Gift Suggestion
          </p>
          <p>{aiResult}</p>
        </div>
      )}

      {/* Dropdown suggestions */}
      {focused && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="p-3 border-b border-gray-50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Quick searches
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SEARCHES.map((s) => (
                <button
                  key={s}
                  onClick={() => handleQuickSearch(s)}
                  className="text-sm bg-cream text-charcoal px-3 py-1.5 rounded-full hover:bg-terracotta hover:text-white transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {showAI && (
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                🎁 Tell us what you need
              </p>
              {AI_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setQuery(s)
                    inputRef.current?.focus()
                  }}
                  className="w-full text-left text-sm text-gray-600 px-2 py-1.5 rounded-lg hover:bg-cream hover:text-charcoal transition-colors flex items-center gap-2"
                >
                  <span className="text-gray-300">→</span> {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
