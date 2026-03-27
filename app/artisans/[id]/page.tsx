import { VerifiedBadge } from '../../../components/VerifiedBadge'
import Link from 'next/link'

async function getArtisan(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/artisans/${id}`,
    {
      cache: 'no-store',
    },
  )
  if (!res.ok) throw new Error('Artisan not found')
  return res.json()
}

export default async function ArtisanProfile({
  params,
}: {
  params: { id: string }
}) {
  const artisan = await getArtisan(params.id)

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{artisan.name}</h1>
          <VerifiedBadge verified={artisan.verified} />
        </div>
        <p className="text-gray-600 mt-1">
          {artisan.craft} • {artisan.location}
        </p>
        <p className="mt-4">{artisan.story || 'No story provided yet.'}</p>
        <div className="mt-6">
          <Link
            href={`/preorder/${artisan.id}`}
            className="bg-terracotta text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Place Pre-order
          </Link>
        </div>
      </div>
    </main>
  )
}
