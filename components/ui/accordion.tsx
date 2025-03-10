"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionProps {
  type?: "single" | "multiple"
  collapsible?: boolean
  className?: string
  children: React.ReactNode
}

export const Accordion: React.FC<AccordionProps> = ({ type = "single", collapsible = false, className, children }) => {
  return <div className={cn("space-y-2", className)}>{children}</div>
}

interface AccordionItemProps {
  value: string
  className?: string
  children: React.ReactNode
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ value, className, children }) => {
  return <div className={cn("border rounded-lg", className)}>{children}</div>
}

interface AccordionTriggerProps {
  className?: string
  children: React.ReactNode
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ className, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <button
      className={cn(
        "flex w-full items-center justify-between px-4 py-2 text-left font-medium transition-all hover:underline",
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
    </button>
  )
}

interface AccordionContentProps {
  className?: string
  children: React.ReactNode
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ className, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("overflow-hidden text-sm transition-all", isOpen ? "max-h-96" : "max-h-0", className)}>
      <div className="px-4 pb-4 pt-0">{children}</div>
    </div>
  )
}

