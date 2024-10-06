module.exports = {
  darkMode: 'class', // Enable dark mode based on a class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#140f00', // Custom color for dark mode
        light: '#f4f4f4', // Light mode background
        orange: {
          500: '#FF5C00', // Orange for accents
        },
      },
    },
  },
  plugins: [],
}
