/**
 * Summary Card Component
 * Reusable card untuk menampilkan metric summary di dashboard
 */

import React from 'react'

export default function SummaryCard({ icon: Icon, title, value, subtitle, className = '' }) {
  return (
    <div className={`p-6 rounded-lg border bg-white ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="mt-3 text-3xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="p-3 rounded-lg bg-gray-50">
            <Icon size={24} className="text-gray-700" />
          </div>
        )}
      </div>
    </div>
  )
}
