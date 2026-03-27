'use client'

import { PreOrderForm } from '../../../components/PreorderForm'
import { useParams } from 'next/navigation'

export default function PreOrderPage() {
  const { artisanId } = useParams()

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Place a Pre-order</h1>
      <PreOrderForm artisanId={artisanId as string} />
    </main>
  )
}
