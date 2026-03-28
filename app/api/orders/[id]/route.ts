import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/categories/mongodb'
import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userId: String,
  stallId: String,
  stallName: String,
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
      variant: String,
      image: String,
    },
  ],
  total: Number,
  status: String,
  orderType: String,
  slot: String,
  name: String,
  phone: String,
  address: String,
  customizations: [String],
  specialNote: String,
  createdAt: { type: Date, default: Date.now },
})

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB()
    const { id } = await context.params
    const body = await req.json()
    const order = await Order.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(order)
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
    const order = await Order.findById(id)
    if (!order)
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(order)
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
