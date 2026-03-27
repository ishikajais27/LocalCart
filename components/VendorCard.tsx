import Link from 'next/link'
import VerifiedBadge from './common/VerifiedBadge'

const CATEGORY_EMOJIS: Record<string, string> = {
  Candles: '🕯️',
  Jewellery: '💎',
  Pottery: '🏺',
  'Street Food': '🍱',
  Art: '🎨',
  Textiles: '🧵',
  'Wood Crafts': '🪵',
  'Natural Care': '🧴',
  Gifts: '🎁',
}

export default function VendorCard({ vendor }: { vendor: any }) {
  const initials = vendor.shopName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const emoji = CATEGORY_EMOJIS[vendor.category] || '🏪'
  const avatarColors = [
    'bg-terracotta',
    'bg-turmeric',
    'bg-neem-green',
    'bg-blue-500',
    'bg-purple-500',
  ]
  const colorIndex = vendor.shopName.charCodeAt(0) % avatarColors.length
  const avatarColor = avatarColors[colorIndex]

  return (
    <Link href={`/vendors/${vendor._id}`} className="block group">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group-hover:-translate-y-0.5">
        {/* Image area */}
        <div className="h-36 bg-cream relative flex items-center justify-center">
          {vendor.image ? (
            <img
              src={vendor.image}
              alt={vendor.shopName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl opacity-30">{emoji}</span>
          )}
          <div className="absolute top-2 left-2">
            {vendor.isOpen !== false ? (
              <span className="bg-jade text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                ● Open
              </span>
            ) : (
              <span className="bg-gray-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                Closed
              </span>
            )}
          </div>
          <div className="absolute top-2 right-2">
            <VerifiedBadge
              verified={vendor.verified}
              size="sm"
              showLabel={false}
            />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start gap-3">
            <div
              className={`${avatarColor} text-white rounded-xl w-11 h-11 flex items-center justify-center font-bold text-sm flex-shrink-0`}
            >
              {initials}
            </div>
            <div>
              <h3 className="font-semibold text-charcoal">{vendor.shopName}</h3>
              <p className="text-xs text-gray-500">
                {vendor.vendorName} · {vendor.category}
              </p>
            </div>
          </div>

          {vendor.description && (
            <p className="text-xs text-gray-400 mt-2 line-clamp-2">
              {vendor.description}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <span>📍 {vendor.location}</span>
            <span>
              ⭐ {vendor.rating} ({vendor.reviewCount})
            </span>
          </div>

          <button className="mt-3 w-full bg-cream text-terracotta border border-terracotta/30 rounded-xl py-2 text-sm font-semibold hover:bg-terracotta hover:text-white transition">
            Pre-order Now →
          </button>
        </div>
      </div>
    </Link>
  )
}
