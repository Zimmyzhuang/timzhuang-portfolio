'use client'

import { motion } from 'framer-motion'

// ============================================================================
// TYPES
// ============================================================================

interface IdentityRevealProps {
  onComplete: () => void
  isSkipping?: boolean
}

// ============================================================================
// CONSTANTS
// ============================================================================

const IDENTITY = {
  name: 'TIM ZHUANG',
  role: 'SOFTWARE ENGINEER',
  tagline: 'Building the future, one commit at a time.',
} as const

const ANIMATION_DELAYS = {
  name: 0,
  role: 0.3,
  tagline: 0.6,
  complete: 1.5,
} as const

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const MOTION = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
  },
  name: {
    initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
    },
    transition: { 
      duration: 0.8, 
      delay: ANIMATION_DELAYS.name,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  role: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.6, 
      delay: ANIMATION_DELAYS.role,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  tagline: {
    initial: { opacity: 0 },
    animate: { opacity: 0.6 },
    transition: { 
      duration: 0.8, 
      delay: ANIMATION_DELAYS.tagline,
    },
  },
  glow: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: [0, 0.4, 0.2],
      scale: [0.8, 1.2, 1],
    },
    transition: { 
      duration: 1.5,
      ease: 'easeOut',
    },
  },
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/** Animated glow effect behind text */
function GlowEffect() {
  return (
    <motion.div
      {...MOTION.glow}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div 
        className="w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(110, 58, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  )
}

/** Decorative corner accents */
function CornerAccents() {
  const cornerStyle = "absolute w-8 h-8 border-neon-violet/30"
  
  return (
    <>
      <div className={`${cornerStyle} top-4 left-4 border-t-2 border-l-2`} />
      <div className={`${cornerStyle} top-4 right-4 border-t-2 border-r-2`} />
      <div className={`${cornerStyle} bottom-4 left-4 border-b-2 border-l-2`} />
      <div className={`${cornerStyle} bottom-4 right-4 border-b-2 border-r-2`} />
    </>
  )
}

/** Animated line separators */
function LineSeparator({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="w-24 h-px bg-gradient-to-r from-transparent via-neon-violet/50 to-transparent mx-auto my-4"
      style={{ originX: 0.5 }}
    />
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function IdentityReveal({ onComplete, isSkipping }: IdentityRevealProps) {
  // Trigger complete after animations
  if (!isSkipping) {
    setTimeout(() => {
      onComplete()
    }, ANIMATION_DELAYS.complete * 1000)
  }

  return (
    <motion.div
      {...MOTION.container}
      className="relative flex flex-col items-center justify-center text-center px-6"
    >
      <GlowEffect />
      <CornerAccents />
      
      {/* Name */}
      <motion.h1
        {...MOTION.name}
        className="font-display text-4xl md:text-6xl lg:text-7xl text-void-text tracking-wider"
        style={{
          textShadow: '0 0 40px rgba(110, 58, 255, 0.5), 0 0 80px rgba(110, 58, 255, 0.3)',
        }}
      >
        {IDENTITY.name}
      </motion.h1>

      <LineSeparator delay={ANIMATION_DELAYS.role - 0.1} />

      {/* Role */}
      <motion.p
        {...MOTION.role}
        className="font-mono text-sm md:text-base uppercase tracking-[0.3em] text-neon-violet"
      >
        {IDENTITY.role}
      </motion.p>

      {/* Tagline */}
      <motion.p
        {...MOTION.tagline}
        className="mt-6 font-body text-sm md:text-base text-void-muted max-w-md"
      >
        {IDENTITY.tagline}
      </motion.p>

      {/* Status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 flex items-center gap-2"
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
        />
        <span className="font-mono text-xs text-void-muted uppercase tracking-wider">
          Ready
        </span>
      </motion.div>
    </motion.div>
  )
}
