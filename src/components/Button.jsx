import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({children, variant='primary', to, className='', ...props}){
  const base = 'inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200'
  const styles = variant === 'primary' ? 'bg-primary-600 text-white hover:bg-primary-700 hover:-translate-y-0.5' : 'bg-surface border border-primary-100 text-ink hover:bg-primary-50'
  const classes = `${base} ${styles} ${className}`

  if(to) return (<Link to={to} className={classes} {...props}>{children}</Link>)
  return (<button className={classes} {...props}>{children}</button>)
}
