import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const links = [
    {to: '/', label: 'Beranda'},
    {to: '/dashboard', label: 'Dashboard'},
    {to: '/aktivitas', label: 'Aktivitas'},
    {to: '/analisis', label: 'Analisis'},
    {to: '/simulasi', label: 'Simulasi'},
  ]

  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="text-green-700 font-semibold text-xl">BumiLestari</div>
          <div className="hidden sm:block text-sm text-gray-500">Kenali jejakmu. Kurangi dampaknya.</div>
        </div>

        <nav className="hidden sm:flex items-center gap-6">
          {links.map(l=> (
            <NavLink key={l.to} to={l.to} className={({isActive}) => `text-sm ${isActive? 'text-green-700 font-medium' : 'text-gray-700 hover:text-green-700'}`} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="sm:hidden">
          <button aria-label="menu" onClick={()=>setOpen(!open)} className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden border-t">
          <div className="px-4 py-3 space-y-2">
            {links.map(l=> (
              <NavLink key={l.to} to={l.to} onClick={()=>setOpen(false)} className={({isActive})=> `block rounded px-2 py-1 ${isActive? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
