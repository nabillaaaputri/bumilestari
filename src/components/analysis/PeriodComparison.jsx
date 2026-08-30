/**
 * Period Comparison Component
 * Compare current period with previous period
 */

import React from 'react'
import { TrendingUp, TrendingDown, Equal } from 'lucide-react'
import { comparePeriods, getPreviousPeriodActivities } from '../../utils/analysisHelpers'
import { formatCarbonEmissionWithAutoUnit } from '../../utils/activityHelpers'

export default function PeriodComparison({ activities = [], period = '30days' }) {
  const currentPeriodActivities = activities
  const previousPeriodActivities = getPreviousPeriodActivities(activities, period)

  const comparison = comparePeriods(currentPeriodActivities, previousPeriodActivities)

  if (!previousPeriodActivities || previousPeriodActivities.length === 0) {
    return (
      <div className="p-6 rounded-lg border bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Perbandingan Periode</h3>
        <p className="text-center py-8 text-gray-600">
          {comparison.status}
        </p>
      </div>
    )
  }

  const trendIcon = 
    comparison.trend === 'up' ? (
      <TrendingUp className="text-red-600" size={24} />
    ) : comparison.trend === 'down' ? (
      <TrendingDown className="text-green-600" size={24} />
    ) : (
      <Equal className="text-blue-600" size={24} />
    )

  const trendColor =
    comparison.trend === 'up'
      ? 'text-red-600'
      : comparison.trend === 'down'
      ? 'text-green-600'
      : 'text-blue-600'

  const trendBgColor =
    comparison.trend === 'up'
      ? 'bg-red-50'
      : comparison.trend === 'down'
      ? 'bg-green-50'
      : 'bg-blue-50'

  return (
    <div className={`p-6 rounded-lg border ${trendBgColor}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Perbandingan Periode</h3>

      <div className="flex items-start gap-6">
        {/* Current vs Previous */}
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">Periode saat ini</p>
          <p className="text-2xl font-bold text-gray-800">
            {formatCarbonEmissionWithAutoUnit(comparison.currentTotal)}
          </p>
        </div>

        {/* Trend Icon */}
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 rounded-full bg-white">
            {trendIcon}
          </div>
          <p className={`text-lg font-bold ${trendColor}`}>
            {comparison.percentageChange > 0 ? '+' : ''}{comparison.percentageChange}%
          </p>
        </div>

        {/* Previous Period */}
        <div className="flex-1 text-right">
          <p className="text-sm text-gray-600 mb-2">Periode sebelumnya</p>
          <p className="text-2xl font-bold text-gray-800">
            {formatCarbonEmissionWithAutoUnit(comparison.previousTotal)}
          </p>
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-4 p-3 rounded-lg bg-white bg-opacity-50">
        <p className={`text-sm font-medium ${trendColor}`}>
          {comparison.trend === 'up' && '⚠️'}
          {comparison.trend === 'down' && '✨'}
          {comparison.trend === 'stable' && '➡️'}
          {' '}
          {comparison.status}
        </p>
      </div>
    </div>
  )
}
