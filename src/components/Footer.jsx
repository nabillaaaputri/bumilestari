import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-white border-t">
      <div className="container py-8 text-center text-sm text-gray-600">
        <div className="font-semibold text-gray-800">BumiLestari</div>
        <div className="mt-1">Aplikasi sederhana untuk membantu kamu memahami perkiraan jejak karbon sehari-hari.</div>
        <div className="mt-3">© {new Date().getFullYear()} BumiLestari</div>
      </div>
    </footer>
  )
}
