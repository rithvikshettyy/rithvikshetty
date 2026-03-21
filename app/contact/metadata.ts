import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Rithvik Shetty - Full Stack Developer',
  description: 'Get in touch with me for project inquiries, collaborations, or freelance work opportunities.',
  keywords: [
    'Contact Rithvik Shetty',
    'Hire Full Stack Developer',
    'Freelance Web Developer',
    'Project Inquiry',
    'Web Development Services',
  ],
  openGraph: {
    title: 'Contact | Rithvik Shetty',
    description: 'Reach out for project inquiries and collaborations',
    url: 'https://rithvikshetty.in/contact',
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
    title: 'Contact | Rithvik Shetty',
    description: 'Reach out for project inquiries and collaborations',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rithvikshetty.in/contact',
  },
}
