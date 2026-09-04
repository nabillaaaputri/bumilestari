import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'
import { useActivityStore } from '../store/activityStore'
import SectionTitle from '../components/SectionTitle'
import AnalysisPeriodSelector from '../components/analysis/AnalysisPeriodSelector'
import AnalysisSummary from '../components/analysis/AnalysisSummary'
import AnalysisTrendChart from '../components/analysis/AnalysisTrendChart'
import CategoryAnalysis from '../components/analysis/CategoryAnalysis'
import TopContributors from '../components/analysis/TopContributors'
import PeriodComparison from '../components/analysis/PeriodComparison'
import InsightRecommendations from '../components/analysis/InsightRecommendations'
import { filterActivitiesByPeriod, formatPeriodRange } from '../utils/analysisHelpers'

export default function Analisis() {
  const [selectedPeriod, setSelectedPeriod] = useState('30days')
  const activities = useActivityStore((state) => state.activities)

  // Filter activities berdasarkan period
  const filteredActivities = useMemo(() => {
    return filterActivitiesByPeriod(activities, selectedPeriod)
  }, [activities, selectedPeriod])

  const hasActivities = activities.length > 0
  const hasPeriodData = filteredActivities.length > 0

  return (
    <div className="page-shell">
      <div className="container relative z-10 py-12">
      {/* Header */}
      <div className="page-header">
        <p className="eyebrow">Environmental intelligence</p>
        <h1 className="display-serif !mt-3 !text-5xl !leading-none sm:!text-7xl">Lihat polanya.</h1>
        <p>
          Baca bagaimana jejak karbonmu terbentuk dan temukan arah perubahan berikutnya.
        </p>
      </div>

      {/* Empty State - No Activities */}
      {!hasActivities ? (
        <div className="text-center py-16 px-6">
            <div className="inline-block p-4 rounded-full bg-primary-50 mb-4">
            <svg
              className="w-12 h-12 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-ink mb-2">Belum ada data untuk dianalisis</h2>
          <p className="text-ink-muted mb-6 max-w-md mx-auto">
            Mulai catat aktivitas kamu untuk melihat analisis mendalam tentang pola dan sumber emisi karbonmu.
          </p>
          <Link
            to="/aktivitas"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary-600 text-white hover:bg-primary-700 font-medium transition-colors"
          >
            <Activity size={20} />
            Tambah Aktivitas
          </Link>
        </div>
      ) : (
        <>
          {/* Period Selector */}
          <div className="mb-8">
            <SectionTitle title="Pilih Periode" />
            <AnalysisPeriodSelector 
              selectedPeriod={selectedPeriod} 
              onPeriodChange={setSelectedPeriod}
            />
            <p className="mt-4 border-l-2 border-terracotta pl-3 text-sm text-ink-muted">
              Menampilkan data: <span className="font-medium">{formatPeriodRange(selectedPeriod)}</span>
            </p>
          </div>

          {/* Empty State - No Data for Period */}
          {!hasPeriodData ? (
            <div className="text-center py-16 px-6 rounded-lg border bg-white">
              <p className="text-ink-muted text-lg">Tidak ada data untuk periode ini</p>
              <p className="text-sm text-ink-subtle mt-2">Coba pilih periode yang lain atau tambahkan lebih banyak aktivitas.</p>
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="mb-8">
                <SectionTitle title="Ringkasan" />
                <AnalysisSummary activities={filteredActivities} />
              </div>

              {/* Trend Chart */}
              <div className="mb-8">
                <SectionTitle title="Trend Emisi" />
                <AnalysisTrendChart activities={filteredActivities} />
              </div>

              {/* Two Column Layout */}
              <div className="grid gap-6 lg:grid-cols-2 mb-8">
                {/* Category Analysis */}
                <div>
                  <SectionTitle title="Analisis Kategori" />
                  <CategoryAnalysis activities={filteredActivities} />
                </div>

                {/* Top Contributors */}
                <div>
                  <SectionTitle title="Penyumbang Terbesar" />
                  <TopContributors activities={filteredActivities} />
                </div>
              </div>

              {/* Period Comparison */}
              <div className="mb-8">
                <SectionTitle title="Perbandingan Periode" />
                <PeriodComparison activities={activities} period={selectedPeriod} />
              </div>

              {/* Insights & Recommendations */}
              <div className="mb-8">
                <SectionTitle title="Insight & Rekomendasi" />
                <InsightRecommendations activities={filteredActivities} />
              </div>
            </>
          )}
        </>
      )}
      </div>
    </div>
  )
}
