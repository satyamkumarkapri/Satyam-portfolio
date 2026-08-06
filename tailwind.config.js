/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        surface: 'rgba(var(--foreground), var(--surface-opacity))',
        'surface-hover': 'rgba(var(--foreground), var(--surface-hover-opacity))',
        border: 'rgba(var(--foreground), var(--border-opacity))',
        primary: {
          DEFAULT: 'rgb(var(--foreground) / <alpha-value>)',
          dim: 'rgba(var(--foreground), var(--text-dim-opacity))',
        },
        accent: {
          blue: '#60a5fa',
          violet: '#c084fc',
          cyan: '#22d3ee',
          magenta: '#e879f9',
        },
        graphite: 'rgb(var(--graphite) / <alpha-value>)',
        'midnight-blue': '#050505',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, filter: 'brightness(1) drop-shadow(0 0 10px rgba(0,240,255,0.5))' },
          '50%': { opacity: .8, filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(112,0,255,0.5))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'gradient-cyber': 'linear-gradient(to right, #7000ff, #00f0ff, #ff0055)',
        'radial-glow': 'radial-gradient(circle at center, rgba(112,0,255,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
        'glow-blue': '0 0 20px rgba(0, 240, 255, 0.4)',
        'glow-violet': '0 0 20px rgba(112, 0, 255, 0.4)',
      }
    },
  },
  plugins: [],
}
