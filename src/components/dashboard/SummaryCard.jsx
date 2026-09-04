/**
 * Summary Card Component
 * Reusable card untuk menampilkan metric summary di dashboard
 */

import React from 'react'

export default function SummaryCard({
  icon: Icon,
  title,
  value,
  subtitle,
  className = '',
  accent = 'emerald',
  featured = false,
}) {
  return (
    <div className={`group border-b border-primary-100 py-5 ${featured ? 'border-t border-primary-600' : ''} ${className}`}>
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="dashboard-label">{title}</p>
          <p className={`mt-2 font-bold tracking-tight text-ink ${featured ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'}`}>{value}</p>
          {subtitle && <p className="mt-1.5 text-xs text-ink-subtle">{subtitle}</p>}
        </div>
        {Icon && <Icon size={19} strokeWidth={1.7} className="mt-1 shrink-0 text-primary-600 transition-transform group-hover:translate-x-1" />}
      </div>
    </div>
  )
}
