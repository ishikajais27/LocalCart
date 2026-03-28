// app/wishlist/page.tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// Wishlist lives inside OrderHistory as a tab — redirect there
export default function WishlistPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/history')
  }, [router])
  return null
}
