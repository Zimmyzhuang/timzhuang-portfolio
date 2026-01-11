'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntroState } from './useIntroState'
import BootSequence from './BootSequence'
import IdentityReveal from './IdentityReveal'

// ============================================================================
// TYPES
// ============================================================================

type Phase = 'boot' | 'identity' | 'exit' | 'complete'

// ============================================================================
// CONSTANTS
// ============================================================================

const EXIT_DURATION = 800 // ms

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const MOTION = {
  overlay: {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: EXIT_DURATION / 1000, ease: 'easeInOut' }
    },
  },
  skipButton: {
    initial: { opacity: 0 },
    animate: { opacity: 0.6 },
    exit: { opacity: 0 },
    whileHover: { opacity: 1 },
    transition: { delay: 1, duration: 0.3 },
  },
  flicker: {
    animate: {
      opacity: [0, 1, 0.8, 1, 0.9, 1],
    },
    transition: {
      duration: 0.3,
      times: [0, 0.1, 0.2, 0.4, 0.6, 1],
    },
  },
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/** Skip button */
function SkipButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      {...MOTION.skipButton}
      onClick={onClick}
      className="absolute bottom-8 right-8 font-mono text-xs text-void-muted uppercase tracking-wider hover:text-neon-violet transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/50 rounded px-3 py-2"
    >
      Skip →
    </motion.button>
  )
}

/** Grain texture overlay */
function GrainOverlay() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

/** Animated background with subtle purple glow */
function Background() {
  return (
    <>
      {/* Base dark background */}
      <div className="absolute inset-0 bg-void-base" />
      
      {/* Radial gradient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(110, 58, 255, 0.08) 0%, transparent 60%)',
        }}
      />
      
      {/* Grain */}
      <GrainOverlay />
    </>
  )
}

/** Exit transition effect */
function ExitTransition() {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 bg-void-base origin-top"
      style={{
        background: 'linear-gradient(to bottom, #07040C 0%, #07040C 50%, transparent 100%)',
      }}
    />
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function IntroScreen() {
  const { shouldShow, isComplete, skip, complete } = useIntroState()
  const [phase, setPhase] = useState<Phase>('boot')
  const [isSkipping, setIsSkipping] = useState(false)

  // Handle keyboard skip
  useEffect(() => {
    if (!shouldShow || isComplete) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip on any key except Tab (for accessibility)
      if (e.key !== 'Tab') {
        handleSkip()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shouldShow, isComplete])

  // Handle skip
  const handleSkip = useCallback(() => {
    setIsSkipping(true)
    setPhase('exit')
    setTimeout(() => {
      skip()
      setPhase('complete')
    }, 300)
  }, [skip])

  // Handle boot sequence complete
  const handleBootComplete = useCallback(() => {
    if (!isSkipping) {
      setPhase('identity')
    }
  }, [isSkipping])

  // Handle identity reveal complete
  const handleIdentityComplete = useCallback(() => {
    if (!isSkipping) {
      setPhase('exit')
      setTimeout(() => {
        complete()
        setPhase('complete')
      }, EXIT_DURATION)
    }
  }, [isSkipping, complete])

  // Don't render if not showing
  if (!shouldShow && isComplete) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {shouldShow && phase !== 'complete' && (
        <motion.div
          key="intro"
          {...MOTION.overlay}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          <Background />
          
          {/* Main content */}
          <div className="relative z-10 w-full">
            <AnimatePresence mode="wait">
              {phase === 'boot' && (
                <motion.div
                  key="boot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BootSequence 
                    onComplete={handleBootComplete} 
                    isSkipping={isSkipping}
                  />
                </motion.div>
              )}

              {phase === 'identity' && (
                <motion.div
                  key="identity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <IdentityReveal 
                    onComplete={handleIdentityComplete}
                    isSkipping={isSkipping}
                  />
                </motion.div>
              )}

              {phase === 'exit' && (
                <motion.div key="exit">
                  <ExitTransition />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip button */}
          <AnimatePresence>
            {phase !== 'exit' && phase !== 'complete' && (
              <SkipButton onClick={handleSkip} />
            )}
          </AnimatePresence>

          {/* Click anywhere to skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute bottom-8 left-8 font-mono text-xs text-void-muted"
          >
            Press any key to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
