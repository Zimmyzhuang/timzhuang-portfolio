import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: "Tim Zhuang's Portfolio",
  description: 'Personal portfolio showcasing software engineering projects and expertise.',
  keywords: ['software engineer', 'developer', 'portfolio', 'projects', 'Tim Zhuang'],
  authors: [{ name: 'Tim Zhuang' }],
  openGraph: {
    title: "Tim Zhuang's Portfolio",
    description: 'Personal portfolio showcasing software engineering projects and expertise.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
