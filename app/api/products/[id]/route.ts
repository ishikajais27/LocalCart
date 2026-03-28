// import { NextRequest, NextResponse } from 'next/server'
// import { connectDB } from '@/lib/categories/mongodb'
// import mongoose from 'mongoose'

// const ProductSchema = new mongoose.Schema({
// stallId: { type: String, required: true },
// name: String,
// price: Number,
// originalPrice: Number,
// description: String,
// variants: [String],
// image: String,
// createdAt: { type: Date, default: Date.now },
// })

// const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

// export async function GET(
// _req: NextRequest,
// context: { params: Promise<{ id: string }> },
// ) {
// try {
//     await connectDB()
//     const { id } = await context.params
//     const product = await Product.findById(id)
//     if (!product)
//     return NextResponse.json({ error: 'Not found' }, { status: 404 })
//     return NextResponse.json(product)
// } catch (e) {
//     return NextResponse.json({ error: 'Server error' }, { status: 500 })
// }
// }

// export async function DELETE(
// _req: NextRequest,
// context: { params: Promise<{ id: string }> },
// ) {
// try {
//     await connectDB()
//     const { id } = await context.params
//     await Product.findByIdAndDelete(id)
//     return NextResponse.json({ success: true })
// } catch (e) {
//     return NextResponse.json({ error: 'Server error' }, { status: 500 })
// }
// }
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

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB()
    const { id } = await context.params
    const product = await Product.findById(id)
    if (!product)
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB()
    const { id } = await context.params
    await Product.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
