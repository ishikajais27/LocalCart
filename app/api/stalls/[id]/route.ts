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
  createdAt: { type: Date, default: Date.now },
})

const Stall = mongoose.models.Stall || mongoose.model('Stall', StallSchema)
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB()
    const { id } = await context.params
    await Stall.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB()
    const { id } = await context.params
    const stall = await Stall.findById(id)
    if (!stall)
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(stall)
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
