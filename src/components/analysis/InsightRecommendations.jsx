/**
 * Insight & Recommendations Component
 */

import React, { useMemo } from 'react'
import { Lightbulb, AlertCircle, CheckCircle } from 'lucide-react'
import { generateInsights, getRecommendationForCategory } from '../../utils/analysisHelpers'
import { calculateEmissionByCategory } from '../../utils/carbonCalculator'
import { getCategoryLabel } from '../../utils/activityHelpers'
import { ACTIVITY_CATEGORIES } from '../../constants/emissionFactors'

export default function InsightRecommendations({ activities = [] }) {
  const insights = useMemo(() => {
    return generateInsights(activities)
  }, [activities])

  // Get top category untuk rekomendasi
  const topCategory = useMemo(() => {
    if (activities.length === 0) return null

    const categories = Object.values(ACTIVITY_CATEGORIES)
    let maxEmission = 0
    let topCat = null

    categories.forEach((category) => {
      const emission = calculateEmissionByCategory(activities, category)
      if (emission > maxEmission) {
        maxEmission = emission
        topCat = category
      }
    })

    return topCat
  }, [activities])

  const recommendation = topCategory ? getRecommendationForCategory(topCategory) : null

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Insights */}
      <div className="p-6 rounded-lg border bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={24} className="text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-800">Insight untukmu</h3>
        </div>

        {insights.length === 0 ? (
          <p className="text-gray-600">Belum ada insight untuk ditampilkan</p>
        ) : (
          <div className="space-y-3">
            {insights.map((insight, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle size={18} className="text-green-600" />
                </div>
                <p className="text-sm text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="p-6 rounded-lg border bg-blue-50">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={24} className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Rekomendasi</h3>
        </div>

        {recommendation ? (
          <div>
            <p className="text-sm text-gray-700 mb-4">
              Berdasarkan data analisismu, kategori <span className="font-semibold">{topCategory && getCategoryLabel(topCategory)}</span> adalah penyumbang emisi terbesar.
            </p>
            <div className="p-4 rounded-lg bg-white border-l-4 border-blue-600">
              <p className="text-sm text-gray-800">{recommendation}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-700">
            Mulai catat lebih banyak aktivitas untuk mendapatkan rekomendasi yang lebih akurat.
          </p>
        )}
      </div>
    </div>
  )
}
