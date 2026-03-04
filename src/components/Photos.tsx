'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================================================
// TYPES
// ============================================================================

interface Photo {
  id: string
  src: string
  alt: string
  category: Category
  aspect: 'landscape' | 'portrait' | 'square'
}

type Category = 'all' | 'travel' | 'life' | 'tech'

// ============================================================================
// CONSTANTS
// ============================================================================

const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Travel', value: 'travel' },
  { label: 'Life', value: 'life' },
  { label: 'Tech', value: 'tech' },
]

/**
 * Photo data — replace placeholder srcs with your actual image paths.
 * Put images in /public/photos/ and reference them as "/photos/filename.jpg".
 */
const PHOTOS: Photo[] = [
  { id: 'p1',  src: '', alt: 'Photo 1',  category: 'travel',  aspect: 'landscape' },
  { id: 'p2',  src: '', alt: 'Photo 2',  category: 'life',    aspect: 'portrait'  },
  { id: 'p3',  src: '', alt: 'Photo 3',  category: 'tech',    aspect: 'square'    },
  { id: 'p4',  src: '', alt: 'Photo 4',  category: 'travel',  aspect: 'portrait'  },
  { id: 'p5',  src: '', alt: 'Photo 5',  category: 'life',    aspect: 'landscape' },
  { id: 'p6',  src: '', alt: 'Photo 6',  category: 'tech',    aspect: 'landscape' },
  { id: 'p7',  src: '', alt: 'Photo 7',  category: 'travel',  aspect: 'square'    },
  { id: 'p8',  src: '', alt: 'Photo 8',  category: 'life',    aspect: 'landscape' },
  { id: 'p9',  src: '', alt: 'Photo 9',  category: 'travel',  aspect: 'portrait'  },
]

/** Aspect-ratio class map for grid items */
const ASPECT_MAP: Record<Photo['aspect'], string> = {
  landscape: 'aspect-[4/3]',
  portrait:  'aspect-[3/4]',
  square:    'aspect-square',
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const MOTION = {
  header: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  photo: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.92 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  lightbox: {
    backdrop: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
    },
    content: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  },
}

// ============================================================================
// SHARED STYLES
// ============================================================================

const STYLES = {
  sectionLabel: 'font-mono text-label uppercase tracking-widest text-neon-violet-dim dark:text-neon-violet mb-4',
  sectionHeading: 'font-display text-display-md md:text-display-lg text-ink dark:text-canvas-50 text-balance',
}

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  chevronLeft: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  ),
  chevronRight: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  camera: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/** Category filter tabs */
function CategoryFilter({
  active,
  onChange,
}: {
  active: Category
  onChange: (cat: Category) => void
}) {
  return (
    <motion.div
      {...MOTION.header}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap justify-center gap-2 mb-12"
    >
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.value
        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={`
              relative px-5 py-2 rounded-full font-mono text-label uppercase tracking-wider
              transition-colors duration-250 focus-ring
              ${isActive
                ? 'bg-neon-violet text-white shadow-glow-violet'
                : 'bg-canvas-200 dark:bg-void-surface text-ink-muted dark:text-void-muted hover:text-ink dark:hover:text-void-text border border-canvas-300 dark:border-void-border hover:border-neon-violet-dim/50 dark:hover:border-neon-violet/30'
              }
            `}
          >
            {cat.label}
          </button>
        )
      })}
    </motion.div>
  )
}

/** Placeholder shown when a photo has no src */
function PhotoPlaceholder({ aspect }: { aspect: Photo['aspect'] }) {
  return (
    <div className={`relative w-full ${ASPECT_MAP[aspect]} bg-gradient-to-br from-canvas-200 via-canvas-300 to-canvas-200 dark:from-void-surface dark:via-void-border/50 dark:to-void-surface flex items-center justify-center`}>
      {/* Subtle grid */}
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
      <div className="flex flex-col items-center gap-2 text-canvas-400 dark:text-void-muted">
        {Icons.camera}
        <span className="font-mono text-label uppercase tracking-wider text-xs">
          Add Photo
        </span>
      </div>
    </div>
  )
}

