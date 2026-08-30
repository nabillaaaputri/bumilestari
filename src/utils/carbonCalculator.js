/**
 * Carbon Calculator Utilities
 * Fungsi-fungsi untuk menghitung emisi karbon
 */

import { getEmissionFactor } from '../constants/emissionFactors'

/**
 * Menghitung carbon emission untuk satu aktivitas
 * @param {number} amount - Jumlah aktivitas
 * @param {number} emissionFactor - Emission factor (kg CO₂e per unit)
 * @returns {number} - Carbon emission dalam kg CO₂e (dibulatkan 2 desimal)
 */
export const calculateCarbonEmission = (amount, emissionFactor) => {
  if (!amount || !emissionFactor) return 0
  return Math.round(amount * emissionFactor * 100) / 100
}

/**
 * Menghitung total carbon emission dari array aktivitas
 * @param {object[]} activities - Array of activity objects
 * @returns {number} - Total carbon emission dalam kg CO₂e
 */
export const calculateTotalEmission = (activities = []) => {
  if (!Array.isArray(activities)) return 0
  return Math.round(
    activities.reduce((total, activity) => {
      return total + (activity.carbonEmission || 0)
    }, 0) * 100
  ) / 100
}

/**
 * Menghitung total carbon emission berdasarkan kategori
 * @param {object[]} activities - Array of activity objects
 * @param {string} category - Kategori yang ingin dihitung
 * @returns {number} - Total carbon emission dalam kg CO₂e
 */
export const calculateEmissionByCategory = (activities = [], category) => {
  if (!Array.isArray(activities)) return 0
  return Math.round(
    activities
      .filter((activity) => activity.category === category)
      .reduce((total, activity) => {
        return total + (activity.carbonEmission || 0)
      }, 0) * 100
  ) / 100
}

/**
 * Menghitung total carbon emission berdasarkan periode/range tanggal
 * @param {object[]} activities - Array of activity objects
 * @param {Date} startDate - Tanggal mulai
 * @param {Date} endDate - Tanggal akhir
 * @returns {number} - Total carbon emission dalam kg CO₂e
 */
export const calculateEmissionByDateRange = (
  activities = [],
  startDate,
  endDate
) => {
  if (!Array.isArray(activities)) return 0

  const start = new Date(startDate)
  const end = new Date(endDate)
  end.setHours(23, 59, 59, 999) // Set ke akhir hari

  return Math.round(
    activities
      .filter((activity) => {
        const activityDate = new Date(activity.date)
        return activityDate >= start && activityDate <= end
      })
      .reduce((total, activity) => {
        return total + (activity.carbonEmission || 0)
      }, 0) * 100
  ) / 100
}

/**
 * Mendapatkan breakdown emisi berdasarkan kategori
 * @param {object[]} activities - Array of activity objects
 * @returns {object} - Object dengan key=category, value=total emisi
 */
export const getEmissionBreakdownByCategory = (activities = []) => {
  if (!Array.isArray(activities)) return {}

  const breakdown = {}

  activities.forEach((activity) => {
    const category = activity.category
    if (!breakdown[category]) {
      breakdown[category] = 0
    }
    breakdown[category] += activity.carbonEmission || 0
  })

  // Round semua values
  Object.keys(breakdown).forEach((key) => {
    breakdown[key] = Math.round(breakdown[key] * 100) / 100
  })

  return breakdown
}

/**
 * Mendapatkan breakdown emisi berdasarkan aktivitas (detail breakdown)
 * @param {object[]} activities - Array of activity objects
 * @returns {object[]} - Array of activities sorted by carbon emission descending
 */
export const getEmissionBreakdownByActivity = (activities = []) => {
  if (!Array.isArray(activities)) return []

  return activities
    .map((activity) => ({
      ...activity,
      carbonEmission: Math.round(activity.carbonEmission * 100) / 100,
    }))
    .sort((a, b) => b.carbonEmission - a.carbonEmission)
}

