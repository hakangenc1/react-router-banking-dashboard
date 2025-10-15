import { lazy, Suspense } from "react"
import { useLoaderData, Await } from "react-router"
import { Header } from "../components/header"
import { WidgetSkeleton } from "../components/widget-skeleton"
import { EntitlementRenderer } from "../components/entitlement-renderer"
import { fetchNetBalance, fetchAccounts, fetchRecentActivity, fetchMarketInsights, fetchEntitlements } from "../lib/api"

const LazyNetBalanceWidget = lazy(() =>
  import("../components/net-balance-widget").then((m) => ({ default: m.NetBalanceWidget })),
)

const LazyTransferBanner = lazy(() =>
  import("../components/transfer-banner").then((m) => ({ default: m.TransferBanner })),
)
const LazyWatchlistWidget = lazy(() =>
  import("../components/watchlist-widget").then((m) => ({ default: m.WatchlistWidget })),
)

export async function loader() {

  const userTier = "basic" // 'basic', 'premium', 'wealth'

  return ({
    entitlements: fetchEntitlements(userTier), // Non-blocking - page shell renders immediately
    netBalance: fetchNetBalance(),
    accounts: fetchAccounts(),
    recentActivity: fetchRecentActivity(),
    marketInsights: fetchMarketInsights(),
  })
}

export default function Home() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      <main className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">
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

        {/* Net Balance - Always visible to all users */}
        <Suspense fallback={<WidgetSkeleton height="240px" />}>
          <Await resolve={data.netBalance}>
            {(netBalance) => (
              <Suspense fallback={<WidgetSkeleton height="240px" />}>
                <LazyNetBalanceWidget data={netBalance} />
              </Suspense>
            )}
          </Await>
        </Suspense>

        {/* Accounts Widget - Requires canViewBasicAccounts permission */}
        <Suspense fallback={<WidgetSkeleton height="360px" />}>
          <Await resolve={data.entitlements}>
            <EntitlementRenderer widgetType="accounts" dataPromise={data.accounts} fallbackHeight="360px" />
          </Await>
        </Suspense>

        {/* Recent Activity Widget - Requires canViewRecentActivity permission */}
        <Suspense fallback={<WidgetSkeleton height="250px" />}>
          <Await resolve={data.entitlements}>
            <EntitlementRenderer widgetType="recentActivity" dataPromise={data.recentActivity} fallbackHeight="250px" />
          </Await>
        </Suspense>        
        
        {/* Transfer Banner - Always visible to all users */}
        <LazyTransferBanner />

        {/* Watchlist Widget - Always visible to all users */}
        <LazyWatchlistWidget />

        {/* Market Insights Widget - Requires canViewMarketInsights permission (Wealth tier) */}
        <Suspense fallback={<WidgetSkeleton height="340px" />}>
          <Await resolve={data.entitlements}>
            <EntitlementRenderer widgetType="marketInsights" dataPromise={data.marketInsights} fallbackHeight="340px" />
          </Await>
        </Suspense>
      </main>
    </div>
  )
}
