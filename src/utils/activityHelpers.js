/**
 * Activity Helper Utilities
 * Fungsi-fungsi helper untuk manipulasi dan format data aktivitas
 */

import { getEmissionFactor, ACTIVITY_CATEGORIES } from '../constants/emissionFactors'

/**
 * Format tanggal ke format yang lebih readable (id-ID)
 * @param {Date|string} date - Tanggal yang akan diformat
 * @returns {string} - Format: "1 Januari 2024"
 */
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('id-ID', options)
}

/**
 * Format tanggal ke format pendek (id-ID)
 * @param {Date|string} date - Tanggal yang akan diformat
 * @returns {string} - Format: "01/01/2024"
 */
export const formatDateShort = (date) => {
  const d = new Date(date)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

/**
 * Format nilai emisi karbon dengan unit dan desimal
 * @param {number} value - Nilai carbon emission dalam kg
 * @param {number} decimals - Jumlah desimal (default: 2)
 * @returns {string} - Format: "2.50 kg CO₂e"
 */
export const formatCarbonEmission = (value, decimals = 2) => {
  return `${Number(value).toFixed(decimals)} kg CO₂e`
}

/**
 * Format nilai emisi karbon dengan unit yang lebih besar jika perlu (kg atau ton)
 * @param {number} value - Nilai carbon emission dalam kg
 * @returns {string} - Format: "2.50 kg CO₂e" atau "1.50 ton CO₂e"
 */
export const formatCarbonEmissionWithAutoUnit = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} ton CO₂e`
  }
  return `${value.toFixed(2)} kg CO₂e`
}

/**
 * Mendapatkan label kategori yang readable
 * @param {string} category - Kategori aktivitas
 * @returns {string} - Label kategori dalam bahasa Indonesia
 */
export const getCategoryLabel = (category) => {
  const labels = {
    [ACTIVITY_CATEGORIES.TRANSPORTATION]: 'Transportasi',
    [ACTIVITY_CATEGORIES.ENERGY]: 'Energi',
    [ACTIVITY_CATEGORIES.FOOD]: 'Makanan',
    [ACTIVITY_CATEGORIES.SHOPPING]: 'Belanja',
    [ACTIVITY_CATEGORIES.WASTE]: 'Sampah',
  }
  return labels[category] || category
}

/**
 * Mendapatkan warna kategori untuk visualisasi
 * @param {string} category - Kategori aktivitas
 * @returns {string} - Hex color code
 */
export const getCategoryColor = (category) => {
  const colors = {
    [ACTIVITY_CATEGORIES.TRANSPORTATION]: '#3B82F6', // Blue
    [ACTIVITY_CATEGORIES.ENERGY]: '#F59E0B', // Amber
    [ACTIVITY_CATEGORIES.FOOD]: '#EF4444', // Red
    [ACTIVITY_CATEGORIES.SHOPPING]: '#8B5CF6', // Purple
    [ACTIVITY_CATEGORIES.WASTE]: '#10B981', // Emerald
  }
  return colors[category] || '#6B7280'
}

/**
 * Mendapatkan icon/emoji untuk kategori
 * @param {string} category - Kategori aktivitas
 * @returns {string} - Emoji atau icon character
 */
export const getCategoryIcon = (category) => {
  const icons = {
    [ACTIVITY_CATEGORIES.TRANSPORTATION]: '🚗',
    [ACTIVITY_CATEGORIES.ENERGY]: '⚡',
    [ACTIVITY_CATEGORIES.FOOD]: '🍽️',
    [ACTIVITY_CATEGORIES.SHOPPING]: '🛍️',
    [ACTIVITY_CATEGORIES.WASTE]: '♻️',
  }
  return icons[category] || '📊'
}

/**
 * Mendapatkan nama aktivitas dari emission factor ID
 * @param {string} emissionFactorId - ID dari emission factor
 * @returns {string} - Nama aktivitas
 */
export const getActivityName = (emissionFactorId) => {
  const factor = getEmissionFactor(emissionFactorId)
  return factor ? factor.name : 'Aktivitas Tidak Diketahui'
}

/**
 * Mendapatkan deskripsi aktivitas dari emission factor ID
 * @param {string} emissionFactorId - ID dari emission factor
 * @returns {string} - Deskripsi aktivitas
 */
export const getActivityDescription = (emissionFactorId) => {
  const factor = getEmissionFactor(emissionFactorId)
  return factor ? factor.description : ''
}

/**
 * Mendapatkan unit aktivitas dari emission factor ID
 * @param {string} emissionFactorId - ID dari emission factor
 * @returns {string} - Unit aktivitas (km, kg, kWh, dll)
 */
export const getActivityUnit = (emissionFactorId) => {
  const factor = getEmissionFactor(emissionFactorId)
  return factor ? factor.unit : ''
}

/**
 * Validasi data activity sebelum disimpan
 * @param {object} activityData - Activity data yang akan divalidasi
 * @returns {object} - { isValid: boolean, errors: string[] }
 */
export const validateActivity = (activityData) => {
  const errors = []

  if (!activityData.date) {
    errors.push('Tanggal tidak boleh kosong')
  } else {
    const date = new Date(activityData.date)
    if (isNaN(date.getTime())) {
      errors.push('Format tanggal tidak valid')
    }
  }

  if (!activityData.category) {
    errors.push('Kategori tidak boleh kosong')
  }

  if (!activityData.activity) {
    errors.push('Jenis aktivitas tidak boleh kosong')
  }

  if (!activityData.amount) {
    errors.push('Jumlah tidak boleh kosong')
  } else if (Number(activityData.amount) <= 0) {
    errors.push('Jumlah harus lebih besar dari 0')
  }

  if (!activityData.emissionFactorId) {
    errors.push('Emission factor tidak boleh kosong')
  } else {
    const factor = getEmissionFactor(activityData.emissionFactorId)
    if (!factor) {
      errors.push('Emission factor tidak valid')
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Sorting aktivitas berdasarkan kriteria
 * @param {object[]} activities - Array of activities
 * @param {string} sortBy - Kriteria sorting: 'date', 'emission', 'category'
 * @param {string} order - Urutan: 'asc' atau 'desc' (default: 'desc')
 * @returns {object[]} - Sorted activities
 */
export const sortActivities = (activities, sortBy = 'date', order = 'desc') => {
  const sorted = [...activities]

  const sortFunctions = {
    date: (a, b) =>
      new Date(a.date) - new Date(b.date),
    emission: (a, b) =>
      a.carbonEmission - b.carbonEmission,
    category: (a, b) =>
      a.category.localeCompare(b.category),
  }

  const sortFn = sortFunctions[sortBy] || sortFunctions.date

  sorted.sort((a, b) => {
    const result = sortFn(a, b)
    return order === 'asc' ? result : -result
  })

  return sorted
}

/**
 * Filter aktivitas berdasarkan kriteria
 * @param {object[]} activities - Array of activities
 * @param {object} filterOptions - { category, startDate, endDate, searchText }
 * @returns {object[]} - Filtered activities
 */
export const filterActivities = (activities, filterOptions = {}) => {
  const { category, startDate, endDate, searchText } = filterOptions

  return activities.filter((activity) => {
    // Filter berdasarkan kategori
    if (category && activity.category !== category) {
      return false
    }

    // Filter berdasarkan date range
    if (startDate || endDate) {
      const actDate = new Date(activity.date)
      if (startDate && actDate < new Date(startDate)) {
        return false
      }
      if (endDate) {
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        if (actDate > end) {
          return false
        }
      }
    }

    // Filter berdasarkan text search
    if (searchText) {
      const searchLower = searchText.toLowerCase()
      const activityName = getActivityName(activity.emissionFactorId).toLowerCase()
      const notes = (activity.notes || '').toLowerCase()
      if (!activityName.includes(searchLower) && !notes.includes(searchLower)) {
        return false
      }
    }

    return true
  })
}

/**
 * Grouping aktivitas berdasarkan periode (hari, minggu, bulan)
 * @param {object[]} activities - Array of activities
 * @param {string} period - 'day', 'week', atau 'month'
 * @returns {object} - Grouped activities dengan format {periodKey: [...activities]}
 */
export const groupActivitiesByPeriod = (activities, period = 'day') => {
  const grouped = {}

  activities.forEach((activity) => {
    const date = new Date(activity.date)
    let key

    if (period === 'day') {
      key = date.toISOString().split('T')[0]
    } else if (period === 'week') {
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      key = `Week of ${weekStart.toISOString().split('T')[0]}`
    } else if (period === 'month') {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    }

    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(activity)
  })

  return grouped
}

/**
 * Export activities ke format CSV string
 * @param {object[]} activities - Array of activities
 * @returns {string} - CSV string
 */
export const exportActivitiesToCSV = (activities) => {
  const headers = ['Tanggal', 'Kategori', 'Aktivitas', 'Jumlah', 'Unit', 'Emisi Karbon (kg CO₂e)', 'Catatan']
  const rows = activities.map((activity) => [
    formatDateShort(activity.date),
    getCategoryLabel(activity.category),
    getActivityName(activity.emissionFactorId),
    activity.amount,
    activity.unit,
    activity.carbonEmission,
    activity.notes || '',
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n')

  return csvContent
}
