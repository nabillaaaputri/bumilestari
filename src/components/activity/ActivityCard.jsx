/**
 * Activity Card Component
 * Display single activity dalam format card
 */

import React from 'react'
import { Trash2, Edit2 } from 'lucide-react'
import {
  formatDateShort,
  getCategoryLabel,
  getCategoryIcon,
  getCategoryColor,
  formatCarbonEmission,
} from '../../utils/activityHelpers'

export default function ActivityCard({ activity, onEdit, onDelete }) {
  const handleDelete = () => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus aktivitas "${activity.activity}" pada ${formatDateShort(activity.date)}?`
      )
    ) {
      onDelete(activity.id)
    }
  }

  return (
    <div className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
      {/* Header: Date & Category */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{getCategoryIcon(activity.category)}</span>
          <div>
            <p className="text-xs text-gray-500">{formatDateShort(activity.date)}</p>
            <p className="text-sm font-medium text-gray-800">
              {getCategoryLabel(activity.category)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(activity)}
            className="p-2 rounded-md hover:bg-blue-50 text-blue-600 transition-colors"
            title="Edit aktivitas"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-md hover:bg-red-50 text-red-600 transition-colors"
            title="Hapus aktivitas"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Activity Details */}
      <p className="text-sm font-medium text-gray-700 mb-2">{activity.activity}</p>

      {/* Amount & Emission */}
      <div className="flex items-baseline gap-4">
        <div>
          <p className="text-xs text-gray-500">Jumlah</p>
          <p className="text-lg font-semibold text-gray-800">
            {activity.amount} <span className="text-sm text-gray-600">{activity.unit}</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Emisi Karbon</p>
          <p className="text-lg font-semibold" style={{ color: getCategoryColor(activity.category) }}>
            {formatCarbonEmission(activity.carbonEmission)}
          </p>
        </div>
      </div>

      {/* Notes */}
      {activity.notes && (
        <p className="mt-3 text-xs text-gray-600 italic">💬 {activity.notes}</p>
      )}
    </div>
  )
}
