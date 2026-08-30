import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Aktivitas from './pages/Aktivitas'
import Analisis from './pages/Analisis'
import Simulasi from './pages/Simulasi'
import NotFound from './pages/NotFound'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="aktivitas" element={<Aktivitas/>} />
        <Route path="analisis" element={<Analisis/>} />
        <Route path="simulasi" element={<Simulasi/>} />
        <Route path="*" element={<NotFound/>} />
      </Route>
    </Routes>
  )
}
