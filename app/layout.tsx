import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MouseFollower from "@/components/mouse-follower"
import ModeToggle from "@/components/mode-toggle"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  title: "Rithvik Shetty | Full Stack Developer & Freelancer",
  description: "Full stack developer and freelancer specializing in React, Next.js, and modern web technologies. Building innovative digital solutions.",
  keywords: [
    "Rithvik Shetty",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Development",
    "Machine Learning",
    "Freelance Developer",
    "Portfolio",
  ],
  authors: [{ name: "Rithvik Shetty" }],
  creator: "Rithvik Shetty",
  publisher: "Rithvik Shetty",
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rithvikshetty.in",
    siteName: "Rithvik Shetty - Full Stack Developer",
    title: "Rithvik Shetty | Full Stack Developer & Freelancer",
    description: "Full stack developer specializing in React, Next.js, and modern web technologies.",
    images: [
      {
        url: "https://rithvikshetty.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rithvik Shetty - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rithvik Shetty | Full Stack Developer",
    description: "Crafting digital experiences with code and creativity.",
    images: ["https://rithvikshetty.in/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://rithvikshetty.in",
  },
  generator: "v0.app",
  icons: {
    icon: "/blob.gif",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rithvik Shetty" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rithvik Shetty",
              url: "https://rithvikshetty.in",
              jobTitle: "Full Stack Developer",
              description: "Full stack developer and freelancer specializing in React, Next.js, and modern web technologies",
              sameAs: [
                "https://github.com/rithvikshettyy",
                "https://www.linkedin.com/in/rithvikshetty/",
                "https://in.pinterest.com/mayberithvik/"
              ],
              image: "https://rithvikshetty.in/og-image.jpg",
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased bg-black text-white min-h-screen flex flex-col overflow-x-hidden`}>
        <MouseFollower />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ModeToggle />
        <Analytics />
      </body>
    </html>
  )
}
