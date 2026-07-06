'use client'

import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

/**
 * MasonryGrid — generic Pinterest-style layout.
 *
 * Distributes children into columns using round-robin.
 * Each column is an independent vertical stack (flex-col).
 * Tall items no longer force following siblings into the same column.
 * Column count is responsive (1 on mobile, 2 on md+). Gap controlled via className.
 * Zero external deps. Small amount of client JS only for distribution.
 */
export function MasonryGrid({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const items = React.Children.toArray(children)
  const [numCols, setNumCols] = useState(2)

  useEffect(() => {
    const getCols = () => (window.innerWidth < 768 ? 1 : 2)
    setNumCols(getCols())

    const handleResize = () => setNumCols(getCols())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Round-robin distribution: item 0 in col0, item 1 in col1, item 2 in col0, etc.
  // This prevents a tall item from "owning" the rest of its column for subsequent items.
  const columns: React.ReactNode[][] = Array.from({ length: numCols }, () => [])
  items.forEach((item, index) => {
    columns[index % numCols].push(item)
  })

  return (
    <div className={cn('flex', className)}>
      {columns.map((colItems, colIndex) => (
        <div key={colIndex} className="flex-1 flex flex-col gap-8">
          {colItems.map((item, itemIndex) => (
            <div key={itemIndex} className="break-inside-avoid">
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
