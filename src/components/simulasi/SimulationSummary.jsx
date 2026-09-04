/**
 * Simulation Summary Component
 * Ringkasan hasil simulasi: current, simulated, saving/increase, percentage
 */

import React from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { formatCarbonEmission } from '../../utils/activityHelpers'

export default function SimulationSummary({ result }) {
  if (!result) return null

  const {
    currentEmission,
    simulatedEmission,
    potentialSaving,
    emissionIncrease,
    isIncrease,
    reductionPercentage,
    currentFactor,
    simulatedFactor,
    amount,
  } = result

  return (
    <div className="space-y-8">
      <div className="border-y border-primary-100 py-7">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <p className="dashboard-label">Saat ini</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-ink">{formatCarbonEmission(currentEmission)}</p>
            <p className="mt-1 text-sm text-ink-muted">{currentFactor?.name || 'Aktivitas terpilih'}</p>
          </div>
          <span className="text-2xl text-terracotta">→</span>
          <div className="sm:text-right">
            <p className="dashboard-label">Skenario baru</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-primary-700">{formatCarbonEmission(simulatedEmission)}</p>
            <p className="mt-1 text-sm text-ink-muted">{simulatedFactor?.name || 'Skenario baru'}</p>
          </div>
        </div>
        <div className={`mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-5 ${isIncrease ? 'border-red-200' : 'border-primary-100'}`}>
          <div className="flex items-center gap-2 text-sm font-semibold text-ink"><span className={`flex h-8 w-8 items-center justify-center rounded-full ${isIncrease ? 'bg-red-50 text-red-600' : 'bg-primary-50 text-primary-700'}`}>{isIncrease ? <TrendingUp size={16} /> : <TrendingDown size={16} />}</span>{isIncrease ? 'Emisi meningkat' : 'Potensi penghematan'}</div>
          <p className={`text-2xl font-bold ${isIncrease ? 'text-red-600' : 'text-primary-700'}`}>{isIncrease ? formatCarbonEmission(emissionIncrease) : formatCarbonEmission(potentialSaving)} <span className="text-sm font-normal text-ink-muted">({reductionPercentage > 0 ? '+' : ''}{reductionPercentage}%)</span></p>
        </div>
      </div>

      <div className="border-t border-primary-100 pt-5">
        <h3 className="text-lg font-semibold text-ink">Perbandingan Detail</h3>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div className="border-l-2 border-primary-100 pl-4">
            <p className="text-xs text-ink-subtle uppercase tracking-wide mb-1">Sebelum</p>
            <p className="font-medium text-ink">{currentFactor?.name}</p>
            <p className="text-sm text-ink-muted mt-1">
              {amount} {currentFactor?.unit} → {formatCarbonEmission(currentEmission)}
            </p>
          </div>
          <div className={`border-l-2 pl-4 ${isIncrease ? 'border-red-200' : 'border-primary-600'}`}>
            <p className="text-xs text-ink-subtle uppercase tracking-wide mb-1">Sesudah</p>
            <p className="font-medium text-ink">{simulatedFactor?.name}</p>
            <p className="text-sm text-ink-muted mt-1">
              {amount} {simulatedFactor?.unit} → {formatCarbonEmission(simulatedEmission)}
            </p>
          </div>
        </div>
        {isIncrease ? (
            <p className="mt-5 text-sm text-red-700 font-medium">
            Skenario ini meningkatkan emisi sebesar {formatCarbonEmission(emissionIncrease)} (
            {Math.abs(reductionPercentage)}% lebih tinggi).
          </p>
        ) : potentialSaving > 0 ? (
            <p className="mt-5 text-sm text-primary-700 font-medium">
            Skenario ini berpotensi mengurangi emisi sebesar {formatCarbonEmission(potentialSaving)} (
            {reductionPercentage}% lebih rendah).
          </p>
        ) : (
            <p className="mt-5 text-sm text-ink-muted font-medium">
            Tidak ada perubahan emisi antara skenario saat ini dan simulasi.
          </p>
        )}
      </div>
    </div>
  )
}
