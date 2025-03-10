"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Corregir la interfaz para evitar conflictos con HTMLAttributes
interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, defaultValue = [0, 100], min = 0, max = 100, step = 1, onValueChange, ...props }, ref) => {
    const [values, setValues] = React.useState<number[]>(defaultValue)
    const trackRef = React.useRef<HTMLDivElement>(null)
    const isDragging = React.useRef<number | null>(null)

    const getPercentage = (value: number) => {
      return ((value - min) / (max - min)) * 100
    }

    const getValue = (percentage: number) => {
      const rawValue = min + (percentage / 100) * (max - min)
      const steppedValue = Math.round(rawValue / step) * step
      return Math.min(max, Math.max(min, steppedValue))
    }

    const updateValue = (index: number, value: number) => {
      const newValues = [...values]
      newValues[index] = value

      // Ensure values don't cross each other
      if (index === 0 && newValues[0] > newValues[1]) {
        newValues[0] = newValues[1]
      } else if (index === 1 && newValues[1] < newValues[0]) {
        newValues[1] = newValues[0]
      }

      setValues(newValues)
      onValueChange?.(newValues)
    }

    const handleMouseDown = (e: React.MouseEvent, index: number) => {
      e.preventDefault()
      isDragging.current = index
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current === null || !trackRef.current) return

      const rect = trackRef.current.getBoundingClientRect()
      const percentage = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100))
      updateValue(isDragging.current, getValue(percentage))
    }

    const handleMouseUp = () => {
      isDragging.current = null
    }

    React.useEffect(() => {
      if (defaultValue !== values) {
        setValues(defaultValue)
      }
    }, [defaultValue])

    React.useEffect(() => {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }, [])

    return (
      <div ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
        <div
          ref={trackRef}
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100"
          onClick={(e) => {
            if (!trackRef.current) return
            const rect = trackRef.current.getBoundingClientRect()
            const percentage = ((e.clientX - rect.left) / rect.width) * 100
            const value = getValue(percentage)

            // Determine which thumb to move (closest one)
            const distanceToFirst = Math.abs(value - values[0])
            const distanceToSecond = values.length > 1 ? Math.abs(value - values[1]) : Number.POSITIVE_INFINITY
            const closestThumb = distanceToFirst <= distanceToSecond ? 0 : 1

            updateValue(closestThumb, value)
          }}
        >
          <div
            className="absolute h-full bg-gradient-to-r from-teal-600 to-blue-500"
            style={{
              left: `${getPercentage(values[0])}%`,
              right: values.length > 1 ? `${100 - getPercentage(values[1])}%` : "0%",
            }}
          />
        </div>

        {values.map((value, index) => (
          <div
            key={index}
            className="absolute h-5 w-5 cursor-pointer rounded-full border-2 border-teal-600 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            style={{
              left: `calc(${getPercentage(value)}% - 10px)`,
            }}
            onMouseDown={(e) => handleMouseDown(e, index)}
            tabIndex={0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
          />
        ))}
      </div>
    )
  },
)

Slider.displayName = "Slider"

export { Slider }

