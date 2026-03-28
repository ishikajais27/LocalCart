import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/categories/mongodb'
import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
  stallId: { type: String, required: true },
  stallName: String,
  productId: String,
  productName: String,
  customerName: { type: String, default: 'Anonymous' },
  rating: { type: Number, required: true },
  comment: String,
  images: [String],
  reply: String,
  createdAt: { type: Date, default: Date.now },
})

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema)

const DEFAULT_REVIEWS = [
  {
    stallId: 'seed',
    stallName: 'Meera Candles',
    productId: 'p1',
    productName: 'Lavender Dream Candle',
    customerName: 'Priya S.',
    rating: 5,
    comment:
      'Absolutely love this candle! The fragrance lasts for hours and the packaging was beautiful. Will definitely order again.',
    images: [],
    createdAt: new Date('2024-12-01'),
  },
  {
    stallId: 'seed',
    stallName: 'Spice Garden',
    productId: 'p2',
    productName: 'Homemade Masala Blend',
    customerName: 'Rahul M.',
    rating: 4,
    comment:
      'Authentic taste, reminds me of my grandmothers cooking. The spice level is perfect. Highly recommend!',
    images: [],
    createdAt: new Date('2024-12-05'),
  },
  {
    stallId: 'seed',
    stallName: 'Artisan Jewels',
    productId: 'p3',
    productName: 'Silver Jhumka Earrings',
    customerName: 'Ananya K.',
    rating: 5,
    comment:
      'Gorgeous earrings! Got so many compliments at the wedding. The craftsmanship is outstanding for the price.',
    images: [],
    createdAt: new Date('2024-12-10'),
  },
  {
    stallId: 'seed',
    stallName: 'Green Basket',
    productId: 'p4',
    productName: 'Organic Honey 500g',
    customerName: 'Vikram P.',
    rating: 5,
    comment:
      'Pure and natural honey. You can taste the difference from store-bought. Worth every rupee!',
    images: [],
    createdAt: new Date('2024-12-12'),
  },
  {
    stallId: 'seed',
    stallName: 'Craft Corner',
    productId: 'p5',
    productName: 'Hand-painted Pot',
    customerName: 'Sunita D.',
    rating: 4,
    comment:
      'Beautiful work! The colors are vibrant and it looks stunning on my balcony. Delivery was quick too.',
    images: [],
    createdAt: new Date('2024-12-15'),
  },
  {
    stallId: 'seed',
    stallName: 'Bake Street',
    productId: 'p6',
    productName: 'Dark Chocolate Brownie',
    customerName: 'Arjun N.',
    rating: 5,
    comment:
      'Best brownies I have ever had! Fudgy, rich and not too sweet. Ordered for my birthday party and everyone loved them.',
    images: [],
    createdAt: new Date('2024-12-18'),
  },
]

async function seedIfEmpty() {
  const count = await Review.countDocuments({ stallId: 'seed' })
  if (count === 0) {
    await Review.insertMany(DEFAULT_REVIEWS)
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    await seedIfEmpty()
    const stallId = req.nextUrl.searchParams.get('stallId')
    const query = stallId ? { stallId } : {}
    const reviews = await Review.find(query).sort({ createdAt: -1 })
    return NextResponse.json(reviews)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const review = await Review.create(body)
    return NextResponse.json(review, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
