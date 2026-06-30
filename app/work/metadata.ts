import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work Experience | Rithvik Shetty - Full Stack Developer',
  description: 'A timeline of leadership and technical roles held by Rithvik Shetty, including Technical Secretary, TEDx SIESGST Design Lead, and ML internship work.',
  keywords: [
    'Rithvik Shetty Work',
    'Technical Secretary',
    'TEDx Design Lead',
    'Leadership Roles',
    'Internships',
  ],
  openGraph: {
    title: 'Work Experience | Rithvik Shetty',
    description: 'Leadership and technical roles held by Rithvik Shetty.',
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
    title: 'Work Experience | Rithvik Shetty',
    description: 'Leadership and technical roles held by Rithvik Shetty.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rithvikshetty.in/work',
  },
}
