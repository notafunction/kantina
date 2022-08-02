/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const primary = colors.indigo
const secondary = colors.pink
const info = colors.sky
const warning = colors.amber
const success = colors.emerald
const error = colors.red

module.exports = {
  mode: 'jit',

  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './server/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary,
        secondary,
        info,
        warning,
        success,
        error,
      },
    },
  },

  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
