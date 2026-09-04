import React, { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import Button from '../components/Button'
import ActivitySummary from '../components/activity/ActivitySummary'
import ActivityCard from '../components/activity/ActivityCard'
import ActivityForm from '../components/activity/ActivityForm'
import { useActivityStore } from '../store/activityStore'
import SectionTitle from '../components/SectionTitle'
import { calculateCarbonEmission } from '../utils/carbonCalculator'
import { getEmissionFactor } from '../constants/emissionFactors'

export default function Aktivitas() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState(null)

  // Zustand store
  const activities = useActivityStore((state) => state.activities)
  const addActivity = useActivityStore((state) => state.addActivity)
  const updateActivity = useActivityStore((state) => state.updateActivity)
  const deleteActivity = useActivityStore((state) => state.deleteActivity)
  const initializeStore = useActivityStore((state) => state.initializeStore)

  // Initialize store dengan mock data sekali saja
  useEffect(() => {
    initializeStore()
  }, [])

  const handleOpenForm = () => {
    setEditingActivity(null)
    setIsFormOpen(true)
  }

  const handleEditActivity = (activity) => {
    setEditingActivity(activity)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingActivity(null)
  }

  const handleSubmitForm = (formData) => {
    if (editingActivity) {
      // Update existing activity dengan recalculate carbon emission
      const factor = getEmissionFactor(formData.emissionFactorId)
      if (!factor) return

      const newCarbonEmission = calculateCarbonEmission(
        Number(formData.amount),
        factor.emissionFactor
      )

      updateActivity(editingActivity.id, {
        ...formData,
        amount: Number(formData.amount),
        carbonEmission: newCarbonEmission,
        emissionFactorValue: factor.emissionFactor,
      })
    } else {
      // Add new activity
      addActivity(formData)
    }
    handleCloseForm()
  }

  const handleDeleteActivity = (id) => {
    deleteActivity(id)
  }

  const hasActivities = activities.length > 0

  return (
    <div className="page-shell">
      <div className="container relative z-10 py-12">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="eyebrow">Personal activity journal</p>
            <h1 className="display-serif !mt-3 !text-5xl !leading-none sm:!text-7xl">Catat kebiasaanmu.</h1>
            <p>
              Pahami dampak dari aktivitas sehari-hari dan temukan pola yang bisa kamu ubah perlahan.
            </p>
          </div>
          <button
            onClick={handleOpenForm}
            className="hidden sm:flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            <Plus size={20} />
            Tambah Aktivitas
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={handleOpenForm}
          className="sm:hidden w-full flex items-center justify-center gap-2 rounded-full bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <Plus size={20} />
          Tambah Aktivitas
        </button>
      </div>

      {/* Summary */}
      {hasActivities && (
        <div className="mb-8">
          <SectionTitle title="Ringkasan" />
          <ActivitySummary />
        </div>
      )}

      {/* Activity List */}
      <div>
        <SectionTitle title="Daftar Aktivitas" />

        {hasActivities ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onEdit={handleEditActivity}
                onDelete={handleDeleteActivity}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6">
            <div className="inline-block p-4 rounded-full bg-green-50 mb-4">
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
                  d="M12 6v6m0 0v6m0-6h6m0 0h6m0 0v-2m0 2h-6m-6 0V4m0 0v2m0-2H4m0 2h6m0-6h6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-ink mb-2">
              Belum ada aktivitas
            </h3>
            <p className="text-ink-muted mb-6">
              Mulai catat aktivitas kamu hari ini untuk melihat jejak karbon dari kebiasaan sehari-hari.
            </p>
            <button
              onClick={handleOpenForm}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary-600 text-white hover:bg-primary-700 font-medium transition-colors"
            >
              <Plus size={20} />
              Tambah Aktivitas Pertama
            </button>
          </div>
        )}
      </div>

      {/* Activity Form Modal */}
      <ActivityForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        editingActivity={editingActivity}
      />
      </div>
    </div>
  )
}
