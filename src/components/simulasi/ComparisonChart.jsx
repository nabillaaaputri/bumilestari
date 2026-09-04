/**
 * Comparison Chart Component
 * Bar chart untuk perbandingan emisi saat ini vs simulasi
 */

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts'

export default function ComparisonChart({ result }) {
  if (!result) {
    return (
      <div className="p-6 rounded-lg border bg-white h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Pilih aktivitas dan skenario untuk melihat perbandingan</p>
        </div>
      </div>
    )
  }

  const chartData = [
    {
      name: 'Saat Ini',
      emission: result.currentEmission,
      fill: '#6B7280',
    },
    {
      name: 'Simulasi',
      emission: result.simulatedEmission,
      fill: result.isIncrease ? '#EF4444' : '#10B981',
    },
  ]

  return (
    <div className="p-6 rounded-lg border bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Perbandingan Emisi</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
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
            formatter={(value) => [`${value} kg CO₂e`, 'Emisi']}
          />
          <Legend />
          <Bar dataKey="emission" name="Emisi Karbon" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
