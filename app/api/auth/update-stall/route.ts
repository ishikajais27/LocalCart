import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/categories/mongodb'
import { User } from '@/lib/categories/models/User'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { userId, stallId } = await req.json()
    await User.findByIdAndUpdate(userId, { stallId })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
