'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'

// ============================================================================
// TYPES
// ============================================================================

export interface NavItem {
  label: string
  href: string
}

interface NavigationProps {
  items: NavItem[]
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SCROLL_THRESHOLD = 50
const SECTION_OFFSET = 200

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  moon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  sun: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  moonLarge: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  sunLarge: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const MOTION = {
  nav: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  icon: {
    initial: { rotate: -90, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 90, opacity: 0 },
    transition: { duration: 0.2 },
  },
  iconReverse: {
    initial: { rotate: 90, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: -90, opacity: 0 },
    transition: { duration: 0.2 },
  },
  mobileMenu: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
}

// ============================================================================
// SHARED STYLES
// ============================================================================

const STYLES = {
  navLink: 'relative font-body text-body-sm text-ink-muted dark:text-void-muted hover:text-ink dark:hover:text-void-text transition-colors duration-250 focus-ring rounded-sm py-1',
  themeButton: 'p-2 rounded-full bg-canvas-200 dark:bg-void-surface text-ink-muted dark:text-void-muted hover:text-ink dark:hover:text-neon-violet transition-colors focus-ring border border-canvas-300 dark:border-void-border',
  mobileLink: 'font-display text-display-sm text-ink dark:text-void-text hover:text-neon-violet transition-colors focus-ring rounded-sm',
}

// ============================================================================
// HOOKS
// ============================================================================

function useScrollTracking(items: NavItem[]) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const hashItems = items.filter(item => item.href.startsWith('#'))

    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)

      if (hashItems.length === 0) {
        setActiveSection('')
        return
      }

      const sections = hashItems.map(item => item.href.slice(1))
      const scrollPosition = window.scrollY + SECTION_OFFSET

      let found = false
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section)
          found = true
          break
        }
      }

      if (!found || window.scrollY < SECTION_OFFSET) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  return { isScrolled, activeSection }
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function Logo() {
  return (
    <motion.a
      href="/"
      className="font-graffiti text-3xl md:text-4xl text-ink dark:text-void-text hover:text-neon-violet-dim dark:hover:text-neon-violet transition-colors duration-250 focus-ring rounded-sm"
      whileHover={{ scale: 1.05, rotate: -2 }}
      whileTap={{ scale: 0.95 }}
      style={{ textShadow: '2px 2px 4px rgba(110, 58, 255, 0.3)' }}
    >
      庄
    </motion.a>
  )
}

function ActiveIndicator() {
  return (
    <motion.div
      layoutId="activeSection"
      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-violet rounded-full"
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    />
  )
}

function NavLinkButton({
  item,
  isActive,
  onClick,
}: {
  item: NavItem
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      className={STYLES.navLink}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      aria-current={isActive ? 'page' : undefined}
    >
      {item.label}
      {isActive && <ActiveIndicator />}
    </motion.button>
  )
}

function ThemeToggle({ size = 'default' }: { size?: 'default' | 'mobile' }) {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) return null

  const isLight = theme === 'light'
  const icons = size === 'mobile'
    ? { light: Icons.moonLarge, dark: Icons.sunLarge }
    : { light: Icons.moon, dark: Icons.sun }

  return (
    <motion.button
      onClick={toggleTheme}
      className={STYLES.themeButton}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.div key="moon" {...MOTION.icon}>
            {icons.light}
          </motion.div>
        ) : (
          <motion.div key="sun" {...MOTION.iconReverse}>
            {icons.dark}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      className="md:hidden p-2 text-ink-muted hover:text-ink transition-colors focus-ring rounded-sm"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle menu"
    >
      <div className="w-5 h-4 flex flex-col justify-between">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-full bg-current origin-left"
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          className="block h-0.5 w-full bg-current"
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-full bg-current origin-left"
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.button>
  )
}

function MobileMenu({
  isOpen,
  items,
  onNavigate,
}: {
  isOpen: boolean
  items: NavItem[]
  onNavigate: (href: string) => void
}) {
  const { theme, toggleTheme, mounted } = useTheme()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...MOTION.mobileMenu}
          className="fixed inset-0 z-40 bg-canvas-100 dark:bg-void-base backdrop-blur-sm md:hidden"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {items.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => onNavigate(item.href)}
                className={STYLES.mobileLink}
              >
                {item.label}
              </motion.button>
            ))}

            {mounted && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: items.length * 0.1, duration: 0.3 }}
                onClick={toggleTheme}
                className="flex items-center gap-3 font-body text-body-md text-ink-muted dark:text-void-muted hover:text-ink dark:hover:text-void-text transition-colors focus-ring rounded-sm"
              >
                {theme === 'light' ? (
                  <>{Icons.moonLarge} Dark Mode</>
                ) : (
                  <>{Icons.sunLarge} Light Mode</>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Navigation({ items }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isScrolled, activeSection } = useScrollTracking(items)
  const pathname = usePathname()
  const router = useRouter()

  const navigate = (href: string) => {
    setIsMenuOpen(false)

    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push(href)
    }
  }

  const isItemActive = (item: NavItem) => {
    if (item.href.startsWith('#')) {
      return activeSection === item.href.slice(1)
    }
    return pathname === item.href
  }

  const navBgClass = isScrolled
    ? 'bg-canvas-100/90 dark:bg-void-elevated/95 backdrop-blur-md border-b border-canvas-300/50 dark:border-void-border'
    : 'bg-transparent'

  return (
    <>
      <motion.nav
        {...MOTION.nav}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBgClass}`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Logo />

            <div className="hidden md:flex items-center gap-8">
              {items.map((item) => (
                <NavLinkButton
                  key={item.href}
                  item={item}
                  isActive={isItemActive(item)}
                  onClick={() => navigate(item.href)}
                />
              ))}
              <ThemeToggle />
            </div>

            <HamburgerButton
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </motion.nav>

      <MobileMenu isOpen={isMenuOpen} items={items} onNavigate={navigate} />
    </>
  )
}
