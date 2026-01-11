'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import CyberButton from './CyberButton'
import CyberBackgrounds from './CyberBackgrounds'

// ============================================================================
// TYPES
// ============================================================================

interface Project {
  id: string
  title: string
  tagline: string
  description: string
  problem: string
  solution: string
  result: string
  tech: string[]
  image: string
  github?: string
  live?: string
}

// ============================================================================
// CONSTANTS
// ============================================================================

/** Maximum tech badges to show on card before "+N more" */
const MAX_VISIBLE_TECH = 4

/** Project data - Coming Soon placeholders */
const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Coming Soon',
    tagline: 'An exciting project is in the works.',
    description: 'Details about this project will be revealed soon. Stay tuned for updates!',
    problem: 'Currently under development.',
    solution: 'Check back later for the full story.',
    result: 'Coming soon...',
    tech: ['TBD'],
    image: '/placeholder.jpg',
  },
  {
    id: 'project-2',
    title: 'Coming Soon',
    tagline: 'Something awesome is brewing.',
    description: 'This project is currently being built. More information coming soon!',
    problem: 'Currently under development.',
    solution: 'Check back later for the full story.',
    result: 'Coming soon...',
    tech: ['TBD'],
    image: '/placeholder.jpg',
  },
  {
    id: 'project-3',
    title: 'Coming Soon',
    tagline: 'New project in development.',
    description: 'Working on something exciting. Details will be shared when ready!',
    problem: 'Currently under development.',
    solution: 'Check back later for the full story.',
    result: 'Coming soon...',
    tech: ['TBD'],
    image: '/placeholder.jpg',
  },
  {
    id: 'project-4',
    title: 'Coming Soon',
    tagline: 'Future project placeholder.',
    description: 'More projects are on the way. Check back for updates!',
    problem: 'Currently under development.',
    solution: 'Check back later for the full story.',
    result: 'Coming soon...',
    tech: ['TBD'],
    image: '/placeholder.jpg',
  },
]

/** Tech badge color mapping */
const TECH_COLORS: Record<string, string> = {
  'Python': 'bg-blue-100 text-blue-700',
  'TensorFlow': 'bg-orange-100 text-orange-700',
  'FastAPI': 'bg-emerald-100 text-emerald-700',
  'React': 'bg-cyan-100 text-cyan-700',
  'PostgreSQL': 'bg-indigo-100 text-indigo-700',
  'TypeScript': 'bg-blue-100 text-blue-700',
  'Next.js': 'bg-stone-100 text-stone-700',
  'WebSocket': 'bg-purple-100 text-purple-700',
  'Redis': 'bg-red-100 text-red-700',
  'Y.js': 'bg-amber-100 text-amber-700',
  'Node.js': 'bg-green-100 text-green-700',
  'MQTT': 'bg-violet-100 text-violet-700',
  'InfluxDB': 'bg-fuchsia-100 text-fuchsia-700',
  'Docker': 'bg-sky-100 text-sky-700',
  'Go': 'bg-cyan-100 text-cyan-700',
  'ClickHouse': 'bg-yellow-100 text-yellow-700',
  'Kafka': 'bg-stone-100 text-stone-700',
  'Kubernetes': 'bg-blue-100 text-blue-700',
  'TBD': 'bg-canvas-300 text-ink-subtle dark:bg-void-surface dark:text-void-muted',
}

/** Default badge color for unknown tech */
const DEFAULT_TECH_COLOR = 'bg-canvas-200 text-ink-muted'

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const MOTION = {
  card: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
  },
  modal: {
    backdrop: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
    },
    content: {
      initial: { opacity: 0, scale: 0.95, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 20 },
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  },
  header: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  arrow: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  github: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  external: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  ),
}

// ============================================================================
// SHARED STYLES
// ============================================================================

