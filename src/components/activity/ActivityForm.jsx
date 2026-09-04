/**
 * Activity Form Component
 * Modal/Form untuk Add atau Edit aktivitas
 */

import React, { useState, useEffect, useMemo } from 'react'
import { X, AlertCircle } from 'lucide-react'
import {
  ACTIVITY_CATEGORIES,
  getEmissionFactor,
  getEmissionFactorsByCategory,
} from '../../constants/emissionFactors'
import { calculateCarbonEmission } from '../../utils/carbonCalculator'
import { validateActivity, getCategoryLabel, formatCarbonEmission } from '../../utils/activityHelpers'

export default function ActivityForm({ isOpen, onClose, onSubmit, editingActivity = null }) {
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    activity: '',
    amount: '',
    unit: '',
    emissionFactorId: '',
    notes: '',
  })

  const [errors, setErrors] = useState([])
  const [estimatedEmission, setEstimatedEmission] = useState(0)
  const [selectedFactorId, setSelectedFactorId] = useState('')

  // Initialize form dengan editing activity jika ada
  useEffect(() => {
    if (editingActivity) {
      setFormData({
        date: editingActivity.date,
        category: editingActivity.category,
        activity: editingActivity.activity,
        amount: editingActivity.amount,
        unit: editingActivity.unit,
        emissionFactorId: editingActivity.emissionFactorId,
        notes: editingActivity.notes || '',
      })
      setSelectedFactorId(editingActivity.emissionFactorId)
    } else {
      // Set default tanggal ke hari ini untuk new activity
      const today = new Date().toISOString().split('T')[0]
      setFormData((prev) => ({
        ...prev,
        date: today,
      }))
    }
    setErrors([])
    setEstimatedEmission(0)
  }, [isOpen, editingActivity])

  // Get emission factors berdasarkan kategori yang dipilih
  const factorsInCategory = useMemo(() => {
    return formData.category
      ? getEmissionFactorsByCategory(formData.category)
      : []
  }, [formData.category])

  // Calculate emission realtime
  useEffect(() => {
    if (formData.amount && selectedFactorId) {
      const factor = getEmissionFactor(selectedFactorId)
      if (factor) {
        const emission = calculateCarbonEmission(
          Number(formData.amount),
          factor.emissionFactor
        )
        setEstimatedEmission(emission)
      }
    } else {
      setEstimatedEmission(0)
    }
  }, [formData.amount, selectedFactorId])

  const handleCategoryChange = (e) => {
    const category = e.target.value
    setFormData({
      ...formData,
      category,
      activity: '',
      emissionFactorId: '',
    })
    setSelectedFactorId('')
    setEstimatedEmission(0)
  }

  const handleActivityChange = (e) => {
    const emissionFactorId = e.target.value
    const factor = getEmissionFactor(emissionFactorId)
    if (!factor) return

    setFormData({
      ...formData,
      activity: factor.name,
      emissionFactorId,
      unit: factor.unit,
    })
    setSelectedFactorId(emissionFactorId)
  }

  const handleAmountChange = (e) => {
    setFormData({
      ...formData,
      amount: e.target.value,
    })
  }

  const handleNotesChange = (e) => {
    setFormData({
      ...formData,
      notes: e.target.value,
    })
  }

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      date: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validasi
    const validation = validateActivity(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    // Submit
    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    })

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: '',
      activity: '',
      amount: '',
      unit: '',
      emissionFactorId: '',
      notes: '',
    })
    setSelectedFactorId('')
    setErrors([])
    setEstimatedEmission(0)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md mx-4 rounded-lg bg-white shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {editingActivity ? 'Edit Aktivitas' : 'Tambah Aktivitas'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="m-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <div className="flex gap-2 items-start">
              <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                {errors.map((error, idx) => (
                  <p key={idx} className="text-sm text-red-700">
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Tanggal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={handleDateChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">-- Pilih Kategori --</option>
              {Object.entries(ACTIVITY_CATEGORIES).map(([key, value]) => (
                <option key={value} value={value}>
                  {getCategoryLabel(value)}
                </option>
              ))}
            </select>
          </div>

          {/* Aktivitas (berdasarkan kategori) */}
          {formData.category && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Aktivitas
              </label>
              <select
                value={formData.emissionFactorId}
                onChange={handleActivityChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">-- Pilih Aktivitas --</option>
                {factorsInCategory.map((factor) => (
                  <option key={factor.id} value={factor.id}>
                    {factor.name} ({factor.unit})
                  </option>
                ))}
              </select>
              {formData.emissionFactorId && (
                <p className="mt-1 text-xs text-gray-600">
                  {getEmissionFactor(formData.emissionFactorId)?.description}
                </p>
              )}
            </div>
          )}

          {/* Jumlah */}
          {formData.emissionFactorId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah ({formData.unit})
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0"
                value={formData.amount}
                onChange={handleAmountChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {/* Estimasi Emisi */}
          {estimatedEmission > 0 && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-xs text-gray-600">Estimasi Emisi Karbon</p>
              <p className="text-lg font-semibold text-green-700">
                {formatCarbonEmission(estimatedEmission)}
              </p>
            </div>
          )}

          {/* Catatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan (opsional)
            </label>
            <textarea
              value={formData.notes}
              onChange={handleNotesChange}
              placeholder="Tambahkan catatan untuk aktivitas ini..."
              rows="3"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 font-medium transition-colors"
            >
              {editingActivity ? 'Simpan Perubahan' : 'Tambah Aktivitas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
