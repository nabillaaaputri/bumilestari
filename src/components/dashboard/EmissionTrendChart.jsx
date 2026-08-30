/**
 * Emission Trend Chart Component
 * Line chart untuk menampilkan trend emisi dari waktu ke waktu
 */

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatDateShort } from '../../utils/activityHelpers'

export default function EmissionTrendChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 rounded-lg border bg-white h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Belum ada data untuk ditampilkan</p>
          <p className="text-sm text-gray-500 mt-1">Mulai catat aktivitas untuk melihat trend</p>
        </div>
      </div>
    )
  }

  // Format data untuk chart
  const formattedData = data.map((item) => ({
    date: item.date,
    dateShort: item.date.split('-').slice(2, 3)[0], // Day only: "15"
    emission: Math.round(item.emission * 100) / 100,
  }))

  return (
    <div className="p-6 rounded-lg border bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Trend Emisi Karbon</h3>
      <ResponsiveContainer width="100%" height={300}>
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
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
            name="Emisi Harian"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
