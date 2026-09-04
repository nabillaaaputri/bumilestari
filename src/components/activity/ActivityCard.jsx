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
    <div className="group border-t border-primary-100 py-5 transition-colors hover:bg-primary-50/50 sm:px-2">
      {/* Header: Date & Category */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-base" style={{ color: getCategoryColor(activity.category) }}>{getCategoryIcon(activity.category)}</span>
          <div>
            <p className="text-xs text-ink-subtle">{formatDateShort(activity.date)}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">
              {getCategoryLabel(activity.category)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(activity)}
            className="p-2 text-primary-600 opacity-60 transition-colors hover:bg-primary-50 hover:opacity-100"
            title="Edit aktivitas"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-terracotta opacity-60 transition-colors hover:bg-terracotta-light hover:opacity-100"
            title="Hapus aktivitas"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Activity Details */}
      <p className="mt-4 text-base font-semibold text-ink">{activity.activity}</p>

      {/* Amount & Emission */}
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs text-ink-subtle">Jumlah</p>
          <p className="text-base font-semibold text-ink">
            {activity.amount} <span className="text-sm text-gray-600">{activity.unit}</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-ink-subtle">Emisi Karbon</p>
          <p className="text-base font-semibold" style={{ color: getCategoryColor(activity.category) }}>
            {formatCarbonEmission(activity.carbonEmission)}
          </p>
        </div>
      </div>

      {/* Notes */}
      {activity.notes && (
        <p className="mt-3 text-xs text-ink-muted italic">{activity.notes}</p>
      )}
    </div>
  )
}
