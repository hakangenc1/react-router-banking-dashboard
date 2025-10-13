import { Search, Mail, Bell, User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b border-[#e0e0e0]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#e60028] flex items-center justify-center">
                <span className="text-white font-bold text-sm">UBS</span>
              </div>
              <span className="text-sm text-[#666]">Wealth Management</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
              <input
                type="text"
                placeholder="Search Quotes and Research"
                className="pl-10 pr-4 py-2 border border-[#e0e0e0] rounded text-sm w-64 focus:outline-none focus:border-[#e60028]"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded" aria-label="Messages">
              <Mail className="w-5 h-5 text-[#666]" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded" aria-label="Notifications">
              <Bell className="w-5 h-5 text-[#666]" />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
              <User className="w-5 h-5 text-[#666]" />
              <span className="text-sm">Contact your Financial Advisor</span>
            </button>
            <button className="text-sm text-[#e60028] hover:underline">Sign out</button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 h-12 border-t border-[#e0e0e0]">
          <a
            href="#"
            className="text-sm font-medium text-[#e60028] border-b-2 border-[#e60028] h-full flex items-center"
          >
            Home
          </a>
          <a href="#" className="text-sm text-[#333] hover:text-[#e60028] h-full flex items-center">
            Accounts
          </a>
          <a href="#" className="text-sm text-[#333] hover:text-[#e60028] h-full flex items-center">
            Banking Services
          </a>
          <a href="#" className="text-sm text-[#333] hover:text-[#e60028] h-full flex items-center">
            Planning
          </a>
          <a href="#" className="text-sm text-[#333] hover:text-[#e60028] h-full flex items-center">
            Markets & Research
          </a>
          <a href="#" className="text-sm text-[#333] hover:text-[#e60028] h-full flex items-center">
            Insights
          </a>
        </nav>
      </div>
    </header>
  )
}
