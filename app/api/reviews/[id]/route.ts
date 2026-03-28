import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/categories/mongodb'
import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
  stallId: String,
  stallName: String,
  productId: String,
  productName: String,
  customerName: String,
  rating: Number,
  comment: String,
  images: [String],
  reply: String,
  createdAt: { type: Date, default: Date.now },
})

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema)

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB()
    const { id } = await context.params
    const body = await req.json()
    const review = await Review.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(review)
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
