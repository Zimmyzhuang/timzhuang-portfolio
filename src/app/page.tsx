import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Photos from '@/components/Photos'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { IntroScreen } from '@/components/IntroScreen'

export default function Home() {
  return (
    <>
      {/* Intro screen - shows on first visit */}
      <IntroScreen />
      
      {/* Main content */}
      <main>
        <Navigation />
        <Hero />
        <Projects />
        <Photos />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
