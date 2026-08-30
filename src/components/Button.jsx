import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({children, variant='primary', to, className='', ...props}){
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-md shadow-sm focus:outline-none'
  const styles = variant === 'primary' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-white border text-gray-800 hover:bg-gray-50'
  const classes = `${base} ${styles} ${className}`

  if(to) return (<Link to={to} className={classes} {...props}>{children}</Link>)
  return (<button className={classes} {...props}>{children}</button>)
}
