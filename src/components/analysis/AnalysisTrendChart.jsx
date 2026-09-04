/**
 * Analysis Trend Chart Component
 * Line chart untuk analysis period
 */

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateDailyEmission, getTopEmitters } from '../../utils/carbonCalculator'

export default function AnalysisTrendChart({ activities = [] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center border-t border-primary-600">
        <div className="text-center">
          <p className="text-gray-600">Belum ada data untuk ditampilkan</p>
          <p className="text-sm text-gray-500 mt-1">Mulai catat aktivitas untuk melihat trend</p>
        </div>
      </div>
    )
  }

  const dailyData = calculateDailyEmission(activities)
  if (dailyData.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center border-t border-primary-600">
        <div className="text-center">
          <p className="text-gray-600">Belum ada data untuk periode ini</p>
        </div>
      </div>
    )
  }

  // Find highest emission day to highlight
  const topEmitters = getTopEmitters(activities, 1)
  const highestDay = topEmitters[0]?.date

  const formattedData = dailyData.map((item) => ({
    date: item.date,
    dateShort: item.date.split('-').slice(2, 3)[0],
    emission: Math.round(item.emission * 100) / 100,
    isHighest: item.date === highestDay,
  }))

  return (
    <div className="border-t border-primary-600 pt-5">
      <h3 className="text-lg font-semibold text-ink mb-4">Trend Emisi Harian</h3>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="dateShort" 
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
            labelFormatter={(value) => `Tanggal: ${value}`}
            formatter={(value) => [`${value} kg CO₂e`, 'Emisi']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="emission"
            stroke="#10b981"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, payload } = props
              const isHighest = payload?.isHighest
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHighest ? 6 : 4}
                  fill={isHighest ? '#ef4444' : '#10b981'}
                />
              )
            }}
            activeDot={{ r: 6 }}
            name="Emisi Harian"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
