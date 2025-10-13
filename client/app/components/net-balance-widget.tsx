import { Card } from "./ui/card"

interface NetBalanceData {
  netBalance: number
  totalAssets: number
  totalLiabilities: number
  cash: {
    total: number
    available: number
    alternatives: number
  }
}

export function NetBalanceWidget({ data }: { data: NetBalanceData }) {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Net Balance Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-[#666]">Net Balance</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-black text-white text-xs rounded">UBS</button>
              <button className="px-3 py-1 border border-[#e0e0e0] text-xs rounded hover:bg-gray-50">All</button>
            </div>
          </div>
          <div className="text-3xl font-normal mb-2">
            ${data.netBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-[#666]">
            UBS Accounts only.{" "}
            <a href="#" className="text-[#e60028] hover:underline">
              Learn More
            </a>
          </p>
        </div>

        {/* Total Assets & Liabilities */}
        <div className="flex items-center justify-around border-l border-r border-[#e0e0e0]">
          <div>
            <p className="text-xs text-[#666] mb-1">Total Assets</p>
            <p className="text-xl font-normal">
              ${data.totalAssets.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-[#666]">UBS Financial Services</p>
          </div>
          <div>
            <p className="text-xs text-[#666] mb-1">Total Liabilities</p>
            <p className="text-xl font-normal">—</p>
            <p className="text-xs text-[#666]">UBS Liabilities</p>
          </div>
        </div>

        {/* Cash Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-[#666]">Cash</h2>
            <div className="text-xl font-normal">
              ${data.cash.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#666]">Cash Available</span>
              <span>${data.cash.available.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Cash Alternatives</span>
              <span>${data.cash.alternatives.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
          <p className="text-xs text-[#666] mt-3">
            Includes cash in your UBS Financial Services accounts.{" "}
            <a href="#" className="text-[#e60028] hover:underline">
              Learn more
            </a>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#e0e0e0]">
        <button className="text-sm text-[#e60028] hover:underline flex items-center gap-1">
          <span>+</span> Add External Account
        </button>
        <div className="flex gap-4">
          <button className="text-sm text-[#e60028] hover:underline">Go to Balances →</button>
          <button className="text-sm text-[#e60028] hover:underline">Go to Cash at a Glance →</button>
        </div>
      </div>
    </Card>
  )
}
