'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'
import Header from '@/components/common/Header'
import CategoryPills from '@/components/common/CategoryPills'
import SearchBar from '@/components/user/SearchBar'
import VendorCard from '@/components/user/VendorCard'
import { STALLS } from '@/lib/mockData'

export default function SearchPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Connaught Place, Delhi')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    if (!loading && !user) router.push('/account')
    if (!loading && user?.role === 'vendor') router.push('/vendors')
  }, [user, loading, router])

  const filtered = STALLS.filter((s) => {
    const matchCat = category === 'all' || s.category === category
    const matchQuery =
      !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.tags.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
    return matchCat && matchQuery
  })

  if (loading) return null

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8F0' }}>
      <Header />
      <div style={styles.container}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Find local stalls near you 📍</h1>
          <p style={styles.heroSub}>
            Handmade, fresh, unique — straight from your neighbourhood
          </p>
        </div>

        <div style={styles.searchWrap}>
          <SearchBar
            value={query}
            onChange={setQuery}
            location={location}
            onLocationChange={setLocation}
          />
        </div>

        <div style={styles.section}>
          <CategoryPills selected={category} onChange={setCategory} />
        </div>

        <div style={styles.section}>
          <div style={styles.resultsHeader}>
            <h2 style={styles.sectionTitle}>
              {category === 'all'
                ? 'All Stalls Nearby'
                : `${category.replace('-', ' ')} stalls`}
            </h2>
            <span style={styles.count}>{filtered.length} found</span>
          </div>

          {filtered.length === 0 ? (
            <div style={styles.empty}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <p style={{ color: '#8B7355', fontSize: 16 }}>
                No stalls found. Try a different search or category.
              </p>
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
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' },
  hero: { marginBottom: 28 },
  heroTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 32,
    fontWeight: 800,
    color: '#1A1208',
    marginBottom: 6,
  },
  heroSub: { color: '#8B7355', fontSize: 16 },
  searchWrap: { marginBottom: 24 },
  section: { marginBottom: 28 },
  resultsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 20,
    fontWeight: 700,
    color: '#1A1208',
    textTransform: 'capitalize',
  },
  count: { fontSize: 13, color: '#8B7355', fontWeight: 500 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 20,
  },
  empty: { textAlign: 'center', padding: '60px 0' },
}
