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
    <div className="flex gap-3 flex-wrap">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedPeriod === period.value
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  )
}
