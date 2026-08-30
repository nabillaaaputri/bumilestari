import React, { useMemo } from 'react'
import { Activity, Leaf, TrendingDown, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useActivityStore } from '../store/activityStore'
import SectionTitle from '../components/SectionTitle'
import SummaryCard from '../components/dashboard/SummaryCard'
import EmissionTrendChart from '../components/dashboard/EmissionTrendChart'
import CategoryChart from '../components/dashboard/CategoryChart'
import RecentActivities from '../components/dashboard/RecentActivities'
import InsightCard from '../components/dashboard/InsightCard'
import {
  calculateTotalEmission,
  calculateDailyEmission,
  calculateEmissionByCategory,
  getTopEmitters,
} from '../utils/carbonCalculator'
import { formatCarbonEmissionWithAutoUnit } from '../utils/activityHelpers'

export default function Dashboard() {
  const activities = useActivityStore((state) => state.activities)

  // Calculate all metrics
  const metrics = useMemo(() => {
    if (activities.length === 0) {
      return {
        totalEmission: 0,
        activityCount: 0,
        avgEmissionPerActivity: 0,
        topCategory: null,
        topEmitter: null,
        dailyEmission: [],
        categoryBreakdown: {},
      }
    }

    const totalEmission = calculateTotalEmission(activities)
    const activityCount = activities.length
    const avgEmissionPerActivity = Math.round((totalEmission / activityCount) * 100) / 100
    const topEmitters = getTopEmitters(activities, 1)
    const topEmitter = topEmitters[0] || null

    // Category breakdown
    const categoryBreakdown = {
      transportation: calculateEmissionByCategory(activities, 'transportation'),
      energy: calculateEmissionByCategory(activities, 'energy'),
      food: calculateEmissionByCategory(activities, 'food'),
      shopping: calculateEmissionByCategory(activities, 'shopping'),
      waste: calculateEmissionByCategory(activities, 'waste'),
    }

    // Find top category
    const topCategory = Object.entries(categoryBreakdown).sort(
      ([, a], [, b]) => b - a
    )[0]

    // Daily emissions untuk chart
    const dailyEmission = calculateDailyEmission(activities)

    return {
      totalEmission,
      activityCount,
      avgEmissionPerActivity,
      topCategory,
      topEmitter,
      dailyEmission,
      categoryBreakdown,
    }
  }, [activities])

  const hasActivities = activities.length > 0

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Pantau jejak karbon kamu dan lihat progress pengurangan emisi setiap hari.
        </p>
      </div>

      {/* Empty State */}
      {!hasActivities ? (
        <div className="text-center py-16 px-6">
          <div className="inline-block p-4 rounded-full bg-green-50 mb-4">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Dashboard Kosong</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Mulai catat aktivitas kamu untuk melihat analisis jejak karbon dan insight yang
            dipersonalisasi untuk dirimu.
          </p>
          <Link
            to="/aktivitas"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 font-medium transition-colors"
          >
            <Activity size={20} />
            Mulai Catat Aktivitas
          </Link>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <SummaryCard
              icon={Leaf}
              title="Total Emisi"
              value={formatCarbonEmissionWithAutoUnit(metrics.totalEmission)}
              subtitle="Sejak awal"
            />
            <SummaryCard
              icon={Activity}
              title="Total Aktivitas"
              value={metrics.activityCount}
              subtitle="Aktivitas tercatat"
            />
            <SummaryCard
              icon={TrendingDown}
              title="Rata-rata per Aktivitas"
              value={`${metrics.avgEmissionPerActivity} kg`}
              subtitle="CO₂e per aktivitas"
            />
            <SummaryCard
              icon={Target}
              title="Kontributor Terbesar"
              value={metrics.topEmitter?.activity || '-'}
              subtitle={
                metrics.topEmitter
                  ? `${formatCarbonEmissionWithAutoUnit(metrics.topEmitter.carbonEmission)}`
                  : 'Belum ada'
              }
            />
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Trend Chart */}
            <EmissionTrendChart data={metrics.dailyEmission} />

            {/* Category Chart */}
            <CategoryChart data={metrics.categoryBreakdown} />
          </div>

          {/* Recent Activities */}
          <div className="mb-8">
            <RecentActivities activities={activities} />
          </div>

          {/* Insights */}
          <div className="mb-8">
            <InsightCard activities={activities} />
          </div>
        </>
      )}
    </div>
  )
}
