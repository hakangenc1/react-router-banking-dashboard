import { useState } from "react"
import { ChevronDown, ChevronRight, Info } from "lucide-react"
import { Card } from "./ui/card"

interface Account {
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

interface AccountGroup {
  name: string
  accounts: Account[]
}

export function AccountsWidget({ data }: { data: AccountGroup[] }) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["Investment Accounts"]))

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(groupName)) {
        next.delete(groupName)
      } else {
        next.add(groupName)
      }
      return next
    })
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-normal">Accounts</h2>
        <div className="flex gap-4">
          <button className="text-sm text-[#e60028] hover:underline">Expand all groups</button>
          <button className="text-sm text-[#e60028] hover:underline">Collapse all groups</button>
          <button className="text-[#666]">⋮</button>
        </div>
      </div>

      <div className="space-y-2">
        {data.map((group) => {
          const isExpanded = expandedGroups.has(group.name)
          const totalValue = group.accounts.reduce((sum, acc) => sum + acc.totalValue, 0)

          return (
            <div key={group.name} className="border border-[#e0e0e0] rounded">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.name)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span className="text-sm font-medium text-[#e60028]">{group.name}</span>
                  <Info className="w-4 h-4 text-[#666]" />
                </div>
                <div className="flex items-center gap-8 text-sm">
                  <div>
                    <span className="text-[#666] mr-2">Total Value</span>
                    <span className="font-medium">
                      ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </button>

              {/* Group Content */}
              {isExpanded && (
                <div className="border-t border-[#e0e0e0]">
                  {group.accounts.map((account) => (
                    <div key={account.id} className="p-4 border-b border-[#e0e0e0] last:border-b-0 hover:bg-gray-50">
                      <div className="grid grid-cols-5 gap-4 items-center text-sm">
                        <div>
                          <p className="font-medium">{account.name}</p>
                          {account.description && <p className="text-xs text-[#666] mt-1">{account.description}</p>}
                        </div>
                        <div className="text-right">
                          <p className="text-[#666] text-xs mb-1">Total Value</p>
                          <p className="font-medium">
                            ${account.totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#666] text-xs mb-1">Cash Available</p>
                          <p>${account.cashAvailable.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#666] text-xs mb-1">Change in Value</p>
                          <p className={account.changeInValue >= 0 ? "text-green-600" : "text-red-600"}>
                            ${Math.abs(account.changeInValue).toLocaleString("en-US", { minimumFractionDigits: 2 })} |{" "}
                            {account.changePercent.toFixed(2)}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#666] text-xs mb-1">Unrealized Gains (as of)</p>
                          <p>${account.unrealizedGains.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
