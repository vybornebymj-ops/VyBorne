/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#059669', // Emerald Green
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
