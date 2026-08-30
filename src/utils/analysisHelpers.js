/**
 * Analysis Helper Utilities
 * Fungsi-fungsi helper khusus untuk analisis data emisi
 */

import { calculateTotalEmission, calculateDailyEmission, calculateEmissionByCategory } from './carbonCalculator'

/**
 * Mendapatkan date range berdasarkan period terpilih
 * @param {string} period - '7days', '30days', atau 'all'
 * @returns {{startDate: Date, endDate: Date}}
 */
export const getPeriodDateRange = (period) => {
  const endDate = new Date()
  const startDate = new Date()

  switch (period) {
    case '7days':
      startDate.setDate(endDate.getDate() - 6)
      break
    case '30days':
      startDate.setDate(endDate.getDate() - 29)
      break
    case 'all':
      startDate.setFullYear(2000) // Set ke tahun yang sangat lama
      break
    default:
      startDate.setDate(endDate.getDate() - 6)
  }

  return { startDate, endDate }
}

/**
 * Filter activities berdasarkan period
 * @param {object[]} activities - Array of activities
 * @param {string} period - '7days', '30days', atau 'all'
 * @returns {object[]} - Filtered activities
 */
export const filterActivitiesByPeriod = (activities, period = '30days') => {
  const { startDate, endDate } = getPeriodDateRange(period)

  return activities.filter((activity) => {
    const actDate = new Date(activity.date)
    return actDate >= startDate && actDate <= endDate
  })
}

/**
 * Mendapatkan aktivitas dengan highest daily emission
 * @param {object[]} activities - Array of activities
 * @returns {{date: string, emission: number}} atau null
 */
export const getHighestEmissionDay = (activities = []) => {
  if (activities.length === 0) return null

  const dailyData = calculateDailyEmission(activities)
  return dailyData.length > 0 ? dailyData.reduce((max, curr) => 
    curr.emission > max.emission ? curr : max
  ) : null
}

/**
 * Mendapatkan aktivitas dengan lowest daily emission
 * @param {object[]} activities - Array of activities
 * @returns {{date: string, emission: number}} atau null
 */
export const getLowestEmissionDay = (activities = []) => {
  if (activities.length === 0) return null

  const dailyData = calculateDailyEmission(activities)
  return dailyData.length > 0 ? dailyData.reduce((min, curr) => 
    curr.emission < min.emission ? curr : min
  ) : null
}

/**
 * Membandingkan emisi antara dua periode
 * @param {object[]} currentPeriodActivities - Activities in current period
 * @param {object[]} previousPeriodActivities - Activities in previous period
 * @returns {{currentTotal, previousTotal, percentageChange, trend}}
 */
export const comparePeriods = (currentPeriodActivities = [], previousPeriodActivities = []) => {
  const currentTotal = calculateTotalEmission(currentPeriodActivities)
  const previousTotal = calculateTotalEmission(previousPeriodActivities)

  if (previousTotal === 0) {
    return {
      currentTotal,
      previousTotal,
      percentageChange: 0,
      trend: 'new', // Belum ada periode sebelumnya
      status: 'Belum ada data periode sebelumnya',
    }
  }

  const change = currentTotal - previousTotal
  const percentageChange = Math.round((change / previousTotal) * 100 * 10) / 10

  return {
    currentTotal,
    previousTotal,
    change,
    percentageChange,
    trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
    status:
      change > 0
        ? `Naik ${Math.abs(percentageChange)}% dibanding periode sebelumnya`
        : change < 0
        ? `Turun ${Math.abs(percentageChange)}% dibanding periode sebelumnya`
        : 'Stabil dibanding periode sebelumnya',
  }
}

/**
 * Generate insights berdasarkan data
 * @param {object[]} activities - Activities array
 * @param {string} period - Selected period
 * @returns {string[]} - Array of insights
 */
