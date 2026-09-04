/**
 * Period Selector Component
 * For selecting analysis period
 */

import React from 'react'
import { getPeriodLabel } from '../../utils/analysisHelpers'

export default function AnalysisPeriodSelector({ selectedPeriod, onPeriodChange }) {
  const periods = [
    { value: '7days', label: '7 Hari' },
    { value: '30days', label: '30 Hari' },
    { value: 'all', label: 'Semua Data' },
  ]

  return (
    <div className="flex flex-wrap gap-2 border-b border-primary-100 pb-3">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            selectedPeriod === period.value
              ? 'bg-primary-600 text-white'
              : 'bg-primary-50 text-ink-muted hover:bg-primary-100'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  )
}
