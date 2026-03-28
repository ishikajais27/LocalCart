// 'use client'
// import { useState, useRef, useEffect } from 'react'

// interface Result {
//   id: string
//   name: string
//   craft: string
//   location: string
//   priceRange: { min: number; max: number }
//   matchScore: number
//   aiReason: string
// }

// interface Message {
//   role: 'user' | 'bot'
//   text?: string
//   results?: Result[]
//   loading?: boolean
// }

// export default function RecommendBot({ onClose }: { onClose: () => void }) {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: 'bot',
//       text: '👋 Hi! I can help you find the perfect local stall or product. Try asking me something like "gift under ₹500 for my mom" or "handmade jewellery near me"!',
//     },
//   ])
//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)
//   const bottomRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages])

//   const send = async () => {
//     const q = input.trim()
//     if (!q || loading) return
//     setInput('')
//     setMessages((prev) => [
//       ...prev,
//       { role: 'user', text: q },
//       { role: 'bot', loading: true },
//     ])
//     setLoading(true)
//     try {
//       const res = await fetch('/api/recommend', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: q }),
//       })
//       const data = await res.json()
//       setMessages((prev) => {
//         const updated = [...prev]
//         updated[updated.length - 1] = {
//           role: 'bot',
//           text:
//             data.totalMatches > 0
//               ? `Found ${data.totalMatches} match${data.totalMatches !== 1 ? 'es' : ''} for "${data.query}":`
//               : `Sorry, I couldn't find anything for "${data.query}". Try a different search!`,
//           results: data.results?.length > 0 ? data.results : undefined,
//         }
//         return updated
//       })
//     } catch {
//       setMessages((prev) => {
//         const updated = [...prev]
//         updated[updated.length - 1] = {
//           role: 'bot',
//           text: '❌ Something went wrong. Please try again.',
//         }
//         return updated
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <style>{`
//         .bot-overlay { position: fixed; inset: 0; z-index: 500; display: flex; align-items: flex-end; justify-content: flex-end; padding: 24px; pointer-events: none; }
//         .bot-box { pointer-events: all; width: 380px; max-width: calc(100vw - 32px); height: 560px; max-height: calc(100vh - 100px); background: #fff; border-radius: 22px; box-shadow: 0 24px 80px rgba(26,18,8,0.18), 0 4px 20px rgba(26,18,8,0.08); display: flex; flex-direction: column; overflow: hidden; animation: botSlide 0.3s cubic-bezier(0.22,1,0.36,1); }
//         @keyframes botSlide { from { opacity:0; transform:translateY(24px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
//         .bot-head { background: linear-gradient(135deg,#FF6B2B 0%,#e85d20 100%); padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
//         .bot-head-left { display: flex; align-items: center; gap: 10px; }
//         .bot-avatar { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 18px; }
//         .bot-title { font-family: 'Syne',sans-serif; font-size: 15px; font-weight: 800; color: #fff; }
//         .bot-sub { font-size: 11px; color: rgba(255,255,255,0.8); font-family: 'DM Sans',sans-serif; }
//         .bot-close { background: rgba(255,255,255,0.2); border: none; border-radius: 50%; width: 30px; height: 30px; color: #fff; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
//         .bot-close:hover { background: rgba(255,255,255,0.35); }
//         .bot-msgs { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; background: #FFF8F0; }
//         .bot-msgs::-webkit-scrollbar { width: 4px; }
//         .bot-msgs::-webkit-scrollbar-thumb { background: #F0E6D9; border-radius: 4px; }
//         .bot-bubble-wrap { display: flex; flex-direction: column; }
//         .bot-bubble-wrap.user { align-items: flex-end; }
//         .bot-bubble-wrap.bot { align-items: flex-start; }
//         .bot-bubble { max-width: 88%; padding: 10px 14px; border-radius: 16px; font-size: 13px; line-height: 1.55; font-family: 'DM Sans',sans-serif; }
//         .bot-bubble.user { background: #FF6B2B; color: #fff; border-bottom-right-radius: 4px; }
//         .bot-bubble.bot { background: #fff; color: #1A1208; border: 1px solid #F0E6D9; border-bottom-left-radius: 4px; box-shadow: 0 2px 8px rgba(26,18,8,0.05); }
//         .bot-loading { display: flex; gap: 4px; align-items: center; padding: 4px 2px; }
//         .bot-dot { width: 7px; height: 7px; border-radius: 50%; background: #C4A882; animation: botBounce 1.2s infinite; }
//         .bot-dot:nth-child(2) { animation-delay: 0.2s; }
//         .bot-dot:nth-child(3) { animation-delay: 0.4s; }
//         @keyframes botBounce { 0%,80%,100% { transform:translateY(0); opacity:0.5; } 40% { transform:translateY(-6px); opacity:1; } }
//         .bot-result-card { background: #fff; border: 1px solid #F0E6D9; border-radius: 12px; padding: 12px 14px; margin-top: 8px; width: 100%; box-shadow: 0 2px 8px rgba(26,18,8,0.05); }
//         .bot-result-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
//         .bot-result-name { font-family: 'Syne',sans-serif; font-size: 14px; font-weight: 700; color: #1A1208; }
//         .bot-result-score { background: #dcfce7; color: #16a34a; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; font-family: 'DM Sans',sans-serif; }
//         .bot-result-craft { font-size: 12px; color: #FF6B2B; font-weight: 600; font-family: 'DM Sans',sans-serif; margin-bottom: 4px; }
//         .bot-result-loc { font-size: 11px; color: #8B7355; font-family: 'DM Sans',sans-serif; margin-bottom: 6px; }
//         .bot-result-price { font-size: 12px; color: #1A1208; font-weight: 700; font-family: 'DM Sans',sans-serif; margin-bottom: 6px; }
//         .bot-result-reason { font-size: 11px; color: #6B7A60; font-family: 'DM Sans',sans-serif; line-height: 1.5; background: #F5FFF7; border-radius: 8px; padding: 6px 10px; border-left: 3px solid #4CAF50; }
//         .bot-input-row { display: flex; gap: 8px; padding: 12px 14px; border-top: 1px solid #F0E6D9; background: #fff; flex-shrink: 0; }
//         .bot-input { flex: 1; border: 1.5px solid #F0E6D9; border-radius: 12px; padding: 10px 14px; font-size: 13px; font-family: 'DM Sans',sans-serif; color: #1A1208; outline: none; background: #FFF8F0; transition: border-color 0.2s; }
//         .bot-input:focus { border-color: #FF6B2B; background: #fff; }
//         .bot-input::placeholder { color: #C4A882; }
//         .bot-send { background: #FF6B2B; border: none; border-radius: 12px; width: 40px; height: 40px; color: #fff; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s, transform 0.15s; }
//         .bot-send:hover { background: #e85d20; transform: scale(1.05); }
//         .bot-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
//         .bot-chips { display: flex; gap: 6px; flex-wrap: wrap; padding: 0 14px 10px; background: #fff; }
//         .bot-chip { background: #FFF0E6; color: #FF6B2B; border: 1px solid rgba(255,107,43,0.25); border-radius: 20px; padding: '5px 12px'; font-size: 11px; font-weight: 600; cursor: pointer; font-family: 'DM Sans',sans-serif; white-space: nowrap; transition: background 0.15s; padding: 5px 12px; }
//         .bot-chip:hover { background: #FFE4D6; }
//       `}</style>

