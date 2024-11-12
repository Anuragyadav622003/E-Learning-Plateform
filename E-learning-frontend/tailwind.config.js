/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode based on user's system preference
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  
}