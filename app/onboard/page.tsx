'use client'

import { VendorOnboardForm } from '../../components/VendorOnboardForm'

export default function OnboardPage() {
  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Become a Vendor</h1>
      <VendorOnboardForm />
    </main>
  )
}
