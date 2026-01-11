'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

// ============================================================================
// TYPES
// ============================================================================

interface ScrollFadeProps {
  children: ReactNode
  /** Delay before animation starts (in seconds) */
  delay?: number
  /** Animation duration (in seconds) */
  duration?: number
  /** How far to slide up from (in pixels) */
  yOffset?: number
  /** Optional className for the wrapper */
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * ScrollFade - Wrapper component that fades children in as they scroll into view
 * 
 * Usage:
 * <ScrollFade>
 *   <YourComponent />
 * </ScrollFade>
 */
export default function ScrollFade({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 40,
  className = '',
}: ScrollFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration, 
        delay,
        ease: [0.22, 1, 0.36, 1] // spring-like easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
