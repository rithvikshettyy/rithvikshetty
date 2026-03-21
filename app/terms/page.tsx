"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
            TERMS <span className="text-neutral-600">OF SERVICE</span>
          </h1>
          <div className="space-y-8 text-neutral-400 font-light text-lg leading-relaxed">
            <p>
              Last updated: March 2026
            </p>
            <p>
              Welcome to my portfolio! By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the website.
            </p>
            <h2 className="text-2xl text-white font-medium mt-12 mb-4 tracking-tight">Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to project designs, source code snippets, text, graphics, and logos, is my intellectual property unless otherwise stated. Unauthorised use, reproduction, or distribution of this content is strictly prohibited. Open-source projects linked from this site are subject to their respective licenses (e.g., MIT, GPL), which you can find in their repositories.
            </p>
            <h2 className="text-2xl text-white font-medium mt-12 mb-4 tracking-tight">Use of the Website</h2>
            <p>
              This website is provided for informational and professional networking purposes. You agree to use this site responsibly and respectfully, without engaging in any malicious activities such as spamming the contact forms or attempting to compromise the site's security.
            </p>
            <h2 className="text-2xl text-white font-medium mt-12 mb-4 tracking-tight">Modifications</h2>
            <p>
              I reserve the right to modify or replace these terms at any time. Any changes will be posted on this page. By continuing to access the site after those revisions become effective, you agree to the updated terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
