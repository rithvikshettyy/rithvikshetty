import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
// import Header from "@/components/header"
import Footer from "@/components/footer"
import Preloader from "@/components/preloader"
import SmoothScroll from "@/components/smooth-scroll"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const coolvetica = localFont({
  src: "./fonts/coolvetica-rg.otf",
  variable: "--font-coolvetica",
  display: "swap",
})

const apparelDisplay = localFont({
  // Regular Italic — the Black Italic cut read too heavy at display sizes.
  src: "./fonts/appareldisplay-regularit.otf",
  variable: "--font-apparel",
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
  metadataBase: new URL("https://rithvikshetty.in"),
  title: "Rithvik Shetty, Full Stack Developer",
  description: "Rithvik Shetty, Full Stack Developer, computer science student in Thane, specialized in modern web development, machine learning and interactive design.",
  keywords: [
    "Rithvik Shetty",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Development",
    "Creative Technologist",
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
    siteName: "Rithvik Shetty",
    title: "Rithvik Shetty, Full Stack Developer",
    description: "Rithvik Shetty, Full Stack Developer, computer science student in Thane, specialized in modern web development, machine learning and interactive design.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rithvik Shetty - Full Stack Developer - Freelancer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rithvik Shetty, Full Stack Developer",
    description: "Rithvik Shetty, Full Stack Developer, computer science student in Thane, specialized in modern web development, machine learning and interactive design.",
    images: ["/og-image.png"],
    creator: "@RithvikShetty04", // Recommended to match your social handle
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
    google: "jHG7Fl5URrypSSrxEe-PirtreNUxDNNSVvSafgwSVVo",
  },
  alternates: {
    canonical: "https://rithvikshetty.in",
  },
  generator: "Next.js",
  icons: {
    icon: "/favicon-icon.png",
    apple: "/favicon-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // No scroll-smooth class here — Lenis owns scrolling; CSS smooth-scroll would fight it.
    <html lang="en" className={`dark ${playfair.variable} ${coolvetica.variable} ${apparelDisplay.variable}`} suppressHydrationWarning>
      <head>
        {/* Dark mode only — no theme toggle. Clear any stale saved choice so a
            previous 'light' session can't re-apply. Also force reloads to start
            at the top instead of restoring the previous scroll position.
            Reloading any subpage redirects to the homepage (runs pre-paint, no flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var nav=performance.getEntriesByType('navigation')[0];if(nav&&nav.type==='reload'&&location.pathname!=='/'){location.replace('/');return;}localStorage.removeItem('theme-mode');var el=document.documentElement;el.classList.remove('light','contrast');el.classList.add('dark');if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);}catch(e){}})();`,
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rithvik Shetty" />
        <meta name="msvalidate.01" content="DC7ED36D639D0F0C364F09274887F754" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rithvik Shetty",
              url: "https://rithvikshetty.in",
              jobTitle: "Full Stack Developer",
              description: "Rithvik Shetty, Full Stack Developer, computer science student in Thane, specialized in modern web development, machine learning and interactive design.",
              sameAs: [
                "https://github.com/rithvikshettyy",
                "https://www.linkedin.com/in/rithvikshetty/",
                "https://in.pinterest.com/mayberithvik/"
              ],
              image: "https://rithvikshetty.in/og-image.png",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Rithvik Shetty",
              url: "https://rithvikshetty.in",
              description: "Rithvik Shetty, Full Stack Developer, computer science student in Thane, specialized in modern web development, machine learning and interactive design.",
              author: {
                "@type": "Person",
                name: "Rithvik Shetty",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased bg-black text-white min-h-screen flex flex-col overflow-x-hidden`}>
        <SmoothScroll />
        <Preloader />
        {/* Navbar disabled site-wide — all sections live on the homepage. */}
        {/* <Header /> */}
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
