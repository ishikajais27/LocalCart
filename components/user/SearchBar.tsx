'use client'
import { useState } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  location: string
  onLocationChange: (v: string) => void
}

export default function SearchBar({
  value,
  onChange,
  location,
  onLocationChange,
}: Props) {
  const [editingLoc, setEditingLoc] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#fff',
          border: '2px solid #F0E6D9',
          borderRadius: 12,
          padding: '10px 16px',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 16 }}>📍</span>
        {editingLoc ? (
          <input
            autoFocus
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 14,
              fontFamily: 'DM Sans, sans-serif',
              flex: 1,
              color: '#1A1208',
              background: 'transparent',
            }}
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            onBlur={() => setEditingLoc(false)}
            placeholder="Enter your area..."
          />
        ) : (
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: '#1A1208',
              cursor: 'pointer',
            }}
            onClick={() => setEditingLoc(true)}
          >
            {location || 'Set location'}{' '}
            <span style={{ color: '#FF6B2B', fontSize: 11 }}>▼</span>
          </span>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#fff',
          border: '2px solid #F0E6D9',
          borderRadius: 12,
          padding: '12px 16px',
          boxShadow: '0 2px 12px rgba(26,18,8,0.06)',
        }}
      >
        <span style={{ fontSize: 18, color: '#C4A882' }}>🔍</span>
        <input
          style={{
            border: 'none',
            outline: 'none',
            fontSize: 15,
            fontFamily: 'DM Sans, sans-serif',
            flex: 1,
            color: '#1A1208',
            background: 'transparent',
          }}
          placeholder="Search stalls, products, gifts…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <span
            style={{ color: '#8B7355', cursor: 'pointer', fontSize: 14 }}
            onClick={() => onChange('')}
          >
            ✕
          </span>
        )}
      </div>
    </div>
  )
}
