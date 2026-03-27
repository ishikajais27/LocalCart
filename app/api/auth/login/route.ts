import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/categories/mongodb'
import { User } from '@/lib/categories/models/User'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    await connectDB()
    const user = await User.findOne({ email })
    if (!user)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      )

    const match = await bcrypt.compare(password, user.password)
    if (!match)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      )

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      stallId: user.stallId,
    })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
