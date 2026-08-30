/**
 * Mock Data untuk Development & Testing
 * Data aktivitas realistis untuk testing dan development
 */

import { createActivity } from '../utils/carbonCalculator'

/**
 * Membuat mock activities untuk testing
 * @param {number} daysBack - Berapa hari ke belakang yang ingin di-generate (default: 30)
 * @returns {object[]} - Array of mock activities
 */
export const generateMockActivities = (daysBack = 30) => {
  const activities = []
  const today = new Date()

  for (let i = daysBack; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    // Aktivitas transportasi (hampir setiap hari)
    if (Math.random() > 0.2) {
      activities.push({
        id: `mock_${dateStr}_car_${i}`,
        date: dateStr,
        category: 'transportation',
        activity: 'Berkendara dengan mobil',
        amount: Math.random() > 0.5 ? 20 : 40, // 20 atau 40 km
        unit: 'km',
        emissionFactorId: 'car_petrol',
        emissionFactorValue: 0.205,
        carbonEmission:
          Math.round(
            (Math.random() > 0.5 ? 20 : 40) * 0.205 * 100
          ) / 100,
        notes: 'Mobilitas harian ke kantor',
        createdAt: new Date().toISOString(),
      })
    }

    // Aktivitas naik bus (beberapa hari)
    if (Math.random() > 0.7) {
      activities.push({
        id: `mock_${dateStr}_bus_${i}`,
        date: dateStr,
        category: 'transportation',
        activity: 'Naik bus umum',
        amount: 15,
        unit: 'km',
        emissionFactorId: 'public_bus',
        emissionFactorValue: 0.089,
        carbonEmission: Math.round(15 * 0.089 * 100) / 100,
        notes: 'Perjalanan dengan transportasi umum',
        createdAt: new Date().toISOString(),
      })
    }

    // Aktivitas listrik (setiap hari)
    activities.push({
      id: `mock_${dateStr}_electricity_${i}`,
      date: dateStr,
      category: 'energy',
      activity: 'Penggunaan listrik rumah',
      amount: 8 + Math.random() * 4, // 8-12 kWh
      unit: 'kWh',
      emissionFactorId: 'electricity_grid',
      emissionFactorValue: 0.654,
      carbonEmission:
        Math.round(
          (8 + Math.random() * 4) * 0.654 * 100
        ) / 100,
      notes: 'Konsumsi listrik harian',
      createdAt: new Date().toISOString(),
    })

    // Aktivitas makanan (setiap hari)
    const mealActivities = [
      { id: 'beef', name: 'Daging Sapi', amount: 0.15, factor: 27.0 },
      { id: 'chicken', name: 'Daging Ayam', amount: 0.2, factor: 6.9 },
      { id: 'fish', name: 'Ikan', amount: 0.15, factor: 5.0 },
      { id: 'rice', name: 'Nasi', amount: 0.3, factor: 2.7 },
      { id: 'vegetables', name: 'Sayuran', amount: 0.25, factor: 0.4 },
      { id: 'restaurant_meal', name: 'Makan di Restoran', amount: 1, factor: 2.0 },
    ]

    // Breakfast (vegetable)
    activities.push({
      id: `mock_${dateStr}_breakfast_${i}`,
      date: dateStr,
      category: 'food',
      activity: mealActivities[4].name,
      amount: mealActivities[4].amount,
      unit: 'kg',
      emissionFactorId: mealActivities[4].id,
      emissionFactorValue: mealActivities[4].factor,
      carbonEmission:
        Math.round(
          mealActivities[4].amount * mealActivities[4].factor * 100
        ) / 100,
      notes: 'Sarapan pagi',
      createdAt: new Date().toISOString(),
    })

    // Lunch (chicken or restaurant)
    const lunchIdx = Math.random() > 0.7 ? 5 : 1
    activities.push({
      id: `mock_${dateStr}_lunch_${i}`,
      date: dateStr,
      category: 'food',
      activity: mealActivities[lunchIdx].name,
      amount: mealActivities[lunchIdx].amount,
      unit: mealActivities[lunchIdx].id === 'restaurant_meal' ? 'meal' : 'kg',
      emissionFactorId: mealActivities[lunchIdx].id,
      emissionFactorValue: mealActivities[lunchIdx].factor,
      carbonEmission:
        Math.round(
          mealActivities[lunchIdx].amount * mealActivities[lunchIdx].factor * 100
        ) / 100,
      notes: 'Makan siang',
      createdAt: new Date().toISOString(),
    })

    // Dinner (rice + protein)
    const dinnerIdx = Math.random() > 0.6 ? 2 : 1
    activities.push({
      id: `mock_${dateStr}_dinner_${i}`,
      date: dateStr,
      category: 'food',
      activity: mealActivities[dinnerIdx].name,
      amount: mealActivities[dinnerIdx].amount,
      unit: 'kg',
      emissionFactorId: mealActivities[dinnerIdx].id,
      emissionFactorValue: mealActivities[dinnerIdx].factor,
      carbonEmission:
        Math.round(
          mealActivities[dinnerIdx].amount * mealActivities[dinnerIdx].factor * 100
        ) / 100,
      notes: 'Makan malam',
      createdAt: new Date().toISOString(),
    })

    // Aktivitas shopping (beberapa minggu sekali)
    if (Math.random() > 0.85 && i % 7 === 0) {
      const shoppingItems = [
        { id: 'clothing', name: 'Pakaian', amount: 0.8, factor: 5.0 },
        { id: 'electronics', name: 'Elektronik', amount: 0.5, factor: 8.0 },
        { id: 'book', name: 'Buku', amount: 0.3, factor: 1.0 },
      ]
      const item = shoppingItems[Math.floor(Math.random() * shoppingItems.length)]

      activities.push({
        id: `mock_${dateStr}_shopping_${i}`,
        date: dateStr,
        category: 'shopping',
        activity: item.name,
        amount: item.amount,
        unit: item.id === 'book' ? 'unit' : 'kg',
        emissionFactorId: item.id,
        emissionFactorValue: item.factor,
        carbonEmission:
          Math.round(
            item.amount * item.factor * 100
          ) / 100,
        notes: 'Belanja baru',
        createdAt: new Date().toISOString(),
      })
    }

    // Aktivitas waste (beberapa hari sekali)
    if (Math.random() > 0.6 && i % 3 === 0) {
      const wasteItems = [
        { id: 'waste_general', name: 'Sampah Umum', amount: 2, factor: 0.57 },
        { id: 'waste_recycled', name: 'Sampah Didaur Ulang', amount: 1.5, factor: 0.15 },
        { id: 'plastic_waste', name: 'Sampah Plastik', amount: 1, factor: 0.85 },
      ]
      const waste = wasteItems[Math.floor(Math.random() * wasteItems.length)]

      activities.push({
        id: `mock_${dateStr}_waste_${i}`,
        date: dateStr,
        category: 'waste',
        activity: waste.name,
        amount: waste.amount,
        unit: 'kg',
        emissionFactorId: waste.id,
        emissionFactorValue: waste.factor,
        carbonEmission:
          Math.round(
            waste.amount * waste.factor * 100
          ) / 100,
        notes: 'Pembuangan sampah',
        createdAt: new Date().toISOString(),
      })
    }
  }

  return activities
}

