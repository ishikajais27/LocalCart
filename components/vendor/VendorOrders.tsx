import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function VendorOrders() {
  const { data: session } = useSession()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchOrders()
    }
  }, [session])

  const fetchOrders = async () => {
    const res = await fetch('/api/orders')
    const data = await res.json()
    setOrders(data)
    setLoading(false)
  }

  if (loading) return <div>Loading orders...</div>

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Orders Received</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order._id} className="border rounded p-4">
              <p>
                <strong>Product:</strong> {order.productId}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Customization:</strong> {order.customization || 'None'}
              </p>
              <p>
                <strong>Order Type:</strong> {order.orderType}
              </p>
              <p>
                <strong>Delivery Slot:</strong> {order.deliverySlot}
              </p>
              <p>
                <strong>Address:</strong> {order.address}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Customer:</strong> {order.userId?.name} (
                {order.userId?.email})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