const STYLES = {
  sectionLabel: 'font-mono text-label uppercase tracking-widest text-neon-violet-dim dark:text-neon-violet mb-4',
  sectionHeading: 'font-display text-display-md md:text-display-lg text-ink dark:text-canvas-50 text-balance',
  cardTitle: 'font-display text-display-sm text-ink dark:text-canvas-50 mb-3 pr-12',
  cardTagline: 'font-body text-body-md text-ink-muted dark:text-canvas-300 mb-6',
  techBadge: 'px-3 py-1 rounded-full text-label',
  modalLabel: 'font-mono text-label uppercase tracking-wider text-neon-violet-dim dark:text-neon-violet mb-2',
  modalText: 'font-body text-body-md text-ink dark:text-canvas-200',
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/** Tech stack badge */
function TechBadge({ tech }: { tech: string }) {
  const colorClass = TECH_COLORS[tech] || DEFAULT_TECH_COLOR
  return (
    <span className={`${STYLES.techBadge} ${colorClass}`}>
      {tech}
    </span>
  )
}

/** Tech stack list with overflow indicator */
function TechStack({ 
  tech, 
  maxVisible = MAX_VISIBLE_TECH,
  size = 'default'
}: { 
  tech: string[]
  maxVisible?: number
  size?: 'default' | 'large'
}) {
  const visibleTech = tech.slice(0, maxVisible)
  const overflowCount = tech.length - maxVisible

  return (
    <div className="flex flex-wrap gap-2">
      {visibleTech.map((t) => (
        <TechBadge key={t} tech={t} />
      ))}
      {overflowCount > 0 && (
        <span className={`${STYLES.techBadge} ${DEFAULT_TECH_COLOR}`}>
          +{overflowCount}
        </span>
      )}
    </div>
  )
}

/** Project card with hover effects */
function ProjectCard({ 
  project, 
  index, 
  onOpen 
}: { 
  project: Project
  index: number
  onOpen: () => void 
}) {
  return (
    <motion.article
      {...MOTION.card}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      <motion.button
        onClick={onOpen}
        className="w-full h-full text-left focus-ring rounded-2xl"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div className="relative h-full flex flex-col bg-canvas-50 dark:bg-void-surface rounded-lg p-6 md:p-8 border border-canvas-300 dark:border-void-border overflow-hidden transition-all duration-400 group-hover:border-neon-violet-dim/50 dark:group-hover:border-neon-violet/30 group-hover:shadow-lifted dark:group-hover:shadow-glow-violet">
          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-violet/5 via-transparent to-shadow-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          
          {/* Index number */}
          <div className="absolute top-6 right-6 font-mono text-label text-canvas-400 dark:text-void-muted">
            {String(index + 1).padStart(2, '0')}
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <h3 className={STYLES.cardTitle}>{project.title}</h3>
            <p className={STYLES.cardTagline}>{project.tagline}</p>
            
            <div className="mb-6">
              <TechStack tech={project.tech} />
            </div>

            {/* Spacer */}
            <div className="flex-grow" />

            {/* View details link */}
            <div className="flex items-center gap-2 text-neon-violet-dim dark:text-neon-violet font-body text-body-sm mt-auto">
              <span>View details</span>
              <motion.div className="transition-transform duration-300 group-hover:translate-x-1">
                {Icons.arrow}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.button>
    </motion.article>
  )
}

/** Detail section in modal */
function DetailSection({ 
  label, 
  content 
}: { 
  label: string
  content: string 
}) {
  return (
    <div>
      <h4 className={STYLES.modalLabel}>{label}</h4>
      <p className={STYLES.modalText}>{content}</p>
    </div>
  )
}

/** Project detail modal */
function ProjectModal({ 
  project, 
  onClose 
}: { 
  project: Project
  onClose: () => void 
}) {
  return (
    <motion.div
      {...MOTION.modal.backdrop}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/60 dark:bg-void-base/90 backdrop-blur-sm" />
      
      {/* Modal content */}
      <motion.div
        {...MOTION.modal.content}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-canvas-50 dark:bg-void-surface rounded-lg shadow-2xl border border-canvas-300 dark:border-void-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-canvas-200 dark:bg-void-elevated hover:bg-canvas-300 dark:hover:bg-void-border transition-colors focus-ring"
          aria-label="Close modal"
        >
          {Icons.close}
        </button>

        {/* Image placeholder */}
        <div className="w-full h-48 md:h-64 bg-gradient-to-br from-canvas-200 to-canvas-300 dark:from-void-elevated dark:to-void-surface flex items-center justify-center">
          <span className="font-mono text-label text-canvas-500 uppercase tracking-wider">
            Project Preview
          </span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          <h2 className="font-display text-display-md text-ink dark:text-canvas-50 mb-4">
            {project.title}
          </h2>

          <p className="font-body text-body-lg text-ink-muted dark:text-canvas-300 mb-8">
            {project.description}
          </p>

          {/* Problem / Solution / Result */}
          <div className="space-y-6 mb-8">
            <DetailSection label="The Problem" content={project.problem} />
            <DetailSection label="The Solution" content={project.solution} />
            <DetailSection label="The Result" content={project.result} />
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <h4 className="font-mono text-label uppercase tracking-wider text-ink-subtle mb-3">
              Technologies Used
            </h4>
            <TechStack tech={project.tech} maxVisible={99} size="large" />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <CyberButton
                variant="primary"
                size="sm"
                href={project.github}
                statusText="ACCESSING"
                icon={Icons.github}
              >
                View Code
              </CyberButton>
            )}
            {project.live && (
              <CyberButton
                variant="secondary"
                size="sm"
                href={project.live}
                statusText="LAUNCHING"
                icon={Icons.external}
              >
                Live Demo
              </CyberButton>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/** Section header */
function SectionHeader() {
  return (
    <motion.div {...MOTION.header} className="mb-16">
      <p className={STYLES.sectionLabel}>Selected Work</p>
      <h2 className={STYLES.sectionHeading}>
        Projects that showcase{' '}
        <span className="italic">craftsmanship</span>
      </h2>
    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
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
      id="projects" 
      className="section-spacing bg-canvas-100 dark:bg-void-base transition-colors duration-500 relative overflow-hidden"
      style={{ opacity, y }}
    >
      {/* Cyberpunk hex grid background */}
      <CyberBackgrounds variant="hex-grid" intensity={0.6} />
      
      <div className="section-container relative z-10">
        <SectionHeader />

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  )
}
