/**
 * Analysis Summary Component
 * Summary cards for analysis period
 */

import React from 'react'
import { TrendingUp, Calendar, ArrowUp, ArrowDown } from 'lucide-react'
import { formatCarbonEmission } from '../../utils/activityHelpers'
import { calculateTotalEmission, calculateDailyAverageEmission } from '../../utils/carbonCalculator'
import { getHighestEmissionDay, getLowestEmissionDay } from '../../utils/analysisHelpers'
import SummaryCard from '../dashboard/SummaryCard'

export default function AnalysisSummary({ activities = [] }) {
  const totalEmission = calculateTotalEmission(activities)
  const dailyAverage = calculateDailyAverageEmission(activities)
  const highestDay = getHighestEmissionDay(activities)
  const lowestDay = getLowestEmissionDay(activities)

  return (
    <div className="grid gap-x-8 border-y border-primary-100 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        icon={TrendingUp}
        title="Total Emisi"
        value={formatCarbonEmission(totalEmission)}
        subtitle="Pada periode ini"
      />

      <SummaryCard
        icon={Calendar}
        title="Rata-rata per Hari"
        value={formatCarbonEmission(dailyAverage)}
        subtitle="CO₂e per hari"
      />

      <SummaryCard
        icon={ArrowUp}
        title="Hari dengan Emisi Tertinggi"
        value={highestDay ? formatCarbonEmission(highestDay.emission) : '-'}
        subtitle={highestDay ? `Tanggal ${highestDay.date}` : 'Belum ada data'}
      />

      <SummaryCard
        icon={ArrowDown}
        title="Hari dengan Emisi Terendah"
        value={lowestDay ? formatCarbonEmission(lowestDay.emission) : '-'}
        subtitle={lowestDay ? `Tanggal ${lowestDay.date}` : 'Belum ada data'}
      />
    </div>
  )
}
