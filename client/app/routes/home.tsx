import { Suspense } from "react"
import { useLoaderData, Await } from "react-router"
import type { Route } from "./+types/home"
import { Header } from "../components/header"
import { NetBalanceWidget } from "../components/net-balance-widget"
import { AccountsWidget } from "../components/accounts-widget"
import { RecentActivityWidget } from "../components/recent-activity-widget"
import { MarketInsightsWidget } from "../components/market-insights-widget"
import { TransferBanner } from "../components/transfer-banner"
import { WatchlistWidget } from "../components/watchlist-widget"
import { WidgetSkeleton } from "../components/widget-skeleton"

const API_BASE = "http://localhost:4000/api"

async function fetchNetBalance() {
  const res = await fetch(`${API_BASE}/net-balance`)
  if (!res.ok) throw new Error("Failed to fetch net balance")
  return res.json()
}

async function fetchAccounts() {
  const res = await fetch(`${API_BASE}/accounts`)
  if (!res.ok) throw new Error("Failed to fetch accounts")
  return res.json()
}

async function fetchRecentActivity() {
  const res = await fetch(`${API_BASE}/recent-activity`)
  if (!res.ok) throw new Error("Failed to fetch recent activity")
  return res.json()
}

async function fetchMarketInsights() {
  const res = await fetch(`${API_BASE}/market-insights`)
  if (!res.ok) throw new Error("Failed to fetch market insights")
  return res.json()
}

export async function loader() {
  return ({
    netBalance: fetchNetBalance(),
    accounts: fetchAccounts(),
    recentActivity: fetchRecentActivity(),
    marketInsights: fetchMarketInsights(),
  })
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const data = loaderData;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      <main className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-normal text-[#333]">Welcome</h1>
            <span className="text-sm text-[#666]">Last login: Today, 3:22 p.m. ET</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button className="text-[#e60028] hover:underline flex items-center gap-1">
              <span>🔄</span>
              <span>Refresh</span>
            </button>
            <button className="text-[#e60028] hover:underline flex items-center gap-1">
              <span>🗺️</span>
              <span>Sitemap</span>
            </button>
          </div>
        </div>

        {/* Net Balance Widget */}
        <Suspense fallback={<WidgetSkeleton height="200px" />}>
          <Await resolve={data.netBalance}>{(netBalance) => <NetBalanceWidget data={netBalance} />}</Await>
        </Suspense>

        {/* Accounts Widget */}
        <Suspense fallback={<WidgetSkeleton height="300px" />}>
          <Await resolve={data.accounts}>{(accounts) => <AccountsWidget data={accounts} />}</Await>
        </Suspense>

        {/* Recent Activity Widget */}
        <Suspense fallback={<WidgetSkeleton height="250px" />}>
          <Await resolve={data.recentActivity}>{(activity) => <RecentActivityWidget data={activity} />}</Await>
        </Suspense>

        {/* Transfer Banner */}
        <TransferBanner />

        {/* Watchlist Widget */}
        <WatchlistWidget />

        {/* Market Insights Widget */}
        <Suspense fallback={<WidgetSkeleton height="350px" />}>
          <Await resolve={data.marketInsights}>{(insights) => <MarketInsightsWidget data={insights} />}</Await>
        </Suspense>
      </main>
    </div>
  )
}
