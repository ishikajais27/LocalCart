'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Category {
  id: string
  name: string
  icon?: string
  count?: number
}

const CATEGORY_ICONS: Record<string, string> = {
  Pottery: '🏺',
  Textiles: '🧵',
  Jewellery: '💎',
  'Wood Craft': '🪵',
  Paintings: '🎨',
  Handloom: '🧶',
  'Toys & Dolls': '🪆',
  'Natural Care': '🧴',
  'Home Décor': '🕯️',
  'Gift Sets': '🎁',
}

const FALLBACK_CATEGORIES: Category[] = [
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

interface CategoryPillsProps {
  variant?: 'pills' | 'cards'
  onSelect?: (category: string) => void
}

export default function CategoryPills({
  variant = 'pills',
  onSelect,
}: CategoryPillsProps) {
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES)
  const [active, setActive] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const currentCat = searchParams.get('category')
    if (currentCat) setActive(currentCat)

    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(
            data.map((c: Category) => ({
              ...c,
              icon: CATEGORY_ICONS[c.name] || '🛍️',
            })),
          )
        }
      })
      .catch(() => {
        // fallback categories already set
      })
  }, [searchParams])

  const handleClick = (category: Category) => {
    const newActive = active === category.name ? null : category.name
    setActive(newActive)

    if (onSelect) {
      onSelect(newActive || '')
    } else {
      if (newActive) {
        router.push(
          `/category/${encodeURIComponent(category.name.toLowerCase())}`,
        )
      }
    }
  }

  if (variant === 'cards') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleClick(cat)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
              active === cat.name
                ? 'bg-terracotta text-white border-terracotta shadow-md'
                : 'bg-white border-gray-100 text-charcoal hover:border-terracotta/40'
            }`}
          >
            <span className="text-3xl">{cat.icon}</span>
            <span className="text-xs font-semibold whitespace-nowrap">
              {cat.name}
            </span>
            {cat.count != null && (
              <span
                className={`text-xs ${active === cat.name ? 'text-white/80' : 'text-gray-400'}`}
              >
                {cat.count} artisans
              </span>
            )}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => {
          setActive(null)
          if (onSelect) onSelect('')
        }}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${
          !active
            ? 'bg-terracotta text-white border-terracotta'
            : 'bg-white text-gray-600 border-gray-200 hover:border-terracotta/50'
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${
            active === cat.name
              ? 'bg-terracotta text-white border-terracotta'
              : 'bg-white text-gray-600 border-gray-200 hover:border-terracotta/50 hover:bg-cream'
          }`}
        >
          <span>{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  )
}
