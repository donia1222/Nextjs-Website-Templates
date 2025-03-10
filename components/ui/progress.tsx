"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ className, value = 0, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-100", className)} {...props}>
      <div className="h-full bg-amber-500 transition-all duration-200 ease-in-out" style={{ width: `${value}%` }} />
    </div>
  )
})

Progress.displayName = "Progress"

export { Progress }


