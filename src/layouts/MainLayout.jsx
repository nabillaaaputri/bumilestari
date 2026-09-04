import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useActivityStore } from '../store/activityStore'

export default function MainLayout(){
  const location = useLocation()
  const initializeStore = useActivityStore((state) => state.initializeStore)

  useEffect(() => {
    if (location.pathname !== '/') {
      initializeStore()
    }
  }, [initializeStore, location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-surface">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
