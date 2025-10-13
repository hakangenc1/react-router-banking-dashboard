export function WidgetSkeleton({ height = "200px" }: { height?: string }) {
  return (
    <div className="bg-white rounded-lg border border-[#e0e0e0] p-6 animate-pulse" style={{ height }}>
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  )
}
