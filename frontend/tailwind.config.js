/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        ink: '#0a0a0f',
        surface: '#111118',
        card: '#16161f',
        border: '#252535',
        muted: '#6b6b88',
        accent: '#6c63ff',
        'accent-light': '#8b85ff',
        'accent-dim': '#6c63ff22',
        success: '#22d3a5',
        danger: '#f43f5e',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(108, 99, 255, 0)' },
          '50%': { boxShadow: '0 0 24px 4px rgba(108, 99, 255, 0.25)' },
        },
      },
    },
  },
  plugins: [],
}
