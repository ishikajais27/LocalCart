import Link from 'next/link'
import VerifiedBadge from './VerifiedBadge'

interface Artisan {
  id: string
  name: string
  craft: string
  location: string
  verified: boolean
  image?: string
  story?: string
  category?: string
  rating?: number
  reviewCount?: number
  preorderCount?: number
}

export default function ArtisanCard({ artisan }: { artisan: Artisan }) {
  const initials = artisan.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const avatarColors = [
    'bg-terracotta',
    'bg-turmeric',
    'bg-neem-green',
    'bg-blue-500',
    'bg-purple-500',
  ]
  const colorIndex = artisan.name.charCodeAt(0) % avatarColors.length
  const avatarColor = avatarColors[colorIndex]

  return (
    <Link href={`/artisans/${artisan.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-terracotta/30 transition-all duration-200 group-hover:-translate-y-0.5">
        {/* Card top image or pattern */}
        <div className="h-36 bg-cream relative overflow-hidden">
          {artisan.image ? (
            <img
              src={artisan.image}
              alt={artisan.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {/* Decorative mandala-like pattern */}
              <div className="opacity-10">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="55"
                    fill="none"
                    stroke="#e8593c"
                    strokeWidth="1"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="40"
                    fill="none"
                    stroke="#e8593c"
                    strokeWidth="1"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="25"
                    fill="none"
                    stroke="#e8593c"
                    strokeWidth="1"
                  />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <line
                      key={deg}
                      x1="60"
                      y1="5"
                      x2="60"
                      y2="115"
                      stroke="#e8593c"
                      strokeWidth="0.5"
                      transform={`rotate(${deg} 60 60)`}
                    />
                  ))}
                </svg>
              </div>
              <span className="absolute text-5xl opacity-20 select-none">
                🎨
              </span>
            </div>
          )}

          {/* Category chip */}
          {artisan.category && (
            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-medium px-2 py-0.5 rounded-full border border-gray-100">
              {artisan.category}
            </span>
          )}

          {/* Verified chip */}
          <div className="absolute top-2 right-2">
            <VerifiedBadge verified={artisan.verified} />
          </div>
        </div>

        {/* Card body */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div
              className={`${avatarColor} text-white rounded-xl w-11 h-11 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm`}
            >
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-charcoal truncate">
                {artisan.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">{artisan.craft}</p>
            </div>
          </div>

          {/* Story snippet */}
          {artisan.story && (
            <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
              {artisan.story}
            </p>
          )}

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>📍</span>
              <span>{artisan.location}</span>
            </div>

            <div className="flex items-center gap-2">
              {artisan.rating && (
                <div className="flex items-center gap-0.5 text-xs">
                  <span className="text-turmeric">★</span>
                  <span className="font-medium text-charcoal">
                    {artisan.rating.toFixed(1)}
                  </span>
                  {artisan.reviewCount && (
                    <span className="text-gray-400">
                      ({artisan.reviewCount})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Pre-order CTA */}
          <button className="mt-3 w-full bg-cream text-terracotta border border-terracotta/30 rounded-xl py-2 text-sm font-semibold hover:bg-terracotta hover:text-white transition-all duration-200">
            Place Pre-order →
          </button>
        </div>
      </div>
    </Link>
  )
}
