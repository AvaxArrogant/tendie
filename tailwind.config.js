/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        avalanche: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        avax: {
          primary: '#e84142',
          secondary: '#2d2d2d',
          accent: '#ffffff',
          background: '#0f0f0f',
        }
      },
      backgroundImage: {
        'avalanche-gradient': 'linear-gradient(135deg, #e84142 0%, #b91c1c 100%)',
        'avalanche-light': 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
      }
    },
  },
  plugins: [],
};
