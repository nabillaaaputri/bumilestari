/**
 * Emission Factors (kg CO₂e per unit)
 * Sumber: IPCC, EPA, dan standar perhitungan karbon global
 * 
 * Format: {
 *   id: string (unique identifier)
 *   name: string (nama aktivitas)
 *   category: string (kategori aktivitas)
 *   unit: string (unit pengukuran)
 *   emissionFactor: number (kg CO₂e per unit)
 *   description: string (penjelasan singkat)
 * }
 */

export const ACTIVITY_CATEGORIES = {
  TRANSPORTATION: 'transportation',
  ENERGY: 'energy',
  FOOD: 'food',
  SHOPPING: 'shopping',
  WASTE: 'waste',
}

export const EMISSION_FACTORS = {
  // ========== TRANSPORTATION (Transportasi) ==========
  CAR_PETROL: {
    id: 'car_petrol',
    name: 'Mobil Bensin',
    category: ACTIVITY_CATEGORIES.TRANSPORTATION,
    unit: 'km',
    emissionFactor: 0.205, // kg CO₂e per km
    description: 'Berkendara dengan mobil berbahan bakar bensin',
  },
  CAR_DIESEL: {
    id: 'car_diesel',
    name: 'Mobil Diesel',
    category: ACTIVITY_CATEGORIES.TRANSPORTATION,
    unit: 'km',
    emissionFactor: 0.181, // kg CO₂e per km
    description: 'Berkendara dengan mobil berbahan bakar diesel',
  },
  MOTORCYCLE: {
    id: 'motorcycle',
    name: 'Sepeda Motor',
    category: ACTIVITY_CATEGORIES.TRANSPORTATION,
    unit: 'km',
    emissionFactor: 0.065, // kg CO₂e per km
    description: 'Berkendara dengan sepeda motor',
  },
  PUBLIC_BUS: {
    id: 'public_bus',
    name: 'Bus Umum',
    category: ACTIVITY_CATEGORIES.TRANSPORTATION,
    unit: 'km',
    emissionFactor: 0.089, // kg CO₂e per km (per penumpang)
    description: 'Perjalanan menggunakan bus umum',
  },
  TRAIN: {
    id: 'train',
    name: 'Kereta',
    category: ACTIVITY_CATEGORIES.TRANSPORTATION,
    unit: 'km',
    emissionFactor: 0.041, // kg CO₂e per km (per penumpang)
    description: 'Perjalanan menggunakan kereta api',
  },
  AIRPLANE_SHORT: {
    id: 'airplane_short',
    name: 'Pesawat (Penerbangan Pendek)',
    category: ACTIVITY_CATEGORIES.TRANSPORTATION,
    unit: 'km',
    emissionFactor: 0.255, // kg CO₂e per km (per penumpang)
    description: 'Penerbangan jarak pendek (< 1000 km)',
  },
  BICYCLE: {
    id: 'bicycle',
    name: 'Sepeda',
    category: ACTIVITY_CATEGORIES.TRANSPORTATION,
    unit: 'km',
    emissionFactor: 0, // Nol emisi
    description: 'Bersepeda (zero emission)',
  },
  WALK: {
    id: 'walk',
    name: 'Jalan Kaki',
    category: ACTIVITY_CATEGORIES.TRANSPORTATION,
    unit: 'km',
    emissionFactor: 0, // Nol emisi
    description: 'Berjalan kaki (zero emission)',
  },

  // ========== ENERGY (Energi/Listrik) ==========
  ELECTRICITY_GRID: {
    id: 'electricity_grid',
    name: 'Listrik dari Jaringan',
    category: ACTIVITY_CATEGORIES.ENERGY,
    unit: 'kWh',
    emissionFactor: 0.654, // kg CO₂e per kWh (Indonesia average)
    description: 'Penggunaan listrik dari jaringan PLN',
  },
  NATURAL_GAS: {
    id: 'natural_gas',
    name: 'Gas Alam',
    category: ACTIVITY_CATEGORIES.ENERGY,
    unit: 'm³',
    emissionFactor: 1.89, // kg CO₂e per m³
    description: 'Penggunaan gas alam untuk pemanasan/memasak',
  },
  LPG: {
    id: 'lpg',
    name: 'LPG',
    category: ACTIVITY_CATEGORIES.ENERGY,
    unit: 'kg',
    emissionFactor: 3.0, // kg CO₂e per kg
    description: 'Penggunaan gas LPG untuk memasak/pemanasan',
  },
  PETROL_HEATING: {
    id: 'petrol_heating',
    name: 'Bensin untuk Heating',
    category: ACTIVITY_CATEGORIES.ENERGY,
    unit: 'liter',
    emissionFactor: 2.31, // kg CO₂e per liter
    description: 'Penggunaan bensin untuk sistem pemanas',
  },
  SOLAR_PANEL: {
    id: 'solar_panel',
    name: 'Panel Surya',
    category: ACTIVITY_CATEGORIES.ENERGY,
    unit: 'kWh',
    emissionFactor: 0.048, // kg CO₂e per kWh (termasuk lifecycle)
    description: 'Listrik dari panel surya (very low emission)',
  },

  // ========== FOOD (Makanan) ==========
  BEEF: {
    id: 'beef',
    name: 'Daging Sapi',
    category: ACTIVITY_CATEGORIES.FOOD,
    unit: 'kg',
    emissionFactor: 27.0, // kg CO₂e per kg
    description: 'Konsumsi daging sapi',
  },
  CHICKEN: {
    id: 'chicken',
    name: 'Daging Ayam',
    category: ACTIVITY_CATEGORIES.FOOD,
    unit: 'kg',
    emissionFactor: 6.9, // kg CO₂e per kg
    description: 'Konsumsi daging ayam',
  },
  PORK: {
    id: 'pork',
    name: 'Daging Babi',
    category: ACTIVITY_CATEGORIES.FOOD,
    unit: 'kg',
    emissionFactor: 12.1, // kg CO₂e per kg
    description: 'Konsumsi daging babi',
  },
  FISH: {
    id: 'fish',
    name: 'Ikan/Seafood',
    category: ACTIVITY_CATEGORIES.FOOD,
    unit: 'kg',
    emissionFactor: 5.0, // kg CO₂e per kg
    description: 'Konsumsi ikan atau seafood',
  },
  DAIRY: {
    id: 'dairy',
    name: 'Produk Susu',
    category: ACTIVITY_CATEGORIES.FOOD,
    unit: 'kg',
    emissionFactor: 1.23, // kg CO₂e per kg
    description: 'Konsumsi produk susu (keju, yogurt, dll)',
  },
  RICE: {
    id: 'rice',
    name: 'Beras/Nasi',
    category: ACTIVITY_CATEGORIES.FOOD,
    unit: 'kg',
    emissionFactor: 2.7, // kg CO₂e per kg
    description: 'Konsumsi nasi/beras',
  },
  VEGETABLES: {
    id: 'vegetables',
    name: 'Sayuran',
    category: ACTIVITY_CATEGORIES.FOOD,
    unit: 'kg',
    emissionFactor: 0.4, // kg CO₂e per kg
    description: 'Konsumsi sayuran segar',
  },
  FRUITS: {
    id: 'fruits',
    name: 'Buah-buahan',
    category: ACTIVITY_CATEGORIES.FOOD,
    unit: 'kg',
    emissionFactor: 0.5, // kg CO₂e per kg
    description: 'Konsumsi buah-buahan segar',
  },
  BREAD_CEREALS: {
    id: 'bread_cereals',
    name: 'Roti/Sereal',
    category: ACTIVITY_CATEGORIES.FOOD,
    unit: 'kg',
    emissionFactor: 1.0, // kg CO₂e per kg
    description: 'Konsumsi roti, sereal, atau produk gandum',
  },
  RESTAURANT_MEAL: {
    id: 'restaurant_meal',
    name: 'Makan di Restoran',
    category: ACTIVITY_CATEGORIES.FOOD,
    unit: 'meal',
    emissionFactor: 2.0, // kg CO₂e per meal (average)
    description: 'Satu porsi makanan dari restoran/katering',
  },

  // ========== SHOPPING (Belanja/Konsumsi Barang) ==========
  CLOTHING: {
    id: 'clothing',
    name: 'Pakaian',
    category: ACTIVITY_CATEGORIES.SHOPPING,
    unit: 'kg',
    emissionFactor: 5.0, // kg CO₂e per kg
    description: 'Pembelian pakaian baru',
  },
  ELECTRONICS: {
    id: 'electronics',
    name: 'Elektronik',
    category: ACTIVITY_CATEGORIES.SHOPPING,
    unit: 'kg',
    emissionFactor: 8.0, // kg CO₂e per kg
    description: 'Pembelian perangkat elektronik',
  },
  FURNITURE: {
    id: 'furniture',
    name: 'Furnitur',
    category: ACTIVITY_CATEGORIES.SHOPPING,
    unit: 'kg',
    emissionFactor: 3.5, // kg CO₂e per kg
    description: 'Pembelian furnitur/perlengkapan rumah',
  },
  BOOK: {
    id: 'book',
    name: 'Buku',
    category: ACTIVITY_CATEGORIES.SHOPPING,
    unit: 'unit',
    emissionFactor: 1.0, // kg CO₂e per buku
    description: 'Pembelian buku baru',
  },
  BEAUTY_PERSONAL: {
    id: 'beauty_personal',
    name: 'Produk Kecantikan & Perawatan',
    category: ACTIVITY_CATEGORIES.SHOPPING,
    unit: 'kg',
    emissionFactor: 2.5, // kg CO₂e per kg
    description: 'Produk perawatan pribadi dan kecantikan',
  },

  // ========== WASTE (Sampah) ==========
  WASTE_GENERAL: {
    id: 'waste_general',
    name: 'Sampah Umum',
    category: ACTIVITY_CATEGORIES.WASTE,
    unit: 'kg',
    emissionFactor: 0.57, // kg CO₂e per kg
    description: 'Pembuangan sampah umum (landfill)',
  },
  WASTE_RECYCLED: {
    id: 'waste_recycled',
    name: 'Sampah Didaur Ulang',
    category: ACTIVITY_CATEGORIES.WASTE,
    unit: 'kg',
    emissionFactor: 0.15, // kg CO₂e per kg (jauh lebih rendah)
    description: 'Sampah yang didaur ulang',
  },
  PLASTIC_WASTE: {
    id: 'plastic_waste',
    name: 'Sampah Plastik',
    category: ACTIVITY_CATEGORIES.WASTE,
    unit: 'kg',
    emissionFactor: 0.85, // kg CO₂e per kg
    description: 'Pembuangan sampah plastik',
  },
}

/**
 * Mendapatkan emission factor berdasarkan ID
 * @param {string} factorId - ID dari emission factor
 * @returns {object|null} - Emission factor object atau null jika tidak ditemukan
 */
export const getEmissionFactor = (factorId) => {
  if (!factorId) return null
  if (EMISSION_FACTORS[factorId]) return EMISSION_FACTORS[factorId]
  return Object.values(EMISSION_FACTORS).find((factor) => factor.id === factorId) || null
}

/**
 * Mendapatkan semua emission factors berdasarkan kategori
 * @param {string} category - Kategori aktivitas
 * @returns {object[]} - Array of emission factors
 */
export const getEmissionFactorsByCategory = (category) => {
  return Object.values(EMISSION_FACTORS).filter(
    (factor) => factor.category === category
  )
}

/**
 * Mendapatkan semua kategori yang tersedia
 * @returns {string[]} - Array of category names
 */
export const getAllCategories = () => {
  return Object.values(ACTIVITY_CATEGORIES)
}
