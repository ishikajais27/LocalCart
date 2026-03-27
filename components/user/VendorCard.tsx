'use client'
import { useRouter } from 'next/navigation'

export default function VendorCard({ stall }: { stall: any }) {
  const router = useRouter()

  return (
    <div
      className="card"
      style={{ cursor: 'pointer' }}
      onClick={() => router.push(`/vendors/${stall.id}`)}
    >
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img
          src={stall.image}
          alt={stall.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 20,
            background: stall.isOpen ? '#dcfce7' : '#fee2e2',
            color: stall.isOpen ? '#16a34a' : '#dc2626',
          }}
        >
          {stall.isOpen ? '● Open' : '● Closed'}
        </div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 4,
          }}
        >
          <h3
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 16,
              fontWeight: 700,
              color: '#1A1208',
              flex: 1,
              marginRight: 8,
            }}
          >
            {stall.name}
          </h3>
          <div style={{ fontSize: 13, fontWeight: 600 }}>⭐ {stall.rating}</div>
        </div>
        <p style={{ fontSize: 12, color: '#8B7355', marginBottom: 10 }}>
          📍 {stall.location} · {stall.distance}
        </p>
        <div
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            marginBottom: 12,
          }}
        >
          {stall.tags.map((t: string) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#8B7355' }}>
            🕐 {stall.deliveryTime}
          </span>
          <span style={{ fontSize: 12, color: '#8B7355' }}>
            Min ₹{stall.minOrder}
          </span>
        </div>
      </div>
    </div>
  )
}
