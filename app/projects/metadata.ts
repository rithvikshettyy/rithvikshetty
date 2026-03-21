import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Rithvik Shetty - Full Stack Developer',
  description: 'Browse my portfolio of web development and design projects. Showcasing React, Next.js, and full-stack applications.',
  keywords: [
    'Portfolio Projects',
    'Web Development',
    'React Projects',
    'Next.js Portfolio',
    'Full Stack Development',
    'Frontend Projects',
  ],
  openGraph: {
    title: 'Projects | Rithvik Shetty',
    description: 'Explore my recent web development and design projects',
    url: 'https://rithvikshetty.in/projects',
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
    title: 'Projects | Rithvik Shetty',
    description: 'Explore my recent web development and design projects',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rithvikshetty.in/projects',
  },
}
