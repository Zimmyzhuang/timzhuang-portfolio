import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
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
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