//       <div className="bot-overlay">
//         <div className="bot-box">
//           <div className="bot-head">
//             <div className="bot-head-left">
//               <div className="bot-avatar">🤖</div>
//               <div>
//                 <div className="bot-title">LocalCart AI</div>
//                 <div className="bot-sub">Find the perfect local stall</div>
//               </div>
//             </div>
//             <button className="bot-close" onClick={onClose}>
//               ✕
//             </button>
//           </div>

//           <div className="bot-msgs">
//             {messages.map((msg, i) => (
//               <div key={i} className={`bot-bubble-wrap ${msg.role}`}>
//                 <div className={`bot-bubble ${msg.role}`}>
//                   {msg.loading ? (
//                     <div className="bot-loading">
//                       <div className="bot-dot" />
//                       <div className="bot-dot" />
//                       <div className="bot-dot" />
//                     </div>
//                   ) : (
//                     msg.text
//                   )}
//                 </div>
//                 {msg.results?.map((r) => (
//                   <div key={r.id} className="bot-result-card">
//                     <div className="bot-result-top">
//                       <span className="bot-result-name">{r.name}</span>
//                       <span className="bot-result-score">
//                         {r.matchScore}% match
//                       </span>
//                     </div>
//                     <div className="bot-result-craft">{r.craft}</div>
//                     <div className="bot-result-loc">📍 {r.location}</div>
//                     <div className="bot-result-price">
//                       ₹{r.priceRange.min} – ₹{r.priceRange.max}
//                     </div>
//                     <div className="bot-result-reason">💡 {r.aiReason}</div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//             <div ref={bottomRef} />
//           </div>

