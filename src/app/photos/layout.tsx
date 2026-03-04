import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const PHOTOS_NAV_ITEMS = [
  { label: 'Gallery', href: '#photos' },
]

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation items={PHOTOS_NAV_ITEMS} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