/** Single photo grid tile */
function PhotoTile({
  photo,
  index,
  onOpen,
}: {
  photo: Photo
  index: number
  onOpen: () => void
}) {
  const hasImage = photo.src.length > 0

  return (
    <motion.div
      layout
      {...MOTION.photo}
      transition={{ ...MOTION.photo.transition, delay: index * 0.02 }}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-canvas-300 dark:border-void-border hover:border-neon-violet-dim/50 dark:hover:border-neon-violet/30 hover:shadow-lifted dark:hover:shadow-glow-violet transition-all duration-400"
      onClick={onOpen}
    >
      {hasImage ? (
        <div className={`relative w-full ${ASPECT_MAP[photo.aspect]} overflow-hidden`}>
          <img
            src={photo.src}
            alt={photo.alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 ease-spring group-hover:scale-105"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </div>
      ) : (
        <PhotoPlaceholder aspect={photo.aspect} />
      )}

      {/* Caption bar on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-spring bg-canvas-50/90 dark:bg-void-surface/90 backdrop-blur-sm border-t border-canvas-300/50 dark:border-void-border/50">
        <p className="font-mono text-label text-ink-muted dark:text-void-muted truncate">
          {photo.alt}
        </p>
      </div>
    </motion.div>
  )
}

/** Lightbox modal for viewing a photo full-size */
function Lightbox({
  photo,
  photos,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo
  photos: Photo[]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const currentIdx = photos.findIndex((p) => p.id === photo.id)
  const hasImage = photo.src.length > 0

  return (
    <motion.div
      {...MOTION.lightbox.backdrop}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/70 dark:bg-void-base/90 backdrop-blur-md" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-canvas-200/80 dark:bg-void-surface/80 text-ink-muted dark:text-void-muted hover:text-ink dark:hover:text-void-text backdrop-blur-sm transition-colors focus-ring"
        aria-label="Close lightbox"
      >
        {Icons.close}
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 font-mono text-label text-canvas-400 dark:text-void-muted">
        {currentIdx + 1} / {photos.length}
      </div>

      {/* Previous button */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 z-20 p-2 rounded-full bg-canvas-200/80 dark:bg-void-surface/80 text-ink-muted dark:text-void-muted hover:text-ink dark:hover:text-neon-violet backdrop-blur-sm transition-colors focus-ring"
          aria-label="Previous photo"
        >
          {Icons.chevronLeft}
        </button>
      )}

      {/* Next button */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 z-20 p-2 rounded-full bg-canvas-200/80 dark:bg-void-surface/80 text-ink-muted dark:text-void-muted hover:text-ink dark:hover:text-neon-violet backdrop-blur-sm transition-colors focus-ring"
          aria-label="Next photo"
        >
          {Icons.chevronRight}
        </button>
      )}

      {/* Photo */}
      <motion.div
        {...MOTION.lightbox.content}
        className="relative z-10 max-w-5xl max-h-[85vh] rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {hasImage ? (
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-w-full max-h-[85vh] object-contain"
          />
        ) : (
          <div className="w-[600px] max-w-[90vw] aspect-[4/3] bg-gradient-to-br from-canvas-200 via-canvas-300 to-canvas-200 dark:from-void-surface dark:via-void-border/50 dark:to-void-surface flex items-center justify-center rounded-lg">
            <div className="flex flex-col items-center gap-3 text-canvas-400 dark:text-void-muted">
              {Icons.camera}
              <span className="font-mono text-label uppercase tracking-wider">
                No Photo Yet
              </span>
            </div>
          </div>
        )}

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/60 to-transparent">
          <p className="font-body text-body-sm text-white/90">
            {photo.alt}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/** Section header */
function SectionHeader() {
  return (
    <motion.div {...MOTION.header} className="text-center mb-12">
      <p className={STYLES.sectionLabel}>Gallery</p>
      <h2 className={STYLES.sectionHeading}>
        Moments captured in{' '}
        <span className="italic">pixels</span>
      </h2>
    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Photos() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const filteredPhotos = activeCategory === 'all'
    ? PHOTOS
    : PHOTOS.filter((p) => p.category === activeCategory)

  const navigatePhoto = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedPhoto) return
      const idx = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
      const nextIdx =
        direction === 'next'
          ? (idx + 1) % filteredPhotos.length
          : (idx - 1 + filteredPhotos.length) % filteredPhotos.length
      setSelectedPhoto(filteredPhotos[nextIdx])
    },
    [selectedPhoto, filteredPhotos],
  )

  return (
    <section
      id="photos"
      className="section-spacing bg-canvas-50 dark:bg-void-elevated transition-colors duration-500 relative overflow-hidden"
    >
      <div className="section-container relative z-10">
        <SectionHeader />

        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        {/* Photo grid — masonry-style with columns */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <PhotoTile
                key={photo.id}
                photo={photo}
                index={index}
                onOpen={() => setSelectedPhoto(photo)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state when no photos in category */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16">
            <p className="font-body text-body-lg text-ink-muted dark:text-void-muted">
              No photos in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox
            photo={selectedPhoto}
            photos={filteredPhotos}
            onClose={() => setSelectedPhoto(null)}
            onPrev={() => navigatePhoto('prev')}
            onNext={() => navigatePhoto('next')}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
