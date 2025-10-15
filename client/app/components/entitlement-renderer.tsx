import { lazy, Suspense, type ComponentType } from "react"
import { useAsyncValue } from "react-router"
import type { Entitlements } from "../lib/api"
import { WidgetSkeleton } from "./widget-skeleton"

const LazyAccountsWidget = lazy(() => import("./accounts-widget").then((m) => ({ default: m.AccountsWidget })))
const LazyRecentActivityWidget = lazy(() =>
  import("./recent-activity-widget").then((m) => ({ default: m.RecentActivityWidget })),
)
const LazyMarketInsightsWidget = lazy(() =>
  import("./market-insights-widget").then((m) => ({ default: m.MarketInsightsWidget })),
)
const LazyWatchlistWidget = lazy(() => import("./watchlist-widget").then((m) => ({ default: m.WatchlistWidget })))
const LazyTransferBanner = lazy(() => import("./transfer-banner").then((m) => ({ default: m.TransferBanner })))

interface EntitlementRendererProps {
  widgetType: "accounts" | "recentActivity" | "marketInsights" | "watchlist" | "transfer"
  dataPromise?: Promise<any>
  fallbackHeight?: string
}

export function EntitlementRenderer({ widgetType, dataPromise, fallbackHeight = "300px" }: EntitlementRendererProps) {
  const entitlements = useAsyncValue() as Entitlements

  // Map widget types to permissions and components
  const widgetConfig = {
    accounts: {
      permission: entitlements.permissions.canViewBasicAccounts,
      component: LazyAccountsWidget,
      requiresData: true,
      featureName: "Account Details",
    },
    recentActivity: {
      permission: entitlements.permissions.canViewRecentActivity,
      component: LazyRecentActivityWidget,
      requiresData: true,
      featureName: "Recent Activity",
    },
    marketInsights: {
      permission: entitlements.permissions.canViewMarketInsights,
      component: LazyMarketInsightsWidget,
      requiresData: true,
      featureName: "Market Insights",
    },
    watchlist: {
      permission: entitlements.permissions.canViewWatchlist,
      component: LazyWatchlistWidget,
      requiresData: false,
      featureName: "Watchlist",
    },
    transfer: {
      permission: entitlements.permissions.canViewTransfer,
      component: LazyTransferBanner,
      requiresData: false,
      featureName: "Transfer",
    },
  }

  const config = widgetConfig[widgetType]

  // If user doesn't have permission, show upgrade prompt
  if (!config.permission) {
    return null
  }

  // User has permission, lazy load the component
  const Component = config.component as ComponentType<any>

  // If widget requires data, wrap in another Suspense for data loading
  if (config.requiresData && dataPromise) {
    return (
      <Suspense fallback={<WidgetSkeleton height={fallbackHeight} />}>
        <Component dataPromise={dataPromise} />
      </Suspense>
    )
  }

  // Widget doesn't require data, just render it
  return (
    <Suspense fallback={<WidgetSkeleton height={fallbackHeight} />}>
      <Component />
    </Suspense>
  )
}
