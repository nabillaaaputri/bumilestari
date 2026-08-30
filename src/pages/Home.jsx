import React from 'react'
import { Leaf, BarChart2, Lightbulb, List, Calculator, TrendingUp } from 'lucide-react'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

export default function Home(){
  return (
    <div className="py-12">
      <section className="container grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">BumiLestari</h1>
          <p className="mt-4 text-xl text-gray-600">Kenali jejakmu. Kurangi dampaknya.</p>
          <p className="mt-4 text-gray-600">BumiLestari membantu kamu menghitung dan memahami perkiraan jejak karbon dari aktivitas sehari-hari.</p>
          <div className="mt-6">
            <Button to="/dashboard">Mulai Hitung Jejak Karbon</Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-64 h-64 bg-green-50 rounded-2xl flex items-center justify-center shadow-sm">
            <Leaf className="text-green-600" size={80} />
          </div>
        </div>
      </section>

      <section className="container mt-16">
        <SectionTitle title="Manfaat BumiLestari" subtitle="Apa yang bisa kamu dapatkan" />
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="p-5 border rounded-lg hover:shadow-md">
            <div className="flex items-center gap-3 text-green-600"><BarChart2 /></div>
            <h3 className="mt-3 font-semibold">Hitung Jejak Karbon</h3>
            <p className="text-gray-600 mt-2 text-sm">Catat aktivitas sehari-hari dan lihat perkiraan emisi yang dihasilkan.</p>
          </div>

          <div className="p-5 border rounded-lg hover:shadow-md">
            <div className="flex items-center gap-3 text-green-600"><TrendingUp /></div>
            <h3 className="mt-3 font-semibold">Pantau Perkembangan</h3>
            <p className="text-gray-600 mt-2 text-sm">Lihat perubahan jejak karbonmu dari waktu ke waktu.</p>
          </div>

          <div className="p-5 border rounded-lg hover:shadow-md">
            <div className="flex items-center gap-3 text-green-600"><Lightbulb /></div>
            <h3 className="mt-3 font-semibold">Temukan Kebiasaan Lebih Baik</h3>
            <p className="text-gray-600 mt-2 text-sm">Dapatkan insight untuk memahami aktivitas yang paling berpengaruh terhadap jejak karbonmu.</p>
          </div>
        </div>
      </section>

      <section className="container mt-16">
        <SectionTitle title="Cara Kerja" />
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="p-6 border rounded-lg text-center">
            <div className="text-2xl font-bold text-green-700">01</div>
            <div className="mt-3 text-lg font-semibold">Catat Aktivitas</div>
            <p className="text-gray-600 mt-2 text-sm">Masukkan aktivitas sehari-hari seperti transportasi, penggunaan energi, dan makanan.</p>
          </div>

          <div className="p-6 border rounded-lg text-center">
            <div className="text-2xl font-bold text-green-700">02</div>
            <div className="mt-3 text-lg font-semibold">Hitung Emisi</div>
            <p className="text-gray-600 mt-2 text-sm">Sistem menghitung perkiraan emisi berdasarkan aktivitas yang kamu catat.</p>
          </div>

          <div className="p-6 border rounded-lg text-center">
            <div className="text-2xl font-bold text-green-700">03</div>
            <div className="mt-3 text-lg font-semibold">Pahami Dampaknya</div>
            <p className="text-gray-600 mt-2 text-sm">Lihat tren, temukan sumber emisi terbesar, dan coba kebiasaan yang lebih ramah lingkungan.</p>
          </div>
        </div>
      </section>

      <section className="container mt-16 mb-20 text-center">
        <div className="p-10 rounded-lg bg-green-50 border">
          <h3 className="text-2xl font-semibold">Sudah siap mengenal jejak karbonmu?</h3>
          <p className="mt-3 text-gray-600">Mulai dari langkah kecil dengan memahami dampak dari aktivitas sehari-harimu.</p>
          <div className="mt-6 flex justify-center">
            <Button to="/dashboard">Mulai Sekarang</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
