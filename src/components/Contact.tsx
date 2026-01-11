'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import CyberButton from './CyberButton'
import CyberBackgrounds from './CyberBackgrounds'

// ============================================================================
// CONSTANTS
// ============================================================================

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqqwarb'
const SUCCESS_MESSAGE_DURATION = 5000 // ms

/** Contact information displayed in sidebar */
const CONTACT_LINKS = [
  {
    type: 'email',
    label: 'Email',
    value: 'tim.zhuang4@gmail.com',
    href: 'mailto:tim.zhuang4@gmail.com',
    icon: 'mail',
  },
  {
    type: 'linkedin',
    label: 'LinkedIn',
    value: '/in/timzhuang',
    href: 'https://linkedin.com/in/timzhuang',
    icon: 'linkedin',
  },
  {
    type: 'github',
    label: 'GitHub',
    value: '@Zimmyzhuang',
    href: 'https://github.com/Zimmyzhuang',
    icon: 'github',
  },
] as const

/** Animation variants for consistent motion */
const MOTION_VARIANTS = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    viewport: { once: true },
  },
  scaleIn: {
    initial: { opacity: 0, scaleY: 0 },
    animate: { opacity: 1, scaleY: 1 },
    exit: { opacity: 0, scaleY: 0 },
  },
} as const

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  mail: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  download: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  ),
  send: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
      <path d="m9 11 3 3L22 4" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
}

// ============================================================================
// SHARED STYLES
// ============================================================================

const STYLES = {
  sectionLabel: 'font-mono text-label uppercase tracking-widest text-neon-violet-dim dark:text-neon-violet mb-4',
  sectionHeading: 'font-display text-display-md text-ink dark:text-canvas-50 mb-6',
  bodyText: 'font-body text-body-lg text-ink-muted dark:text-canvas-300',
  input: 'w-full px-4 py-3 rounded-lg bg-canvas-100 dark:bg-void-surface border border-canvas-300 dark:border-void-border font-body text-body-md text-ink dark:text-void-text placeholder:text-ink-subtle dark:placeholder:text-void-muted focus:outline-none focus:border-neon-violet-dim dark:focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/20 transition-all',
  contactCard: 'flex items-center gap-4 p-4 rounded-lg bg-canvas-100 dark:bg-void-surface border border-canvas-300 dark:border-void-border hover:border-neon-violet-dim/50 dark:hover:border-neon-violet/30 transition-all group focus-ring',
  iconWrapper: 'w-12 h-12 rounded-full bg-neon-violet/10 dark:bg-neon-violet/20 flex items-center justify-center text-neon-violet-dim dark:text-neon-violet',
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/** Single contact link card */
function ContactLinkCard({ link }: { link: typeof CONTACT_LINKS[number] }) {
  const isExternal = link.type !== 'email'
  
  return (
    <a
      href={link.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={STYLES.contactCard}
    >
      <div className={STYLES.iconWrapper}>
        {Icons[link.icon]}
      </div>
      <div>
        <p className="font-body text-body-sm text-ink-subtle dark:text-canvas-400">
          {link.label}
        </p>
        <p className="font-body text-body-md text-ink dark:text-void-text group-hover:text-neon-violet transition-colors">
          {link.value}
        </p>
      </div>
    </a>
  )
}

/** Status message frame with cyberpunk styling */
function StatusMessage({ 
  type, 
  title, 
  message 
}: { 
  type: 'success' | 'error'
  title: string
  message: string
}) {
  const isSuccess = type === 'success'
  const borderColor = isSuccess ? 'border-emerald-400/50' : 'border-danger/50'
  const bgColor = isSuccess ? 'bg-emerald-500/10 dark:bg-emerald-500/5' : 'bg-danger/10 dark:bg-danger/5'
  const textColor = isSuccess ? 'text-emerald-600 dark:text-emerald-400' : 'text-danger'
  const subtextColor = isSuccess ? 'text-emerald-700 dark:text-emerald-300/80' : 'text-danger/80'
  const dotColor = isSuccess ? 'bg-emerald-500' : 'bg-danger'
  const glowColor = isSuccess ? 'shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'shadow-[0_0_8px_rgba(165,29,78,0.6)]'

  return (
    <motion.div
      {...MOTION_VARIANTS.scaleIn}
      style={{ originY: 0 }}
      className="relative overflow-hidden"
    >
      {/* Outer frame */}
      <div 
        className={`absolute inset-0 border ${borderColor}`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        }}
      />
      
      {/* Inner content */}
      <div 
        className={`relative p-4 ${bgColor}`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: isSuccess ? -180 : 0 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
            className={`w-8 h-8 rounded-full ${isSuccess ? 'bg-emerald-500/20' : 'bg-danger/20'} flex items-center justify-center`}
          >
            {isSuccess ? Icons.check : Icons.error}
          </motion.div>
          
          {/* Text */}
          <div>
            <p className={`font-mono text-label uppercase tracking-wider ${textColor}`}>
              {title}
            </p>
            <p className={`font-body text-body-sm ${subtextColor}`}>
              {message}
            </p>
          </div>
          
          {/* Status dot */}
          <motion.div
            animate={{ opacity: [1, isSuccess ? 0.5 : 0.3, 1] }}
            transition={{ duration: isSuccess ? 1 : 0.5, repeat: Infinity }}
            className={`ml-auto w-2 h-2 rounded-full ${dotColor} ${glowColor}`}
          />
        </div>
      </div>
    </motion.div>
  )
}

/** Signal bars indicator for submit button */
function SignalBars({ isActive }: { isActive: boolean }) {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-white/40"
          style={{ height: `${(i + 1) * 3}px` }}
          animate={{ opacity: isActive ? [0.3, 1, 0.3] : 0.4 }}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            repeat: isActive ? Infinity : 0,
          }}
        />
      ))}
    </div>
  )
}

