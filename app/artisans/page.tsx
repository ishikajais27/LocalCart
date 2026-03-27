import { ArtisanCard } from '../../components/ArtisanCard'

// Fetch artisans from API (server component)
async function getArtisans() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/artisans`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch artisans')
  return res.json()
}

export default async function ArtisansPage() {
  const artisans = await getArtisans()

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Artisans</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {artisans.map((artisan: any) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </main>
  )
}
