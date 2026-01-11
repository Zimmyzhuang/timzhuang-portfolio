/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ☀️ LIGHT MODE - Soft Lavender (easier on eyes)
        canvas: {
          50: '#FAFAFA',      // Surface (soft white)
          100: '#F5F3F7',     // Background (warm gray with hint of lavender)
          200: '#EDEAEF',     // Slightly darker
          300: '#DDD8E4',     // Borders (muted lavender)
          400: '#C4BDCF',     // Muted elements
          500: '#9A93A8',     // Muted text (light)
          600: '#6B6478',     // Muted text (softer)
          700: '#4A4258',     // Secondary accent
          800: '#2D2838',     // Primary text (softer than pure black)
          900: '#1A1720',     // Dark elevated
          950: '#0D0B10',     // Dark base
        },
        // Text colors (softer contrast)
        ink: {
          DEFAULT: '#2D2838',   // Light mode primary text (softer)
          muted: '#6B6478',     // Light mode muted (warmer)
          subtle: '#9A93A8',    // Light mode subtle
        },
        // 🌑 DARK MODE text
        void: {
          text: '#EDEAF5',        // Dark mode primary text
          muted: '#8A84A6',       // Dark mode muted text
          border: '#1F1836',      // Dark mode borders
          surface: '#15102A',     // Dark mode cards
          elevated: '#0E0918',    // Dark mode elevated bg
          base: '#07040C',        // Dark mode base bg
        },
        // Primary Accent - Violet (muted for light mode)
        neon: {
          violet: '#6E3AFF',
          'violet-dim': '#8B6FCF',      // Much softer for light mode
          'violet-glow': 'rgba(110, 58, 255, 0.15)',  // Reduced glow
          'violet-subtle': 'rgba(110, 58, 255, 0.05)',
        },
        // Secondary Accent - Shadow Purple (softer)
        shadow: {
          purple: '#7A6B9E',            // Muted purple for light mode
          'purple-light': '#9488B0',    // Even more muted
        },
        // Danger - Blood Magenta
        danger: {
          DEFAULT: '#A51D4E',
          light: '#9F1239',
          dark: '#7A1539',
        },
        // Keep accent for backwards compatibility
        accent: {
          DEFAULT: '#6E3AFF',
          light: '#8B5CF6',
          dark: '#5B2ECC',
          muted: '#3B1D7A',
        },
        // Compatibility aliases
        electric: {
          pink: '#A51D4E',
          'pink-dim': '#7A1539',
          'pink-glow': 'rgba(165, 29, 78, 0.35)',
        },
      },
      fontFamily: {
        // Cold tech typography
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        graffiti: ['var(--font-graffiti)', 'cursive'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '700' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '0.01em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '0.01em', fontWeight: '600' }],
        'display-sm': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.01em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.15em', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-in': 'slideIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'signal': 'signal 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        signal: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'lifted': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
        'glow-violet': '0 0 12px rgba(110, 58, 255, 0.35)',
        'glow-violet-strong': '0 0 20px rgba(110, 58, 255, 0.4), 0 0 40px rgba(110, 58, 255, 0.2)',
        'glow-danger': '0 0 12px rgba(165, 29, 78, 0.3)',
        'inner-violet': 'inset 0 0 20px rgba(110, 58, 255, 0.1)',
        'void': '0 4px 30px rgba(7, 4, 12, 0.5)',
      },
      backgroundImage: {
        // Subtle purple fog
        'void-gradient': 'radial-gradient(ellipse at top left, rgba(110, 58, 255, 0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(59, 29, 122, 0.06) 0%, transparent 50%)',
        'ash-gradient': 'radial-gradient(ellipse at top left, rgba(124, 77, 255, 0.03) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(94, 74, 138, 0.02) 0%, transparent 50%)',
        // Signal lines
        'signal-lines': 'linear-gradient(90deg, transparent 0%, rgba(110, 58, 255, 0.06) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
