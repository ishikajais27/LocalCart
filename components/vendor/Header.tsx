// 'use client'
// import { useAuth } from '../../lib/authContext'
// import { useRouter } from 'next/navigation'

// const TABS = [
//   { id: 'orders', label: '📦 Orders' },
//   { id: 'stall', label: '🏪 My Stall' },
//   { id: 'add', label: '➕ Add Products' },
//   { id: 'reviews', label: '⭐ Reviews' },
// ]

// export default function VendorHeader({
//   activeTab,
//   onTabChange,
// }: {
//   activeTab: string
//   onTabChange: (t: string) => void
// }) {
//   const { user, logout } = useAuth()
//   const router = useRouter()

//   return (
//     <header
//       style={{
//         background: '#fff',
//         borderBottom: '1px solid #F0E6D9',
//         position: 'sticky',
//         top: 0,
//         zIndex: 100,
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 1200,
//           margin: '0 auto',
//           padding: '0 24px',
//           height: 60,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}
//       >
//         <div
//           style={{
//             fontFamily: 'Syne, sans-serif',
//             fontWeight: 800,
//             fontSize: 18,
//             color: '#FF6B2B',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 8,
//           }}
//         >
//           🛍️ GullyMarket{' '}
//           <span
//             style={{
//               background: '#1A1208',
//               color: '#FF6B2B',
//               fontSize: 10,
//               fontWeight: 700,
//               padding: '2px 8px',
//               borderRadius: 4,
//               letterSpacing: 1,
//             }}
//           >
//             Vendor
//           </span>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
//           <span style={{ fontSize: 14, fontWeight: 500, color: '#1A1208' }}>
//             {user?.name}
//           </span>
//           <button
//             style={{
//               background: 'none',
//               border: '1.5px solid #F0E6D9',
//               borderRadius: 8,
//               padding: '5px 12px',
//               fontSize: 12,
//               cursor: 'pointer',
//               color: '#8B7355',
//               fontFamily: 'DM Sans, sans-serif',
//             }}
//             onClick={() => {
//               logout()
//               router.push('/account')
//             }}
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//       <div
//         style={{
//           maxWidth: 1200,
//           margin: '0 auto',
//           padding: '0 24px',
//           display: 'flex',
//         }}
//       >
//         {TABS.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => onTabChange(tab.id)}
//             style={{
//               padding: '14px 20px',
//               background: 'none',
//               border: 'none',
//               fontSize: 14,
//               cursor: 'pointer',
//               fontFamily: 'DM Sans, sans-serif',
//               transition: 'all 0.15s',
//               borderBottom: `3px solid ${activeTab === tab.id ? '#FF6B2B' : 'transparent'}`,
//               color: activeTab === tab.id ? '#FF6B2B' : '#8B7355',
//               fontWeight: activeTab === tab.id ? 700 : 400,
//             }}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
//     </header>
//   )
// }
'use client'
import { useAuth } from '../../lib/authContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  HiOutlineShoppingBag,
  HiOutlineArchiveBox,
  HiOutlineBuildingStorefront,
  HiOutlinePlusCircle,
  HiOutlineStar,
  HiArrowRightOnRectangle,
  HiBars3,
  HiXMark,
} from 'react-icons/hi2'

const TABS = [
  { id: 'orders', label: 'Orders', Icon: HiOutlineArchiveBox },
  { id: 'stall', label: 'My Stall', Icon: HiOutlineBuildingStorefront },
  { id: 'add', label: 'Add Products', Icon: HiOutlinePlusCircle },
  { id: 'reviews', label: 'Reviews', Icon: HiOutlineStar },
]

