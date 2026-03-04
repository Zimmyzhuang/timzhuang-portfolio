import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const WORK_NAV_ITEMS = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation items={WORK_NAV_ITEMS} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