export const generateInsights = (activities = [], period = '30days') => {
  const insights = []

  if (activities.length === 0) {
    insights.push('Belum ada data untuk dianalisis. Mulai catat aktivitas untuk mendapatkan insight.')
    return insights
  }

  const total = calculateTotalEmission(activities)
  const dailyAvg = Math.round((total / (new Set(activities.map(a => a.date)).size || 1)) * 100) / 100
  const breakdown = {
    transportation: calculateEmissionByCategory(activities, 'transportation'),
    energy: calculateEmissionByCategory(activities, 'energy'),
    food: calculateEmissionByCategory(activities, 'food'),
    shopping: calculateEmissionByCategory(activities, 'shopping'),
    waste: calculateEmissionByCategory(activities, 'waste'),
  }

  const sortedCategories = Object.entries(breakdown)
    .sort(([, a], [, b]) => b - a)
    .filter(([, v]) => v > 0)

  // Insight 1: Top category
  if (sortedCategories.length > 0) {
    const [topCategory, topValue] = sortedCategories[0]
    const percentage = Math.round((topValue / total) * 100)
    
    if (topCategory === 'transportation') {
      insights.push(`Transportasi adalah sumber emisi terbesar mu (${percentage}%). Pertimbangkan menggunakan transportasi ramah lingkungan.`)
    } else if (topCategory === 'energy') {
      insights.push(`Energi adalah penyumbang emisi terbesar (${percentage}%). Coba kurangi penggunaan listrik yang tidak perlu.`)
    } else if (topCategory === 'food') {
      insights.push(`Makanan berkontribusi ${percentage}% dari emisimu. Pertimbangkan diet yang lebih ramah lingkungan.`)
    } else if (topCategory === 'shopping') {
      insights.push(`Belanja (shopping) berkontribusi ${percentage}% dari emisimu. Pertimbangkan untuk lebih conscious dalam konsumsi.`)
    } else if (topCategory === 'waste') {
      insights.push(`Sampah berkontribusi ${percentage}% dari emisimu. Cobalah daur ulang lebih banyak.`)
    }
  }

  // Insight 2: Activity count
  if (activities.length < 10) {
    insights.push(`Kamu baru mencatat ${activities.length} aktivitas. Semakin banyak data, semakin akurat analisisnya.`)
  } else if (activities.length > 100) {
    insights.push(`Excellent! Kamu sudah memiliki ${activities.length} aktivitas tercatat. Pola emisimu sudah jelas.`)
  }

  // Insight 3: Daily average
  if (dailyAvg > 20) {
    insights.push(`Rata-rata emisimu ${dailyAvg} kg CO₂e per hari. Coba set target pengurangan untuk periode berikutnya.`)
  } else if (dailyAvg < 5) {
    insights.push(`Bravo! Rata-rata emisimu hanya ${dailyAvg} kg CO₂e per hari. Terus pertahankan kebiasaan baik ini.`)
  }

  return insights
}

/**
 * Generate recommendations berdasarkan top emitter category
 * @param {string} topCategory - Category dengan emisi tertinggi
 * @returns {string} - Recommendation text
 */
export const getRecommendationForCategory = (topCategory) => {
  const recommendations = {
    transportation: '🚲 Coba gunakan transportasi rendah emisi untuk perjalanan jarak dekat (sepeda, jalan kaki, atau transportasi umum).',
    energy: '💡 Matikan perangkat elektronik saat tidak digunakan dan coba gunakan energi terbarukan jika memungkinkan.',
    food: '🥗 Kurangi konsumsi daging merah dan cobalah hari vegetarian seminggu sekali.',
    shopping: '♻️ Beli produk yang bertahan lama dan hindari pembelian impulsif yang tidak perlu.',
    waste: '🔄 Saring sampah sebaik-baiknya, kurangi sampah plastik, dan prioritaskan daur ulang.',
  }
  return recommendations[topCategory] || 'Terus monitor aktivitasmu untuk menemukan peluang pengurangan emisi.'
}

/**
 * Get label untuk period selector
 * @param {string} period - '7days', '30days', atau 'all'
 * @returns {string} - Label text
 */
export const getPeriodLabel = (period) => {
  const labels = {
    '7days': '7 Hari Terakhir',
    '30days': '30 Hari Terakhir',
    'all': 'Semua Data',
  }
  return labels[period] || period
}

/**
 * Format date range untuk display
 * @param {string} period - '7days', '30days', atau 'all'
 * @returns {string} - Formatted range text
 */
export const formatPeriodRange = (period) => {
  const { startDate, endDate } = getPeriodDateRange(period)
  const formatDate = (date) => date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })
  
  if (period === 'all') {
    return `Semua Data (mulai ${formatDate(startDate)})`
  }
  
  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

/**
 * Mendapatkan previous period activities
 * @param {object[]} activities - All activities
 * @param {string} period - '7days', '30days', atau 'all'
 * @returns {object[]} - Activities from previous period
 */
export const getPreviousPeriodActivities = (activities, period) => {
  const { startDate } = getPeriodDateRange(period)
  const periodDays = period === '7days' ? 7 : period === '30days' ? 30 : 365
  
  const prevStartDate = new Date(startDate)
  prevStartDate.setDate(prevStartDate.getDate() - periodDays)
  
  const prevEndDate = new Date(startDate)
  prevEndDate.setDate(prevEndDate.getDate() - 1)

  return activities.filter((activity) => {
    const actDate = new Date(activity.date)
    return actDate >= prevStartDate && actDate <= prevEndDate
  })
}
