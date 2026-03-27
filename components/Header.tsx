'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-charcoal text-white text-xs py-1.5 text-center tracking-wide">
        🎨 Supporting 200+ local artisans across India — Every purchase keeps a
        craft alive
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-terracotta rounded-lg flex items-center justify-center text-white font-bold text-lg">
              K
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-charcoal text-lg leading-none">
                KarigarMart
              </p>
              <p className="text-xs text-gray-400 leading-none">
                Haat Se Haath Tak
              </p>
            </div>
          </div>
        </Link>

        {/* Location pill */}
        <button className="hidden md:flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-sm hover:border-terracotta transition-colors flex-shrink-0">
          <span className="text-base">📍</span>
          <div className="text-left">
            <p className="text-xs text-gray-400 leading-none">Deliver to</p>
            <p className="font-semibold text-charcoal text-sm leading-none">
              Bhubaneswar
            </p>
          </div>
          <span className="text-gray-400 text-xs ml-1">▼</span>
        </button>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 relative">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-terracotta focus-within:border-terracotta focus-within:ring-2 focus-within:ring-terracotta/20 transition-all">
            <span className="pl-4 text-gray-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder='Search "Pattachitra", "Terracotta", "Handloom"...'
              className="flex-1 bg-transparent px-3 py-2.5 text-sm text-charcoal placeholder-gray-400 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-terracotta text-white px-5 py-2.5 text-sm font-medium hover:bg-opacity-90 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Nav actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/onboard"
            className="hidden lg:flex items-center gap-1.5 border border-terracotta text-terracotta rounded-lg px-3 py-2 text-sm font-medium hover:bg-terracotta hover:text-white transition-all"
          >
            <span className="text-base">🏪</span>
            Sell Here
          </Link>

          <Link
            href="/wishlist"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Wishlist"
          >
            <span className="text-xl">♡</span>
          </Link>

          <Link
            href="/cart"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Pre-orders"
          >
            <span className="text-xl">🛒</span>
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-terracotta text-white text-xs rounded-full flex items-center justify-center font-bold">
              2
            </span>
          </Link>

          <Link
            href="/account"
            className="hidden sm:flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm hover:border-gray-300 transition-colors"
          >
            <span className="text-base">👤</span>
            <span className="text-charcoal font-medium">Login</span>
          </Link>
        </div>
      </div>

      {/* Category nav bar */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
            {[
              { icon: '🏺', label: 'Pottery' },
              { icon: '🧵', label: 'Textiles' },
              { icon: '💎', label: 'Jewellery' },
              { icon: '🪵', label: 'Wood Craft' },
              { icon: '🎨', label: 'Paintings' },
              { icon: '🧶', label: 'Handloom' },
              { icon: '🪆', label: 'Toys & Dolls' },
              { icon: '🧴', label: 'Natural Care' },
              { icon: '🕯️', label: 'Home Décor' },
              { icon: '🎁', label: 'Gift Sets' },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={`/category/${cat.label.toLowerCase().replace(' ', '-')}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-cream hover:text-terracotta whitespace-nowrap transition-colors font-medium"
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </Link>
            ))}
            <Link
              href="/artisans"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-neem-green font-semibold hover:bg-neem-green hover:text-white whitespace-nowrap transition-colors ml-2 border border-neem-green"
            >
              ✓ All Artisans
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
