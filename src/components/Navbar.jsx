import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Leaf, Menu, X, ArrowUpRight } from 'lucide-react'

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
    <header className="sticky top-0 z-30 border-b border-primary-100/70 bg-surface/90 backdrop-blur-md">
      <div className="container flex h-[4.5rem] items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white"><Leaf size={18} strokeWidth={2.2} /></span>
          <span className="font-bold tracking-tight">Bumi<span className="text-primary-600">Lestari</span></span>
        </Link>

        <nav className="hidden items-center gap-7 sm:flex">
          {links.map((l)=> (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `relative py-2 text-sm transition-colors hover:text-primary-700 ${isActive ? 'font-bold text-primary-700 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-terracotta' : 'text-ink-muted'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 sm:flex"><Link to="/dashboard" className="text-sm font-semibold text-ink-muted hover:text-primary-700">Masuk</Link><Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700">Mulai Sekarang <ArrowUpRight size={16} /></Link></div>

        <div className="sm:hidden">
          <button aria-label="Buka menu" onClick={()=>setOpen(!open)} className="rounded-full p-2 text-ink hover:bg-primary-50">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-primary-100/70 bg-surface sm:hidden">
          <div className="container space-y-1 py-3">
            {links.map(l=> (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={()=>setOpen(false)} className={({ isActive }) => `block rounded-xl px-3 py-2.5 ${isActive ? 'bg-primary-50 font-semibold text-primary-700' : 'text-ink-muted hover:bg-primary-50'}`}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/dashboard" onClick={()=>setOpen(false)} className="mt-2 block rounded-xl bg-primary-600 px-3 py-2.5 font-semibold text-white">Mulai Sekarang</Link>
          </div>
        </div>
      )}
    </header>
  )
}
