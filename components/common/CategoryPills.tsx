'use client'
import { CATEGORIES } from '@/lib/mockData'

interface Props {
  selected: string
  onChange: (id: string) => void
}

export default function CategoryPills({ selected, onChange }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        overflowX: 'auto',
        paddingBottom: 4,
        scrollbarWidth: 'none',
      }}
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 50,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'DM Sans, sans-serif',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
            background: selected === cat.id ? '#FF6B2B' : '#fff',
            color: selected === cat.id ? '#fff' : '#1A1208',
            border: `2px solid ${selected === cat.id ? '#FF6B2B' : '#F0E6D9'}`,
          }}
        >
          <span>{cat.emoji}</span> {cat.label}
        </button>
      ))}
    </div>
  )
}
