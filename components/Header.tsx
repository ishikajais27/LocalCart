'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NAV_CATEGORIES = [
  { icon: '🕯️', label: 'Candles', slug: 'candles' },
  { icon: '💎', label: 'Jewellery', slug: 'jewellery' },
  { icon: '🏺', label: 'Pottery', slug: 'pottery' },
  { icon: '🍱', label: 'Street Food', slug: 'street-food' },
  { icon: '🎨', label: 'Art', slug: 'art' },
  { icon: '🧵', label: 'Textiles', slug: 'textiles' },
  { icon: '🪵', label: 'Wood Crafts', slug: 'wood-crafts' },
  { icon: '🧴', label: 'Natural Care', slug: 'natural-care' },
  { icon: '🎁', label: 'Gifts', slug: 'gifts' },
]

export default function Header() {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Announcement bar */}
      <div className="bg-saffron text-white text-xs py-2 text-center font-medium tracking-wide">
        🛕 Supporting 500+ local street vendors — Order before they sell out!
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
          <div className="w-9 h-9 bg-saffron rounded-xl flex items-center justify-center text-white font-bold text-xl font-sora">
            L
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-ink text-lg leading-none font-sora">
              LocalMart
            </p>
            <p className="text-xs text-muted leading-none">
              Street shops, online
            </p>
          </div>
        </Link>

        {/* Location */}
        <button className="hidden md:flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2 text-sm hover:border-orange-400 transition-colors flex-shrink-0">
          <span>📍</span>
          <div className="text-left">
            <p className="text-xs text-muted leading-none">Deliver to</p>
            <p className="font-semibold text-ink text-sm leading-none">
              Your City
            </p>
          </div>
          <span className="text-muted text-xs ml-1">▼</span>
        </button>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-orange-300 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
            <span className="pl-4 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder='Search "candles", "handmade jewellery", "street food"...'
              className="flex-1 bg-transparent px-3 py-2.5 text-sm text-ink placeholder-gray-400 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-saffron text-white px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Link
            href="/sell"
            className="hidden lg:flex items-center gap-1.5 border-2 border-jade text-jade rounded-xl px-3 py-2 text-sm font-semibold hover:bg-jade hover:text-white transition-all"
          >
            🏪 Sell Here
          </Link>
          <Link
            href="/cart"
            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">🛒</span>
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-saffron text-white text-xs rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </Link>
          <Link
            href="/account"
            className="hidden sm:flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm hover:border-gray-300 transition-colors"
          >
            <span>👤</span>
            <span className="text-ink font-medium">Login</span>
          </Link>
        </div>
      </div>

      {/* Category nav */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide py-1.5">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-saffron whitespace-nowrap transition-colors font-medium"
              >
                <span>{cat.icon}</span>
                {cat.label}
              </Link>
            ))}
            <Link
              href="/vendors"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-jade font-semibold hover:bg-jade-light whitespace-nowrap transition-colors ml-2"
            >
              ✓ All Vendors
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
