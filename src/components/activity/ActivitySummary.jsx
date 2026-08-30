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
    <div className="grid gap-4 sm:grid-cols-3">
      {/* Total Activities */}
      <div className="p-4 rounded-lg border bg-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Aktivitas</p>
            <p className="mt-2 text-2xl font-semibold text-gray-800">
              {activities.length}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-blue-50">
            <AlertCircle className="text-blue-600" size={20} />
          </div>
        </div>
      </div>

      {/* Total Emisi */}
      <div className="p-4 rounded-lg border bg-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Emisi Karbon</p>
            <p className="mt-2 text-2xl font-semibold text-green-700">
              {formatCarbonEmissionWithAutoUnit(totalEmission)}
            </p>
          </div>
          <div className="p-2 rounded-lg bg-green-50">
            <Leaf className="text-green-600" size={20} />
          </div>
        </div>
      </div>

      {/* Emisi Terbesar */}
      <div className="p-4 rounded-lg border bg-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600">Emisi Terbesar</p>
            {largestEmitter ? (
              <>
                <p className="mt-2 text-sm font-medium text-gray-800">
                  {getCategoryIcon(largestEmitter.category)} {largestEmitter.activity}
                </p>
                <p className="text-lg font-semibold text-amber-600">
                  {formatCarbonEmissionWithAutoUnit(largestEmitter.carbonEmission)}
                </p>
              </>
            ) : (
              <p className="mt-2 text-gray-500 text-sm">-</p>
            )}
          </div>
          <div className="p-2 rounded-lg bg-amber-50">
            <TrendingUp className="text-amber-600" size={20} />
          </div>
        </div>
      </div>
    </div>
  )
}
