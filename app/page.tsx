import Link from 'next/link'
import ArtisanCard from '../components/ArtisanCard'
import CategoryPills from '../components/CategoryPills'
import SearchBar from '../components/SearchBar'
import Header from '../components/Header'

const mockArtisans = [
  {
    id: '1',
    name: 'Kamla Devi',
    craft: 'Blue Pottery',
    location: 'Jaipur, Rajasthan',
    verified: true,
    category: 'Pottery',
    rating: 4.8,
    reviewCount: 124,
    story:
      'Third-generation potter continuing a 200-year-old family tradition of Blue Pottery from Jaipur.',
  },
  {
    id: '2',
    name: 'Ramesh Kumar',
    craft: 'Pattachitra Paintings',
    location: 'Puri, Odisha',
    verified: true,
    category: 'Paintings',
    rating: 4.9,
    reviewCount: 87,
    story:
      'Award-winning Pattachitra artist whose work has been exhibited at national crafts fairs.',
  },
  {
    id: '3',
    name: 'Sita Bai',
    craft: 'Madhubani Art',
    location: 'Madhubani, Bihar',
    verified: false,
    category: 'Paintings',
    rating: 4.6,
    reviewCount: 45,
    story:
      'Village artist painting stories of nature and mythology on fabric and handmade paper.',
  },
  {
    id: '4',
    name: 'Abdul Rahim',
    craft: 'Brass Metalwork',
    location: 'Moradabad, UP',
    verified: true,
    category: 'Home Décor',
    rating: 4.7,
    reviewCount: 203,
    story:
      'Master brass craftsman creating intricate decorative pieces for homes and gifts.',
  },
]

const HERO_STATS = [
  { value: '200+', label: 'Artisans' },
  { value: '12', label: 'Craft types' },
  { value: '₹0', label: 'Platform fee' },
]

const GIFT_CATEGORIES = [
  { icon: '👩', label: 'For Mom', query: 'gift for mom' },
  { icon: '👨', label: 'For Dad', query: 'gift for dad' },
  { icon: '💍', label: 'Wedding', query: 'wedding gift' },
  { icon: '🎓', label: 'Graduation', query: 'graduation gift' },
  { icon: '🏠', label: 'Housewarming', query: 'housewarming gift' },
  { icon: '🏢', label: 'Corporate', query: 'corporate gift' },
]

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f7f3ee]">
        {/* Hero section */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-terracotta/10 text-terracotta text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  🎨 India's Artisan Marketplace
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                  Real crafts,
                  <br />
                  <span className="text-terracotta">real artisans</span>,<br />
                  right at your door
                </h1>
                <p className="text-gray-500 mb-6 text-base leading-relaxed">
                  Pre-order handmade goods directly from verified street
                  artisans across India. Every purchase gives a craftsperson
                  their digital identity.
                </p>
                <SearchBar size="large" showAI={true} />
                <div className="flex items-center gap-6 mt-6">
                  {HERO_STATS.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-xl font-bold text-charcoal">
                        {s.value}
                      </p>
                      <p className="text-xs text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero visual */}
              <div className="hidden md:grid grid-cols-2 gap-3">
                {mockArtisans.slice(0, 4).map((a) => (
                  <div
                    key={a.id}
                    className="bg-cream rounded-2xl p-4 border border-terracotta/10 hover:border-terracotta/30 transition-colors"
                  >
                    <div className="text-3xl mb-2">
                      {a.category === 'Pottery'
                        ? '🏺'
                        : a.category === 'Paintings'
                          ? '🎨'
                          : '🪆'}
                    </div>
                    <p className="font-semibold text-charcoal text-sm">
                      {a.name}
                    </p>
                    <p className="text-xs text-gray-400">{a.craft}</p>
                    <p className="text-xs text-gray-300 mt-1">
                      📍 {a.location.split(',')[0]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
          {/* Gift finder strip */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-charcoal">
                🎁 Find the perfect gift
              </h2>
              <Link
                href="/gifts"
                className="text-sm text-terracotta font-medium hover:underline"
              >
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {GIFT_CATEGORIES.map((g) => (
                <Link
                  key={g.label}
                  href={`/search?q=${encodeURIComponent(g.query)}`}
                  className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 border border-gray-100 hover:border-terracotta/40 hover:shadow-sm transition-all text-center"
                >
                  <span className="text-3xl">{g.icon}</span>
                  <span className="text-xs font-medium text-charcoal">
                    {g.label}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Category pills */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-charcoal">
                Browse by craft
              </h2>
            </div>
            <CategoryPills variant="cards" />
          </section>

          {/* Featured artisans */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-charcoal">
                ⭐ Featured artisans near you
              </h2>
              <Link
                href="/artisans"
                className="text-sm text-terracotta font-medium hover:underline"
              >
                View all →
              </Link>
            </div>
            <CategoryPills variant="pills" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
              {mockArtisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          </section>

          {/* Why KarigarMart banner */}
          <section className="bg-charcoal rounded-3xl p-6 md:p-10 text-white">
            <h2 className="text-2xl font-bold mb-2">Why KarigarMart?</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-xl">
              We're not a warehouse. Every listing is a real person with a real
              craft — people Zomato and Flipkart never even looked at.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: '🌐',
                  title: 'Digital identity for the invisible',
                  desc: 'Street artisans get their first online presence, verified by our team on ground.',
                },
                {
                  icon: '💰',
                  title: 'Pre-order = income before making',
                  desc: 'Artisans earn before they craft. No wasted inventory, no middlemen.',
                },
                {
                  icon: '🤝',
                  title: 'Haath se Haath',
                  desc: "Every rupee goes directly to the artisan's family. Not a corporation.",
                },
              ].map((w) => (
                <div key={w.title} className="flex gap-4">
                  <span className="text-3xl flex-shrink-0">{w.icon}</span>
                  <div>
                    <p className="font-semibold text-white mb-1">{w.title}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Vendor CTA */}
          <section className="bg-terracotta rounded-3xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Are you an artisan?</h2>
              <p className="text-white/80 text-sm max-w-md">
                Get your free listing in 5 minutes. Reach customers across
                India. No tech skills needed — just your craft.
              </p>
            </div>
            <Link
              href="/onboard"
              className="flex-shrink-0 bg-white text-terracotta font-bold px-8 py-4 rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              🏪 List Your Shop Free →
            </Link>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-charcoal text-gray-400 py-10 mt-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="text-white font-bold text-lg mb-2">KarigarMart</p>
                <p className="text-sm leading-relaxed">
                  Connecting India's street artisans with buyers who care about
                  real craftsmanship.
                </p>
              </div>
              <div>
                <p className="text-white font-semibold mb-3">Quick Links</p>
                <div className="space-y-2 text-sm">
                  {[
                    'Browse Artisans',
                    'Gift Ideas',
                    'How it Works',
                    'Become a Vendor',
                  ].map((l) => (
                    <p key={l}>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        {l}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white font-semibold mb-3">Support</p>
                <div className="space-y-2 text-sm">
                  {[
                    'FAQ',
                    'Contact Us',
                    'Privacy Policy',
                    'Terms of Service',
                  ].map((l) => (
                    <p key={l}>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        {l}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 text-center text-xs">
              © 2025 KarigarMart. Made with ❤️ for India's artisans.
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
