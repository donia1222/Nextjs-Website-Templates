"use client"

import { ReactNode, useState } from "react"
import { cn } from "@/lib/utils"
import { Store, UtensilsCrossed } from 'lucide-react'

interface TabProps {
  children: ReactNode
  value: string
}

interface TabsProps {
  defaultValue: string
  children: ReactNode
  className?: string
}

export function CustomTabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  
  // Filter and find the TabsList and TabsContent components
  const tabsList = Array.isArray(children) 
    ? children.find((child: any) => child?.type?.displayName === 'TabsList')
    : children
  
  const contents = Array.isArray(children) 
    ? children.filter((child: any) => child?.type?.displayName === 'TabsContent')
    : []

  return (
    <div className={cn("w-full", className)}>
      {tabsList && (
        <div onClick={(e: any) => {
          if (e.target.dataset.value) {
            setActiveTab(e.target.dataset.value)
          }
        }}>
          {tabsList}
        </div>
      )}
      
      {contents.map((content: any) => 
        content?.props?.value === activeTab ? content : null
      )}
    </div>
  )
}

CustomTabs.displayName = 'CustomTabs'

export function CustomTabsList({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("w-full max-w-md mx-auto grid grid-cols-2 bg-gray-100 rounded-lg p-1", className)}>
      {children}
    </div>
  )
}

CustomTabsList.displayName = 'TabsList'

export function CustomTabsTrigger({ 
  value, 
  children,
  className
}: { 
  value: string, 
  children: ReactNode,
  className?: string
}) {
  return (
    <div 
      data-value={value}
      className={cn(
        "flex items-center justify-center gap-2 p-2 rounded-md cursor-pointer transition-all",
        "data-[active=true]:bg-white data-[active=true]:shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
}

CustomTabsTrigger.displayName = 'TabsTrigger'

export function CustomTabsContent({ 
  value, 
  children,
  className
}: { 
  value: string, 
  children: ReactNode,
  className?: string
}) {
  return (
    <div className={cn("mt-2", className)}>
      {children}
    </div>
  )
}

CustomTabsContent.displayName = 'TabsContent'
