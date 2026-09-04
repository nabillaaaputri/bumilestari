/**
 * Activity Selector Component
 * Dropdown untuk memilih aktivitas dari data user sebagai baseline simulasi
 */

import React from 'react'
import { formatCarbonEmission, formatDateShort, getActivityName } from '../../utils/activityHelpers'

export default function ActivitySelector({ activities = [], selectedId, onSelect }) {
  if (activities.length === 0) return null

  return (
    <div className="border-t border-primary-600 py-5">
      <label htmlFor="activity-select" className="dashboard-label block mb-3">
        Aktivitas Saat Ini
      </label>
      <select
        id="activity-select"
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full rounded-xl border border-primary-100 bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
      >
        <option value="">-- Pilih Aktivitas --</option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {formatDateShort(activity.date)} — {getActivityName(activity.emissionFactorId)} —{' '}
            {activity.amount} {activity.unit} ({formatCarbonEmission(activity.carbonEmission)})
          </option>
        ))}
      </select>
    </div>
  )
}
