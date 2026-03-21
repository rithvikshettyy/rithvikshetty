"use client"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80 flex-grow">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft size={16} /> Back Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              LET'S <br /> WORK <br /> TOGETHER
            </h1>
            <p className="text-xl text-neutral-400 mb-12 max-w-md font-light">
              We are currently accepting new projects. Tell us about your vision and we'll tell you how we can bring it
              to life.
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-neutral-600 mb-3">Email Me</h3>
                <a href="mailto:rithvikshetty2004@gmail.com" className="text-2xl hover:text-neutral-400 transition-colors">
                  rithvikshetty2004@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-neutral-600 mb-3">Visit Me</h3>
                <p className="text-xl">
                  Thane
                  <br />
                  Maharashtra, India
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-neutral-600 mb-3">Socials</h3>
                <div className="flex gap-6 text-lg">
                  <a href="https://instagram.com/rithv1k7" className="hover:text-neutral-400 transition-colors">
                    Instagram
                  </a>
                  <a href="https://x.com/RithvikShetty04" className="hover:text-neutral-400 transition-colors">
                    Twitter
                  </a>
                  <a href="https://www.linkedin.com/in/rithvikshetty/" className="hover:text-neutral-400 transition-colors">
                    LinkedIn
                  </a>
                  <a href="https://github.com/rithvikshettyy" className="hover:text-neutral-400 transition-colors">
                    GitHub
                  </a>
                  <a href="https://in.pinterest.com/mayberithvik/" className="hover:text-neutral-400 transition-colors">
                    Pinterest
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/20 p-8 md:p-12 border border-white/10 backdrop-blur-sm">
            <form action="https://formsubmit.co/rithvikshetty2004@gmail.com" method="POST" className="space-y-8">
              {/* FormSubmit Configuration Settings */}
              <input type="hidden" name="_subject" value="New Contact Request from Portfolio!" />
              <input type="hidden" name="_template" value="table" />

              <div className="space-y-2 group">
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-500"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2 group">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-500"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2 group">
                <label
                  htmlFor="budget"
                  className="text-xs uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors"
                >
                  Project Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-white transition-colors text-white appearance-none cursor-pointer"
                >
                  <option className="bg-black" value="">Select Range</option>
                  <option className="bg-black" value="Basic">Basic</option>
                  <option className="bg-black" value="Standard">Standard</option>
                  <option className="bg-black" value="Premium">Premium</option>
                  <option className="bg-black" value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div className="space-y-2 group">
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-500 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-5 text-lg font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3 group mt-4"
              >
                Send Request <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
