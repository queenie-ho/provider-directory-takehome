/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // THVC Purple from Figma
        'thvc-purple': '#6D28D9',
        'thvc-purple-light': '#8B5CF6',
        'thvc-purple-dark': '#5B21B6',
        
        // Neutral colors from Figma
        neutral: {
          0: '#FFFFFF',
          1: '#FAFAFA',
          2: '#F6F7F7',
          3: '#EEEEEE',
          4: '#DFE1E6',
          5: '#C6C9CF',
          6: '#6E7178',
          7: '#6E7178',
          8: '#3F4145',
          9: '#1C1E24',
        },
        // Secondary/State colors from Figma
        secondary: {
          5: '#5B8DEF', // Blue from Figma
        },
      },
    },
  },
  plugins: [],
}