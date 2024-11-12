/** @type {import('tailwindcss').Config} */
import  flowbite from  "flowbite-react/tailwind";
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(), 
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Extend custom colors for dark mode, if needed
        darkBackground: '#121212',
        darkCard: '#1e1e1e',
        darkText: '#ffffff',
        linkText: '#4f83cc',
      },
    },
  },
  plugins: [
  
    flowbite.plugin(),
  ],
}
