import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: "Work | Tim Zhuang",
  description: 'Software engineering projects, skills, and experience.',
}

export default function WorkPage() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </>
  )
}
