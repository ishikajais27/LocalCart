import ArtisanCard from '../../../components/ArtisanCard'

async function getArtisansByCategory(category: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/artisans?category=${category}`,
    {
      cache: 'no-store',
    },
  )
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const artisans = await getArtisansByCategory(params.category)

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold capitalize mb-4">{params.category}</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {artisans.map((artisan: any) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </main>
  )
}
