/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',
    './users/templates/**/*.html',
    './profiles/templates/**/*.html',
    './accounts/templates/**/*.html',
    './categories/templates/**/*.html',
    './transactions/templates/**/*.html',
    './core/templates/**/*.html',
    './static/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for Finanpy dark theme
        primary: {
          500: '#667eea',
          600: '#5568d3',
          700: '#4453b8',
        },
        secondary: {
          500: '#764ba2',
          600: '#63408a',
          700: '#523672',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
