'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================================================
// TYPES
// ============================================================================

interface BootSequenceProps {
  onComplete: () => void
  isSkipping?: boolean
}

interface TerminalLine {
  id: string
  text: string
  delay: number // ms before this line starts typing
  status?: 'loading' | 'success' | 'info'
}

// ============================================================================
// CONSTANTS
// ============================================================================

const TERMINAL_LINES: TerminalLine[] = [
  { id: '1', text: '> INITIALIZING SYSTEM...', delay: 0, status: 'loading' },
  { id: '2', text: '> LOADING PORTFOLIO v2.0', delay: 600, status: 'loading' },
  { id: '3', text: '> ESTABLISHING CONNECTION...', delay: 1200, status: 'loading' },
  { id: '4', text: '> DECRYPTING ASSETS...', delay: 1800, status: 'loading' },
  { id: '5', text: '> STATUS: ONLINE', delay: 2400, status: 'success' },
]

const TYPING_SPEED = 30 // ms per character
const CURSOR_BLINK_RATE = 530 // ms

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/** Blinking cursor */
function Cursor({ visible }: { visible: boolean }) {
  return (
    <motion.span
      animate={{ opacity: visible ? [1, 0] : 0 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      className="inline-block w-2 h-4 bg-neon-violet ml-1 align-middle"
    />
  )
}

/** Single terminal line with typing effect */
function TerminalLineComponent({ 
  line, 
  isActive,
  isComplete,
}: { 
  line: TerminalLine
  isActive: boolean
  isComplete: boolean
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!isActive) return

    setIsTyping(true)
    let currentIndex = 0
    
    const typeInterval = setInterval(() => {
      if (currentIndex < line.text.length) {
        setDisplayedText(line.text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
      }
    }, TYPING_SPEED)

    return () => clearInterval(typeInterval)
  }, [isActive, line.text])

  // Status indicator color
  const statusColor = {
    loading: 'text-void-muted',
    success: 'text-emerald-400',
    info: 'text-neon-violet',
  }[line.status || 'info']

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`font-mono text-sm md:text-base ${statusColor} mb-2`}
    >
      <span className="inline-block">
        {displayedText}
        {isTyping && <Cursor visible={true} />}
        {isComplete && !isTyping && line.status === 'success' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-2 text-emerald-400"
          >
            ✓
          </motion.span>
        )}
      </span>
    </motion.div>
  )
}

/** Glitch text effect */
function GlitchOverlay() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 0.1, 0, 0.05, 0],
        x: [0, -2, 2, -1, 0],
      }}
      transition={{ 
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <div className="w-full h-full bg-neon-violet/10" />
    </motion.div>
  )
}

/** Scanline effect */
function Scanlines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(110, 58, 255, 0.1) 2px, rgba(110, 58, 255, 0.1) 4px)',
        }}
      />
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function BootSequence({ onComplete, isSkipping }: BootSequenceProps) {
  const [activeLineIndex, setActiveLineIndex] = useState(-1)
  const [completedLines, setCompletedLines] = useState<Set<string>>(new Set())

  // Progress through lines
  useEffect(() => {
    if (isSkipping) return

    const timers: NodeJS.Timeout[] = []

    TERMINAL_LINES.forEach((line, index) => {
      // Start typing this line
      const startTimer = setTimeout(() => {
        setActiveLineIndex(index)
      }, line.delay)
      timers.push(startTimer)

      // Mark line as complete after typing finishes
      const typingDuration = line.text.length * TYPING_SPEED
      const completeTimer = setTimeout(() => {
        setCompletedLines(prev => new Set([...prev, line.id]))
      }, line.delay + typingDuration)
      timers.push(completeTimer)
    })

    // Trigger onComplete after all lines done
    const lastLine = TERMINAL_LINES[TERMINAL_LINES.length - 1]
    const totalDuration = lastLine.delay + (lastLine.text.length * TYPING_SPEED) + 500
    const completeTimer = setTimeout(() => {
      onComplete()
    }, totalDuration)
    timers.push(completeTimer)

    return () => timers.forEach(t => clearTimeout(t))
  }, [onComplete, isSkipping])

  return (
    <div className="relative w-full max-w-lg mx-auto px-6">
      {/* Terminal window frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-void-elevated/80 border border-void-border rounded-lg p-6 backdrop-blur-sm"
        style={{
          boxShadow: '0 0 40px rgba(110, 58, 255, 0.15), inset 0 0 20px rgba(110, 58, 255, 0.05)',
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-void-border">
          <div className="w-3 h-3 rounded-full bg-danger/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          <span className="ml-4 font-mono text-xs text-void-muted uppercase tracking-wider">
            system.terminal
          </span>
        </div>

        {/* Terminal content */}
        <div className="min-h-[180px]">
          <AnimatePresence>
            {TERMINAL_LINES.map((line, index) => (
              index <= activeLineIndex && (
                <TerminalLineComponent
                  key={line.id}
                  line={line}
                  isActive={index === activeLineIndex}
                  isComplete={completedLines.has(line.id)}
                />
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Effects */}
        <Scanlines />
        <GlitchOverlay />
      </motion.div>
    </div>
  )
}
