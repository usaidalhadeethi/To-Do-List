/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'selector',

  theme: {
    extend: {
      colors: {
        'custom-dark-app': '#1f1d2c',
        'custom-dark-card': '#262837',
        'custom-light-app': '#f3f2f6',
        'custom-light-card': '#ffffff',
      },
    },
  },
  plugins: [],
}