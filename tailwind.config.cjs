/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3faf5',
          100: '#e6f6ea',
          500: '#2f855a'
        }
      }
    }
  },
  plugins: [],
}
