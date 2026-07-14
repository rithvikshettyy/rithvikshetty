import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Awards | Rithvik Shetty - Full Stack Developer',
  description: 'Hackathon wins, awards, and recognitions earned by Rithvik Shetty, including the HackCelestial 2.0 Most Product Readiness Award and an ISRO-presented project.',
  keywords: [
    'Rithvik Shetty Achievements',
    'Hackathon Winner',
    'HackCelestial',
    'ISRO',
    'Awards',
    'Recognitions',
  ],
  openGraph: {
    title: 'Awards | Rithvik Shetty',
    description: 'Hackathon wins, awards, and recognitions earned through technical work.',
    url: 'https://rithvikshetty.in/awards',
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
    title: 'Awards | Rithvik Shetty',
    description: 'Hackathon wins, awards, and recognitions earned through technical work.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rithvikshetty.in/awards',
  },
}
