'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// ============================================================================
// CONSTANTS
// ============================================================================

/** Navigation links in footer */
const NAV_ITEMS = ['Projects', 'About', 'Resume', 'Contact'] as const

/** Social media links */
const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/Zimmyzhuang',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/timzhuang',
    icon: 'linkedin',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourhandle',
    icon: 'twitter',
  },
] as const

/** Site metadata */
const SITE_INFO = {
  name: 'Tim Zhuang',
  techStack: 'Next.js, Tailwind CSS & Framer Motion',
} as const

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  github: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
}

// ============================================================================
// SHARED STYLES
// ============================================================================

const STYLES = {
  footerLink: 'font-body text-body-sm text-canvas-400 dark:text-void-muted hover:text-canvas-100 dark:hover:text-void-text transition-colors duration-250 link-underline',
  socialLink: 'p-2 text-canvas-400 dark:text-void-muted hover:text-neon-violet transition-colors',
  copyright: 'font-body text-body-sm text-canvas-400',
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/** Logo/brand with scroll-to-top */
function FooterLogo() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.a
      href="#"
      onClick={handleClick}
      className="font-graffiti text-2xl text-canvas-100 dark:text-void-text hover:text-neon-violet transition-colors duration-250"
      style={{ textShadow: '0 0 8px rgba(110, 58, 255, 0.3)' }}
      whileHover={{ scale: 1.02, rotate: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      庄天乐
    </motion.a>
  )
}

/** Footer navigation links */
function FooterNav() {
  return (
    <nav className="flex items-center gap-6">
      {NAV_ITEMS.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className={STYLES.footerLink}
        >
          {item}
        </a>
      ))}
    </nav>
  )
}

/** Social media links */
function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={STYLES.socialLink}
          aria-label={link.name}
        >
          {Icons[link.icon]}
        </a>
      ))}
    </div>
  )
}

/** Copyright notice */
function Copyright() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-8 pt-8 border-t border-canvas-700 dark:border-void-border text-center">
      <p className={STYLES.copyright}>
        © {currentYear} {SITE_INFO.name}. Built with {SITE_INFO.techStack}.
      </p>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  })
  
  // Smooth the scroll progress for fluid animation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  // Fade in as footer enters (no fade out since it's at the bottom)
  const opacity = useTransform(smoothProgress, [0, 0.3], [0, 1])
  const y = useTransform(smoothProgress, [0, 0.3], [40, 0])

  return (
    <motion.footer 
      ref={footerRef}
      className="bg-canvas-800 dark:bg-void-base text-canvas-400 dark:text-void-muted transition-colors duration-500 relative overflow-hidden border-t border-canvas-700 dark:border-void-border"
      style={{ opacity, y }}
    >
      <div className="section-container py-12">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <FooterLogo />
          <FooterNav />
          <SocialLinks />
        </div>

        <Copyright />
      </div>
    </motion.footer>
  )
}
