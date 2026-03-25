"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Send, Check, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("https://formsubmit.co/ajax/rithvikshetty2004@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // User requested a delay of 4-5 seconds
        setTimeout(() => {
          setStatus("sent")
          // Optional: Reset form or status after some time
        }, 4000)
      } else {
        setStatus("idle")
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error(error)
      setStatus("idle")
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col relative overflow-hidden text-white">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex-grow relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft size={16} /> Back Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="relative group">
            <div className="relative mb-8">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] relative z-20">
                LET'S <br /> WORK <br /> TOGETHER
              </h1>

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-40px] -right-12 md:top-auto md:bottom-[-540px] md:-left-[580px] w-56 h-56 md:w-[900px] md:h-[900px] pointer-events-none z-0 overflow-visible"
              >
                <Image src="/robot3d.png" alt="Robot 3D Companion" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" className="object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.05)] opacity-60 md:opacity-50" />
              </motion.div>
            </div>

            <p className="text-xl text-neutral-400 mb-12 max-w-md font-light tracking-wide leading-relaxed">
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
                <div className="flex gap-6 text-lg text-white">
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

          <div className="bg-neutral-900/20 p-8 md:p-12 border border-white/10 backdrop-blur-sm w-full max-w-xl lg:ml-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
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
                disabled={status !== "idle"}
                className={`w-full py-5 text-lg font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 group mt-4 ${
                  status === "sent" 
                    ? "bg-green-500 text-white" 
                    : "bg-white text-black hover:bg-neutral-200"
                } disabled:cursor-not-allowed`}
              >
                {status === "idle" && (
                  <>
                    Send Request <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                {status === "sending" && (
                  <>
                    Sending... <Loader2 size={18} className="animate-spin" />
                  </>
                )}
                {status === "sent" && (
                  <>
                    Request Sent <Check size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
