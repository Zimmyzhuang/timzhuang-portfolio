'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CyberButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  holdToConfirm?: boolean
  holdDuration?: number
  icon?: React.ReactNode
  statusText?: string
  className?: string
}

export default function CyberButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  loading = false,
  holdToConfirm = false,
  holdDuration = 1000,
  icon,
  statusText,
  className = '',
}: CyberButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [holdProgress, setHoldProgress] = useState(0)
  const [showStatus, setShowStatus] = useState(false)
  const holdTimer = useRef<NodeJS.Timeout | null>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  // Size configurations
  const sizes = {
    sm: 'px-4 py-2 text-body-sm',
    md: 'px-6 py-3 text-body-md',
    lg: 'px-8 py-4 text-body-lg',
  }

  // Variant configurations
  const variants = {
    primary: {
      outer: 'border-neon-violet/40 dark:border-neon-violet/60',
      inner: 'bg-neon-violet-dim dark:bg-neon-violet text-white',
      glow: 'rgba(110, 58, 255, 0.4)',
      hoverBorder: 'border-neon-violet',
    },
    secondary: {
      outer: 'border-shadow-purple/40 dark:border-void-border',
      inner: 'bg-transparent dark:bg-void-surface/50 text-ink dark:text-void-text',
      glow: 'rgba(59, 29, 122, 0.3)',
      hoverBorder: 'border-neon-violet/50',
    },
    danger: {
      outer: 'border-danger/40',
      inner: 'bg-danger dark:bg-danger text-white',
      glow: 'rgba(165, 29, 78, 0.4)',
      hoverBorder: 'border-danger',
    },
  }

  const config = variants[variant]

  // Hold to confirm logic
  const handleMouseDown = () => {
    if (disabled || loading) return
    setIsPressed(true)

    if (holdToConfirm) {
      const startTime = Date.now()
      progressInterval.current = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / holdDuration, 1)
        setHoldProgress(progress)
        
        if (progress >= 1) {
          handleActivation()
          clearInterval(progressInterval.current!)
        }
      }, 16)
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
    setHoldProgress(0)
    
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }

    if (!holdToConfirm && !disabled && !loading) {
      handleActivation()
    }
  }

  const handleActivation = () => {
    setIsActivated(true)
    setShowStatus(true)
    
    if (onClick) onClick()
    
    // Reset after animation
    setTimeout(() => {
      setIsActivated(false)
      setTimeout(() => setShowStatus(false), 500)
    }, 300)
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current)
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
  }, [])

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
    setHoldProgress(0)
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
  }

  const ButtonContent = (
    <motion.div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Outer frame - floats slightly above */}
      <motion.div
        className={`absolute inset-0 border ${config.outer} transition-colors duration-300`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
          opacity: isHovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Corner notch decorations */}
      <div className="absolute top-0 right-0 w-3 h-3">
        <motion.div
          className="absolute top-0 right-0 w-full h-px bg-neon-violet/50"
          animate={{ scaleX: isHovered ? 1 : 0.5, opacity: isHovered ? 1 : 0.3 }}
          style={{ originX: 1 }}
        />
        <motion.div
          className="absolute top-0 right-0 h-full w-px bg-neon-violet/50"
          animate={{ scaleY: isHovered ? 1 : 0.5, opacity: isHovered ? 1 : 0.3 }}
          style={{ originY: 0 }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-3 h-3">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px bg-neon-violet/50"
          animate={{ scaleX: isHovered ? 1 : 0.5, opacity: isHovered ? 1 : 0.3 }}
          style={{ originX: 0 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-full w-px bg-neon-violet/50"
          animate={{ scaleY: isHovered ? 1 : 0.5, opacity: isHovered ? 1 : 0.3 }}
          style={{ originY: 1 }}
        />
      </div>

      {/* Inner core button */}
      <motion.div
        className={`relative ${sizes[size]} ${config.inner} font-body font-medium transition-colors duration-200`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        }}
        animate={{
          y: isPressed ? 2 : 0,
          scale: isActivated ? 0.98 : 1,
          boxShadow: isHovered 
            ? `0 0 20px ${config.glow}, inset 0 0 20px rgba(110, 58, 255, 0.1)`
            : 'none',
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 25,
        }}
      >
        {/* Hold progress bar */}
        {holdToConfirm && holdProgress > 0 && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-white/80"
            initial={{ width: 0 }}
            animate={{ width: `${holdProgress * 100}%` }}
            transition={{ duration: 0.05 }}
          />
        )}

        {/* Content wrapper */}
        <div className="relative flex items-center justify-center gap-2">
          {/* Loading spinner */}
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full"
            />
          )}

          {/* Icon */}
          {icon && !loading && (
            <motion.span
              animate={{ 
                x: isHovered ? 2 : 0,
                opacity: isActivated ? 0.5 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.span>
          )}

          {/* Text with activation state */}
          <AnimatePresence mode="wait">
            {isActivated && statusText ? (
              <motion.span
                key="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-mono text-label uppercase tracking-wider"
              >
                {statusText}
              </motion.span>
            ) : (
              <motion.span
                key="label"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {children}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Arrow indicator */}
          {!loading && !icon && (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ 
                x: isHovered ? 4 : 0,
                opacity: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 0.2 }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          )}
        </div>

        {/* Signal bars - micro information */}
        <div className="absolute top-1 right-2 flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-current opacity-30"
              style={{ height: `${(i + 1) * 3}px` }}
              animate={{
                opacity: isHovered ? [0.3, 0.8, 0.3] : 0.2,
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: isHovered ? Infinity : 0,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Disabled overlay */}
      {disabled && (
        <div className="absolute inset-0 bg-canvas-500/50 dark:bg-void-base/70 cursor-not-allowed"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          }}
        />
      )}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} onClick={(e) => { if (onClick) { e.preventDefault(); } }}>
        {ButtonContent}
      </a>
    )
  }

  return <button disabled={disabled}>{ButtonContent}</button>
}

