import React, { useMemo } from 'react'
import { Activity, ArrowRight, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useActivityStore } from '../store/activityStore'
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

    const categoryBreakdown = {
      transportation: calculateEmissionByCategory(activities, 'transportation'),
      energy: calculateEmissionByCategory(activities, 'energy'),
      food: calculateEmissionByCategory(activities, 'food'),
      shopping: calculateEmissionByCategory(activities, 'shopping'),
      waste: calculateEmissionByCategory(activities, 'waste'),
    }

    const topCategory = Object.entries(categoryBreakdown).sort(([, a], [, b]) => b - a)[0]
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
    <div className="page-shell">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary-50/70 via-surface-muted/40 to-transparent" />

      <div className="container relative py-10 sm:py-12">
        <div className="page-header">
          <span className="eyebrow inline-flex items-center rounded-full border border-terracotta/20 bg-surface/80 px-3 py-1 shadow-sm backdrop-blur-sm">
            Ringkasan Karbon
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-base text-ink-muted">
            Ringkasan jejak karbonmu, dari kebiasaan harian hingga arah perubahan berikutnya.
          </p>
        </div>

        {!hasActivities ? (
          <div className="dashboard-card mx-auto max-w-lg px-8 py-16 text-center">
            <div className="mx-auto mb-5 inline-flex rounded-2xl bg-primary-50 p-5">
              <Activity className="h-10 w-10 text-primary-600" strokeWidth={1.75} />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Dashboard Kosong</h2>
            <p className="mx-auto mt-3 max-w-sm text-ink-muted">
              Mulai catat aktivitas kamu untuk melihat analisis jejak karbon dan insight yang
              dipersonalisasi untuk dirimu.
            </p>
            <Link
              to="/aktivitas"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-card-hover"
            >
              <Activity size={18} />
              Mulai Catat Aktivitas
            </Link>
          </div>
        ) : (
          <>
            <section className="relative mb-16 overflow-hidden rounded-[2rem] bg-primary-700 px-6 py-9 text-white shadow-soft sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border border-primary-100/20" />
              <div className="pointer-events-none absolute -right-8 -top-16 h-48 w-48 rounded-full border border-terracotta/30" />
              <div className="relative max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-100/70"><Leaf size={15} /> Total jejak karbon</div>
                <p className="display-serif mt-4 text-6xl leading-none sm:text-8xl">{formatCarbonEmissionWithAutoUnit(metrics.totalEmission)}</p>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/65">Total emisi sejak awal pencatatan. Setiap angka adalah titik awal untuk memahami kebiasaanmu.</p>
              </div>
              <div className="relative mt-9 grid max-w-2xl gap-5 border-t border-white/20 pt-5 sm:grid-cols-3">
                <div><p className="text-xs uppercase tracking-[0.16em] text-white/50">Aktivitas</p><p className="mt-1 text-xl font-bold">{metrics.activityCount} <span className="text-xs font-normal text-white/55">tercatat</span></p></div>
                <div><p className="text-xs uppercase tracking-[0.16em] text-white/50">Rata-rata</p><p className="mt-1 text-xl font-bold">{metrics.avgEmissionPerActivity} <span className="text-xs font-normal text-white/55">kg / aktivitas</span></p></div>
                <div><p className="text-xs uppercase tracking-[0.16em] text-white/50">Kontributor terbesar</p><p className="mt-1 truncate text-xl font-bold">{metrics.topEmitter?.activity || '-'}</p></div>
              </div>
            </section>

            <div className="mb-16 grid gap-12 lg:grid-cols-[1.45fr_0.75fr] lg:items-start">
              <EmissionTrendChart data={metrics.dailyEmission} />
              <CategoryChart data={metrics.categoryBreakdown} />
            </div>

            <div className="mb-16">
              <RecentActivities activities={activities} />
            </div>

            <div className="mb-8 border-t-2 border-primary-600 bg-[#e9eee3] px-6 py-7 sm:px-9">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div><p className="dashboard-label">Apa yang paling berpengaruh?</p><h2 className="mt-2 max-w-xl text-2xl font-bold leading-tight text-ink sm:text-3xl">Insight dari pola emisi yang sudah kamu catat.</h2><div className="mt-5 max-w-2xl"><InsightCard activities={activities} /></div></div>
                <Link to="/analisis" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-500">Lihat analisis <ArrowRight size={16} /></Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
