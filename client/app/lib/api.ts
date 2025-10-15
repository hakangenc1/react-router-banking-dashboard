const API_BASE = "http://localhost:4000/api"

export interface NetBalance {
  netBalance: number
  totalAssets: number
  totalLiabilities: number
  cash: {
    total: number
    available: number
    alternatives: number
  }
}

export interface Account {
  id: string
  name: string
  type: string
  description?: string
  totalValue: number
  cashAvailable: number
  changeInValue: number
  changePercent: number
  unrealizedGains: number
}

export interface AccountGroup {
  name: string
  accounts: Account[]
}

export interface Activity {
  id: string
  date: string
  type: string
  account: string
  amount: number
  description: string
  service: string
}

export interface MarketInsight {
  symbol: string
  name: string
  value: number
  change: number
  changePercent: number
  chartData: { value: number }[]
  articles: { title: string; time: string }[]
}

export interface Entitlements {
  tier: "basic" | "premium" | "wealth"
  permissions: {
    canViewNetBalance: boolean
    canViewBasicAccounts: boolean
    canViewRecentActivity: boolean
    canViewMarketInsights: boolean
    canViewAdvancedAnalytics: boolean
    canViewWatchlist: boolean
    canViewTransfer: boolean
  }
}

export async function fetchNetBalance(): Promise<NetBalance> {
  const res = await fetch(`${API_BASE}/net-balance`)
  if (!res.ok) throw new Error("Failed to fetch net balance")
  return res.json()
}

export async function fetchAccounts(): Promise<AccountGroup[]> {
  const res = await fetch(`${API_BASE}/accounts`)
  if (!res.ok) throw new Error("Failed to fetch accounts")
  return res.json()
}

export async function fetchRecentActivity(): Promise<Activity[]> {
  const res = await fetch(`${API_BASE}/recent-activity`)
  if (!res.ok) throw new Error("Failed to fetch recent activity")
  return res.json()
}

export async function fetchMarketInsights(): Promise<MarketInsight[]> {
  const res = await fetch(`${API_BASE}/market-insights`)
  if (!res.ok) throw new Error("Failed to fetch market insights")
  return res.json()
}

export async function fetchEntitlements(tier: "basic" | "premium" | "wealth" = "premium"): Promise<Entitlements> {
  const res = await fetch(`${API_BASE}/entitlements?tier=${tier}`)
  if (!res.ok) throw new Error("Failed to fetch entitlements")
  return res.json()
}
