import { NextResponse } from 'next/server'
import connectDB from '../../../lib/db'
import { PreOrder } from '../../../lib/model' // make sure models.ts exists

export async function POST(request: Request) {
  await connectDB()
  const body = await request.json()
  const { artisanId, specs, quantity, customerName, customerEmail } = body

  const preorder = await PreOrder.create({
    artisanId,
    specs,
    quantity,
    customerName,
    customerEmail,
    status: 'pending',
  })

  return NextResponse.json(preorder, { status: 201 })
}