/** Custom hexagonal submit button */
function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      className="relative w-full group"
      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
    >
      {/* Outer hexagonal frame */}
      <div 
        className="absolute inset-0 border border-neon-violet/30 dark:border-neon-violet/50 transition-colors duration-300 group-hover:border-neon-violet/60"
        style={{
          clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)',
        }}
      />
      
      {/* Inner core */}
      <motion.div 
        className="relative px-8 py-4 bg-neon-violet-dim dark:bg-neon-violet text-white font-body text-body-md transition-all duration-300 group-hover:shadow-glow-violet disabled:opacity-60"
        style={{
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%)',
        }}
        animate={{
          boxShadow: isSubmitting 
            ? '0 0 20px rgba(110, 58, 255, 0.5), inset 0 0 30px rgba(110, 58, 255, 0.2)'
            : 'none'
        }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-3 w-2 h-px bg-white/50" />
        <div className="absolute top-0 right-3 w-2 h-px bg-white/50" />
        <div className="absolute bottom-0 left-3 w-2 h-px bg-white/50" />
        <div className="absolute bottom-0 right-3 w-2 h-px bg-white/50" />
        
        {/* Content */}
        <div className="flex items-center justify-center gap-3">
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                <span className="font-mono text-label uppercase tracking-wider">
                  Transmitting...
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <span>Send Message</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {Icons.send}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <SignalBars isActive={isSubmitting} />
      </motion.div>
    </motion.button>
  )
}

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

/** Resume download section */
function ResumeSection() {
  return (
    <section 
      id="resume" 
      className="section-spacing bg-canvas-100 dark:bg-void-base border-t border-canvas-300 dark:border-void-border transition-all duration-500"
    >
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            {...MOTION_VARIANTS.fadeUp}
            transition={{ duration: 0.5 }}
            className={STYLES.sectionLabel}
          >
            Resume
          </motion.p>
          
          <motion.h2
            {...MOTION_VARIANTS.fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={STYLES.sectionHeading}
          >
            View my full background
          </motion.h2>

          <motion.p
            {...MOTION_VARIANTS.fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${STYLES.bodyText} mb-8`}
          >
            Download my resume for a detailed overview of my education, 
            experience, and technical skills.
          </motion.p>

          <motion.div
            {...MOTION_VARIANTS.fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <CyberButton
              variant="primary"
              size="lg"
              href="/resume.pdf"
              statusText="DOWNLOADING"
              icon={Icons.download}
            >
              Download Resume
            </CyberButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/** Contact info sidebar */
function ContactInfo() {
  return (
    <div>
      <motion.p
        {...MOTION_VARIANTS.fadeUp}
        transition={{ duration: 0.5 }}
        className={STYLES.sectionLabel}
      >
        Get in Touch
      </motion.p>

      <motion.h2
        {...MOTION_VARIANTS.fadeUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={STYLES.sectionHeading}
      >
        Let&apos;s build something{' '}
        <span className="italic">together</span>
      </motion.h2>

      <motion.p
        {...MOTION_VARIANTS.fadeUp}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`${STYLES.bodyText} mb-10`}
      >
        I&apos;m always excited to discuss new opportunities, 
        interesting projects, or just chat about technology. 
        Feel free to reach out!
      </motion.p>

      {/* Contact links */}
      <motion.div
        {...MOTION_VARIANTS.fadeUp}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-4"
      >
        {CONTACT_LINKS.map((link) => (
          <ContactLinkCard key={link.type} link={link} />
        ))}
      </motion.div>
    </div>
  )
}

/** Contact form with validation */
function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormState({ name: '', email: '', message: '' })
        setTimeout(() => setIsSubmitted(false), SUCCESS_MESSAGE_DURATION)
      } else {
        const data = await response.json()
        const errorMessage = data.errors
          ? data.errors.map((err: { message: string }) => err.message).join(', ')
          : 'Something went wrong. Please try again.'
        setSubmitError(errorMessage)
      }
    } catch {
      setSubmitError('Network error. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <motion.div
      {...MOTION_VARIANTS.fadeUp}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden field for email subject */}
        <input 
          type="hidden" 
          name="_subject" 
          value="New portfolio message from Tim's website" 
        />
        
        {/* Name field */}
        <div>
          <label htmlFor="name" className="block font-body text-body-sm text-ink dark:text-canvas-200 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            className={STYLES.input}
            placeholder="Your name"
          />
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block font-body text-body-sm text-ink dark:text-canvas-200 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            className={STYLES.input}
            placeholder="your.email@example.com"
          />
        </div>

        {/* Message field */}
        <div>
          <label htmlFor="message" className="block font-body text-body-sm text-ink dark:text-canvas-200 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            required
            rows={5}
            className={`${STYLES.input} resize-none`}
            placeholder="Tell me about your project or opportunity..."
          />
        </div>

        <SubmitButton isSubmitting={isSubmitting} />

        {/* Status messages */}
        <AnimatePresence>
          {isSubmitted && (
            <StatusMessage
              type="success"
              title="Transmission Complete"
              message="I'll get back to you soon."
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {submitError && (
            <StatusMessage
              type="error"
              title="Transmission Failed"
              message={submitError}
            />
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Contact() {
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
    <>
      <ResumeSection />
      
      <motion.section 
        ref={sectionRef}
        id="contact" 
        className="section-spacing bg-canvas-50 dark:bg-void-elevated transition-colors duration-500 relative overflow-hidden"
        style={{ opacity, y }}
      >
        {/* Cyberpunk data stream background */}
        <CyberBackgrounds variant="data-stream" intensity={0.4} />
        
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </motion.section>
    </>
  )
}
