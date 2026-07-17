import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service, Rithvik Shetty',
  description: 'Terms of service for rithvikshetty.in, the portfolio of Rithvik Shetty, Full Stack Developer.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://rithvikshetty.in/terms',
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
