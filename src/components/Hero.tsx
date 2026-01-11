'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import CyberButton, { CircuitButton } from './CyberButton'
import CyberBackgrounds from './CyberBackgrounds'

// ============================================================================
// CONSTANTS
// ============================================================================

/** Personal info displayed in hero */
const HERO_CONTENT = {
  name: 'Tim Zhuang',
  role: 'Software Engineer',
  tagline: 'Building thoughtful digital experiences with clean code and meticulous attention to detail.',
  school: 'UC Irvine',
  status: 'SYSTEM ONLINE',
} as const

/** Spring physics for smooth scroll animations */
const SPRING_CONFIG = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
} as const

/** Animation timing for staggered entrance */
const ENTRANCE_DELAYS = {
  status: 0.1,
  role: 0.2,
  name: 0.3,
  tagline: 0.5,
  cta: 0.7,
  timestamp: 1,
} as const

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  cube: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
}

// ============================================================================
// SHARED STYLES
// ============================================================================

const STYLES = {
  label: 'font-mono text-label uppercase tracking-widest text-neon-violet-dim dark:text-neon-violet',
  heading: 'font-display text-display-lg md:text-display-xl text-ink dark:text-void-text text-balance',
  body: 'font-body text-body-lg text-ink-muted dark:text-void-muted max-w-2xl mx-auto text-balance',
  muted: 'font-mono text-xs text-ink-subtle/50 dark:text-void-muted/50 uppercase tracking-wider',
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/** Status indicator with dot */
function StatusIndicator({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: ENTRANCE_DELAYS.status }}
      className="flex items-center justify-center gap-2 mb-6"
    >
      <span className="status-dot active" />
      <p className="terminal-text text-ink-subtle dark:text-void-muted">{text}</p>
    </motion.div>
  )
}

/** Timestamp display */
function SyncTimestamp() {
  const time = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: ENTRANCE_DELAYS.timestamp, duration: 0.5 }}
      className={`mt-8 ${STYLES.muted}`}
    >
      Last sync: {time}
    </motion.p>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  
  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG)

  // Content parallax transforms
  const y = useTransform(smoothProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.95])

  const scrollToSection = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ===== BACKGROUND LAYERS ===== */}
      
      {/* Base background */}
      <div className="absolute inset-0 bg-canvas-100 dark:bg-void-base transition-all duration-500" />
      
      {/* Cyberpunk horizon grid background */}
      <CyberBackgrounds variant="horizon-grid" intensity={0.7} />

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 section-container text-center"
      >
        <div className="max-w-4xl mx-auto">
          <StatusIndicator text={HERO_CONTENT.status} />

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: ENTRANCE_DELAYS.role }}
            className={`${STYLES.label} mb-4`}
          >
            {HERO_CONTENT.role}
          </motion.p>

          {/* Name with letter stroke and glow */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: ENTRANCE_DELAYS.name, ease: [0.22, 1, 0.36, 1] }}
            className={`${STYLES.heading} mb-6`}
            style={{
              WebkitTextStroke: '1px rgba(110, 58, 255, 0.8)',
              textShadow: `
                0 0 10px rgba(110, 58, 255, 0.5),
                0 0 20px rgba(110, 58, 255, 0.3),
                0 0 40px rgba(110, 58, 255, 0.2),
                0 0 60px rgba(110, 58, 255, 0.1)
              `,
            }}
          >
            {HERO_CONTENT.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: ENTRANCE_DELAYS.tagline }}
            className={`${STYLES.body} mb-10`}
          >
            {HERO_CONTENT.tagline} Currently studying Software Engineering at{' '}
            <span className="text-neon-violet-dim dark:text-neon-violet">
              {HERO_CONTENT.school}
            </span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: ENTRANCE_DELAYS.cta }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <CyberButton
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('#projects')}
              statusText="NAVIGATING"
              icon={Icons.cube}
            >
              View Projects
            </CyberButton>

            <CircuitButton onClick={() => scrollToSection('#contact')}>
              Get in Touch
            </CircuitButton>
          </motion.div>

          <SyncTimestamp />
        </div>
      </motion.div>
    </section>
  )
}
