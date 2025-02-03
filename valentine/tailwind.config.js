/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#1E40AF',
      },
      fontFamily: {
        primary: ['Inter'],
        secondary: ['Indie Flower'],
      },
      backgroundImage: {
        'primary': "url('/images/primary-bg.png')",
      },
    },
  },
  plugins: [],
}