export default function VendorHeader({
  activeTab,
  onTabChange,
}: {
  activeTab: string
  onTabChange: (t: string) => void
}) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const initials = user?.name?.charAt(0)?.toUpperCase() || 'V'

  const handleTabChange = (id: string) => {
    onTabChange(id)
    setMobileMenuOpen(false)
  }

  const handleSignOut = () => {
    logout()
    router.push('/account')
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .vh-header {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(180,220,195,0.45);
          position: sticky;
          top: 0;
          z-index: 200;
          box-shadow: 0 1px 0 rgba(180,220,195,0.35), 0 4px 32px rgba(30,80,50,0.06);
        }

        /* ── Top bar ── */
        .vh-topbar {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Logo */
        .vh-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          flex-shrink: 0;
          text-decoration: none;
          transition: opacity 0.18s ease;
        }
        .vh-logo:hover { opacity: 0.8; }
        .vh-logo-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: linear-gradient(135deg, #3A8F5C 0%, #5BB87A 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 10px rgba(58,143,92,0.32);
          flex-shrink: 0;
        }
        .vh-logo-word {
          font-family: 'Syne','DM Sans',sans-serif;
          font-weight: 800; font-size: 17px; letter-spacing: -0.5px;
          background: linear-gradient(135deg, #2D7A4A 0%, #4EA86A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .vh-badge {
          background: linear-gradient(135deg, #2D7A4A 0%, #3A8F5C 100%);
          color: #fff;
          font-size: 9px; font-weight: 800;
          padding: 2px 7px; border-radius: 5px;
          letter-spacing: 0.1em; font-family: 'DM Sans',sans-serif;
          text-transform: uppercase;
          box-shadow: 0 2px 6px rgba(58,143,92,0.28);
        }

        /* Divider */
        .vh-div {
          width: 1px; height: 20px; flex-shrink: 0;
          background: linear-gradient(to bottom, transparent, rgba(160,210,180,0.7), transparent);
        }

        /* Right side */
        .vh-right {
          margin-left: auto;
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .vh-username {
          font-size: 13px; font-weight: 600; color: #1A3325;
          font-family: 'DM Sans',sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 120px;
        }
        .vh-av {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, #3A8F5C 0%, #5BB87A 100%);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 800; font-size: 13px;
          font-family: 'DM Sans',sans-serif;
          box-shadow: 0 3px 12px rgba(58,143,92,0.35);
          border: 2px solid rgba(255,255,255,0.6);
          flex-shrink: 0;
          cursor: default;
        }
        .vh-signout {
          display: flex; align-items: center; gap: 6px;
          background: none;
          border: 1.5px solid rgba(160,210,180,0.6);
          border-radius: 10px;
          padding: 6px 12px;
          font-size: 12px; font-weight: 600;
          cursor: pointer; color: #6B9A7A;
          font-family: 'DM Sans',sans-serif;
          transition: border-color 0.2s, background 0.2s, color 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .vh-signout:hover {
          border-color: #dc2626;
          background: #fff5f5;
          color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220,38,38,0.07);
        }

        /* Hamburger button */
        .vh-hamburger {
          display: none;
          align-items: center; justify-content: center;
          background: none; border: 1.5px solid rgba(160,210,180,0.5);
          border-radius: 9px; padding: 6px;
          cursor: pointer; color: #4E9A6A;
          transition: background 0.18s, border-color 0.18s;
          flex-shrink: 0;
        }
        .vh-hamburger:hover { background: rgba(238,247,241,0.7); border-color: #7BAE8C; }

        /* ── Desktop Tab bar ── */
        .vh-tabbar {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          border-top: 1px solid rgba(180,220,195,0.3);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .vh-tabbar::-webkit-scrollbar { display: none; }

        .vh-tab {
          display: flex; align-items: center; gap: 7px;
          padding: 10px 16px;
          background: none; border: none;
          font-size: 13px; font-weight: 500;
          cursor: pointer;
          font-family: 'DM Sans',sans-serif;
          color: #7BAA8A;
          border-bottom: 2.5px solid transparent;
          margin-bottom: -1px;
          transition: color 0.18s, border-color 0.18s, background 0.18s;
          border-radius: 8px 8px 0 0;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .vh-tab:hover {
          color: #2D7A4A;
          background: rgba(240,252,245,0.6);
        }
        .vh-tab.active {
          color: #2D7A4A;
          font-weight: 700;
          border-bottom-color: #3A8F5C;
          background: rgba(234,246,238,0.5);
        }

        /* ── Mobile drawer ── */
        .vh-drawer-overlay {
          display: none;
          position: fixed; inset: 0; z-index: 150;
          background: rgba(10,30,20,0.35);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          animation: vhFadeIn 0.18s ease;
        }
        .vh-drawer-overlay.open { display: block; }
        @keyframes vhFadeIn { from { opacity:0 } to { opacity:1 } }

        .vh-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(280px, 85vw);
          background: #fff;
          z-index: 160;
          display: flex; flex-direction: column;
          box-shadow: -8px 0 40px rgba(10,40,20,0.18);
          transform: translateX(100%);
          transition: transform 0.26s cubic-bezier(0.22,1,0.36,1);
        }
        .vh-drawer.open { transform: translateX(0); }

        .vh-drawer-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px 14px;
          border-bottom: 1px solid rgba(180,220,195,0.4);
        }
        .vh-drawer-user {
          display: flex; align-items: center; gap: 10px;
        }
        .vh-drawer-close {
          background: none; border: 1.5px solid #D4EDD9;
          border-radius: 8px; padding: 5px; cursor: pointer;
          color: #7BAE8C; display: flex; align-items: center;
          transition: background 0.15s;
        }
        .vh-drawer-close:hover { background: #EEF7F1; }

        .vh-drawer-nav {
          flex: 1; padding: 12px 12px;
          display: flex; flex-direction: column; gap: 4px;
          overflow-y: auto;
        }
        .vh-drawer-tab {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 16px; border-radius: 12px;
          background: none; border: none;
          font-size: 14px; font-weight: 500;
          font-family: 'DM Sans',sans-serif;
          color: #4E7A5E; cursor: pointer;
          text-align: left; width: 100%;
          transition: background 0.15s, color 0.15s;
        }
        .vh-drawer-tab:hover { background: #EEF7F1; color: #1C3829; }
        .vh-drawer-tab.active {
          background: linear-gradient(135deg, #EEF7F1, #D4EDD9);
          color: #1C3829; font-weight: 700;
        }

        .vh-drawer-footer {
          padding: 16px 20px 24px;
          border-top: 1px solid rgba(180,220,195,0.35);
        }
        .vh-drawer-signout {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: none; border: 1.5px solid rgba(160,210,180,0.6);
          border-radius: 12px; padding: 11px;
          font-size: 13px; font-weight: 600;
          cursor: pointer; color: #6B9A7A;
          font-family: 'DM Sans',sans-serif;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .vh-drawer-signout:hover {
          border-color: #dc2626; background: #fff5f5; color: #dc2626;
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 768px) {
          .vh-hamburger { display: flex; }
          .vh-signout { display: none; }
          .vh-tabbar { display: none; }
          .vh-div { display: none; }
          .vh-username { display: none; }
        }

        @media (max-width: 480px) {
          .vh-topbar { padding: 0 16px; height: 56px; }
          .vh-logo-word { font-size: 15px; }
          .vh-badge { display: none; }
        }
      `}</style>

      <header className="vh-header">
        {/* ── Top bar ── */}
        <div className="vh-topbar">
          <div className="vh-logo" onClick={() => router.push('/search')}>
            <div className="vh-logo-icon">
              <HiOutlineShoppingBag size={16} color="#fff" />
            </div>
            <span className="vh-logo-word">GullyMarket</span>
            <span className="vh-badge">Vendor</span>
          </div>

          <div className="vh-div" />

          <div className="vh-right">
            <span className="vh-username">{user?.name}</span>
            <div className="vh-av">{initials}</div>

            <button className="vh-signout" onClick={handleSignOut}>
              <HiArrowRightOnRectangle size={14} />
              Sign Out
            </button>

            <button
              className="vh-hamburger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <HiBars3 size={20} />
            </button>
          </div>
        </div>

        {/* ── Desktop Tab bar ── */}
        <div className="vh-tabbar">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`vh-tab${activeTab === id ? ' active' : ''}`}
              onClick={() => onTabChange(id)}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        className={`vh-drawer-overlay${mobileMenuOpen ? ' open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`vh-drawer${mobileMenuOpen ? ' open' : ''}`}>
        <div className="vh-drawer-head">
          <div className="vh-drawer-user">
            <div className="vh-av">{initials}</div>
            <div>
              <p
                style={{
                  fontFamily: 'DM Sans,sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#1A3325',
                  margin: 0,
                }}
              >
                {user?.name}
              </p>
              <p
                style={{
                  fontFamily: 'DM Sans,sans-serif',
                  fontSize: 11,
                  color: '#7BAE8C',
                  margin: 0,
                }}
              >
                Vendor Account
              </p>
            </div>
          </div>
          <button
            className="vh-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
          >
            <HiXMark size={18} />
          </button>
        </div>

        <nav className="vh-drawer-nav">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`vh-drawer-tab${activeTab === id ? ' active' : ''}`}
              onClick={() => handleTabChange(id)}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="vh-drawer-footer">
          <button className="vh-drawer-signout" onClick={handleSignOut}>
            <HiArrowRightOnRectangle size={15} />
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}
