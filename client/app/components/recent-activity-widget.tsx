import { Card } from "./ui/card"

interface Activity {
  id: string
  date: string
  type: string
  account: string
  amount: number
  description: string
  service: string
}

export function RecentActivityWidget({ data }: { data: Activity[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-normal">Recent Activity</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white border border-[#e0e0e0] text-xs rounded hover:bg-gray-50">
            Investments
          </button>
          <button className="px-3 py-1 bg-black text-white text-xs rounded">Cash and Credit</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {data.slice(0, 4).map((activity) => (
          <Card key={activity.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#666]">
                <span>{activity.date}</span>
                <span>{activity.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{activity.account}</span>
                <span className="font-medium">
                  ${activity.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-xs text-[#666] line-clamp-2">{activity.description}</p>
              <p className="text-xs text-[#666]">{activity.service}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 text-right">
        <button className="text-sm text-[#e60028] hover:underline">Go to Activity →</button>
      </div>
    </Card>
  )
}
