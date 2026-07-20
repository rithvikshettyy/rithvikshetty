import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work | Rithvik Shetty - Full Stack Developer',
  description: 'Selected projects by Rithvik Shetty — full stack web apps, machine learning tools, and freelance client work.',
  keywords: [
    'Rithvik Shetty Work',
    'Rithvik Shetty Projects',
    'Full Stack Projects',
    'Web Development Portfolio',
    'Machine Learning Projects',
  ],
  openGraph: {
    title: 'Work | Rithvik Shetty',
    description: 'Selected projects by Rithvik Shetty.',
    url: 'https://rithvikshetty.in/work',
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
    title: 'Work | Rithvik Shetty',
    description: 'Selected projects by Rithvik Shetty.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rithvikshetty.in/work',
  },
}
