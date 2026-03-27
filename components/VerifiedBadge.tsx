interface VerifiedBadgeProps {
  verified: boolean
  size?: 'sm' | 'md'
  showLabel?: boolean
}

export default function VerifiedBadge({
  verified,
  size = 'sm',
  showLabel = true,
}: VerifiedBadgeProps) {
  if (!verified) return null

  return (
    <span
      className={`inline-flex items-center gap-1 bg-neem-green text-white font-medium rounded-full ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      }`}
      title="Verified by KarigarMart team via ground check"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        className="flex-shrink-0"
      >
        <path
          d="M2 6L5 9L10 3"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showLabel && 'Verified'}
    </span>
  )
}
