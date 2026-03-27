import { NextResponse } from 'next/server'
import connectDB from '../../../lib/db'
import { Category } from '../../../lib/model'

export async function GET() {
  await connectDB()
  const categories = await Category.find()
  return NextResponse.json(categories)
}
