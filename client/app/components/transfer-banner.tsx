import { Card } from "./ui/card"

export function TransferBanner() {
  return (
    <Card className="p-6 bg-gradient-to-r from-gray-50 to-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">💸</div>
          <div>
            <h3 className="text-lg font-medium mb-1">Click. Transfer. Done</h3>
            <p className="text-sm text-[#666]">Moving money into your account is easier than ever.</p>
          </div>
        </div>
        <button className="px-6 py-2 border border-[#333] text-sm hover:bg-gray-50 rounded">Transfer Now</button>
      </div>
    </Card>
  )
}
