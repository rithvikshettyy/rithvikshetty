import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy, Rithvik Shetty',
  description: 'Privacy policy for rithvikshetty.in, the portfolio of Rithvik Shetty, Full Stack Developer.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://rithvikshetty.in/privacy',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
