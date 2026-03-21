"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-20 px-6 flex flex-col">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80 flex-grow">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft size={16} /> Back Home
        </Link>
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] mb-12 text-white">
            PRIVACY <span className="text-neutral-600">POLICY</span>
          </h1>
          <div className="space-y-8 text-neutral-400 font-light text-lg leading-relaxed">
            <p>
              Last updated: March 2026
            </p>
            <p>
              Thank you for visiting my portfolio. Your privacy is critically important to me. This Privacy Policy outlines the types of personal information that is received and collected by this site and how it is used.
            </p>
            <h2 className="text-2xl text-white font-medium mt-12 mb-4 tracking-tight">Information Collection and Use</h2>
            <p>
              I only collect personal information that you voluntarily provide to me, for instance, when you use the contact form. This information is used solely for the purpose of communicating with you about potential projects or inquiries and will never be sold, rented, or shared with third parties without your explicit consent.
            </p>
            <h2 className="text-2xl text-white font-medium mt-12 mb-4 tracking-tight">Log Files and Analytics</h2>
            <p>
              Like many other websites, this portfolio may use log files or basic analytics to understand how visitors interact with the site, helping to improve user experience. This data includes internet protocol (IP) addresses, browser types, Internet Service Provider (ISP), date/time stamps, and referring/exit pages. None of this data is linked to anything personally identifiable.
            </p>
            <h2 className="text-2xl text-white font-medium mt-12 mb-4 tracking-tight">Contact</h2>
            <p>
              If you have any questions or concerns regarding this privacy policy, please feel free to reach out via the Contact page.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
