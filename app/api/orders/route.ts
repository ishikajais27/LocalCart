import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/categories/mongodb'
import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  stallId: { type: String, required: true },
  stallName: { type: String, required: true },
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
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'ready', 'delivered'],
    default: 'pending',
  },
  orderType: {
    type: String,
    enum: ['immediate', 'preorder'],
    default: 'immediate',
  },
  slot: { type: String, default: 'ASAP' },
  name: String,
  phone: String,
  address: String,
  customizations: [String],
  specialNote: String,
  createdAt: { type: Date, default: Date.now },
})

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const userId = req.nextUrl.searchParams.get('userId')
    const stallId = req.nextUrl.searchParams.get('stallId')
    if (!userId && !stallId)
      return NextResponse.json(
        { error: 'userId or stallId required' },
        { status: 400 },
      )
    const query: any = {}
    if (userId) query.userId = userId
    if (stallId) query.stallId = stallId
    const orders = await Order.find(query).sort({ createdAt: -1 })
    return NextResponse.json(orders)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const order = await Order.create(body)
    return NextResponse.json(order, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
