/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e3e8fc",
        secondary: {
          DEFAULT: "#F3C623",
        },
        yellow: {
          DEFAULT: "#F3C623",
        },
        orange: {
          DEFAULT: "#EB8317",
        },
        blue: {
          DEFAULT: "#10375C",
        },
        lightBlue: {
          DEFAULT: "#28B8D5",
        },
      },
    },
  },
  plugins: [],
}

