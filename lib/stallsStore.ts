import { STALLS as MOCK_STALLS, PRODUCTS as MOCK_PRODUCTS } from './mockData'

const STALLS_KEY = 'lc_stalls'
const PRODUCTS_KEY = 'lc_products'

export function getAllStalls(): any[] {
  if (typeof window === 'undefined') return MOCK_STALLS
  try {
    const stored = localStorage.getItem(STALLS_KEY)
    const vendorStalls: any[] = stored ? JSON.parse(stored) : []
    const mockIds = new Set(MOCK_STALLS.map((s: any) => s.id))
    const onlyVendor = vendorStalls.filter((s: any) => !mockIds.has(s.id))
    return [...MOCK_STALLS, ...onlyVendor]
  } catch {
    return MOCK_STALLS
  }
}

export function saveVendorStall(stall: any) {
  if (typeof window === 'undefined') return
  try {
    const stored = localStorage.getItem(STALLS_KEY)
    const stalls: any[] = stored ? JSON.parse(stored) : []
    const idx = stalls.findIndex((s: any) => s.id === stall.id)
    if (idx >= 0) stalls[idx] = stall
    else stalls.push(stall)
    localStorage.setItem(STALLS_KEY, JSON.stringify(stalls))
  } catch {}
}

export function getAllProducts(): Record<string, any[]> {
  if (typeof window === 'undefined') return MOCK_PRODUCTS
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY)
    const vendorProducts: Record<string, any[]> = stored
      ? JSON.parse(stored)
      : {}
    return { ...MOCK_PRODUCTS, ...vendorProducts }
  } catch {
    return MOCK_PRODUCTS
  }
}

export function saveVendorProducts(stallId: string, products: any[]) {
  if (typeof window === 'undefined') return
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY)
    const all: Record<string, any[]> = stored ? JSON.parse(stored) : {}
    all[stallId] = products
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(all))
  } catch {}
}
