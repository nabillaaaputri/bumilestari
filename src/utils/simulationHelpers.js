/**
 * Simulation Helper Utilities
 * Fungsi-fungsi untuk what-if analysis emisi karbon
 */

import { EMISSION_FACTORS, getEmissionFactor } from '../constants/emissionFactors'
import { calculateCarbonEmission } from './carbonCalculator'

/**
 * Mendapatkan alternatif skenario untuk aktivitas terpilih.
 * Prioritas: unit sama → kategori sama. Exclude faktor yang sama.
 * @param {object} activity - Activity object dari store
 * @returns {object[]} - Array of emission factor objects
 */
export const getScenarioAlternatives = (activity) => {
  if (!activity) return []

  const allFactors = Object.values(EMISSION_FACTORS)
  const excludeCurrent = (factor) => factor.id !== activity.emissionFactorId

  const sameUnit = allFactors.filter(
    (factor) => factor.unit === activity.unit && excludeCurrent(factor)
  )
  if (sameUnit.length > 0) return sameUnit

  return allFactors.filter(
    (factor) => factor.category === activity.category && excludeCurrent(factor)
  )
}

/**
 * Menghitung hasil simulasi what-if
 * @param {object} activity - Activity object terpilih
 * @param {string} newEmissionFactorId - ID emission factor skenario baru
 * @param {number} [amount] - Jumlah simulasi (default: amount aktivitas)
 * @returns {object|null} - Hasil simulasi atau null jika input tidak valid
 */
export const calculateSimulation = (activity, newEmissionFactorId, amount) => {
  if (!activity || !newEmissionFactorId) return null

  const simulatedFactor = getEmissionFactor(newEmissionFactorId)
  if (!simulatedFactor) return null

  const currentFactor = getEmissionFactor(activity.emissionFactorId)
  const simAmount = amount ?? activity.amount
  const currentEmission = activity.carbonEmission ?? 0
  const simulatedEmission = calculateCarbonEmission(simAmount, simulatedFactor.emissionFactor)
  const difference = Math.round((currentEmission - simulatedEmission) * 100) / 100
  const isIncrease = difference < 0

  let reductionPercentage = 0
  if (currentEmission > 0) {
    reductionPercentage = Math.round((difference / currentEmission) * 100 * 10) / 10
  }

  return {
    currentEmission,
    simulatedEmission,
    potentialSaving: isIncrease ? 0 : difference,
    emissionIncrease: isIncrease ? Math.abs(difference) : 0,
    isIncrease,
    reductionPercentage,
    amount: simAmount,
    currentFactor,
    simulatedFactor,
  }
}
