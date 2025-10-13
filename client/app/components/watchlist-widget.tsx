import { Card } from "./ui/card"

export function WatchlistWidget() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-normal mb-3">Watchlist</h2>
      <p className="text-sm text-[#666] mb-4">
        Monitor the performance of your favorite equities, ETFs, and mutual funds during daily trading sessions with
        your Watchlist.
      </p>
      <p className="text-sm text-[#666]">
        To view, edit or create your Watchlist, click the "Go to Watchlist" button or navigate to{" "}
        <a href="#" className="text-[#e60028] hover:underline">
          Markets & Research
        </a>{" "}
        — Tools — select <span className="font-medium">Watchlist</span> tab.
      </p>
      <div className="mt-4">
        <button className="px-6 py-2 border border-[#333] text-sm hover:bg-gray-50 rounded">Go to Watchlist</button>
      </div>
    </Card>
  )
}
