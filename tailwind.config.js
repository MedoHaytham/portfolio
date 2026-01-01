/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4db5ff',
        secondary: '#ffffff66',
        bgColor: '#1f1f38',
        bgVariant: '#2c2c6c',
        light: '#ffffff99',
      },
      fontFamily: {
        bodyFont: ['Poppins'],
      },
      transitionProperty: {
        main: 'all',
      },
      transitionDuration: {
        main: '400ms',   
      },
      transitionTimingFunction: {
        main: 'ease',
      },
    },
  },
  plugins: [],
}

