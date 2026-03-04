'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from '@/components/ThemeProvider'

function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()
  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 p-2 rounded-full bg-canvas-200 dark:bg-void-surface text-ink-muted dark:text-void-muted hover:text-ink dark:hover:text-neon-violet transition-colors border border-canvas-300 dark:border-void-border"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas-50 dark:bg-void-base transition-colors">
      <ThemeToggle />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6"
      >
        <h1 className="font-display text-display-lg md:text-display-xl text-ink dark:text-void-text tracking-wide">
          Tim Zhuang
        </h1>

        <p
          className="font-graffiti text-2xl md:text-3xl text-ink-muted dark:text-void-muted mt-2"
          style={{ textShadow: '1px 1px 3px rgba(110, 58, 255, 0.2)' }}
        >
          庄天乐
        </p>

        <div className="mt-12 flex items-center gap-8 justify-center">
          <Link
            href="/work"
            className="group relative font-mono text-body-md uppercase tracking-widest text-ink-muted dark:text-void-muted hover:text-neon-violet-dim dark:hover:text-neon-violet transition-colors"
          >
            Work
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-violet transition-all duration-300 group-hover:w-full" />
          </Link>

          <span className="text-canvas-400 dark:text-void-border select-none">/</span>

          <Link
            href="/photos"
            className="group relative font-mono text-body-md uppercase tracking-widest text-ink-muted dark:text-void-muted hover:text-neon-violet-dim dark:hover:text-neon-violet transition-colors"
          >
            Photos
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-violet transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
