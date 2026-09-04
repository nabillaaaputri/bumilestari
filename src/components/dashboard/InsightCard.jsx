/**
 * Insight Card Component
 * Display insights based on user data
 */

import React, { useMemo } from 'react'
import { TrendingUp, AlertCircle, Zap } from 'lucide-react'
import { getCategoryLabel } from '../../utils/activityHelpers'
import { getTopEmitters, calculateTotalEmission } from '../../utils/carbonCalculator'

const insightStyles = {
  'top-contributor': {
    icon: AlertCircle,
    accent: 'amber',
    iconBg: 'bg-gradient-to-br from-amber-50 to-orange-100 text-amber-700',
    ring: 'ring-amber-100/80',
  },
  'daily-average': {
    icon: Zap,
    accent: 'blue',
    iconBg: 'bg-gradient-to-br from-sky-50 to-blue-100 text-sky-700',
    ring: 'ring-sky-100/80',
  },
  'category-count': {
    icon: TrendingUp,
    accent: 'emerald',
    iconBg: 'bg-gradient-to-br from-emerald-50 to-green-100 text-emerald-700',
    ring: 'ring-emerald-100/80',
  },
}

export default function InsightCard({ activities = [] }) {
  const insights = useMemo(() => {
    if (activities.length === 0) return []

    const result = []
    const topEmitters = getTopEmitters(activities, 3)
    const totalEmission = calculateTotalEmission(activities)

    if (topEmitters.length > 0) {
      const topEmission = topEmitters[0].carbonEmission
      const percentage = ((topEmission / totalEmission) * 100).toFixed(1)

      result.push({
        type: 'top-contributor',
        title: 'Kontributor Terbesar',
        description: `${topEmitters[0].activity} berkontribusi ${percentage}% dari total emisimu`,
      })
    }

    const dailyAverage =
      Math.round((totalEmission / (activities.length || 1)) * 100) / 100
    result.push({
      type: 'daily-average',
      title: 'Rata-rata per Aktivitas',
      description: `Setiap aktivitas merata-rata menghasilkan ${dailyAverage} kg CO₂e`,
    })

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
      })
    }

    return result
  }, [activities])

  if (insights.length === 0) {
    return null
  }

  return (
    <div>
      <div className="border-t border-primary-600">
        {insights.map((insight, idx) => {
          const style = insightStyles[insight.type] || insightStyles['category-count']
          const Icon = style.icon
          return (
            <div key={idx} className="border-b border-primary-100 py-5">
              <div className="flex items-start gap-3">
                <Icon size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-terracotta" />
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold text-ink">{insight.title}</p>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">{insight.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