//           <div className="bot-chips">
//             {[
//               'gift under ₹500',
//               'handmade jewellery',
//               'organic food',
//               'pottery near me',
//             ].map((chip) => (
//               <button
//                 key={chip}
//                 className="bot-chip"
//                 onClick={() => {
//                   setInput(chip)
//                 }}
//               >
//                 {chip}
//               </button>
//             ))}
//           </div>

//           <div className="bot-input-row">
//             <input
//               className="bot-input"
//               placeholder="Ask me anything..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && send()}
//             />
//             <button
//               className="bot-send"
//               onClick={send}
//               disabled={loading || !input.trim()}
//             >
//               ➤
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
'use client'
import { useState, useRef, useEffect } from 'react'

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

export default function RecommendBot({ onClose }: { onClose: () => void }) {
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
    <>
      <style>{`
        .bot-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
 backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .bot-container {
          width: 420px;
          max-width: calc(100vw - 32px);
          height: 600px;
          max-height: calc(100vh - 80px);
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .bot-head {
          background: linear-gradient(135deg, #FF6B2B 0%, #e85d20 100%);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .bot-head-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bot-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .bot-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 800;
          color: #fff;
        }
        .bot-sub {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.8);
          font-family: 'DM Sans', sans-serif;
        }
        .bot-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .bot-close:hover {
          background: rgba(255, 255, 255, 0.35);
        }
        .bot-msgs {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #FFF8F0;
        }
        .bot-msgs::-webkit-scrollbar {
          width: 4px;
        }
        .bot-msgs::-webkit-scrollbar-thumb {
          background: #F0E6D9;
          border-radius: 4px;
        }
        .bot-bubble-wrap {
          display: flex;
          flex-direction: column;
        }
        .bot-bubble-wrap.user {
          align-items: flex-end;
        }
        .bot-bubble-wrap.bot {
          align-items: flex-start;
        }
        .bot-bubble {
          max-width: 88%;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 13px;
          line-height: 1.55;
          font-family: 'DM Sans', sans-serif;
        }
        .bot-bubble.user {
          background: #FF6B2B;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .bot-bubble.bot {
          background: #fff;
          color: #1A1208;
          border: 1px solid #F0E6D9;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 8px rgba(26, 18, 8, 0.05);
        }
        .bot-loading {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 4px 2px;
        }
        .bot-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #C4A882;
          animation: botBounce 1.2s infinite;
        }
        .bot-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .bot-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes botBounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          40% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
        .bot-result-card {
          background: #fff;
          border: 1px solid #F0E6D9;
          border-radius: 12px;
          padding: 12px 14px;
          margin-top: 8px;
          width: 100%;
          box-shadow: 0 2px 8px rgba(26, 18, 8, 0.05);
        }
        .bot-result-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .bot-result-name {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #1A1208;
        }
        .bot-result-score {
          background: #dcfce7;
          color: #16a34a;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 20px;
          font-family: 'DM Sans', sans-serif;
        }
        .bot-result-craft {
          font-size: 12px;
          color: #FF6B2B;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 4px;
        }
        .bot-result-loc {
          font-size: 11px;
          color: #8B7355;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 6px;
        }
        .bot-result-price {
          font-size: 12px;
          color: #1A1208;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 6px;
        }
        .bot-result-reason {
          font-size: 11px;
          color: #6B7A60;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.5;
          background: #F5FFF7;
          border-radius: 8px;
          padding: 6px 10px;
          border-left: 3px solid #4CAF50;
        }
        .bot-input-row {
          display: flex;
          gap: 8px;
          padding: 12px 14px;
          border-top: 1px solid #F0E6D9;
          background: #fff;
          flex-shrink: 0;
        }
        .bot-input {
          flex: 1;
          border: 1.5px solid #F0E6D9;
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          color: #1A1208;
          outline: none;
          background: #FFF8F0;
          transition: border-color 0.2s;
        }
        .bot-input:focus {
          border-color: #FF6B2B;
          background: #fff;
        }
        .bot-input::placeholder {
          color: #C4A882;
        }
        .bot-send {
          background: #FF6B2B;
          border: none;
          border-radius: 12px;
          width: 40px;
          height: 40px;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.15s;
        }
        .bot-send:hover {
          background: #e85d20;
          transform: scale(1.05);
        }
        .bot-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .bot-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          padding: 0 14px 10px;
          background: #fff;
        }
        .bot-chip {
          background: #FFF0E6;
          color: #FF6B2B;
          border: 1px solid rgba(255, 107, 43, 0.25);
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          transition: background 0.15s;
          padding: 5px 12px;
        }
        .bot-chip:hover {
          background: #FFE4D6;
        }
      `}</style>

      <div className="bot-modal-overlay" onClick={onClose}>
        <div className="bot-container" onClick={(e) => e.stopPropagation()}>
          <div className="bot-head">
            <div className="bot-head-left">
              <div className="bot-avatar">🤖</div>
              <div>
                <div className="bot-title">LocalCart AI</div>
                <div className="bot-sub">Find the perfect local stall</div>
              </div>
            </div>
            <button className="bot-close" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="bot-msgs">
            {messages.map((msg, i) => (
              <div key={i} className={`bot-bubble-wrap ${msg.role}`}>
                <div className={`bot-bubble ${msg.role}`}>
                  {msg.loading ? (
                    <div className="bot-loading">
                      <div className="bot-dot" />
                      <div className="bot-dot" />
                      <div className="bot-dot" />
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
                {msg.results?.map((r) => (
                  <div key={r.id} className="bot-result-card">
                    <div className="bot-result-top">
                      <span className="bot-result-name">{r.name}</span>
                      <span className="bot-result-score">
                        {r.matchScore}% match
                      </span>
                    </div>
                    <div className="bot-result-craft">{r.craft}</div>
                    <div className="bot-result-loc">📍 {r.location}</div>
                    <div className="bot-result-price">
                      ₹{r.priceRange.min} – ₹{r.priceRange.max}
                    </div>
                    <div className="bot-result-reason">💡 {r.aiReason}</div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="bot-chips">
            {[
              'gift under ₹500',
              'handmade jewellery',
              'organic food',
              'pottery near me',
            ].map((chip) => (
              <button
                key={chip}
                className="bot-chip"
                onClick={() => {
                  setInput(chip)
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="bot-input-row">
            <input
              className="bot-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button
              className="bot-send"
              onClick={send}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
