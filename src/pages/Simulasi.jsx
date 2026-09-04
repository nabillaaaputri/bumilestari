import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, FlaskConical } from 'lucide-react'
import { useActivityStore } from '../store/activityStore'
import SectionTitle from '../components/SectionTitle'
import ActivitySelector from '../components/simulasi/ActivitySelector'
import ScenarioSelector from '../components/simulasi/ScenarioSelector'
import SimulationSummary from '../components/simulasi/SimulationSummary'
import ComparisonChart from '../components/simulasi/ComparisonChart'
import { getScenarioAlternatives, calculateSimulation } from '../utils/simulationHelpers'
import { sortActivities } from '../utils/activityHelpers'
import { EMISSION_FACTORS } from '../constants/emissionFactors'

export default function Simulasi() {
  const activities = useActivityStore((state) => state.activities)
  const initializeStore = useActivityStore((state) => state.initializeStore)

  const [selectedActivityId, setSelectedActivityId] = useState('')
  const [selectedScenarioId, setSelectedScenarioId] = useState('')

  useEffect(() => {
    initializeStore()
  }, [initializeStore])

  const sortedActivities = useMemo(
    () => sortActivities(activities, 'emission', 'desc'),
    [activities]
  )

  const selectedActivity = useMemo(
    () => activities.find((a) => a.id === selectedActivityId) || null,
    [activities, selectedActivityId]
  )

  const scenarioAlternatives = useMemo(() => {
    if (!selectedActivity) return []
    return getScenarioAlternatives(selectedActivity)
  }, [selectedActivity])

  const filterMode = useMemo(() => {
    if (!selectedActivity) return 'unit'
    const hasSameUnitAlternatives = Object.values(EMISSION_FACTORS).some(
      (factor) =>
        factor.unit === selectedActivity.unit &&
        factor.id !== selectedActivity.emissionFactorId
    )
    return hasSameUnitAlternatives ? 'unit' : 'category'
  }, [selectedActivity])

  const simulationResult = useMemo(() => {
    if (!selectedActivity || !selectedScenarioId) return null
    return calculateSimulation(selectedActivity, selectedScenarioId)
  }, [selectedActivity, selectedScenarioId])

  const handleActivitySelect = (activityId) => {
    setSelectedActivityId(activityId)
    setSelectedScenarioId('')
  }

  const hasActivities = activities.length > 0

  return (
    <div className="page-shell">
      <div className="container relative z-10 py-12">
      <div className="page-header">
        <p className="eyebrow">What-if experiment</p>
        <h1 className="display-serif !mt-3 !text-5xl !leading-none sm:!text-7xl">Coba kemungkinan lain.</h1>
        <p>
          Uji perubahan kecil sebelum menjadikannya kebiasaan nyata.
        </p>
      </div>

      {!hasActivities ? (
        <div className="text-center py-16 px-6">
            <div className="inline-block p-4 rounded-full bg-primary-50 mb-4">
              <FlaskConical className="w-12 h-12 text-primary-600" />
          </div>
          <h2 className="text-2xl font-semibold text-ink mb-2">
            Belum ada aktivitas untuk disimulasikan
          </h2>
          <p className="text-ink-muted mb-6 max-w-md mx-auto">
            Catat aktivitas terlebih dahulu, lalu kembali ke sini untuk membandingkan skenario
            pengurangan emisi.
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
          <div className="mb-8">
            <SectionTitle
              title="Konfigurasi Simulasi"
              subtitle="Pilih aktivitas saat ini dan skenario alternatif yang ingin dibandingkan."
            />
            <div className="grid gap-6 border-t border-primary-600 pt-5 lg:grid-cols-2">
              <ActivitySelector
                activities={sortedActivities}
                selectedId={selectedActivityId}
                onSelect={handleActivitySelect}
              />
              <ScenarioSelector
                alternatives={scenarioAlternatives}
                selectedId={selectedScenarioId}
                onSelect={setSelectedScenarioId}
                filterMode={filterMode}
              />
            </div>
          </div>

          {selectedActivity && selectedScenarioId && simulationResult && (
            <>
              <div className="mb-8">
                <SectionTitle title="Hasil Simulasi" />
                <SimulationSummary result={simulationResult} />
              </div>

              <div className="mb-8">
                <SectionTitle title="Grafik Perbandingan" />
                <ComparisonChart result={simulationResult} />
              </div>
            </>
          )}

          {selectedActivity && !selectedScenarioId && scenarioAlternatives.length > 0 && (
            <div className="text-center py-12 px-6 rounded-lg border bg-surface">
              <p className="text-ink-muted">
                Pilih skenario baru untuk melihat hasil simulasi dan perbandingan emisi.
              </p>
            </div>
          )}
        </>
      )}
      </div>
    </div>
  )
}
