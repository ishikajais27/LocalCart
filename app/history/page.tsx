// app/history/page.tsx  (also handles /wishlist via tab state)
import OrderHistory from '@/components/user/OrderHistory'
import { Suspense } from 'react'
// export default function HistoryPage() {
//   return <OrderHistory />
// }
export default function HistoryPage() {
  return (
    <Suspense fallback={null}>
      <OrderHistory />
    </Suspense>
  )
}
