/**
 * Insight Card Component
 * Display insights based on user data
 */

import React, { useMemo } from 'react'
import { TrendingUp, AlertCircle, Zap } from 'lucide-react'
import { getCategoryLabel, getCategoryIcon } from '../../utils/activityHelpers'
import { getTopEmitters, calculateTotalEmission } from '../../utils/carbonCalculator'

export default function InsightCard({ activities = [] }) {
  const insights = useMemo(() => {
    if (activities.length === 0) return []

    const result = []
    const topEmitters = getTopEmitters(activities, 3)
    const totalEmission = calculateTotalEmission(activities)

    // Insight 1: Top contributor
    if (topEmitters.length > 0) {
      const topCategory = topEmitters[0].category
      const topEmission = topEmitters[0].carbonEmission
      const percentage = ((topEmission / totalEmission) * 100).toFixed(1)

      result.push({
        type: 'top-contributor',
        title: 'Kontributor Terbesar',
        description: `${topEmitters[0].activity} berkontribusi ${percentage}% dari total emisimu`,
        icon: AlertCircle,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
      })
    }

    // Insight 2: Daily average
    const dailyAverage = Math.round(
      (totalEmission / (activities.length || 1)) * 100
    ) / 100
    result.push({
      type: 'daily-average',
      title: 'Rata-rata per Aktivitas',
      description: `Setiap aktivitas merata-rata menghasilkan ${dailyAverage} kg CO₂e`,
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    })

    // Insight 3: Category breakdown
    const categoryCount = {}
    activities.forEach((act) => {
      categoryCount[act.category] = (categoryCount[act.category] || 0) + 1
    })
    const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]
    if (topCategory) {
      result.push({
        type: 'category-count',
        title: `Kategori "${getCategoryLabel(topCategory[0])}" Terbanyak`,
        description: `Kamu memiliki ${topCategory[1]} aktivitas di kategori ini`,
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      })
    }

    return result
  }, [activities])

  if (insights.length === 0) {
    return null
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Insight</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, idx) => {
          const Icon = insight.icon
          return (
            <div key={idx} className={`p-4 rounded-lg border ${insight.bgColor}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                  <Icon size={20} className={insight.color} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${insight.color}`}>{insight.title}</p>
                  <p className="text-sm text-gray-700 mt-1">{insight.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
