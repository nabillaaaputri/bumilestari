/**
 * Top Contributors Component
 * Display top 5 activities by emission
 */

import React from 'react'
import { getTopEmitters, calculateTotalEmission } from '../../utils/carbonCalculator'
import { getCategoryIcon, getCategoryLabel, formatCarbonEmission } from '../../utils/activityHelpers'

export default function TopContributors({ activities = [] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="p-6 rounded-lg border bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Penyumbang Emisi Terbesar</h3>
        <p className="text-center py-8 text-gray-600">Belum ada data untuk ditampilkan</p>
      </div>
    )
  }

  const topEmitters = getTopEmitters(activities, 5)
  const total = calculateTotalEmission(activities)

  if (topEmitters.length === 0) {
    return (
      <div className="p-6 rounded-lg border bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Penyumbang Emisi Terbesar</h3>
        <p className="text-center py-8 text-gray-600">Belum ada data untuk ditampilkan</p>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-lg border bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Penyumbang Emisi Terbesar</h3>
      <div className="space-y-4">
        {topEmitters.map((activity, index) => {
          const percentage = Math.round((activity.carbonEmission / total) * 100)
          return (
            <div key={activity.id} className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-bold text-green-700">{index + 1}</span>
              </div>

              {/* Icon & Activity Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCategoryIcon(activity.category)}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800 truncate">{activity.activity}</p>
                    <p className="text-xs text-gray-600">{getCategoryLabel(activity.category)} • {activity.date}</p>
                  </div>
                </div>
              </div>

              {/* Emission & Percentage */}
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-green-700">{formatCarbonEmission(activity.carbonEmission)}</p>
                <p className="text-xs text-gray-600">{percentage}% dari total</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
