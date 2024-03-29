/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D'
      },
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
