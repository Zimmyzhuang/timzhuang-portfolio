import type { Metadata } from 'next'
import Photos from '@/components/Photos'

export const metadata: Metadata = {
  title: "Photos | Tim Zhuang",
  description: 'Photo gallery — moments captured in pixels.',
}

export default function PhotosPage() {
  return <Photos />
}
