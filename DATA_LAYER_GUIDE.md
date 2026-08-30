# 📚 Data Layer & Carbon Calculator Documentation

## 📁 Struktur Folder

```
src/
├── constants/
│   └── emissionFactors.js    # Emission factors untuk semua aktivitas
├── utils/
│   ├── carbonCalculator.js   # Fungsi kalkulasi emisi karbon
│   └── activityHelpers.js    # Helper functions untuk manipulasi data
├── data/
│   └── mockData.js           # Mock data untuk development & testing
└── ... (files lainnya)
```

---

## 📊 Activity Data Model

Struktur data untuk satu aktivitas:

```javascript
{
  id: string,                    // Unique identifier (auto-generated jika tidak ada)
  date: string,                  // Format: "2024-01-15"
  category: string,              // 'transportation', 'energy', 'food', 'shopping', 'waste'
  activity: string,              // Nama aktivitas (contoh: "Berkendara dengan mobil")
  amount: number,                // Jumlah (contoh: 30 untuk 30 km)
  unit: string,                  // Unit pengukuran (km, kg, kWh, meal, dll)
  emissionFactorId: string,      // ID dari emission factor (contoh: 'car_petrol')
  emissionFactorValue: number,   // Nilai factor (kg CO₂e per unit)
  carbonEmission: number,        // Hasil kalkulasi (amount × emissionFactorValue) dalam kg CO₂e
  notes: string,                 // Catatan tambahan
  createdAt: string,             // ISO timestamp
}
```

---

## 🔧 Carbon Calculator Utilities

File: `src/utils/carbonCalculator.js`

### 1. **calculateCarbonEmission(amount, emissionFactor)**
Menghitung emisi karbon untuk satu aktivitas.

```javascript
import { calculateCarbonEmission } from '@/utils/carbonCalculator'

const emission = calculateCarbonEmission(30, 0.205) // 6.15 kg CO₂e
```

### 2. **calculateTotalEmission(activities)**
Menghitung total emisi dari array aktivitas.

```javascript
const total = calculateTotalEmission(activities) // Jumlah kg CO₂e
```

### 3. **calculateEmissionByCategory(activities, category)**
Menghitung total emisi berdasarkan kategori tertentu.

```javascript
const foodEmission = calculateEmissionByCategory(activities, 'food')
```

### 4. **calculateEmissionByDateRange(activities, startDate, endDate)**
Menghitung total emisi dalam range tanggal.

```javascript
const weeklyEmission = calculateEmissionByDateRange(
  activities,
  '2024-01-08',
  '2024-01-14'
)
```

### 5. **getEmissionBreakdownByCategory(activities)**
Mendapatkan breakdown emisi per kategori sebagai object.

```javascript
const breakdown = getEmissionBreakdownByCategory(activities)
// Output: { transportation: 15.2, energy: 5.6, food: 8.3, shopping: 0, waste: 2.1 }
```

### 6. **getTopEmitters(activities, limit)**
Mendapatkan aktivitas dengan kontribusi emisi terbesar.

```javascript
const top5 = getTopEmitters(activities, 5)
// Array of top 5 activities sorted by carbonEmission (descending)
```

### 7. **calculateDailyAverageEmission(activities)**
Menghitung rata-rata emisi per hari.

```javascript
const daily = calculateDailyAverageEmission(activities) // kg CO₂e per hari
```

### 8. **calculateDailyEmission(activities)**
Menghitung emisi per hari (untuk chart).

```javascript
const dailyData = calculateDailyEmission(activities)
// Output: [
//   { date: '2024-01-15', emission: 15.5 },
//   { date: '2024-01-16', emission: 12.3 },
//   ...
// ]
```

### 9. **calculateMonthlyEmission(activities)**
Menghitung emisi per bulan (untuk chart).

```javascript
const monthlyData = calculateMonthlyEmission(activities)
// Output: [
//   { month: '2024-01', emission: 450.5 },
//   { month: '2024-02', emission: 420.3 },
// ]
```

### 10. **createActivity(activityData)**
Membuat activity object lengkap dengan carbon emission yang sudah dihitung.

```javascript
const newActivity = createActivity({
  date: '2024-01-15',
  category: 'transportation',
  activity: 'Berkendara dengan mobil',
  amount: 30,
  unit: 'km',
  emissionFactorId: 'car_petrol',
})
// Output: { id, date, category, activity, amount, unit, emissionFactorId, emissionFactorValue, carbonEmission, notes, createdAt }
```

### 11. **updateActivityAmount(activity, newAmount)**
Update activity dengan nilai amount baru dan recalculate carbonEmission.

```javascript
const updated = updateActivityAmount(activity, 50) // 50 km baru
```

---

## 🎨 Activity Helper Utilities

File: `src/utils/activityHelpers.js`

