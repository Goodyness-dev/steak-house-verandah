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
        verandah: {
          bg: '#0d1e16',
          dark: '#0a1711',
          surface: '#142a20',
          card: '#183327',
          cardHover: '#1f4233',
          border: '#284d3b',
          borderSubtle: '#1d382b',
          text: '#f7f4ec',
          muted: '#a3b8ad',
        },
        gold: {
          DEFAULT: '#c5a059',
          light: '#e2c585',
          dark: '#9d7a36',
          accent: '#d4af37',
          glow: 'rgba(197, 160, 89, 0.25)',
        },
        ivory: {
          DEFAULT: '#f7f4ec',
          muted: '#ded7c8',
          parchment: '#ebe4d5',
        },
        midnight: {
          DEFAULT: '#0d1e16',
          pure: '#08130e',
          card: '#142a20',
          cardHover: '#1a372a',
          border: '#254a37',
          subtle: '#2e5741',
        },
        shop: {
          red: '#c5a059',
          redHover: '#b38d45',
          dark: '#0a1711',
          charcoal: '#142a20',
          body: '#9fb5aa',
          muted: '#7a9688',
          light: '#f5f2e9',
          border: '#284d3b',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        heading: ['"Playfair Display"', '"Montserrat"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
