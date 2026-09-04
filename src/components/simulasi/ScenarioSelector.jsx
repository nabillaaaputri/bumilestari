/**
 * Scenario Selector Component
 * Dropdown untuk memilih skenario alternatif (emission factor)
 */

import React from 'react'

export default function ScenarioSelector({
  alternatives = [],
  selectedId,
  onSelect,
  filterMode = 'unit',
}) {
  const filterLabel =
    filterMode === 'unit'
      ? 'Menampilkan alternatif dengan unit yang sama'
      : 'Menampilkan alternatif dalam kategori yang sama'

  return (
    <div className="border-t border-primary-600 py-5">
      <label htmlFor="scenario-select" className="dashboard-label block mb-3">
        Skenario Baru
      </label>
      {alternatives.length === 0 ? (
        <p className="text-sm text-ink-muted">
          Tidak ada alternatif skenario yang tersedia untuk aktivitas ini.
        </p>
      ) : (
        <>
          <select
            id="scenario-select"
            value={selectedId}
            onChange={(e) => onSelect(e.target.value)}
            className="w-full rounded-xl border border-primary-100 bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
          >
            <option value="">-- Pilih Skenario --</option>
            {alternatives.map((factor) => (
              <option key={factor.id} value={factor.id}>
                {factor.name} ({factor.unit}) — {factor.emissionFactor} kg CO₂e/{factor.unit}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-ink-subtle">{filterLabel}</p>
        </>
      )}
    </div>
  )
}
