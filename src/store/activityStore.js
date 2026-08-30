/**
 * Activity Store (Zustand)
 * Global state management untuk activities dengan localStorage persistence
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createActivity, calculateTotalEmission, getTopEmitters } from '../utils/carbonCalculator'
import { getSampleActivities } from '../data/mockData'

export const useActivityStore = create(
  persist(
    (set, get) => ({
      // State
      activities: [],
      
      /**
       * Initialize store dengan sample data jika kosong
       * (dipanggil sekali saat app pertama kali dijalankan)
       */
      initializeStore: () => {
        const current = get().activities
        // Jika belum ada data, gunakan sample data
        if (current.length === 0) {
          set({ activities: getSampleActivities() })
        }
      },

      /**
       * Add activity baru
       */
      addActivity: (activityData) => {
        try {
          const newActivity = createActivity(activityData)
          set((state) => ({
            activities: [...state.activities, newActivity],
          }))
          return { success: true, activity: newActivity }
        } catch (error) {
          console.error('Error adding activity:', error.message)
          return { success: false, error: error.message }
        }
      },

      /**
       * Update activity yang sudah ada
       */
      updateActivity: (id, updatedData) => {
        try {
          set((state) => ({
            activities: state.activities.map((activity) =>
              activity.id === id
                ? { ...activity, ...updatedData, updatedAt: new Date().toISOString() }
                : activity
            ),
          }))
          return { success: true }
        } catch (error) {
          console.error('Error updating activity:', error.message)
          return { success: false, error: error.message }
        }
      },

      /**
       * Delete activity
       */
      deleteActivity: (id) => {
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id),
        }))
      },

      /**
       * Clear all activities
       */
      clearActivities: () => {
        set({ activities: [] })
      },

      /**
       * Get activity by ID
       */
      getActivityById: (id) => {
        return get().activities.find((activity) => activity.id === id)
      },

      /**
       * Get all activities (selector)
       */
      getActivities: () => {
        return get().activities
      },

      /**
       * Get total carbon emission dari semua aktivitas
       */
      getTotalEmission: () => {
        return calculateTotalEmission(get().activities)
      },

      /**
       * Get top emitters
       */
      getTopEmitters: (limit = 3) => {
        return getTopEmitters(get().activities, limit)
      },

      /**
       * Get activity count
       */
      getActivityCount: () => {
        return get().activities.length
      },

      /**
       * Replace all activities (untuk reset atau batch update)
       */
      setActivities: (activities) => {
        set({ activities })
      },
    }),
    {
      // Zustand persist middleware configuration
      name: 'bumilestari-activities', // localStorage key
      version: 1,
      storage: {
        // Custom storage adapter (using localStorage)
        getItem: (name) => {
          const item = localStorage.getItem(name)
          return item ? JSON.parse(item) : null
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          localStorage.removeItem(name)
        },
      },
      // Hanya persist state.activities
      partialize: (state) => ({ activities: state.activities }),
    }
  )
)

/**
 * Hook untuk subscribe ke total emission
 */
export const useTotalEmission = () => {
  const activities = useActivityStore((state) => state.activities)
  return calculateTotalEmission(activities)
}

/**
 * Hook untuk subscribe ke activity count
 */
export const useActivityCount = () => {
  const activities = useActivityStore((state) => state.activities)
  return activities.length
}
