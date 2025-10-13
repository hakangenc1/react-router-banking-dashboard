import type React from "react"
import { cn } from "../../lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("bg-white rounded-lg border border-[#e0e0e0] shadow-sm", className)} {...props}>
      {children}
    </div>
  )
}
