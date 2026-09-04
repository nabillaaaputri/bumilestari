/**
 * Recent Activities Component
 * Display 5 aktivitas terbaru dengan link ke halaman aktivitas
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  formatDateShort,
  getCategoryIcon,
  getCategoryLabel,
  formatCarbonEmission,
  getCategoryColor,
} from '../../utils/activityHelpers'

export default function RecentActivities({ activities = [] }) {
  const recentActivities = activities
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  if (recentActivities.length === 0) {
    return (
      <div className="dashboard-card p-6">
        <p className="dashboard-label">Aktivitas</p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink">Aktivitas Terbaru</h3>
        <div className="py-10 text-center">
          <p className="font-medium text-ink-muted">Belum ada aktivitas</p>
          <p className="mt-1 text-sm text-ink-subtle">Mulai catat aktivitas Anda sekarang</p>
          <Link
            to="/aktivitas"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            Tambah Aktivitas
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-primary-600">
      <div className="mb-3 flex items-start justify-between gap-4 pt-5">
        <div>
          <p className="dashboard-label">Aktivitas</p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink">Aktivitas Terbaru</h3>
        </div>
        <Link
          to="/aktivitas"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 transition-colors hover:text-primary-500"
        >
          Lihat Semua
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="divide-y divide-primary-100">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-primary-50/60"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-base" style={{ color: getCategoryColor(activity.category) }}>
                {getCategoryIcon(activity.category)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{activity.activity}</p>
                <p className="text-xs text-ink-subtle">
                  {getCategoryLabel(activity.category)} · {formatDateShort(activity.date)}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-sm font-semibold text-emerald-700">
                {formatCarbonEmission(activity.carbonEmission, 1)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link to="/aktivitas" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-700 transition-colors hover:text-primary-500">
        Lihat Semua Aktivitas
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}
