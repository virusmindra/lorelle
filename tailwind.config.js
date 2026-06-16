/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lorelle: {
          50:  '#fdfcf8',
          100: '#f7f2ea',
          200: '#ede3d0',
          300: '#ddd0b8',
          400: '#c8b49a',
          500: '#a8936f',
          600: '#8a7251',
          700: '#6b5538',
          800: '#4a3a24',
          900: '#2a2010',
        },
        vt: {
          50:  '#f0f7f3',
          100: '#d4ece2',
          200: '#a8d9c5',
          300: '#72bfa3',
          400: '#43a07e',
          500: '#2d7a5a',
          600: '#236246',
          700: '#1a5940',
          800: '#114030',
          900: '#0d3224',
        },
        ink: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Bebas Neue', 'Impact', 'Arial Narrow', 'sans-serif'],
        editorial: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'widest-2': '0.3em',
        'magazine': '0.2em',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
