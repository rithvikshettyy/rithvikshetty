import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience | Rithvik Shetty - Full Stack Developer',
  description: 'Work experience and internships including Salesforce & Marketing Automation at Lupin Ltd, Machine Learning at ION Chemicals, plus leadership roles in college tech teams.',
  keywords: [
    'Rithvik Shetty Experience',
    'Work History',
    'Internships',
    'Salesforce',
    'Machine Learning Intern',
    'Technical Leadership',
  ],
  openGraph: {
    title: 'Experience | Rithvik Shetty',
    description: 'Work experience, internships, and leadership roles.',
    url: 'https://rithvikshetty.in/experience',
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
    title: 'Experience | Rithvik Shetty',
    description: 'Work experience, internships, and leadership roles.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rithvikshetty.in/experience',
  },
}
