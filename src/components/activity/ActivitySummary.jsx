/**
 * Activity Summary Component
 * Menampilkan ringkasan statistik aktivitas
 */

import React, { useMemo } from 'react'
import { TrendingUp, Leaf, AlertCircle } from 'lucide-react'
import { useActivityStore } from '../../store/activityStore'
import {
  formatCarbonEmissionWithAutoUnit,
  getCategoryLabel,
  getCategoryIcon,
} from '../../utils/activityHelpers'
import {
  calculateEmissionByCategory,
  calculateTotalEmission,
  getTopEmitters,
} from '../../utils/carbonCalculator'

export default function ActivitySummary() {
  const activities = useActivityStore((state) => state.activities)

  const { totalEmission, topEmitters } = useMemo(() => {
    return {
      totalEmission: calculateTotalEmission(activities),
      topEmitters: getTopEmitters(activities, 1),
    }
  }, [activities])

  const largestEmitter = topEmitters[0]

  return (
    <div className="grid gap-x-8 border-y border-primary-100 sm:grid-cols-3">
      {/* Total Activities */}
      <div className="py-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="dashboard-label">Total Aktivitas</p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {activities.length}
            </p>
          </div>
          <div>
            <AlertCircle className="text-primary-600" size={18} />
          </div>
        </div>
      </div>

      {/* Total Emisi */}
      <div className="py-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="dashboard-label">Total Emisi Karbon</p>
            <p className="mt-2 text-3xl font-bold text-primary-700">
              {formatCarbonEmissionWithAutoUnit(totalEmission)}
            </p>
          </div>
          <div>
            <Leaf className="text-primary-600" size={18} />
          </div>
        </div>
      </div>

      {/* Emisi Terbesar */}
      <div className="py-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="dashboard-label">Emisi Terbesar</p>
            {largestEmitter ? (
              <>
                <p className="mt-2 text-sm font-medium text-ink">
                  {getCategoryIcon(largestEmitter.category)} {largestEmitter.activity}
                </p>
                <p className="text-lg font-semibold text-terracotta">
                  {formatCarbonEmissionWithAutoUnit(largestEmitter.carbonEmission)}
                </p>
              </>
            ) : (
              <p className="mt-2 text-gray-500 text-sm">-</p>
            )}
          </div>
          <div>
            <TrendingUp className="text-terracotta" size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}
