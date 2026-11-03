/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFCF9',
          100: '#FFF8F0', // Warm cream
          200: '#F5EBDD', // Soft vanilla
          300: '#EADBC8',
          400: '#DEC6AD',
        },
        chocolate: {
          DEFAULT: '#40271F', // Chocolate brown
          light: '#5A382C',
          dark: '#241713',    // Deep espresso
          deep: '#1A100D',
        },
        rose: {
          dusty: '#D8A4A8',   // Dusty rose
          strawberry: '#E9B8BE', // Strawberry pink
          soft: '#F6E6E8',
          deep: '#B87278',
        },
        gold: {
          DEFAULT: '#C8A46B', // Soft gold
          light: '#DFBF88',
          dark: '#A68249',
          amber: '#E3C185',
        },
        espresso: '#241713',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 10px rgba(64, 39, 31, 0.04)',
        'soft': '0 8px 30px rgba(64, 39, 31, 0.07)',
        'soft-lg': '0 16px 45px rgba(64, 39, 31, 0.11)',
        'soft-xl': '0 24px 60px rgba(64, 39, 31, 0.14)',
        'gold': '0 4px 20px rgba(200, 164, 107, 0.25)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
