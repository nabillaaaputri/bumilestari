/**
 * Category Chart Component
 * Pie chart untuk menampilkan breakdown emisi by kategori
 */

import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { getCategoryLabel, getCategoryColor } from '../../utils/activityHelpers'

export default function CategoryChart({ data = {} }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex h-96 items-center justify-center border-t border-primary-600 p-6">
        <div className="text-center">
          <p className="font-medium text-ink-muted">Belum ada data untuk ditampilkan</p>
          <p className="mt-1 text-sm text-ink-subtle">Mulai catat aktivitas untuk melihat breakdown</p>
        </div>
      </div>
    )
  }

  const chartData = Object.entries(data)
    .filter(([, value]) => value > 0)
    .map(([category, value]) => ({
      name: getCategoryLabel(category),
      value: Math.round(value * 100) / 100,
      category,
    }))
    .sort((a, b) => b.value - a.value)

  if (chartData.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center border-t border-primary-600 p-6">
        <div className="text-center">
          <p className="font-medium text-ink-muted">Belum ada data untuk ditampilkan</p>
        </div>
      </div>
    )
  }

  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="border-t border-primary-600 pt-5">
      <div className="mb-6">
        <p className="dashboard-label">Distribusi</p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink">Emisi per Kategori</h3>
        <p className="mt-0.5 text-sm text-ink-subtle">Proporsi kontribusi emisi berdasarkan kategori</p>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={105}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} kg CO₂e`, 'Emisi']}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e8eeeb',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(26, 46, 35, 0.08)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-subtle">Total</p>
          <p className="text-xl font-bold text-ink">{total.toFixed(1)}</p>
          <p className="text-xs text-ink-subtle">kg CO₂e</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {chartData.map((item) => {
          const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0
          return (
            <div
              key={item.category}
              className="flex items-center gap-3 border-b border-primary-100 px-1 py-3"
            >
              <div
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: getCategoryColor(item.category) }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                <p className="text-xs text-ink-subtle">
                  {item.value} kg · {percentage}%
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
