import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat, Rithvik Shetty',
  description:
    'Chat with an AI assistant that knows Rithvik Shetty. Ask about projects, skills, experience, and availability for work.',
  openGraph: {
    title: 'Chat, Rithvik Shetty',
    description:
      'Chat with an AI assistant that knows Rithvik Shetty. Ask about projects, skills, experience, and availability for work.',
    url: 'https://rithvikshetty.in/chat',
    type: 'website',
    images: [{ url: 'https://rithvikshetty.in/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://rithvikshetty.in/chat',
  },
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
