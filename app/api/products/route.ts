import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/categories/mongodb'
import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  stallId: { type: String, required: true },
  name: String,
  price: Number,
  originalPrice: Number,
  description: String,
  variants: [String],
  image: String,
  createdAt: { type: Date, default: Date.now },
})

const Product =
  mongoose.models.Product || mongoose.model('Product', ProductSchema)

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const stallId = req.nextUrl.searchParams.get('stallId')
    if (!stallId)
      return NextResponse.json({ error: 'stallId required' }, { status: 400 })
    const products = await Product.find({ stallId }).sort({ createdAt: -1 })
    return NextResponse.json(products)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const product = await Product.create(body)
    return NextResponse.json(product, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
