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
} from '../../utils/activityHelpers'

export default function RecentActivities({ activities = [] }) {
  // Get 5 most recent activities
  const recentActivities = activities
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  if (recentActivities.length === 0) {
    return (
      <div className="p-6 rounded-lg border bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
        <div className="py-8 text-center">
          <p className="text-gray-600">Belum ada aktivitas</p>
          <p className="text-sm text-gray-500 mt-1">Mulai catat aktivitas Anda sekarang</p>
          <Link
            to="/aktivitas"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 font-medium transition-colors text-sm"
          >
            Tambah Aktivitas
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-lg border bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h3>
        <Link to="/aktivitas" className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
          Lihat Semua
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-3">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xl">{getCategoryIcon(activity.category)}</span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{activity.activity}</p>
                <p className="text-xs text-gray-600">
                  {getCategoryLabel(activity.category)} · {formatDateShort(activity.date)}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-green-700">
                {formatCarbonEmission(activity.carbonEmission, 1)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/aktivitas"
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-green-200 text-green-600 hover:bg-green-50 font-medium transition-colors text-sm"
      >
        Lihat Semua Aktivitas
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}
