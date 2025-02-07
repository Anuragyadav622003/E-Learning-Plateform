import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class', // Enable dark mode based on user's system preference
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin
  ],
};

export default config;
