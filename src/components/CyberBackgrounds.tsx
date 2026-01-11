'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// ============================================================================
// TYPES
// ============================================================================

export type BackgroundVariant = 
  | 'horizon-grid'      // Retro-futurism perspective grid
  | 'holo-panels'       // Floating holographic UI panels
  | 'city-silhouette'   // Cyberpunk skyline
  | 'data-stream'       // Code rain / falling glyphs
  | 'circuit-veins'     // PCB traces with flowing energy
  | 'glitch-field'      // Corrupted digital reality
  | 'neon-fog'          // Atmospheric light beams
  | 'hex-grid'          // Hexagonal tech grid
  | 'starfield'         // Space warp with digital distortion
  | 'minimal'           // Subtle recruiter-friendly glow

interface CyberBackgroundsProps {
  variant: BackgroundVariant
  intensity?: number
  className?: string
}

// ============================================================================
// COLORS
// ============================================================================

const NEON = {
  cyan: 'rgba(0, 255, 255, ',
  magenta: 'rgba(255, 0, 128, ',
  violet: 'rgba(110, 58, 255, ',
  purple: 'rgba(138, 43, 226, ',
  blue: 'rgba(30, 144, 255, ',
  amber: 'rgba(255, 191, 0, ',
  green: 'rgba(0, 255, 128, ',
}

// ============================================================================
// 1. NEON HORIZON GRID
// ============================================================================

function HorizonGrid({ intensity = 0.6 }: { intensity?: number }) {
  // Calculate line opacities based on intensity
  const cyanAlpha = Math.round(intensity * 0.5 * 100) / 100
  const magentaAlpha = Math.round(intensity * 0.4 * 100) / 100
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient atmosphere overlay - muted for light mode */}
      <div 
        className="absolute inset-0 dark:opacity-100 opacity-30"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, transparent 40%, rgba(110, 58, 255, 0.03) 50%, rgba(0, 255, 255, 0.05) 100%)',
        }}
      />
      
      {/* Perspective grid container - positioned at bottom half */}
      <div 
        className="absolute bottom-0 left-1/2"
        style={{
          width: '200vw',
          height: '55vh',
          transform: 'translateX(-50%)',
          perspective: '500px',
          perspectiveOrigin: '50% 0%',
        }}
      >
        {/* Animated grid floor - muted colors for light mode */}
        <motion.div
          className="dark:opacity-100 opacity-40"
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: '300vmax',
            height: '300vmax',
            transform: 'translateX(-50%) rotateX(75deg)',
            transformOrigin: 'center top',
            transformStyle: 'preserve-3d',
            backgroundImage: `
              linear-gradient(to right, rgba(110, 80, 200, ${cyanAlpha}) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(140, 80, 160, ${magentaAlpha}) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '0px 60px'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Horizon glow line - softer for light mode */}
        <div 
          className="absolute top-0 left-0 right-0 h-40 dark:opacity-100 opacity-30"
          style={{
            background: 'linear-gradient(to bottom, rgba(110, 58, 255, 0.5), transparent)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* Sun/moon glow on horizon - muted for light mode */}
      <motion.div
        className="absolute left-1/2 w-[32rem] h-28 rounded-full dark:opacity-100 opacity-25"
        style={{
          bottom: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse at center, rgba(140, 80, 180, 0.6) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

// ============================================================================
// 2. HOLOGRAPHIC INTERFACE PANELS
// ============================================================================

function HoloPanels({ intensity = 0.5 }: { intensity?: number }) {
  const panels = [
    // Top row - main panels
    { x: '5%', y: '5%', w: 200, h: 140, delay: 0 },
    { x: '78%', y: '8%', w: 180, h: 160, delay: 0.8 },
    { x: '40%', y: '3%', w: 140, h: 100, delay: 1.2 },
    // Middle accent panels
    { x: '3%', y: '35%', w: 120, h: 80, delay: 0.4 },
    { x: '85%', y: '40%', w: 100, h: 120, delay: 1.6 },
    // Lower accent (subtle)
    { x: '15%', y: '65%', w: 90, h: 60, delay: 2 },
    { x: '70%', y: '70%', w: 80, h: 50, delay: 1 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {panels.map((panel, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: panel.x,
            top: panel.y,
            width: panel.w,
            height: panel.h,
          }}
          initial={{ opacity: 0, z: -100 }}
          animate={{
            opacity: [intensity * 0.3, intensity * 0.5, intensity * 0.3],
            y: [0, -10, 0],
            rotateY: [-2, 2, -2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: panel.delay,
            ease: 'easeInOut',
          }}
        >
          {/* Panel border */}
          <div 
            className="absolute inset-0 rounded-sm"
            style={{
              border: `1px solid ${NEON.cyan}${intensity * 0.5})`,
              background: `linear-gradient(135deg, ${NEON.violet}0.05), transparent)`,
              backdropFilter: 'blur(2px)',
            }}
          />
          
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50" />
          
          {/* Data bars */}
          <div className="absolute bottom-2 left-2 right-2 flex gap-1">
            {[...Array(5)].map((_, j) => (
              <motion.div
                key={j}
                className="h-1 flex-1 rounded-full"
                style={{ background: NEON.cyan + '0.4)' }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: j * 0.2,
                }}
              />
            ))}
          </div>

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ background: NEON.cyan + '0.6)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: panel.delay,
              ease: 'linear',
            }}
          />
        </motion.div>
      ))}

      {/* Floating hex elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`hex-${i}`}
          className="absolute w-8 h-8"
          style={{
            left: `${15 + i * 15}%`,
            top: `${30 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 60, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke={`rgba(110, 58, 255, ${intensity * 0.5})`} strokeWidth="1">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================================================
// 3. NEON CITY SILHOUETTE
// ============================================================================

function CitySilhouette({ intensity = 0.6 }: { intensity?: number }) {
  // Building data: x position, width, height (as percentage)
  const buildings = [
    { x: 0, w: 8, h: 35 }, { x: 7, w: 5, h: 45 }, { x: 11, w: 10, h: 60 },
    { x: 20, w: 6, h: 40 }, { x: 25, w: 12, h: 75 }, { x: 36, w: 8, h: 50 },
    { x: 43, w: 5, h: 35 }, { x: 47, w: 15, h: 85 }, { x: 61, w: 7, h: 55 },
    { x: 67, w: 10, h: 70 }, { x: 76, w: 6, h: 45 }, { x: 81, w: 8, h: 55 },
    { x: 88, w: 12, h: 65 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(7,4,12,1) 0%, rgba(30,15,60,0.8) 50%, rgba(60,20,80,0.4) 100%)',
        }}
      />

      {/* Fog layers */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background: 'linear-gradient(to top, rgba(110, 58, 255, 0.15), transparent)',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Buildings - back layer */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%]" style={{ opacity: intensity * 0.4 }}>
        {buildings.map((b, i) => (
          <div
            key={`back-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${b.x}%`,
              width: `${b.w}%`,
              height: `${b.h * 0.7}%`,
              background: 'rgba(20, 10, 40, 0.9)',
            }}
          />
        ))}
      </div>

      {/* Buildings - front layer with windows */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%]">
        {buildings.map((b, i) => (
          <div
            key={`front-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${b.x + 2}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
              background: 'rgba(10, 5, 20, 0.95)',
              boxShadow: `0 0 20px rgba(110, 58, 255, ${intensity * 0.2})`,
            }}
          >
            {/* Glowing windows */}
            <div className="absolute inset-2 grid grid-cols-3 gap-1">
              {[...Array(12)].map((_, j) => {
                const seed = i * 100 + j
                const isCyan = seededRandom(seed) > 0.5
                const opacity = isCyan ? 0.3 + seededRandom(seed + 1) * 0.4 : 0.2 + seededRandom(seed + 2) * 0.3
                const flickers = seededRandom(seed + 3) > 0.7
                return (
                  <motion.div
                    key={j}
                    className="w-full aspect-[2/3]"
                    style={{
                      background: isCyan 
                        ? `${NEON.cyan}${opacity})`
                        : `${NEON.magenta}${opacity})`,
                    }}
                    animate={{
                      opacity: flickers ? [1, 0.3, 1] : 1,
                    }}
                    transition={{
                      duration: 2 + seededRandom(seed + 4) * 3,
                      repeat: Infinity,
                      delay: seededRandom(seed + 5) * 5,
                    }}
                  />
                )
              })}
            </div>

            {/* Rooftop accent */}
            <div 
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-6"
              style={{ 
                background: i % 3 === 0 ? NEON.magenta + '0.6)' : NEON.cyan + '0.5)',
                boxShadow: `0 0 10px ${i % 3 === 0 ? NEON.magenta + '0.5)' : NEON.cyan + '0.4)'}`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Flying vehicles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`vehicle-${i}`}
          className="absolute h-[2px] w-16"
          style={{
            top: `${15 + i * 12}%`,
            background: `linear-gradient(90deg, transparent, ${NEON.cyan}0.8), ${NEON.cyan}0.3))`,
            boxShadow: `0 0 10px ${NEON.cyan}0.5)`,
          }}
          animate={{
            left: ['-10%', '110%'],
          }}
          transition={{
            duration: 8 + i * 4,
            repeat: Infinity,
            delay: i * 3,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

// ============================================================================
// 4. DATA STREAM / CODE RAIN
// ============================================================================

/** Seeded pseudo-random for deterministic values */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

/** Pre-computed column data to avoid hydration mismatch */
const DATA_STREAM_COLUMNS = [...Array(30)].map((_, i) => ({
  speed: 1.5 + seededRandom(i * 7) * 2.5, // Faster: 1.5-4s instead of 3-7s
  delay: seededRandom(i * 13) * 3,
  brightness: 0.5 + seededRandom(i * 17) * 0.5, // Brighter: 0.5-1.0 instead of 0.3-0.8
  blur: seededRandom(i * 23) > 0.85, // Less blur
  glyphs: [...Array(12)].map((_, j) => { // Fewer glyphs (12 instead of 20)
    const glyphSet = '01アイウエオカキクケコサシスセソタチツテト∆∇◊□○●◐◑∞≈≠±×÷'
    const index = Math.floor(seededRandom(i * 100 + j * 7) * glyphSet.length)
    return glyphSet[index]
  }),
}))

function DataStream({ intensity = 0.5 }: { intensity?: number }) {
  const columns = 30
  
  return (
    <div className="absolute inset-0 overflow-hidden font-mono text-sm">
      {DATA_STREAM_COLUMNS.map((col, i) => (
        <motion.div
          key={i}
          className="absolute top-0 flex flex-col items-center gap-0.5"
          style={{
            left: `${(i / columns) * 100}%`,
            filter: col.blur ? 'blur(0.5px)' : 'none',
            opacity: intensity * col.brightness,
          }}
          animate={{
            y: ['-50%', '150%'],
          }}
          transition={{
            duration: col.speed,
            repeat: Infinity,
            delay: col.delay,
            ease: 'linear',
          }}
        >
          {col.glyphs.map((glyph, j) => (
            <span
              key={j}
              className="dark:drop-shadow-[0_0_8px_rgba(110,58,255,0.8)]"
              style={{
                color: j === 0 
                  ? 'rgba(110, 58, 255, 1)' 
                  : j < 2 
                    ? NEON.violet + '0.9)' 
                    : NEON.violet + Math.max(0.1, 0.7 - j * 0.08) + ')',
                fontWeight: j < 2 ? 600 : 400,
              }}
            >
              {glyph}
            </span>
          ))}
        </motion.div>
      ))}

      {/* Scanline overlay - very subtle, dark mode only */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-[0.03]"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.15) 50%)',
          backgroundSize: '100% 3px',
        }}
      />
    </div>
  )
}

// ============================================================================
// 5. CIRCUIT VEINS
// ============================================================================

function CircuitVeins({ intensity = 0.6 }: { intensity?: number }) {
  const paths = [
    'M0,50 Q25,30 50,50 T100,50',
    'M0,30 Q30,50 60,30 T100,30',
    'M0,70 Q20,90 50,70 T100,70',
    'M20,0 Q40,30 20,50 Q0,70 20,100',
    'M80,0 Q60,25 80,50 Q100,75 80,100',
    'M50,0 L50,30 L70,50 L50,70 L50,100',
  ]

  const nodes = [
    { x: 25, y: 35 }, { x: 50, y: 50 }, { x: 75, y: 35 },
    { x: 20, y: 70 }, { x: 60, y: 75 }, { x: 85, y: 65 },
    { x: 40, y: 25 }, { x: 70, y: 80 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={NEON.cyan + '0.6)'} />
            <stop offset="50%" stopColor={NEON.magenta + '0.5)'} />
            <stop offset="100%" stopColor={NEON.violet + '0.6)'} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Circuit paths */}
        {paths.map((d, i) => (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke="url(#circuit-gradient)"
              strokeWidth="1.5"
              opacity={intensity * 0.4}
              filter="url(#glow)"
              vectorEffect="non-scaling-stroke"
            />
            {/* Energy pulse traveling along path */}
            <motion.circle
              r="4"
              fill={NEON.cyan + '0.9)'}
              filter="url(#glow)"
            >
              <animateMotion
                dur={`${4 + i}s`}
                repeatCount="indefinite"
                path={d}
              />
            </motion.circle>
          </g>
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={`node-${i}`}>
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="6"
              fill="none"
              stroke={NEON.violet + '0.6)'}
              strokeWidth="1.5"
              filter="url(#glow)"
              animate={{
                r: [6, 8, 6],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill={NEON.cyan + '0.8)'}
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

// ============================================================================
// 6. GLITCH FIELD
// ============================================================================

/** Pre-computed glitch block positions */
const GLITCH_BLOCKS = [...Array(5)].map((_, i) => ({
  left: seededRandom(i * 11) * 80,
  top: seededRandom(i * 13) * 80,
  width: 20 + seededRandom(i * 17) * 100,
  height: 5 + seededRandom(i * 19) * 20,
  translateX: seededRandom(i * 23) * 10 - 5,
}))

function GlitchField({ intensity = 0.4 }: { intensity?: number }) {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const triggerGlitch = () => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 150)
    }
    
    // Use fixed interval for consistency
    const interval = setInterval(triggerGlitch, 4500)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* RGB channel separation on glitch */}
      {glitchActive && (
        <>
          <div 
            className="absolute inset-0 mix-blend-screen"
            style={{
              background: 'rgba(255, 0, 0, 0.03)',
              transform: 'translateX(-3px)',
            }}
          />
          <div 
            className="absolute inset-0 mix-blend-screen"
            style={{
              background: 'rgba(0, 255, 255, 0.03)',
              transform: 'translateX(3px)',
            }}
          />
        </>
      )}

      {/* Scanlines */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
          opacity: intensity,
        }}
      />

      {/* Tearing bands */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-8"
          style={{
            background: `linear-gradient(90deg, transparent, ${NEON.violet}0.1), transparent)`,
          }}
          initial={{ top: `${20 + i * 30}%`, opacity: 0 }}
          animate={{
            top: [`${20 + i * 30}%`, `${25 + i * 30}%`, `${20 + i * 30}%`],
            opacity: glitchActive ? [0, intensity * 0.5, 0] : 0,
            scaleX: glitchActive ? [1, 1.02, 1] : 1,
          }}
          transition={{
            duration: 0.15,
          }}
        />
      ))}

      {/* Noise grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glitch blocks */}
      {glitchActive && GLITCH_BLOCKS.map((block, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${block.left}%`,
            top: `${block.top}%`,
            width: `${block.width}px`,
            height: `${block.height}px`,
            background: NEON.violet + '0.2)',
            transform: `translateX(${block.translateX}px)`,
          }}
        />
      ))}
    </div>
  )
}

// ============================================================================
// 7. NEON FOG & LIGHT BEAMS
// ============================================================================

function NeonFog({ intensity = 0.6 }: { intensity?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(7,4,12,0.9) 0%, rgba(30,10,60,0.8) 50%, rgba(20,5,40,0.9) 100%)',
        }}
      />

      {/* Volumetric fog layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 70%, ${NEON.violet}0.15), transparent 50%)`,
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 70% 30%, ${NEON.magenta}0.1), transparent 50%)`,
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      {/* Light beams */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{
            left: `${15 + i * 22}%`,
            width: '2px',
            height: '100%',
            background: `linear-gradient(180deg, ${NEON.cyan}${intensity * 0.4}), transparent 30%, transparent 70%, ${NEON.violet}${intensity * 0.3}))`,
            filter: 'blur(4px)',
            transformOrigin: 'top',
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            rotateZ: [-2, 2, -2],
            scaleY: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Wider light cone */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: '200px',
          height: '100%',
          background: `linear-gradient(180deg, ${NEON.violet}0.1) 0%, transparent 60%)`,
          clipPath: 'polygon(40% 0%, 60% 0%, 80% 100%, 20% 100%)',
          filter: 'blur(10px)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Ground reflection */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: `linear-gradient(to top, ${NEON.cyan}0.1), transparent)`,
          filter: 'blur(20px)',
        }}
      />
    </div>
  )
}

// ============================================================================
// 8. HEXAGONAL TECH GRID
// ============================================================================

function HexGrid({ intensity = 0.5 }: { intensity?: number }) {
  const hexSize = 50
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base hex pattern with glow filter */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="hexGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <pattern id="hexPattern" width={hexSize * 1.5} height={hexSize * 1.732} patternUnits="userSpaceOnUse">
            <polygon
              points="25,0 50,14.4 50,43.3 25,57.7 0,43.3 0,14.4"
              fill="none"
              stroke={NEON.violet + `${intensity * 0.4})`}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>

      {/* Active hex nodes - more visible */}
      {[...Array(12)].map((_, i) => {
        const x = 8 + (i % 4) * 28
        const y = 12 + Math.floor(i / 4) * 30
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.svg width="100" height="115" viewBox="0 0 60 69.2">
              <defs>
                <filter id={`activeGlow-${i}`} x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <motion.polygon
                points="30,0 60,17.3 60,51.9 30,69.2 0,51.9 0,17.3"
                fill={NEON.violet + '0.08)'}
                stroke={NEON.cyan + '0.5)'}
                strokeWidth="1.5"
                filter={`url(#activeGlow-${i})`}
                animate={{
                  fill: [
                    NEON.violet + '0.05)',
                    NEON.violet + '0.15)',
                    NEON.violet + '0.05)',
                  ],
                  strokeOpacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            </motion.svg>
          </motion.div>
        )
      })}

      {/* Wave ripple effect - subtle */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, transparent 18%, ${NEON.violet}0.1) 24%, transparent 30%)`,
        }}
        animate={{
          scale: [0.5, 2, 0.5],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />

      {/* Corner glow accents - subtle */}
      <div 
        className="absolute top-0 left-0 w-64 h-64"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${NEON.violet}0.1), transparent 70%)`,
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-64 h-64"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${NEON.cyan}0.08), transparent 70%)`,
        }}
      />
    </div>
  )
}

// ============================================================================
// 9. STARFIELD WITH DIGITAL WARP
// ============================================================================

/** Pre-computed star positions */
const STARS = [...Array(100)].map((_, i) => ({
  x: seededRandom(i * 7) * 100,
  y: seededRandom(i * 11) * 100,
  size: seededRandom(i * 13) * 2 + 1,
  duration: 2 + seededRandom(i * 17) * 3,
  delay: seededRandom(i * 19) * 2,
}))

function Starfield({ intensity = 0.6 }: { intensity?: number }) {

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep space gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(20,10,40,0.8) 0%, rgba(7,4,12,1) 70%)',
        }}
      />

      {/* Stars */}
      {STARS.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: i % 5 === 0 ? NEON.cyan + '0.8)' : i % 7 === 0 ? NEON.magenta + '0.7)' : 'rgba(255,255,255,0.6)',
            boxShadow: i % 5 === 0 ? `0 0 ${star.size * 3}px ${NEON.cyan}0.5)` : 'none',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* Warp streaks */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            width: '2px',
            height: '50px',
            background: `linear-gradient(to bottom, transparent, ${NEON.violet}${intensity * 0.6}), transparent)`,
            transformOrigin: 'center top',
            rotate: `${i * (360 / 15)}deg`,
          }}
          animate={{
            scaleY: [0, 1.5, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Digital distortion overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(110, 58, 255, 0.02) 3px, rgba(110, 58, 255, 0.02) 6px)',
        }}
      />
    </div>
  )
}

// ============================================================================
// 10. MINIMAL CYBER GLOW (Recruiter-Friendly)
// ============================================================================

function MinimalGlow({ intensity = 0.4 }: { intensity?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(7,4,12,0.95) 0%, rgba(15,8,30,0.9) 50%, rgba(7,4,12,0.95) 100%)',
        }}
      />

      {/* Very subtle noise */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Corner HUD markers */}
      <div className="absolute top-6 left-6 w-16 h-16">
        <div className="absolute top-0 left-0 w-8 h-[2px]" style={{ background: NEON.violet + `${intensity})` }} />
        <div className="absolute top-0 left-0 h-8 w-[2px]" style={{ background: NEON.violet + `${intensity})` }} />
        <motion.div 
          className="absolute top-2 left-2 w-2 h-2 rounded-full"
          style={{ background: NEON.cyan + '0.6)' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="absolute top-6 right-6 w-16 h-16">
        <div className="absolute top-0 right-0 w-8 h-[2px]" style={{ background: NEON.violet + `${intensity})` }} />
        <div className="absolute top-0 right-0 h-8 w-[2px]" style={{ background: NEON.violet + `${intensity})` }} />
      </div>
      <div className="absolute bottom-6 left-6 w-16 h-16">
        <div className="absolute bottom-0 left-0 w-8 h-[2px]" style={{ background: NEON.violet + `${intensity})` }} />
        <div className="absolute bottom-0 left-0 h-8 w-[2px]" style={{ background: NEON.violet + `${intensity})` }} />
      </div>
      <div className="absolute bottom-6 right-6 w-16 h-16">
        <div className="absolute bottom-0 right-0 w-8 h-[2px]" style={{ background: NEON.violet + `${intensity})` }} />
        <div className="absolute bottom-0 right-0 h-8 w-[2px]" style={{ background: NEON.violet + `${intensity})` }} />
      </div>

      {/* Subtle edge glow */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${NEON.violet}${intensity * 0.5}), transparent)` }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${NEON.violet}${intensity * 0.5}), transparent)` }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />
    </div>
  )
}

// ============================================================================
// MAIN EXPORT
// ============================================================================

export default function CyberBackgrounds({
  variant,
  intensity = 0.5,
  className = '',
}: CyberBackgroundsProps) {
  const backgrounds: Record<BackgroundVariant, React.ReactNode> = {
    'horizon-grid': <HorizonGrid intensity={intensity} />,
    'holo-panels': <HoloPanels intensity={intensity} />,
    'city-silhouette': <CitySilhouette intensity={intensity} />,
    'data-stream': <DataStream intensity={intensity} />,
    'circuit-veins': <CircuitVeins intensity={intensity} />,
    'glitch-field': <GlitchField intensity={intensity} />,
    'neon-fog': <NeonFog intensity={intensity} />,
    'hex-grid': <HexGrid intensity={intensity} />,
    'starfield': <Starfield intensity={intensity} />,
    'minimal': <MinimalGlow intensity={intensity} />,
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {backgrounds[variant]}
    </div>
  )
}

// Export individual components for direct use
export {
  HorizonGrid,
  HoloPanels,
  CitySilhouette,
  DataStream,
  CircuitVeins,
  GlitchField,
  NeonFog,
  HexGrid,
  Starfield,
  MinimalGlow,
}
