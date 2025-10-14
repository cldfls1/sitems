/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f0',
          100: '#b3e6d1',
          200: '#80d4b2',
          300: '#4dc393',
          400: '#2ab677',
          500: '#22a05e',
          600: '#1a7d49',
          700: '#136138',
          800: '#0d4528',
          900: '#062918',
        },
        dark: {
          950: '#000000',
          900: '#0a0a0a',
          850: '#111111',
          800: '#181818',
          700: '#1f1f1f',
          600: '#2a2a2a',
          500: '#3a3a3a',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'terminal-blink': 'terminal-blink 1s step-end infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
      },
      keyframes: {
        glow: {
          'from': {
            textShadow: '0 0 10px #3bc588, 0 0 20px #3bc588, 0 0 30px #3bc588',
          },
          'to': {
            textShadow: '0 0 20px #3bc588, 0 0 30px #3bc588, 0 0 40px #3bc588',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'terminal-blink': {
          'from, to': {
            opacity: 1,
          },
          '50%': {
            opacity: 0,
          },
        },
        'slide-up': {
          'from': {
            transform: 'translateY(100%)',
            opacity: 0,
          },
          'to': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        'slide-down': {
          'from': {
            transform: 'translateY(-100%)',
            opacity: 0,
          },
          'to': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
}
