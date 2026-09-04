import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t border-primary-100 bg-primary-700 text-primary-50">
      <div className="container flex flex-col gap-3 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div><div className="font-bold text-white">BumiLestari</div><div className="mt-1 text-primary-100">Kenali jejakmu. Jaga bumi.</div></div>
        <div className="text-primary-100">© {new Date().getFullYear()} BumiLestari</div>
      </div>
    </footer>
  )
}
