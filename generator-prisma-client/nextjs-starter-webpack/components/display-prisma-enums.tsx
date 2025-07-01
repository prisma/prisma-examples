'use client'

import { QuoteKind } from '@/lib/generated/prisma/enums'
import { useState, useEffect } from 'react'

export function DisplayPrismaEnums() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Note: this avoid "Hydration failed" errors in Next.js
    setMounted(true)
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="border-4 border-dashed border-red-400 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 text-xs text-yellow-800 dark:text-yellow-200 shadow-sm">
        <div className="mb-2 font-semibold text-center">
          Debug Info: Prisma Enums (Client Side)
        </div>
        <div className="mb-1 text-center">
          Rendered on client?{' '}
          <span className="font-mono">{mounted ? 'Yes' : 'No'}</span>
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold">
            QuoteKind Enum: {QuoteKind.Fact}; {QuoteKind.Opinion}
          </span>
        </div>
      </div>
    </div>
  )
}