/**
 * Predefined mock data untuk quick testing
 */
export const SAMPLE_ACTIVITIES = [
  {
    id: 'sample_1',
    date: '2024-01-15',
    category: 'transportation',
    activity: 'Berkendara dengan mobil',
    amount: 30,
    unit: 'km',
    emissionFactorId: 'car_petrol',
    emissionFactorValue: 0.205,
    carbonEmission: 6.15,
    notes: 'Perjalanan ke kantor',
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: 'sample_2',
    date: '2024-01-15',
    category: 'energy',
    activity: 'Penggunaan listrik rumah',
    amount: 10,
    unit: 'kWh',
    emissionFactorId: 'electricity_grid',
    emissionFactorValue: 0.654,
    carbonEmission: 6.54,
    notes: 'Konsumsi listrik harian',
    createdAt: '2024-01-15T08:30:00Z',
  },
  {
    id: 'sample_3',
    date: '2024-01-15',
    category: 'food',
    activity: 'Daging Ayam',
    amount: 0.2,
    unit: 'kg',
    emissionFactorId: 'chicken',
    emissionFactorValue: 6.9,
    carbonEmission: 1.38,
    notes: 'Makan siang',
    createdAt: '2024-01-15T12:00:00Z',
  },
  {
    id: 'sample_4',
    date: '2024-01-15',
    category: 'food',
    activity: 'Nasi',
    amount: 0.3,
    unit: 'kg',
    emissionFactorId: 'rice',
    emissionFactorValue: 2.7,
    carbonEmission: 0.81,
    notes: 'Nasi untuk makan siang',
    createdAt: '2024-01-15T12:05:00Z',
  },
  {
    id: 'sample_5',
    date: '2024-01-15',
    category: 'waste',
    activity: 'Sampah Umum',
    amount: 2,
    unit: 'kg',
    emissionFactorId: 'waste_general',
    emissionFactorValue: 0.57,
    carbonEmission: 1.14,
    notes: 'Pembuangan sampah rumah',
    createdAt: '2024-01-15T18:00:00Z',
  },
  {
    id: 'sample_6',
    date: '2024-01-16',
    category: 'transportation',
    activity: 'Naik bus umum',
    amount: 20,
    unit: 'km',
    emissionFactorId: 'public_bus',
    emissionFactorValue: 0.089,
    carbonEmission: 1.78,
    notes: 'Perjalanan dengan transportasi umum',
    createdAt: '2024-01-16T08:00:00Z',
  },
  {
    id: 'sample_7',
    date: '2024-01-16',
    category: 'shopping',
    activity: 'Pakaian',
    amount: 0.8,
    unit: 'kg',
    emissionFactorId: 'clothing',
    emissionFactorValue: 5.0,
    carbonEmission: 4.0,
    notes: 'Pembelian pakaian baru',
    createdAt: '2024-01-16T14:00:00Z',
  },
]

/**
 * Get sample activities
 * @returns {object[]} - Sample activities array
 */
export const getSampleActivities = () => {
  return [...SAMPLE_ACTIVITIES]
}
