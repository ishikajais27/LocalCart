import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/categories/mongodb'
import mongoose from 'mongoose'

const StallSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  description: String,
  whatsapp: String,
  openTime: String,
  closeTime: String,
  minOrder: String,
  vendorId: String,
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  isOpen: { type: Boolean, default: true },
  image: String,
  tags: [String],
  distance: String,
  deliveryTime: String,
  seeded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

const Stall = mongoose.models.Stall || mongoose.model('Stall', StallSchema)

async function seedIfEmpty() {
  const { SEED_STALLS } = await import('@/lib/mockData')
  const seedIds = SEED_STALLS.map((s) => s.id)

  // Remove stale seed stalls no longer in SEED_STALLS
  await Stall.deleteMany({ seeded: true, id: { $nin: seedIds } })

  // Upsert each seed stall — use _id-free filter on the raw collection to avoid strict mode
  for (const stall of SEED_STALLS) {
    await Stall.collection.updateOne(
      { id: stall.id },
      { $set: { ...stall, seeded: true } },
      { upsert: true },
    )
  }

  // Trigger product seeding
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    await fetch(`${baseUrl}/api/seed-products`)
  } catch (e) {
    console.error('Product seed failed:', e)
  }
}

// export async function GET() {
//   try {
//     await connectDB()
//     await seedIfEmpty()
//     const stalls = await Stall.find({}).sort({ createdAt: -1 })
//     return NextResponse.json(stalls)
//   } catch (e) {
//     console.error(e)
//     return NextResponse.json({ error: 'Server error' }, { status: 500 })
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     await connectDB()
//     const body = await req.json()
//     const stall = await Stall.create(body)
//     return NextResponse.json(stall, { status: 201 })
//   } catch (e) {
//     console.error(e)
//     return NextResponse.json({ error: 'Server error' }, { status: 500 })
//   }
// }

export async function GET() {
  try {
    await connectDB()
    // Run seeding in background — don't block the response
    seedIfEmpty().catch((e) => console.error('Seed error:', e))
    const stalls = await Stall.find({}).sort({ createdAt: -1 })
    return NextResponse.json(stalls)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
