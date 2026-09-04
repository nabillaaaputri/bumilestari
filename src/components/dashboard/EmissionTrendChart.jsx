/**
 * Emission Trend Chart Component
 * Line chart untuk menampilkan trend emisi dari waktu ke waktu
 */

import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function EmissionTrendChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center border-t border-primary-600 p-6">
        <div className="text-center">
          <p className="font-medium text-ink-muted">Belum ada data untuk ditampilkan</p>
          <p className="mt-1 text-sm text-ink-subtle">Mulai catat aktivitas untuk melihat trend</p>
        </div>
      </div>
    )
  }

  const formattedData = data.map((item) => ({
    date: item.date,
    dateShort: item.date.split('-').slice(2, 3)[0],
    emission: Math.round(item.emission * 100) / 100,
  }))

  return (
    <div className="border-t border-primary-600 pt-5">
      <div className="mb-6">
        <p className="dashboard-label">Analisis Harian</p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink">Trend Emisi Karbon</h3>
        <p className="mt-0.5 text-sm text-ink-subtle">Perkembangan emisi harian dalam kg CO₂e</p>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={formattedData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="emissionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8eeeb" vertical={false} />
          <XAxis
            dataKey="dateShort"
            stroke="#8b9a92"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#8b9a92"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: '12px' }}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e8eeeb',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(26, 46, 35, 0.08)',
            }}
            labelFormatter={(value) => `Tanggal: ${value}`}
            formatter={(value) => [`${value} kg CO₂e`, 'Emisi']}
          />
          <Area
            type="monotone"
            dataKey="emission"
            stroke="#059669"
            strokeWidth={2.5}
            fill="url(#emissionGradient)"
            dot={{ fill: '#059669', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#047857', stroke: '#fff', strokeWidth: 2 }}
            name="Emisi Harian"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
