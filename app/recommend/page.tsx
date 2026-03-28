'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import UserHeader from '@/components/user/UserHeader'
import { motion, AnimatePresence, Variants } from 'framer-motion'

interface Result {
  id: string
  name: string
  craft: string
  location: string
  priceRange: { min: number; max: number }
  matchScore: number
  aiReason: string
}

interface Message {
  role: 'user' | 'bot'
  text?: string
  results?: Result[]
  loading?: boolean
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function RecommendPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: '👋 Hi! I can help you find the perfect local stall or product. Try asking me something like "gift under ₹500 for my mom" or "handmade jewellery near me"!',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: q },
      { role: 'bot', loading: true },
    ])
    setLoading(true)
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      const data = await res.json()
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'bot',
          text:
            data.totalMatches > 0
              ? `Found ${data.totalMatches} match${data.totalMatches !== 1 ? 'es' : ''} for "${data.query}":`
              : `Sorry, I couldn't find anything for "${data.query}". Try a different search!`,
          results: data.results?.length > 0 ? data.results : undefined,
        }
        return updated
      })
    } catch {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'bot',
          text: '❌ Something went wrong. Please try again.',
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #EEF7F1 0%, #F5FBF7 45%, #ffffff 100%)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Animated background blobs */}
      <motion.svg
        className="absolute top-0 right-0 pointer-events-none"
        style={{ width: 420, height: 420, opacity: 0 }}
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          opacity: 0.28,
          y: [0, -18, 0, 10, 0],
          x: [0, 8, 0, -6, 0],
          rotate: [0, 3, -2, 1, 0],
        }}
        transition={{
          opacity: { duration: 1.2 },
          y: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <motion.path
          fill="#7BAE8C"
          animate={{
            d: [
              'M320,80 Q380,140 360,220 Q340,300 260,340 Q180,380 120,320 Q60,260 80,180 Q100,100 180,60 Q260,20 320,80Z',
              'M310,70 Q390,150 355,230 Q325,310 250,345 Q175,380 115,315 Q55,250 85,170 Q110,95 190,55 Q270,15 310,70Z',
              'M320,80 Q380,140 360,220 Q340,300 260,340 Q180,380 120,320 Q60,260 80,180 Q100,100 180,60 Q260,20 320,80Z',
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>

      <motion.svg
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{ width: 300, height: 300 }}
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.18,
          y: [0, 14, 0, -10, 0],
          x: [0, -8, 0, 6, 0],
        }}
        transition={{
          opacity: { duration: 1.4, delay: 0.3 },
          y: { duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          x: { duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 },
        }}
      >
        <path
          d="M240,60 Q290,120 270,190 Q250,260 180,280 Q110,300 60,240 Q10,180 40,110 Q70,40 150,30 Q230,20 240,60Z"
          fill="#A8D5B5"
        />
      </motion.svg>

      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: 96,
          left: 32,
          width: 96,
          height: 96,
          background: '#7BAE8C',
        }}
        animate={{ opacity: [0.08, 0.17, 0.08], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <UserHeader />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6"
        >
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B9A7A] hover:text-[#4E9A6A] transition-colors mb-4"
          >
            ← Back
          </button>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#1C3829',
            }}
          >
            AI Assistant
          </h1>
          <p className="text-sm text-[#6B9A7A] mt-1">
            Find the perfect local stall or product
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl shadow-lg border border-[#E0EFE4] overflow-hidden flex flex-col"
          style={{ height: 'calc(100vh - 220px)', minHeight: 500 }}
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FFF8F0]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-[#FF6B2B] text-white rounded-br-none'
                      : 'bg-white text-[#1A1208] border border-[#F0E6D9] rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.loading ? (
                    <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 rounded-full bg-[#C4A882] animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-[#C4A882] animate-bounce delay-150" />
                      <div className="w-2 h-2 rounded-full bg-[#C4A882] animate-bounce delay-300" />
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
                {msg.results?.map((r) => (
                  <div
                    key={r.id}
                    className="mt-2 w-full bg-white rounded-xl border border-[#F0E6D9] p-3 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-[#1A1208] font-serif">
                        {r.name}
                      </span>
                      <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {r.matchScore}% match
                      </span>
                    </div>
                    <div className="text-sm text-[#FF6B2B] font-medium mb-1">
                      {r.craft}
                    </div>
                    <div className="text-xs text-[#8B7355] mb-1">
                      📍 {r.location}
                    </div>
                    <div className="text-sm font-bold mb-2">
                      ₹{r.priceRange.min} – ₹{r.priceRange.max}
                    </div>
                    <div className="text-xs bg-[#F5FFF7] p-2 rounded border-l-4 border-green-500">
                      💡 {r.aiReason}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-[#F0E6D9] p-3 bg-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                'gift under ₹500',
                'handmade jewellery',
                'organic food',
                'pottery near me',
              ].map((chip) => (
                <button
                  key={chip}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#FFF0E6] text-[#FF6B2B] border border-[rgba(255,107,43,0.25)] hover:bg-[#FFE4D6] transition"
                  onClick={() => setInput(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 border-2 border-[#F0E6D9] rounded-xl px-4 py-2 text-sm focus:border-[#FF6B2B] focus:outline-none bg-[#FFF8F0]"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
              />
              <button
                className="bg-[#FF6B2B] text-white rounded-xl px-5 py-2 font-semibold hover:bg-[#e85d20] transition disabled:opacity-50"
                onClick={send}
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
