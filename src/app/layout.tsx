import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: "Tim Zhuang",
  description: 'Software engineer and photographer.',
  keywords: ['software engineer', 'developer', 'portfolio', 'projects', 'Tim Zhuang'],
  authors: [{ name: 'Tim Zhuang' }],
  openGraph: {
    title: "Tim Zhuang",
    description: 'Software engineer and photographer.',
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
