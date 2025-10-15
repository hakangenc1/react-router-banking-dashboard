import { Suspense } from "react"
import { Await } from "react-router"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "./ui/card"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { WidgetSkeleton } from "./widget-skeleton"

interface MarketData {
  symbol: string
  name: string
  value: number
  change: number
  changePercent: number
  chartData: { value: number }[]
  articles: { title: string; time: string }[]
}

export function MarketInsightsWidget({ dataPromise }: { dataPromise: Promise<MarketData[]> }) {
  return (
    <Suspense fallback={<WidgetSkeleton height="350px" />}>
      <Await resolve={dataPromise}>{(data) => <MarketInsightsWidgetContent data={data} />}</Await>
    </Suspense>
  )
}

function MarketInsightsWidgetContent({ data }: { data: MarketData[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-normal">Market Insights</h2>
          <p className="text-xs text-[#666]">Updated 10/13/2025 5:24 PM</p>
        </div>
        <button className="text-sm text-[#e60028] hover:underline">View markets</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {data.map((market) => (
          <Card key={market.symbol} className="p-4">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#666]">{market.symbol}</p>
                  <p className="text-2xl font-normal">
                    {market.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="w-16 h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={market.chartData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={market.change >= 0 ? "#22c55e" : "#ef4444"}
                        strokeWidth={1.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Change */}
              <div
                className={`flex items-center gap-1 text-sm ${market.change >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                <span
                  className="px-2 py-0.5 rounded"
                  style={{ backgroundColor: market.change >= 0 ? "#dcfce7" : "#fee2e2" }}
                >
                  {market.change >= 0 ? "+" : ""}
                  {market.change.toFixed(2)}
                </span>
                <span>
                  {market.changePercent >= 0 ? "+" : ""}
                  {market.changePercent.toFixed(2)}%
                </span>
                {market.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>

              <p className="text-xs text-[#666]">as of 10/13/2025 9:07 PM</p>

              {/* Articles */}
              <div className="space-y-2 pt-2 border-t border-[#e0e0e0]">
                {market.articles.map((article, idx) => (
                  <div key={idx}>
                    <a href="#" className="text-xs text-[#e60028] hover:underline line-clamp-2">
                      {article.title}
                    </a>
                    <p className="text-xs text-[#666] mt-1">{article.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
