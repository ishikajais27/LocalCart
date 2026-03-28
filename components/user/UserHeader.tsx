'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { BBSR_LOCATIONS } from '@/lib/mockData'
import { useAuth } from '@/lib/authContext'
import {
  HiOutlineHome,
  HiOutlineCube,
  HiOutlineClock,
  HiOutlineHeart,
  HiOutlineMapPin,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineChevronDown,
  HiArrowRightOnRectangle,
  HiOutlineShoppingBag,
} from 'react-icons/hi2'

export default function UserHeader() {
  const router = useRouter()
  const path = usePathname()
  const { user, logout } = useAuth()
  const [query, setQuery] = useState('')
  const [showLocationMenu, setShowLocationMenu] = useState(false)
  const [location, setLocation] = useState('KIIT Campus, Patia')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const links = [
    { label: 'Home', href: '/search', Icon: HiOutlineHome },
    { label: 'Track Order', href: '/orders', Icon: HiOutlineCube },
    { label: 'History', href: '/history', Icon: HiOutlineClock },
    { label: 'Wishlist', href: '/history?tab=wishlist', Icon: HiOutlineHeart },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  const handleLogout = () => {
    logout()
    router.push('/account')
  }

  const initials = user?.name?.charAt(0)?.toUpperCase() || 'U'

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .gm-header { background: rgba(255,255,255,0.88); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(180,220,195,0.45); padding: 0 32px; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 0 rgba(180,220,195,0.35), 0 4px 32px rgba(30,80,50,0.06); }
        .gm-inner { max-width: 1140px; margin: 0 auto; display: flex; align-items: center; gap: 14px; height: 64px; }
        .gm-logo { display: flex; align-items: center; gap: 8px; cursor: pointer; flex-shrink: 0; text-decoration: none; transition: opacity 0.18s ease; }
        .gm-logo:hover { opacity: 0.8; }
        .gm-logo-icon { width: 32px; height: 32px; border-radius: 9px; background: linear-gradient(135deg,#3A8F5C 0%,#5BB87A 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 10px rgba(58,143,92,0.32); flex-shrink: 0; }
        .gm-logo-word { font-family: 'Syne','DM Sans',sans-serif; font-weight: 800; font-size: 18px; letter-spacing: -0.6px; background: linear-gradient(135deg,#2D7A4A 0%,#4EA86A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; }
        .gm-div { width: 1px; height: 22px; flex-shrink: 0; background: linear-gradient(to bottom,transparent,rgba(160,210,180,0.7),transparent); }
        .gm-loc { position: relative; flex-shrink: 0; }
        .gm-loc-btn { display: flex; align-items: center; gap: 6px; background: rgba(240,252,245,0.8); border: 1.5px solid rgba(160,210,180,0.55); border-radius: 12px; padding: 7px 12px; cursor: pointer; max-width: 192px; transition: border-color 0.2s,background 0.2s,box-shadow 0.2s; }
        .gm-loc-btn:hover { border-color: #3A8F5C; background: rgba(230,248,237,0.9); box-shadow: 0 0 0 3px rgba(58,143,92,0.09); }
        .gm-loc-btn svg { color: #3A8F5C; flex-shrink: 0; }
        .gm-loc-text { font-size: 12px; font-weight: 600; color: #1A3325; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 118px; font-family: 'DM Sans',sans-serif; }
        .gm-loc-chev { color: #3A8F5C; flex-shrink: 0; transition: transform 0.22s cubic-bezier(0.22,1,0.36,1); }
        .gm-loc-chev.open { transform: rotate(180deg); }
        .gm-loc-drop { position: absolute; top: calc(100% + 10px); left: 0; background: #fff; border: 1px solid rgba(180,220,195,0.6); border-radius: 16px; box-shadow: 0 16px 48px rgba(30,80,50,0.13),0 2px 8px rgba(30,80,50,0.07); z-index: 300; min-width: 252px; max-height: 288px; overflow-y: auto; animation: gmDrop 0.2s cubic-bezier(0.22,1,0.36,1); }
        .gm-loc-drop-hd { padding: 11px 16px 9px; border-bottom: 1px solid rgba(180,220,195,0.5); background: linear-gradient(135deg,#F0FAF3 0%,#E6F5EC 100%); border-radius: 16px 16px 0 0; }
        .gm-loc-drop-hd p { font-size: 10px; font-weight: 800; color: #5A9E72; letter-spacing: 0.09em; font-family: 'DM Sans',sans-serif; margin: 0; text-transform: uppercase; }
        .gm-loc-item { padding: 10px 16px; cursor: pointer; font-size: 13px; font-family: 'DM Sans',sans-serif; display: flex; align-items: center; gap: 9px; transition: background 0.13s,color 0.13s; color: #1A3325; }
        .gm-loc-item:last-child { border-radius: 0 0 16px 16px; }
        .gm-loc-item.sel { color:#2D7A4A; font-weight:700; background:#EDF8F1; }
        .gm-loc-dot { width: 6px; height: 6px; border-radius: 50%; background: #3A8F5C; flex-shrink: 0; }
        .gm-search { flex: 1; max-width: 380px; display: flex; align-items: center; background: rgba(240,252,245,0.75); border: 1.5px solid rgba(160,210,180,0.55); border-radius: 12px; padding: 8px 14px; gap: 9px; transition: border-color 0.2s,box-shadow 0.2s,background 0.2s; }
        .gm-search:focus-within { border-color: #3A8F5C; background: #fff; box-shadow: 0 0 0 3px rgba(58,143,92,0.1); }
        .gm-search svg { color: #7BB893; flex-shrink: 0; transition: color 0.2s; }
        .gm-search:focus-within svg { color: #3A8F5C; }
        .gm-search input { border: none; outline: none; font-size: 13px; font-family: 'DM Sans',sans-serif; flex: 1; color: #1A3325; background: transparent; font-weight: 400; min-width: 0; }
        .gm-search input::placeholder { color: #9ABFA8; }
        .gm-search-x { display: flex; align-items: center; justify-content: center; color: #9ABFA8; cursor: pointer; padding: 3px; border-radius: 6px; transition: color 0.14s,background 0.14s; flex-shrink: 0; }
        .gm-search-x:hover { color: #2D7A4A; background: rgba(58,143,92,0.09); }
        .gm-nav { display: flex; align-items: center; gap: 2px; margin-left: auto; flex-shrink: 0; }
        .gm-nav-btn { display: flex; align-items: center; gap: 6px; background: none; border: none; border-radius: 10px; padding: 7px 11px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'DM Sans',sans-serif; white-space: nowrap; line-height: 1; transition: background 0.16s,color 0.16s,transform 0.14s; }
        .gm-nav-btn:hover { transform: translateY(-1px); }
        .gm-nav-btn.active { background: linear-gradient(135deg,#EAF6EE 0%,#D8F0E0 100%); color: #2D7A4A; box-shadow: inset 0 1px 0 rgba(255,255,255,0.9),0 1px 4px rgba(58,143,92,0.1); }
        .gm-nav-btn.inactive { color: #6B9A7A; }
        .gm-nav-btn.inactive:hover { background: #F0FAF3; color: #2D7A4A; }
        .gm-nav-btn svg { flex-shrink: 0; }
        .gm-av-wrap { position: relative; flex-shrink: 0; }
        .gm-av { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg,#3A8F5C 0%,#5BB87A 100%); display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; font-weight: 800; font-size: 13px; font-family: 'DM Sans',sans-serif; flex-shrink: 0; box-shadow: 0 3px 12px rgba(58,143,92,0.35); border: 2px solid rgba(255,255,255,0.6); transition: transform 0.16s,box-shadow 0.16s; }
        .gm-av:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(58,143,92,0.45); }
        .gm-user-drop { position: absolute; top: calc(100% + 10px); right: 0; background: #fff; border: 1px solid rgba(180,220,195,0.55); border-radius: 16px; z-index: 300; min-width: 196px; overflow: hidden; box-shadow: 0 16px 52px rgba(30,80,50,0.14),0 2px 8px rgba(30,80,50,0.06); animation: gmDrop 0.2s cubic-bezier(0.22,1,0.36,1); }
        .gm-user-hd { padding: 14px 16px 12px; border-bottom: 1px solid rgba(180,220,195,0.45); background: linear-gradient(135deg,#F0FAF3 0%,#E4F5EC 100%); }
        .gm-u-name { font-size: 13px; font-weight: 700; color: #1A3325; font-family: 'DM Sans',sans-serif; margin: 0 0 3px; }
        .gm-u-email { font-size: 11px; color: #6B9A7A; font-family: 'DM Sans',sans-serif; margin: 0; }
        .gm-mi { padding: 10px 16px; cursor: pointer; font-size: 13px; font-family: 'DM Sans',sans-serif; color: #1A3325; display: flex; align-items: center; gap: 10px; transition: background 0.13s,color 0.13s; font-weight: 500; }
        .gm-mi svg { color: #5A9E72; flex-shrink: 0; }
        .gm-mi:hover { background: #F2FAF5; color: #2D7A4A; }
        .gm-mi:hover svg { color: #2D7A4A; }
        .gm-mi.danger { color: #dc2626; font-weight: 600; }
        .gm-mi.danger svg { color: #dc2626; }
        .gm-mi.danger:hover { background: #fff5f5; color: #b91c1c; }
        .gm-sep { height: 1px; background: rgba(180,220,195,0.5); }
        @keyframes gmDrop { from { opacity:0; transform:translateY(-8px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @media (max-width: 960px) { .gm-nav { display: none; } .gm-search { max-width: 260px; } }
        @media (max-width: 640px) { .gm-header { padding: 0 16px; } .gm-inner { gap: 10px; height: 56px; } .gm-logo-word { font-size: 15px; } .gm-loc { display: none; } .gm-div { display: none; } .gm-search { max-width: unset; } }
      `}</style>

      <header className="gm-header">
        <div className="gm-inner">
          <div className="gm-logo" onClick={() => router.push('/search')}>
            <div className="gm-logo-icon">
              <HiOutlineShoppingBag size={17} color="#fff" />
            </div>
            <span className="gm-logo-word">GullyMarket</span>
          </div>

          <div className="gm-div" />

          <div className="gm-loc">
            <div
              className="gm-loc-btn"
              onClick={() => {
                setShowLocationMenu(!showLocationMenu)
                setShowUserMenu(false)
              }}
            >
              <HiOutlineMapPin size={14} />
              <span className="gm-loc-text">{location}</span>
              <HiOutlineChevronDown
                size={12}
                className={`gm-loc-chev${showLocationMenu ? ' open' : ''}`}
              />
            </div>
            {showLocationMenu && (
              <div className="gm-loc-drop">
                <div className="gm-loc-drop-hd">
                  <p>Select Area</p>
                </div>
                {BBSR_LOCATIONS.map((loc) => (
                  <div
                    key={loc.id}
                    className={`gm-loc-item${location === loc.label ? ' sel' : ''}`}
                    onClick={() => {
                      setLocation(loc.label)
                      setShowLocationMenu(false)
                    }}
                  >
                    {location === loc.label && <span className="gm-loc-dot" />}
                    {loc.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <form className="gm-search" onSubmit={handleSearch}>
            <HiOutlineMagnifyingGlass size={15} />
            <input
              placeholder="Search stalls, products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <span className="gm-search-x" onClick={() => setQuery('')}>
                <HiOutlineXMark size={14} />
              </span>
            )}
          </form>

          <nav className="gm-nav">
            {links.map(({ label, href, Icon }) => {
              const isActive = path === href.split('?')[0]
              return (
                <button
                  key={href}
                  className={`gm-nav-btn ${isActive ? 'active' : 'inactive'}`}
                  onClick={() => router.push(href)}
                >
                  <Icon size={15} />
                  {label}
                </button>
              )
            })}
          </nav>

          <div className="gm-av-wrap">
            <div
              className="gm-av"
              onClick={() => {
                setShowUserMenu(!showUserMenu)
                setShowLocationMenu(false)
              }}
            >
              {initials}
            </div>
            {showUserMenu && (
              <div className="gm-user-drop">
                <div className="gm-user-hd">
                  <p className="gm-u-name">{user?.name || 'My Account'}</p>
                  <p className="gm-u-email">{user?.email || ''}</p>
                </div>
                <div
                  className="gm-mi"
                  onClick={() => {
                    setShowUserMenu(false)
                    router.push('/orders')
                  }}
                >
                  <HiOutlineCube size={15} /> Track Orders
                </div>
                <div
                  className="gm-mi"
                  onClick={() => {
                    setShowUserMenu(false)
                    router.push('/history')
                  }}
                >
                  <HiOutlineClock size={15} /> Order History
                </div>
                <div
                  className="gm-mi"
                  onClick={() => {
                    setShowUserMenu(false)
                    router.push('/history?tab=wishlist')
                  }}
                >
                  <HiOutlineHeart size={15} /> Wishlist
                </div>
                <div className="gm-sep" />
                <div className="gm-mi danger" onClick={handleLogout}>
                  <HiArrowRightOnRectangle size={15} /> Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
