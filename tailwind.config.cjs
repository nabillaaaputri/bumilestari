/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f6ef',
          100: '#e7eddf',
          500: '#47704a',
          600: '#31583a',
          700: '#24442d',
        },
        surface: {
          DEFAULT: '#fffdf8',
          muted: '#f4f5ed',
          accent: '#e7eddf',
        },
        ink: {
          DEFAULT: '#20342a',
          muted: '#657269',
          subtle: '#98a099',
        },
        terracotta: {
          DEFAULT: '#b9684d',
          light: '#f3e3d8',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(26, 46, 35, 0.04), 0 4px 16px rgba(26, 46, 35, 0.04)',
        'card-hover': '0 8px 30px rgba(16, 185, 129, 0.1), 0 2px 8px rgba(26, 46, 35, 0.06)',
        soft: '0 2px 24px rgba(26, 46, 35, 0.06)',
      },
    }
  },
  plugins: [],
}
