'use client'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/authContext'
import Header from '@/components/common/Header'
import CategoryPills from '@/components/common/CategoryPills'
import VendorCard from '@/components/user/VendorCard'
import { BBSR_LOCATIONS } from '@/lib/mockData'
import { getAllStalls } from '@/lib/stallsStore'

const POPULAR_SEARCHES = [
  'Candles',
  'Momos',
  'Saree',
  'Plants',
  'Jewellery',
  'Pottery',
  'Art',
  'Chaat',
]

export default function SearchPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('KIIT Campus, Patia')
  const [locationInput, setLocationInput] = useState('')
  const [showLocDrop, setShowLocDrop] = useState(false)
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [category, setCategory] = useState('all')
  const [allStalls, setAllStalls] = useState<any[]>([])
  const locRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading && !user) router.push('/account')
    if (!loading && user?.role === 'vendor') router.push('/vendors')
  }, [user, loading, router])

  useEffect(() => {
    setAllStalls(getAllStalls())
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (locRef.current && !locRef.current.contains(e.target as Node))
        setShowLocDrop(false)
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setShowSearchSuggestions(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filteredLocations = useMemo(
    () =>
      locationInput.trim() === ''
        ? BBSR_LOCATIONS
        : BBSR_LOCATIONS.filter((l) =>
            l.label.toLowerCase().includes(locationInput.toLowerCase()),
          ),
    [locationInput],
  )

  const selectedLocId = BBSR_LOCATIONS.find((l) => l.label === location)?.id

  const filtered = useMemo(
    () =>
      allStalls.filter((s) => {
        const locMatch = !selectedLocId || s.locationId === selectedLocId
        const catMatch = category === 'all' || s.category === category
        const q = query.toLowerCase().trim()
        const qMatch =
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.tags?.some((t: string) => t.toLowerCase().includes(q)) ||
          s.category.toLowerCase().includes(q)
        return locMatch && catMatch && qMatch
      }),
    [query, category, selectedLocId, allStalls],
  )

  // Search suggestions from stall names + tags
  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    const hits = new Set<string>()
    allStalls.forEach((s) => {
      if (s.name.toLowerCase().includes(q)) hits.add(s.name)
      s.tags?.forEach((t: string) => {
        if (t.toLowerCase().includes(q)) hits.add(t)
      })
    })
    return Array.from(hits).slice(0, 6)
  }, [query, allStalls])

  if (loading) return null

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFF8F0',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      <Header />

      {/* Sticky Search Header */}
      <div style={styles.stickySearch}>
        {/* Location Row */}
        <div ref={locRef} style={{ position: 'relative', marginBottom: 10 }}>
          <div
            onClick={() => {
              setShowLocDrop((v) => !v)
              setLocationInput('')
            }}
            style={styles.locationBar}
          >
            <span style={{ fontSize: 18, color: '#FF6B2B' }}>📍</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 11,
                  color: '#8B7355',
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                Delivering to
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#1A1208',
                  marginTop: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {location}
              </div>
            </div>
            <span
              style={{
                color: '#FF6B2B',
                fontSize: 18,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              ⌄
            </span>
          </div>

          {showLocDrop && (
            <div style={styles.locDropdown}>
              <div style={styles.locSearchWrap}>
                <span style={{ fontSize: 16, color: '#C4A882' }}>🔍</span>
                <input
                  autoFocus
                  placeholder="Search area or locality..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  style={styles.locInput}
                />
                {locationInput && (
                  <span
                    onClick={() => setLocationInput('')}
                    style={{
                      color: '#8B7355',
                      cursor: 'pointer',
                      fontSize: 13,
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
              <div style={{ maxHeight: 260, overflowY: 'auto' }}>
                {filteredLocations.length === 0 ? (
                  <div
                    style={{
                      padding: '16px',
                      fontSize: 13,
                      color: '#8B7355',
                      textAlign: 'center',
                    }}
                  >
                    No areas found
                  </div>
                ) : (
                  filteredLocations.map((loc) => (
                    <div
                      key={loc.id}
                      onClick={() => {
                        setLocation(loc.label)
                        setShowLocDrop(false)
                        setLocationInput('')
                      }}
                      style={{
                        ...styles.locOption,
                        background:
                          loc.label === location ? '#FFF0E6' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLDivElement).style.background =
                          '#FFF8F0'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLDivElement).style.background =
                          loc.label === location ? '#FFF0E6' : 'transparent'
                      }}
                    >
                      <span style={{ fontSize: 16, flexShrink: 0 }}>📍</span>
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: loc.label === location ? 700 : 500,
                            color:
                              loc.label === location ? '#FF6B2B' : '#1A1208',
                          }}
                        >
                          {loc.area}
                        </div>
                        <div style={{ fontSize: 11, color: '#8B7355' }}>
                          {loc.label}
                        </div>
                      </div>
                      {loc.label === location && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            color: '#FF6B2B',
                            fontSize: 14,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div ref={searchRef} style={{ position: 'relative' }}>
          <div style={styles.searchBox}>
            <span style={{ fontSize: 18, color: '#C4A882', flexShrink: 0 }}>
              🔍
            </span>
            <input
              style={styles.searchInput}
              placeholder='Search "candles", "momos", "saree"…'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowSearchSuggestions(true)
              }}
              onFocus={() => setShowSearchSuggestions(true)}
            />
            {query && (
              <span
                onClick={() => {
                  setQuery('')
                  setShowSearchSuggestions(false)
                }}
                style={styles.clearBtn}
              >
                ✕
              </span>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSearchSuggestions && (query ? suggestions.length > 0 : true) && (
            <div style={styles.suggestDrop}>
              {!query && (
                <>
                  <div style={styles.suggestLabel}>Popular Searches</div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      padding: '0 14px 12px',
                    }}
                  >
                    {POPULAR_SEARCHES.map((s) => (
                      <span
                        key={s}
                        onClick={() => {
                          setQuery(s)
                          setShowSearchSuggestions(false)
                        }}
                        style={styles.popularChip}
                      >
                        🔥 {s}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {query &&
                suggestions.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setQuery(s)
                      setShowSearchSuggestions(false)
                    }}
                    style={styles.suggestRow}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.background =
                        '#FFF8F0')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.background =
                        'transparent')
                    }
                  >
                    <span style={{ color: '#C4A882', fontSize: 15 }}>🔍</span>
                    <span style={{ fontSize: 14, color: '#1A1208' }}>{s}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <div style={styles.container}>
        {/* Hero */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Local stalls, real people 🤝</h1>
          <p style={styles.heroSub}>
            Order directly from artisans & vendors in {location.split(',')[0]}
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ marginBottom: 24 }}>
          <CategoryPills selected={category} onChange={setCategory} />
        </div>

        {/* Results */}
        <div style={styles.resultsHeader}>
          <h2 style={styles.sectionTitle}>
            {query
              ? `Results for "${query}"`
              : category === 'all'
                ? `Stalls near ${location.split(',')[0]}`
                : `${category.replace('-', ' ')} near you`}
          </h2>
          <span style={styles.count}>{filtered.length} found</span>
        </div>

        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>😕</div>
            <p
              style={{
                color: '#1A1208',
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 6,
              }}
            >
              No stalls found here
            </p>
            <p style={{ color: '#8B7355', fontSize: 14 }}>
              Try a different location or clear the search
            </p>
            <button
              onClick={() => {
                setQuery('')
                setCategory('all')
              }}
              style={styles.resetBtn}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((stall) => (
              <VendorCard key={stall.id} stall={stall} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  stickySearch: {
    position: 'sticky',
    top: 0,
    zIndex: 90,
    background: '#1A1208',
    padding: '12px 20px 14px',
    boxShadow: '0 2px 16px rgba(26,18,8,0.18)',
  },
  locationBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'rgba(255,255,255,0.08)',
    border: '1.5px solid rgba(255,107,43,0.35)',
    borderRadius: 10,
    padding: '8px 14px',
    cursor: 'pointer',
  },
  locDropdown: {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    left: 0,
    right: 0,
    background: '#fff',
    borderRadius: 14,
    boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
    border: '1.5px solid #F0E6D9',
    zIndex: 999,
    overflow: 'hidden',
  },
  locSearchWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    borderBottom: '1px solid #F0E6D9',
  },
  locInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: 14,
    fontFamily: 'DM Sans, sans-serif',
    color: '#1A1208',
  },
  locOption: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    cursor: 'pointer',
    transition: 'background 0.1s',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#fff',
    borderRadius: 12,
    padding: '11px 16px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: 15,
    fontFamily: 'DM Sans, sans-serif',
    flex: 1,
    color: '#1A1208',
    background: 'transparent',
  },
  clearBtn: {
    background: '#F0E6D9',
    color: '#8B7355',
    borderRadius: '50%',
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 11,
    fontWeight: 700,
    flexShrink: 0,
  },
  suggestDrop: {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    left: 0,
    right: 0,
    background: '#fff',
    borderRadius: 14,
    boxShadow: '0 12px 40px rgba(0,0,0,0.13)',
    border: '1.5px solid #F0E6D9',
    zIndex: 999,
    overflow: 'hidden',
  },
  suggestLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: '#8B7355',
    padding: '10px 14px 6px',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  popularChip: {
    background: '#FFF0E6',
    color: '#FF6B2B',
    border: '1px solid rgba(255,107,43,0.2)',
    borderRadius: 20,
    padding: '5px 12px',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
  },
  suggestRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    cursor: 'pointer',
    transition: 'background 0.1s',
  },
  container: { maxWidth: 1200, margin: '0 auto', padding: '24px 20px 60px' },
  hero: { marginBottom: 20 },
  heroTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 26,
    fontWeight: 800,
    color: '#1A1208',
    marginBottom: 4,
  },
  heroSub: { color: '#8B7355', fontSize: 14 },
  resultsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 18,
    fontWeight: 700,
    color: '#1A1208',
    textTransform: 'capitalize',
  },
  count: {
    fontSize: 13,
    color: '#8B7355',
    fontWeight: 500,
    background: '#F0E6D9',
    padding: '3px 10px',
    borderRadius: 20,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 20,
  },
  empty: { textAlign: 'center', padding: '60px 0' },
  resetBtn: {
    marginTop: 16,
    background: '#FF6B2B',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '10px 24px',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
  },
}