// Secondary simpler button with circuit animation
export function CircuitButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [circuitComplete, setCircuitComplete] = useState(false)

  return (
    <motion.button
      className={`relative px-6 py-3 font-body text-body-md text-ink dark:text-void-text ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setCircuitComplete(false) }}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {/* Circuit border that completes on hover */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        {/* Top line */}
        <motion.line
          x1="10" y1="0" x2="90" y2="0"
          stroke="currentColor"
          strokeWidth="1"
          className="text-shadow-purple/40 dark:text-neon-violet/40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        />
        {/* Right line */}
        <motion.line
          x1="100" y1="5" x2="100" y2="35"
          stroke="currentColor"
          strokeWidth="1"
          className="text-shadow-purple/40 dark:text-neon-violet/40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
        {/* Bottom line */}
        <motion.line
          x1="90" y1="40" x2="10" y2="40"
          stroke="currentColor"
          strokeWidth="1"
          className="text-shadow-purple/40 dark:text-neon-violet/40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        />
        {/* Left line */}
        <motion.line
          x1="0" y1="35" x2="0" y2="5"
          stroke="currentColor"
          strokeWidth="1"
          className="text-shadow-purple/40 dark:text-neon-violet/40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          onAnimationComplete={() => isHovered && setCircuitComplete(true)}
        />
        
        {/* Corner nodes */}
        <motion.circle
          cx="0" cy="5" r="2"
          className="fill-neon-violet/50"
          animate={{ opacity: circuitComplete ? 1 : 0.3 }}
        />
        <motion.circle
          cx="100" cy="5" r="2"
          className="fill-neon-violet/50"
          animate={{ opacity: circuitComplete ? 1 : 0.3 }}
        />
        <motion.circle
          cx="100" cy="35" r="2"
          className="fill-neon-violet/50"
          animate={{ opacity: circuitComplete ? 1 : 0.3 }}
        />
        <motion.circle
          cx="0" cy="35" r="2"
          className="fill-neon-violet/50"
          animate={{ opacity: circuitComplete ? 1 : 0.3 }}
        />
      </svg>

      {/* Background fill on complete */}
      <motion.div
        className="absolute inset-0 bg-neon-violet/5 dark:bg-neon-violet/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: circuitComplete ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
