/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          brandon: ['var(--font-brandon)', 'sans-serif'],
          alter: ['var(--font-alter)', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }