'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// ============================================================================
// CONSTANTS
// ============================================================================

/** Technical skills organized by category */
const SKILLS = [
  { category: 'Languages', items: ['TypeScript', 'Python', 'Go', 'Java', 'SQL'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis'] },
  { category: 'Tools', items: ['Git', 'Docker', 'Kubernetes', 'AWS'] },
] as const

/** Bio paragraphs */
const BIO_PARAGRAPHS = [
  `I'm a Computer Science student at UC Irvine with a passion for creating elegant solutions to complex problems. My journey in software development started with curiosity about how digital products work, and evolved into a deep appreciation for clean architecture and thoughtful user experiences.`,
  `Beyond academics, I spend my time contributing to open-source projects, exploring new technologies, and mentoring fellow students. I believe in writing code that's not just functional, but maintainable, scalable, and a pleasure to work with.`,
] as const

/** Animation stagger delays for entrance animations */
const STAGGER_DELAYS = {
  label: 0,
  heading: 0.1,
  bio: [0.2, 0.3, 0.4],
  skills: 0.1, // per skill group
} as const

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const MOTION = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  },
  slideIn: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-100px' },
  },
}

// ============================================================================
// SHARED STYLES
// ============================================================================

const STYLES = {
  sectionLabel: 'font-mono text-label uppercase tracking-widest text-neon-violet-dim dark:text-neon-violet mb-4',
  sectionHeading: 'font-display text-display-md text-ink dark:text-canvas-50 mb-8',
  bodyText: 'font-body text-body-lg text-ink-muted dark:text-canvas-300',
  skillCategory: 'font-body text-body-sm text-ink-subtle mb-2',
  skillItem: 'font-body text-body-sm text-ink dark:text-canvas-200',
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/** Photo placeholder with glassmorphism effect */
function PhotoSection() {
  return (
    <div className="relative w-[280px] lg:w-[300px] mx-auto lg:mx-0 flex-shrink-0">
      {/* Glassmorphism card for photo */}
      <div className="relative aspect-square rounded-lg overflow-hidden border border-canvas-300 dark:border-void-border backdrop-blur-sm shadow-lg dark:shadow-void">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-canvas-200 via-canvas-300 to-canvas-200 dark:from-void-surface/80 dark:via-void-border/50 dark:to-void-surface/80" />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(110, 58, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(110, 58, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neon-violet/40" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon-violet/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neon-violet/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-neon-violet/40" />
        
        {/* Placeholder text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-label text-canvas-500 dark:text-void-muted uppercase tracking-wider">
            Your Photo
          </span>
        </div>
        
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-neon-violet/10 to-transparent" />
      </div>
    </div>
  )
}

/** Single skill group */
function SkillGroup({ 
  group, 
  index 
}: { 
  group: typeof SKILLS[number]
  index: number 
}) {
  return (
    <motion.div
      {...MOTION.fadeUp}
      transition={{ duration: 0.5, delay: 0.5 + index * STAGGER_DELAYS.skills }}
      className="text-center p-4 rounded-lg bg-canvas-100/50 dark:bg-void-surface/30 border border-canvas-300/30 dark:border-void-border/30"
    >
      <h4 className="font-mono text-label uppercase tracking-widest text-neon-violet-dim dark:text-neon-violet mb-3">
        {group.category}
      </h4>
      <ul className="space-y-1.5">
        {group.items.map((skill) => (
          <li key={skill} className={STYLES.skillItem}>
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/** Skills grid section - full width at bottom */
function SkillsSection() {
  return (
    <motion.div 
      {...MOTION.fadeUp}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-16 pt-12 border-t border-canvas-300 dark:border-void-border"
    >
      <h3 className={`${STYLES.sectionLabel} text-center mb-8`}>Technical Skills</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {SKILLS.map((group, index) => (
          <SkillGroup key={group.category} group={group} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

/** Bio content with staggered paragraphs */
function BioContent() {
  return (
    <div className="space-y-6">
      {BIO_PARAGRAPHS.map((paragraph, index) => (
        <motion.p
          key={index}
          {...MOTION.fadeUp}
          transition={{ duration: 0.6, delay: STAGGER_DELAYS.bio[index] }}
          className={STYLES.bodyText}
        >
          {paragraph}
        </motion.p>
      ))}

      {/* Roles sought - highlighted */}
      <motion.p
        {...MOTION.fadeUp}
        transition={{ duration: 0.6, delay: STAGGER_DELAYS.bio[2] }}
        className={STYLES.bodyText}
      >
        I&apos;m currently seeking{' '}
        <strong className="text-ink dark:text-canvas-100 font-medium">
          software engineering internships
        </strong>{' '}
        where I can contribute to meaningful projects while learning from experienced teams. 
        I&apos;m particularly interested in roles involving full-stack development, 
        distributed systems, or developer tooling.
      </motion.p>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  
  // Smooth the scroll progress for fluid animation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  // Fade in as section enters, fade out as it leaves
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const y = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -60])

  return (
    <motion.section 
      ref={sectionRef}
      id="about" 
      className="section-spacing bg-canvas-50 dark:bg-void-elevated transition-colors duration-500 relative overflow-hidden"
      style={{ opacity, y }}
    >
      
      <div className="section-container relative z-10">
        {/* Section Header - Centered */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.p
            {...MOTION.fadeUp}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className={STYLES.sectionLabel}
          >
            About Me
          </motion.p>
          <motion.h2
            {...MOTION.fadeUp}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: STAGGER_DELAYS.heading }}
            className={`${STYLES.sectionHeading} mb-0`}
          >
            Building software that{' '}
            <span className="italic">makes a difference</span>
          </motion.h2>
        </div>

        {/* Photo + Bio Grid - Side by Side */}
        <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">
          
          {/* ===== LEFT: Photo ===== */}
          <motion.div
            {...MOTION.slideIn}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhotoSection />
          </motion.div>

          {/* ===== RIGHT: Bio ===== */}
          <div className="flex flex-col">
            <BioContent />
          </div>
        </div>

        {/* ===== BOTTOM: Technical Skills - Full Width ===== */}
        <SkillsSection />
      </div>
    </motion.section>
  )
}
