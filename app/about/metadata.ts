import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Info, Rithvik Shetty',
  description: 'Learn about my journey as a full stack developer. Expertise in React, Next.js, ML, and creative web development.',
  keywords: [
    'About Rithvik Shetty',
    'Full Stack Developer',
    'Web Developer',
    'Machine Learning',
    'React Expert',
    'Web Development Skills',
  ],
  openGraph: {
    title: 'Info, Rithvik Shetty',
    description: 'Full stack developer passionate about creating innovative digital solutions',
    url: 'https://rithvikshetty.in/about',
    type: 'website',
    images: [
      {
        url: 'https://rithvikshetty.in/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Info, Rithvik Shetty',
    description: 'Full stack developer passionate about creating innovative digital solutions',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rithvikshetty.in/about',
  },
}
