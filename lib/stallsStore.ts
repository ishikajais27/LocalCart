// In-memory cache for stalls added in the current session
const stallsStore: any[] = []
const productsStore: Record<string, any[]> = {}

export function getAllStalls() {
  return []
}
export function getAllProducts() {
  return {}
}
export function addStall(_stall: any) {}
export function addProduct(_stallId: string, _product: any) {}
