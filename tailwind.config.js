/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // We will force dark mode mostly, but keep the capability
  theme: {
    extend: {
      colors: {
        // Deep Navy / Space Blue Palette (Dark Mode)
        dark: {
          bg: '#0F111A',       // Main background (Deepest)
          card: '#1C1C2E',     // Card background (Slightly lighter)
          hover: '#252540',    // Hover state
          border: '#2A2A45',   // Subtle borders
          text: '#94A3B8',     // Body text (Slate 400)
          heading: '#FFFFFF',  // Headings
        },
        // Clean White Palette (Light Mode)
        light: {
          bg: '#F8FAFC',       // Slate 50
          card: '#FFFFFF',     // White
          border: '#E2E8F0',   // Slate 200
          text: '#64748B',     // Slate 500
          heading: '#0F172A',  // Slate 900
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Brand Blue (Electric)
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
          glow: 'rgba(59, 130, 246, 0.5)' // Blue Glow
        },
        secondary: {
          500: '#8B5CF6', // Purple/Neon
          glow: 'rgba(139, 92, 246, 0.5)'
        },
        success: {
          500: '#10B981', // Emerald/Neon Green
          glow: 'rgba(16, 185, 129, 0.5)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
      }
    },
  },
  plugins: [],
}
