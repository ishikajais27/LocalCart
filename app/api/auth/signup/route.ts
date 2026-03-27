import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/categories/mongodb'
import { User } from '@/lib/categories/models/User'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json()
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'All fields required' },
        { status: 400 },
      )
    }
    await connectDB()
    const existing = await User.findOne({ email })
    if (existing)
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 },
      )

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role })
    return NextResponse.json(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      { status: 201 },
    )
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