/**
 * Mendapatkan aktivitas dengan kontribusi emisi terbesar
 * @param {object[]} activities - Array of activity objects
 * @param {number} limit - Jumlah aktivitas yang ingin ditampilkan (default: 5)
 * @returns {object[]} - Array of top activities
 */
export const getTopEmitters = (activities = [], limit = 5) => {
  if (!Array.isArray(activities)) return []

  return getEmissionBreakdownByActivity(activities).slice(0, limit)
}

/**
 * Menghitung rata-rata emisi per hari
 * @param {object[]} activities - Array of activity objects
 * @returns {number} - Rata-rata emisi per hari dalam kg CO₂e
 */
export const calculateDailyAverageEmission = (activities = []) => {
  if (!Array.isArray(activities) || activities.length === 0) return 0

  const uniqueDates = new Set()
  activities.forEach((activity) => {
    uniqueDates.add(new Date(activity.date).toDateString())
  })

  const totalEmission = calculateTotalEmission(activities)
  const daysCount = uniqueDates.size || 1

  return Math.round((totalEmission / daysCount) * 100) / 100
}

/**
 * Menghitung emisi per hari (untuk chart atau analisis harian)
 * @param {object[]} activities - Array of activity objects
 * @returns {object[]} - Array dengan format {date, emission}
 */
export const calculateDailyEmission = (activities = []) => {
  if (!Array.isArray(activities)) return []

  const dailyEmission = {}

  activities.forEach((activity) => {
    const dateStr = new Date(activity.date).toISOString().split('T')[0]
    if (!dailyEmission[dateStr]) {
      dailyEmission[dateStr] = 0
    }
    dailyEmission[dateStr] += activity.carbonEmission || 0
  })

  return Object.entries(dailyEmission)
    .map(([date, emission]) => ({
      date,
      emission: Math.round(emission * 100) / 100,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

/**
 * Menghitung emisi per bulan (untuk chart atau analisis bulanan)
 * @param {object[]} activities - Array of activity objects
 * @returns {object[]} - Array dengan format {month, emission}
 */
export const calculateMonthlyEmission = (activities = []) => {
  if (!Array.isArray(activities)) return []

  const monthlyEmission = {}

  activities.forEach((activity) => {
    const date = new Date(activity.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!monthlyEmission[monthKey]) {
      monthlyEmission[monthKey] = 0
    }
    monthlyEmission[monthKey] += activity.carbonEmission || 0
  })

  return Object.entries(monthlyEmission)
    .map(([month, emission]) => ({
      month,
      emission: Math.round(emission * 100) / 100,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

/**
 * Membuat activity object lengkap dengan carbon emission yang sudah dihitung
 * @param {object} activityData - Data aktivitas (minimal: date, category, amount, emissionFactorId)
 * @returns {object} - Activity object dengan carbonEmission yang sudah dihitung
 */
export const createActivity = (activityData) => {
  const {
    id,
    date,
    category,
    activity,
    amount,
    unit,
    emissionFactorId,
    notes,
  } = activityData

  const emissionFactor = getEmissionFactor(emissionFactorId)

  if (!emissionFactor) {
    throw new Error(`Emission factor dengan ID "${emissionFactorId}" tidak ditemukan`)
  }

  const carbonEmission = calculateCarbonEmission(amount, emissionFactor.emissionFactor)

  return {
    id: id || `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    date,
    category,
    activity,
    amount,
    unit,
    emissionFactorId,
    emissionFactorValue: emissionFactor.emissionFactor,
    carbonEmission,
    notes: notes || '',
    createdAt: new Date().toISOString(),
  }
}

/**
 * Update activity dengan nilai amount baru dan recalculate carbonEmission
 * @param {object} activity - Activity object yang akan diupdate
 * @param {number} newAmount - Nilai amount yang baru
 * @returns {object} - Updated activity object
 */
export const updateActivityAmount = (activity, newAmount) => {
  if (!activity || !activity.emissionFactorValue) {
    throw new Error('Invalid activity object')
  }

  const carbonEmission = calculateCarbonEmission(newAmount, activity.emissionFactorValue)

  return {
    ...activity,
    amount: newAmount,
    carbonEmission,
  }
}
