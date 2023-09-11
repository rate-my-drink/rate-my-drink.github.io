/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "transparent-black-50": '#333333f2',
        "transparent-black-100": '#333333e2',
        "transparent-black-200": '#333333ca',
        "transparent-black-300": '#333333a5',
        "transparent-black-400": '#33333371',
        "transparent-black-500": '#33333344',
        "transparent-black-600": '#33333326',
        "transparent-black-700": '#3333331c',
        "transparent-black-800": '#3333331b',
        "transparent-black-900": '#3333331d',
        "transparent-black-950": '#333333a0',
      }
    },
  },
  plugins: [],
}