### Formatting & Display

```javascript
import { formatDate, formatCarbonEmission, getCategoryLabel, getCategoryColor } from '@/utils/activityHelpers'

// Format tanggal
formatDate('2024-01-15')              // "15 Januari 2024"
formatDateShort('2024-01-15')         // "15/01/2024"

// Format emisi karbon
formatCarbonEmission(6.15, 2)         // "6.15 kg CO₂e"
formatCarbonEmissionWithAutoUnit(1500) // "1.50 ton CO₂e"

// Label & styling
getCategoryLabel('transportation')    // "Transportasi"
getCategoryColor('transportation')    // "#3B82F6"
getCategoryIcon('transportation')     // "🚗"
```

### Data Retrieval

```javascript
// Mendapatkan info dari emission factor ID
getActivityName('car_petrol')         // "Mobil Bensin"
getActivityDescription('car_petrol')  // "Berkendara dengan mobil berbahan bakar bensin"
getActivityUnit('car_petrol')         // "km"
```

### Validation

```javascript
const validation = validateActivity({
  date: '2024-01-15',
  category: 'transportation',
  activity: 'Berkendara dengan mobil',
  amount: 30,
  emissionFactorId: 'car_petrol',
})
// Output: { isValid: true, errors: [] }
```

### Sorting & Filtering

```javascript
// Sorting
const sorted = sortActivities(activities, 'emission', 'desc') // Sort by emission descending
const sorted2 = sortActivities(activities, 'date', 'asc')    // Sort by date ascending

// Filtering
const filtered = filterActivities(activities, {
  category: 'food',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  searchText: 'beef'
})

// Grouping
const grouped = groupActivitiesByPeriod(activities, 'month') // { '2024-01': [...], '2024-02': [...] }

// Export CSV
const csv = exportActivitiesToCSV(activities)
```

---

## 📦 Mock Data

File: `src/data/mockData.js`

### Generate Mock Data

```javascript
import { generateMockActivities, getSampleActivities } from '@/data/mockData'

// Generate 30 hari aktivitas realistis
const activities = generateMockActivities(30)

// Get predefined sample (7 activities)
const sample = getSampleActivities()
```

---

## 📚 Emission Factors

File: `src/constants/emissionFactors.js`

### Available Categories
- `transportation` - Transportasi (Mobil, Motor, Bus, Kereta, Pesawat, Sepeda, Jalan)
- `energy` - Energi (Listrik PLN, Gas Alam, LPG, Panel Surya)
- `food` - Makanan (Daging, Ikan, Sayuran, Buah, Roti, dll)
- `shopping` - Belanja (Pakaian, Elektronik, Furnitur, Buku, Kecantikan)
- `waste` - Sampah (Umum, Daur Ulang, Plastik)

### Usage

```javascript
import {
  EMISSION_FACTORS,
  ACTIVITY_CATEGORIES,
  getEmissionFactor,
  getEmissionFactorsByCategory,
  getAllCategories
} from '@/constants/emissionFactors'

// Get factor by ID
const factor = getEmissionFactor('car_petrol')
// { id, name, category, unit, emissionFactor, description }

// Get semua factor dalam kategori tertentu
const transportFactors = getEmissionFactorsByCategory('transportation')

// Get semua kategori
const categories = getAllCategories()
```

---

## 💡 Contoh Penggunaan Lengkap

```javascript
import { createActivity, calculateTotalEmission } from '@/utils/carbonCalculator'
import { 
  formatCarbonEmission, 
  getCategoryLabel,
  formatDate 
} from '@/utils/activityHelpers'
import { generateMockActivities } from '@/data/mockData'

// 1. Generate mock data atau buat activity baru
const activities = generateMockActivities(30)

// 2. Hitung total emisi
const total = calculateTotalEmission(activities) // 450.5 kg CO₂e

// 3. Format untuk display
const totalFormatted = formatCarbonEmission(total) // "450.50 kg CO₂e"

// 4. Buat activity baru
const newActivity = createActivity({
  date: '2024-01-20',
  category: 'transportation',
  activity: 'Berkendara dengan mobil',
  amount: 25,
  unit: 'km',
  emissionFactorId: 'car_petrol',
})

// 5. Tambahkan ke array
activities.push(newActivity)

// 6. Hitung lagi
const newTotal = calculateTotalEmission(activities)
console.log(`Total emisi: ${formatCarbonEmission(newTotal)}`)
```

---

## 🎯 Nextnya: State Management

Utilities ini dirancang untuk independent dari React, jadi bisa langsung diintegrasikan ke:
- **Zustand** - Global state management
- **Context API** - React built-in solution
- **Redux** - Jika diperlukan kompleksitas lebih

Rekomendasi: Mulai dengan Zustand atau Context API untuk menyimpan activities dan calculate derived states.

