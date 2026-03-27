import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/db'
import { Artisan } from '../../../../lib/model'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await connectDB()
  const artisan = await Artisan.findById(params.id).populate('categoryId')
  if (!artisan) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(artisan)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  await connectDB()
  const body = await request.json()
  const updated = await Artisan.findByIdAndUpdate(params.id, body, {
    new: true,
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  await connectDB()
  await Artisan.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
