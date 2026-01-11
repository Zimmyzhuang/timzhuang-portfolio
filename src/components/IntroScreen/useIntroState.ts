'use client'

import { useState, useEffect, useCallback } from 'react'

// ============================================================================
// TYPES
// ============================================================================

export type IntroPreference = 'always' | 'session' | 'once' | 'never'

interface IntroState {
  /** Whether intro should be shown */
  shouldShow: boolean
  /** Whether intro has completed or been skipped */
  isComplete: boolean
  /** Skip the intro immediately */
  skip: () => void
  /** Mark intro as complete (finished naturally) */
  complete: () => void
  /** User preference for future visits */
  preference: IntroPreference
  /** Update user preference */
  setPreference: (pref: IntroPreference) => void
}

// ============================================================================
// CONSTANTS
// ============================================================================

const STORAGE_KEYS = {
  preference: 'portfolio-intro-preference',
  hasSeenIntro: 'portfolio-has-seen-intro',
  sessionKey: 'portfolio-session-intro-shown',
} as const

const DEFAULT_PREFERENCE: IntroPreference = 'always'

// ============================================================================
// HOOK
// ============================================================================

export function useIntroState(): IntroState {
  const [shouldShow, setShouldShow] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [preference, setPreferenceState] = useState<IntroPreference>(DEFAULT_PREFERENCE)
  const [mounted, setMounted] = useState(false)

  // Initialize state from storage
  useEffect(() => {
    setMounted(true)

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsComplete(true)
      return
    }

    // Get stored preference
    const storedPref = localStorage.getItem(STORAGE_KEYS.preference) as IntroPreference | null
    const currentPref = storedPref || DEFAULT_PREFERENCE
    setPreferenceState(currentPref)

    // Determine if we should show intro based on preference
    const hasSeenEver = localStorage.getItem(STORAGE_KEYS.hasSeenIntro) === 'true'
    const hasSeenSession = sessionStorage.getItem(STORAGE_KEYS.sessionKey) === 'true'

    let show = false

    switch (currentPref) {
      case 'always':
        show = true
        break
      case 'session':
        show = !hasSeenSession
        break
      case 'once':
        show = !hasSeenEver
        break
      case 'never':
        show = false
        break
    }

    setShouldShow(show)

    // If not showing, mark as complete immediately
    if (!show) {
      setIsComplete(true)
    }
  }, [])

  // Skip handler
  const skip = useCallback(() => {
    setIsComplete(true)
    setShouldShow(false)
    
    // Mark as seen
    localStorage.setItem(STORAGE_KEYS.hasSeenIntro, 'true')
    sessionStorage.setItem(STORAGE_KEYS.sessionKey, 'true')
  }, [])

  // Complete handler (natural finish)
  const complete = useCallback(() => {
    setIsComplete(true)
    
    // Mark as seen
    localStorage.setItem(STORAGE_KEYS.hasSeenIntro, 'true')
    sessionStorage.setItem(STORAGE_KEYS.sessionKey, 'true')
    
    // Small delay before hiding to let exit animation play
    setTimeout(() => {
      setShouldShow(false)
    }, 500)
  }, [])

  // Update preference
  const setPreference = useCallback((pref: IntroPreference) => {
    setPreferenceState(pref)
    localStorage.setItem(STORAGE_KEYS.preference, pref)
  }, [])

  return {
    shouldShow: mounted ? shouldShow : false,
    isComplete,
    skip,
    complete,
    preference,
    setPreference,
  }
}
