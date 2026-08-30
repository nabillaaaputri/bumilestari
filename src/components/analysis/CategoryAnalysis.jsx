/**
 * Category Analysis Component
 * Bar chart untuk breakdown emisi by kategori
 */

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { calculateEmissionByCategory } from '../../utils/carbonCalculator'
import { getCategoryLabel, getCategoryColor } from '../../utils/activityHelpers'
import { ACTIVITY_CATEGORIES } from '../../constants/emissionFactors'

export default function CategoryAnalysis({ activities = [] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="p-6 rounded-lg border bg-white h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Belum ada data untuk ditampilkan</p>
        </div>
      </div>
    )
  }

  // Calculate emission for each category
  const categories = Object.values(ACTIVITY_CATEGORIES)
  const chartData = categories
    .map((category) => ({
      name: getCategoryLabel(category),
      category,
      emission: Math.round(calculateEmissionByCategory(activities, category) * 100) / 100,
    }))
    .filter((item) => item.emission > 0)
    .sort((a, b) => b.emission - a.emission)

  if (chartData.length === 0) {
    return (
      <div className="p-6 rounded-lg border bg-white h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Belum ada data untuk ditampilkan</p>
        </div>
      </div>
    )
  }

  // Calculate total for percentage
  const total = chartData.reduce((sum, item) => sum + item.emission, 0)

  return (
    <div className="p-6 rounded-lg border bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Emisi berdasarkan Kategori</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value, name, props) => {
              const percentage = Math.round((value / total) * 100)
              return [`${value} kg CO₂e (${percentage}%)`, 'Emisi']
            }}
          />
          <Bar dataKey="emission" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Category Breakdown Table */}
      <div className="mt-6 space-y-2">
        {chartData.map((item) => {
          const percentage = Math.round((item.emission / total) * 100)
          return (
            <div key={item.category} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: getCategoryColor(item.category) }}
                />
                <span className="text-sm font-medium text-gray-800">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{item.emission} kg</p>
                <p className="text-xs text-gray-600">{percentage}% dari total</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
