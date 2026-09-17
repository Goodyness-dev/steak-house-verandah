/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:    { DEFAULT: '#0d0d0d', soft: '#1a1a1a' },
        paper:  { DEFAULT: '#f5f0e8', warm: '#ece5d6' },
        bone:   { DEFAULT: '#d4c9b0', muted: '#b8a888' },
        gold: {
          DEFAULT: '#b8955a',
          light:   '#d4af37',
          dark:    '#8a6e3a',
          glow:    'rgba(184,149,90,0.25)',
        },
        charcoal: '#2a2a2a',
        /* Dark-mode aliases kept for admin */
        verandah: {
          bg:          '#0c0c0c',
          dark:        '#0a0a0a',
          surface:     '#161616',
          card:        '#1c1c1c',
          cardHover:   '#222222',
          border:      '#2e2e2e',
          borderSubtle:'#1e1e1e',
          text:        '#f7f4ec',
          muted:       '#9e9e9e',
        },
        shop: {
          red:      '#b8955a',
          redHover: '#a07f48',
          dark:     '#0a0a0a',
          charcoal: '#1c1c1c',
          body:     '#9e9e9e',
          muted:    '#777',
          light:    '#f5f0e8',
          border:   '#2e2e2e',
        }
      },
      fontFamily: {
        serif:   ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        cursive: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        '10xl': ['10rem',  { lineHeight: '1' }],
        '9xl':  ['8rem',   { lineHeight: '1' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-up':    'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
