import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Speakeasier Premium - Bone & Obsidian palette
        ember: {
          DEFAULT: '#c4603a',
          50: '#FDF5F2',
          100: '#FAEBE5',
          200: '#F5CFC0',
          300: '#EDA586',
          400: '#d87a5a',
          500: '#c4603a',
          600: '#a54d2d',
          700: '#863d23',
          800: '#672d1a',
          900: '#481e11',
        },
        bone: {
          DEFAULT: '#e8dccb',
          light: '#f4efe6',
          dark: 'rgba(232,220,203,0.58)',
        },
        forest: {
          DEFAULT: '#1D9E75',
          dark: '#2D5A45',
        },
        midnight: {
          DEFAULT: '#0a0908',
          surface: '#121110',
          raised: '#1a1816',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
export default config
