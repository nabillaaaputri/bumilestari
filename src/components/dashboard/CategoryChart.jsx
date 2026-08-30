/**
 * Category Chart Component
 * Pie chart untuk menampilkan breakdown emisi by kategori
 */

import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { getCategoryLabel, getCategoryColor } from '../../utils/activityHelpers'

export default function CategoryChart({ data = {} }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="p-6 rounded-lg border bg-white h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Belum ada data untuk ditampilkan</p>
          <p className="text-sm text-gray-500 mt-1">Mulai catat aktivitas untuk melihat breakdown</p>
        </div>
      </div>
    )
  }

  // Convert data object ke array format untuk recharts
  const chartData = Object.entries(data)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => ({
      name: getCategoryLabel(category),
      value: Math.round(value * 100) / 100,
      category,
    }))
    .sort((a, b) => b.value - a.value)

  if (chartData.length === 0) {
    return (
      <div className="p-6 rounded-lg border bg-white h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Belum ada data untuk ditampilkan</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-lg border bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Emisi berdasarkan Kategori</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value} kg`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `${value} kg CO₂e`}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend dengan breakdown */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {chartData.map((item) => (
          <div key={item.category} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: getCategoryColor(item.category) }}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-600">{item.value} kg CO₂e</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
