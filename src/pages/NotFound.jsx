import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="container py-20 text-center">
      <h1 className="text-3xl font-bold">Halaman Tidak Ditemukan</h1>
      <p className="mt-4 text-gray-600">Sepertinya halaman yang kamu cari tidak ada.</p>
      <div className="mt-6">
        <Link to="/" className="text-green-700 underline">Kembali ke Beranda</Link>
      </div>
    </div>
  )
}
