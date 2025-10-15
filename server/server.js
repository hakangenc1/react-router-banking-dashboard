import express from "express"
import cors from "cors"

const app = express()
const PORT = 4000

// Middleware
app.use(cors())
app.use(express.json())

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock Data
const mockNetBalance = {
  netBalance: 685288.83,
  totalAssets: 685288.83,
  totalLiabilities: 0,
  cash: {
    total: 19999.42,
    available: 8327.99,
    alternatives: 11671.43,
  },
}

const mockAccounts = [
  {
    name: "Investment Accounts",
    accounts: [
      {
        id: "1",
        name: "UBS Financial Services",
        type: "Investment",
        description: "Investments are not insured by the FDIC, not a deposit, not a bank guarantee.",
        totalValue: 456288.83,
        cashAvailable: 8327.99,
        changeInValue: 10081.33,
        changePercent: 1.87,
        unrealizedGains: 125988.02,
      },
    ],
  },
  {
    name: "Retirement",
    accounts: [
      {
        id: "2",
        name: "Traditional IRA",
        type: "Retirement",
        totalValue: 148211.67,
        cashAvailable: 2496.18,
        changeInValue: 1527.45,
        changePercent: 1.33,
        unrealizedGains: 51909.66,
      },
    ],
  },
  {
    name: "Brokerage",
    accounts: [
      {
        id: "3",
        name: "Individual Brokerage",
        type: "Brokerage",
        totalValue: 80788.33,
        cashAvailable: 3181.81,
        changeInValue: 6813.88,
        changePercent: 1.38,
        unrealizedGains: 236936.56,
      },
    ],
  },
]

const mockRecentActivity = [
  {
    id: "1",
    date: "Oct 7, 2025",
    type: "Interest",
    account: "Roth IRA (IRA 51232)",
    amount: 31.9,
    description: "BMA (LJN 91973)",
    service: "UBS Financial Services",
  },
  {
    id: "2",
    date: "Oct 7, 2025",
    type: "Interest",
    account: "Roth IRA (IRA 51232)",
    amount: 0.21,
    description: "UBS INSURED SWEEP PROGRAM AS OF...",
    service: "UBS Financial Services",
  },
  {
    id: "3",
    date: "Oct 7, 2025",
    type: "Interest",
    account: "Roth IRA (IRA 51232)",
    amount: 0.08,
    description: "UBS INSURED SWEEP PROGRAM AS OF...",
    service: "UBS Financial Services",
  },
  {
    id: "4",
    date: "Oct 6, 2025",
    type: "Dividend",
    account: "Both IRA (IRA 51232)",
    amount: 28.7,
    description: "ISHARES CORE TOTAL USD BOND MKT...",
    service: "UBS Financial Services",
  },
]

const mockMarketInsights = [
  {
    symbol: "DJIA",
    name: "Dow Jones Industrial Average",
    value: 46004.69,
    change: 55.09,
    changePercent: 1.15,
    chartData: [
      { value: 45800 },
      { value: 45850 },
      { value: 45900 },
      { value: 45950 },
      { value: 46000 },
      { value: 46004.69 },
    ],
    articles: [
      {
        title: "StreetAccount Sector Summary - Real Estate Weekly Recap",
        time: "10/10/2025 10:22 PM",
      },
    ],
  },
  {
    symbol: "S&P 500",
    name: "S&P 500",
    value: 6647.33,
    change: 94.82,
    changePercent: 1.45,
    chartData: [
      { value: 6500 },
      { value: 6550 },
      { value: 6580 },
      { value: 6600 },
      { value: 6630 },
      { value: 6647.33 },
    ],
    articles: [
      {
        title: "FactSet Podcast - Weekly Market Recap",
        time: "10/10/2025 10:24 PM",
      },
    ],
  },
  {
    symbol: "NASDAQ",
    name: "NASDAQ Composite",
    value: 22669.73,
    change: 465.3,
    changePercent: 2.09,
    chartData: [
      { value: 22000 },
      { value: 22200 },
      { value: 22400 },
      { value: 22500 },
      { value: 22600 },
      { value: 22669.73 },
    ],
    articles: [
      {
        title: "StreetAccount Consumer Metrics Preview - Goldman Sachs Q3 Earnings...",
        time: "10/10/2025 4:24 PM",
      },
    ],
  },
  {
    symbol: "10YR Treasury",
    name: "10-Year Treasury Yield",
    value: 4.06,
    change: -0.01,
    changePercent: -0.31,
    chartData: [{ value: 4.1 }, { value: 4.09 }, { value: 4.08 }, { value: 4.07 }, { value: 4.06 }, { value: 4.06 }],
    articles: [
      {
        title: "Synovus announces final regulatory approval to close planned divestiture...",
        time: "10/10/2025 3:04 PM",
      },
    ],
  },
]

const userProfiles = {
  basic: {
    tier: "basic",
    permissions: {
      canViewNetBalance: true,
      canViewBasicAccounts: false,
      canViewRecentActivity: false,
      canViewMarketInsights: false,
      canViewAdvancedAnalytics: false,
      canViewWatchlist: false,
      canViewTransfer: false
    },
  },
  premium: {
    tier: "premium",
    permissions: {
      canViewNetBalance: true,
      canViewBasicAccounts: true,
      canViewRecentActivity: false,
      canViewMarketInsights: false,
      canViewAdvancedAnalytics: false,
      canViewWatchlist: true,
      canViewTransfer: true,
    },
  },
  wealth: {
    tier: "wealth",
    permissions: {
      canViewNetBalance: true,
      canViewBasicAccounts: true,
      canViewRecentActivity: true,
      canViewMarketInsights: true,
      canViewAdvancedAnalytics: true,
      canViewWatchlist: true,
      canViewTransfer: true,
    },
  },
}

const dataDelays = {
  netBalance: 600,
  accounts: 800,
  recentActivity: 1200,
  marketInsights: 400,
  entitlements: 800,
}

// API Routes
app.get("/api/net-balance", async (req, res) => {
  await delay(dataDelays.netBalance) // Simulate network delay
  res.json(mockNetBalance)
})

app.get("/api/accounts", async (req, res) => {
  await delay(dataDelays.accounts) // Simulate network delay
  res.json(mockAccounts)
})

app.get("/api/recent-activity", async (req, res) => {
  await delay(dataDelays.recentActivity) // Simulate network delay
  res.json(mockRecentActivity)
})

app.get("/api/market-insights", async (req, res) => {
  await delay(dataDelays.marketInsights) // Simulate network delay
  res.json(mockMarketInsights)
})

app.get("/api/entitlements", async (req, res) => {
  await delay(dataDelays.entitlements) // Simulate slow entitlement service

  // Get user tier from query param, default to 'premium'
  const tier = req.query.tier || "premium"
  const profile = userProfiles[tier] || userProfiles.premium

  console.log(`[Server] Returning entitlements for tier: ${tier}`)
  res.json(profile)
})

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`)
  console.log(`📊 Available endpoints:`)
  console.log(`   - GET http://localhost:${PORT}/api/net-balance`)
  console.log(`   - GET http://localhost:${PORT}/api/accounts`)
  console.log(`   - GET http://localhost:${PORT}/api/recent-activity`)
  console.log(`   - GET http://localhost:${PORT}/api/market-insights`)
  console.log(`   - GET http://localhost:${PORT}/api/entitlements`)
})
