"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Send, Check, Loader2 } from "lucide-react"

// The "Let's work together" contact block — the form + contact details.
// Used standalone on /contact (compact: everything fits one viewport, no
// scroll) and embedded on the homepage (default: full-size).
export default function ContactSection({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const formData = new FormData(form)
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
        // Small delay, then confirm and reset.
        setTimeout(() => {
          setStatus("sent")
          setTimeout(() => {
            setStatus("idle")
            form.reset()
          }, 3000)
        }, 3000)
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
    <div className="relative overflow-hidden text-white">
      {/* Crimson ambient glow */}
      <div className="absolute top-1/4 left-0 w-[560px] h-[560px] bg-[#a81f14]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 items-start ${compact ? 'gap-8 lg:gap-16' : 'gap-12 lg:gap-20'}`}>
          <div className="relative group">
            <div className={`relative ${compact ? 'mb-5' : 'mb-8'}`}>
              <h2 className={`font-black tracking-tighter leading-[0.85] relative z-20 ${compact ? 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl' : 'text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl'}`}>
                LET'S <br /> WORK <br /> TOGETHER
              </h2>

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute pointer-events-none z-0 overflow-visible ${compact ? 'top-[-40px] -right-12 md:top-auto md:bottom-[-420px] md:-left-[380px] w-56 h-56 md:w-[600px] md:h-[600px]' : 'top-[-40px] -right-12 md:top-auto md:bottom-[-540px] md:-left-[580px] w-56 h-56 md:w-[900px] md:h-[900px]'}`}
              >
                <Image src="/robot3d.png" alt="Robot 3D Companion" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" className="object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.05)] opacity-60 md:opacity-50" />
              </motion.div>
            </div>

            <p className={`text-neutral-400 max-w-md font-light tracking-wide leading-relaxed ${compact ? 'text-base mb-6' : 'text-xl mb-12'}`}>
              We are currently accepting new projects. Tell us about your vision and we'll tell you how we can bring it
              to life.
            </p>

            <div className={compact ? 'space-y-5' : 'space-y-10'}>
              <div>
                <h3 className={`text-xs uppercase tracking-widest text-neutral-600 ${compact ? 'mb-1.5' : 'mb-3'}`}>Email Me</h3>
                <a href="mailto:rithvikshetty2004@gmail.com" className={`hover:text-neutral-400 transition-colors ${compact ? 'text-lg' : 'text-2xl'}`}>
                  rithvikshetty2004@gmail.com
                </a>
              </div>

              <div>
                <h3 className={`text-xs uppercase tracking-widest text-neutral-600 ${compact ? 'mb-1.5' : 'mb-3'}`}>Visit Me</h3>
                <p className={compact ? 'text-base' : 'text-xl'}>
                  Thane{compact ? ', ' : <br />}
                  Maharashtra, India
                </p>
              </div>

              <div>
                <h3 className={`text-xs uppercase tracking-widest text-neutral-600 ${compact ? 'mb-1.5' : 'mb-3'}`}>Socials</h3>
                <div className={`flex flex-wrap text-white ${compact ? 'gap-4 text-base' : 'gap-6 text-lg'}`}>
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

          <div className={`bg-neutral-900/20 border border-white/10 backdrop-blur-sm w-full max-w-xl lg:ml-auto ${compact ? 'p-6 md:p-8' : 'p-8 md:p-12'}`}>
            <form onSubmit={handleSubmit} className={compact ? 'space-y-4' : 'space-y-8'}>
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
                  className={`w-full bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-500 ${compact ? 'py-2 text-base' : 'py-4 text-xl'}`}
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
                  className={`w-full bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-500 ${compact ? 'py-2 text-base' : 'py-4 text-xl'}`}
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
                  className={`w-full bg-transparent border-b border-white/20 focus:outline-none focus:border-white transition-colors text-white appearance-none cursor-pointer ${compact ? 'py-2 text-base' : 'py-4 text-xl'}`}
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
                  rows={compact ? 2 : 4}
                  className={`w-full bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-500 resize-none ${compact ? 'py-2 text-base' : 'py-4 text-xl'}`}
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className={`w-full font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 group ${compact ? 'py-3 text-base mt-2' : 'py-5 text-lg mt-4'} ${
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
