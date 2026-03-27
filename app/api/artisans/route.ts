import { NextResponse } from 'next/server'
import connectDB from '../../../lib/db'
import { Artisan } from '../../../lib/model'

export async function GET(request: Request) {
  await connectDB()

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  let query = {}
  if (category) {
    // Find category by name and filter by its ObjectId
    const CategoryModel = (await import('../../../lib/model')).Category
    const cat = await CategoryModel.findOne({ name: category })
    if (cat) query = { categoryId: cat._id }
  }

  const artisans = await Artisan.find(query).populate('categoryId')
  return NextResponse.json(artisans)
}

export async function POST(request: Request) {
  await connectDB()

  const body = await request.json()
  const { name, craft, location, story, image, categoryId } = body

  const artisan = await Artisan.create({
    name,
    craft,
    location,
    story,
    image,
    categoryId,
    verified: false,
  })

  return NextResponse.json(artisan, { status: 201 })
}
