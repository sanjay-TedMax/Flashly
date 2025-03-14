/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6E3AFF',
        secondary: '#FF3AE6',
        background: '#0A0516',
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255, 255, 255, 0.7)',
        'button-primary': 'rgba(110, 58, 255, 0.9)',
        'button-hover': 'rgba(110, 58, 255, 1)',
        'snapchat-yellow': '#FFFC00',
        'snapchat-blue': '#007AFF',
        'snapchat-blue-dark': '#0066CC',
        'snapchat-red': '#FF3B30',
        'snapchat-red-dark': '#E0352B',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        avenir: [
          '"Avenir Next"',
          '"Avenir"',
          'system-ui',
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
};