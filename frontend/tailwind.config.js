/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ezme: {
          black: '#0D0D0D',
          white: '#FFFFFF',
          cream: '#FAF8F5',
          warm: '#F5F0E8',
          rose: '#E8B4B8',
          blush: '#F2D7D9',
          blue: '#2962FF',
          powder: '#B0C4DE',
          burgundy: '#800020',
          lavender: '#C9B8E8',
          gold: '#C9A84C',
          mist: '#F7F7F7',
          taupe: '#8B7355',
          charcoal: '#1A1A1A',
        },
      },
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        slideIn: { from: { opacity: 0, transform: 'translateX(-16px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.14)',
        soft: '0 2px 12px rgba(0,0,0,0.06)',
      },
      aspectRatio: { '9/16': '9 / 16' },
    },
  },
  plugins: [],
};
