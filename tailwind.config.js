/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#ffffff',
        panel: '#101114',
        steel: '#a3a3a3',
        metricGreen: '#22c55e',
        metricAmber: '#f59e0b',
        metricRed: '#ef4444',
        // Single brand accent — used sparingly for the brand dot and
        // data/measurement moments only, not as decoration.
        accent: '#FF4D3D',
        'accent-dim': '#E0392A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
