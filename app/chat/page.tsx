"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, ArrowLeft, ArrowUpRight, Trash2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { staticProjects } from "@/components/project-list"
import chatbotData from "@/data/chatbot.json"

interface BotAction {
  label: string
  type: "email" | "whatsapp" | "link"
  value?: string
  href?: string
}

interface BotLink {
  label: string
  href: string
}

interface IntentDef {
  id: string
  keywords: string[]
  text: string
  quickReplies?: string[]
  actions?: BotAction[]
  links?: BotLink[]
  projectList?: boolean
  serviceList?: boolean
  skillList?: string[]
}

interface Message {
  id: string
  role: "bot" | "user"
  text: string
  quickReplies?: string[]
  actions?: BotAction[]
  links?: BotLink[]
  projectList?: boolean
  serviceList?: boolean
  skillList?: string[]
}

const TOP_PROJECTS = staticProjects.slice(0, 5)
const SERVICES = chatbotData.services as Array<{ tier: string; desc: string }>
const SUGGESTIONS = ["Projects", "Experience", "Tech Stack", "Education", "Achievements", "Contact"]

function matchIntent(input: string): IntentDef | null {
  const normalized = input.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim()
  for (const intent of chatbotData.intents as IntentDef[]) {
    if (intent.keywords.some((kw) => normalized.includes(kw))) return intent
  }
  return null
}

function execAction(action: BotAction) {
  if (action.type === "email") window.location.href = `mailto:${action.value}`
  else if (action.type === "whatsapp")
    window.open(`https://wa.me/${action.value}`, "_blank", "noopener,noreferrer")
  else if (action.type === "link" && action.href)
    window.open(action.href, "_blank", "noopener,noreferrer")
}

function OrbBlob({ compact }: { compact: boolean }) {
  return (
    <motion.div
      animate={{ scale: compact ? 0.42 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 32 }}
      className="shrink-0"
      style={{
        transformOrigin: "top center",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        width={220}
        height={220}
        className="select-none pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      >
        <source src="/chat-blob.webm" type="video/webm" />
        <source src="/chat-blob.mp4" type="video/mp4" />
      </video>
    </motion.div>
  )
}

function TypingDots() {
  return (
    <div
      className="flex gap-1.5 items-center px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "18px 18px 18px 4px",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "rgba(147,197,253,0.65)" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.14 }}
        />
      ))}
    </div>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasMessages = messages.length > 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isTyping) return
      setMessages((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, role: "user", text: trimmed },
      ])
      setInput("")
      setIsTyping(true)
      const intent = matchIntent(trimmed)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            role: "bot",
            text: intent ? intent.text : chatbotData.fallback,
            quickReplies: intent?.quickReplies,
            actions: intent?.actions as BotAction[] | undefined,
            links: intent?.links as BotLink[] | undefined,
            projectList: intent?.projectList,
            serviceList: intent?.serviceList,
            skillList: intent?.skillList,
          },
        ])
      }, 550)
    },
    [isTyping]
  )

  return (
    <div className="fixed inset-0 bg-black flex flex-col overflow-hidden" style={{ fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif" }}>
      {/* Bottom blue wash — needs to be vivid so glass pill picks it up */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height: "65%",
          background:
            "radial-gradient(ellipse 90% 80% at 50% 110%, rgba(37,99,235,0.72) 0%, rgba(29,78,216,0.42) 35%, rgba(17,50,160,0.18) 58%, transparent 72%)",
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height: 220,
          background:
            "linear-gradient(to top, rgba(59,120,246,0.55) 0%, rgba(37,99,235,0.25) 50%, transparent 100%)",
        }}
      />

      {/* Nav bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-2 shrink-0">
        <Link href="/">
          <motion.div
            whileHover={{ x: -2 }}
            className="flex items-center gap-1.5 transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.65)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
            }
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </motion.div>
        </Link>
        <AnimatePresence>
          {hasMessages && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setMessages([])}
              className="flex items-center gap-1.5 transition-colors"
              style={{ color: "rgba(255,255,255,0.28)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.28)")
              }
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="text-xs">Clear</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Orb — animate actual height so messages area gets correct space */}
      <motion.div
        animate={{ height: hasMessages ? 100 : 270 }}
        transition={{ type: "spring", stiffness: 200, damping: 32 }}
        className="relative z-10 flex justify-center shrink-0 overflow-hidden"
        style={{ paddingTop: hasMessages ? 4 : 40 }}
      >
        <OrbBlob compact={hasMessages} />
      </motion.div>

      {/* Greeting — shown when no messages */}
      <AnimatePresence>
        {!hasMessages && (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18, transition: { duration: 0.22 } }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center px-6 flex flex-col items-center shrink-0 -mt-6"
          >
            <p
              className="text-[13px] mb-2.5 tracking-wide"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              Rithvik's Assistant
            </p>
            <h1 className="text-[32px] sm:text-4xl font-bold text-white leading-tight tracking-tight">
              How can I help
              <br />
              you today?
            </h1>
            {/* Quick-start suggestion chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {SUGGESTIONS.map((s) => (
                s === "Hire me" ? (
                  <Link
                    key={s}
                    href="/contact"
                    className="px-4 py-2 text-sm rounded-full transition-all duration-200"
                    style={{
                      background: "rgba(59,130,246,0.11)",
                      border: "1px solid rgba(96,165,250,0.22)",
                      color: "rgba(186,230,255,0.72)",
                    }}
                  >
                    {s}
                  </Link>
                ) : (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="px-4 py-2 text-sm rounded-full transition-all duration-200"
                  style={{
                    background: "rgba(59,130,246,0.11)",
                    border: "1px solid rgba(96,165,250,0.22)",
                    color: "rgba(186,230,255,0.72)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(59,130,246,0.22)"
                    e.currentTarget.style.borderColor = "rgba(96,165,250,0.38)"
                    e.currentTarget.style.color = "rgba(219,234,254,0.92)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(59,130,246,0.11)"
                    e.currentTarget.style.borderColor = "rgba(96,165,250,0.22)"
                    e.currentTarget.style.color = "rgba(186,230,255,0.72)"
                  }}
                >
                  {s}
                </button>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages area */}
      {hasMessages && (
        <div className="relative z-10 flex-1 min-h-0 w-full max-w-2xl mx-auto overflow-y-auto px-4 pt-2 pb-6 flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex flex-col gap-2",
                msg.role === "user" ? "items-end" : "items-start"
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="px-4 py-2.5 text-sm leading-relaxed max-w-[85%]"
                style={
                  msg.role === "user"
                    ? {
                        background: "rgba(59,130,246,0.26)",
                        border: "1px solid rgba(96,165,250,0.32)",
                        borderRadius: "18px 18px 4px 18px",
                        backdropFilter: "blur(12px)",
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: 500,
                      }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        borderRadius: "18px 18px 18px 4px",
                        color: "rgba(255,255,255,0.78)",
                      }
                }
              >
                {msg.text}
              </motion.div>

              {msg.projectList && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  className="flex flex-col gap-1.5 w-full max-w-[85%]"
                >
                  {TOP_PROJECTS.map((p) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.slug}`}
                      className="flex items-center justify-between px-3 py-2 rounded-xl transition-all group"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                      }}
                    >
                      <div>
                        <div
                          className="text-xs font-semibold"
                          style={{ color: "rgba(255,255,255,0.88)" }}
                        >
                          {p.title}
                        </div>
                        <div
                          className="text-[11px] mt-0.5"
                          style={{ color: "rgba(255,255,255,0.32)" }}
                        >
                          {p.category} · {p.year}
                        </div>
                      </div>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 shrink-0 transition-colors"
                        style={{ color: "rgba(255,255,255,0.18)" }}
                      />
                    </Link>
                  ))}
                  <Link
                    href="/projects"
                    className="text-xs pl-1 mt-0.5 transition-colors"
                    style={{ color: "rgba(96,165,250,0.5)" }}
                  >
                    View all →
                  </Link>
                </motion.div>
              )}

              {msg.serviceList && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  className="flex flex-col gap-1.5 w-full max-w-[85%]"
                >
                  {SERVICES.map((s) => (
                    <div
                      key={s.tier}
                      className="px-3 py-2 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                      }}
                    >
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "rgba(255,255,255,0.88)" }}
                      >
                        {s.tier}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.38)" }}
                      >
                        {" "}
                        — {s.desc}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}

              {msg.skillList && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  className="flex flex-wrap gap-1.5 max-w-[85%]"
                >
                  {msg.skillList.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-[11px]"
                      style={{
                        background: "rgba(59,130,246,0.14)",
                        border: "1px solid rgba(96,165,250,0.2)",
                        color: "rgba(186,230,255,0.72)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </motion.div>
              )}

              {msg.actions && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  className="flex flex-wrap gap-2"
                >
                  {msg.actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => execAction(action)}
                      className="px-4 py-1.5 text-xs rounded-full transition-all duration-200"
                      style={{
                        background: "rgba(59,130,246,0.16)",
                        border: "1px solid rgba(96,165,250,0.28)",
                        color: "rgba(186,230,255,0.82)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(59,130,246,0.28)"
                        e.currentTarget.style.color = "rgba(219,234,254,0.95)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(59,130,246,0.16)"
                        e.currentTarget.style.color = "rgba(186,230,255,0.82)"
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </motion.div>
              )}

              {msg.links && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="flex flex-wrap gap-3"
                >
                  {msg.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs transition-colors"
                      style={{ color: "rgba(96,165,250,0.52)" }}
                    >
                      {link.label} →
                    </Link>
                  ))}
                </motion.div>
              )}

              {msg.role === "bot" && msg.quickReplies && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-wrap gap-1.5"
                >
                  {msg.quickReplies.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      className="px-3 py-1 text-[11px] rounded-full transition-all duration-200"
                      style={{
                        border: "1px solid rgba(96,165,250,0.2)",
                        color: "rgba(147,197,253,0.58)",
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(96,165,250,0.38)"
                        e.currentTarget.style.color = "rgba(186,230,255,0.82)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(96,165,250,0.2)"
                        e.currentTarget.style.color = "rgba(147,197,253,0.58)"
                      }}
                    >
                      {qr}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}

          <AnimatePresence>
            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start"
              >
                <TypingDots />
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>
      )}

      {/* Spacer when no messages to push input to bottom */}
      {!hasMessages && <div className="flex-1" />}

      {/* Bottom input area */}
      <div className="relative z-10 px-4 pb-4 pt-2 shrink-0">
        {/* Suggestion chips when chatting */}
        <AnimatePresence>
          {hasMessages && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-center flex-wrap gap-1.5 mb-3"
            >
              {SUGGESTIONS.map((s) => (
                s === "Hire me" ? (
                  <Link
                    key={s}
                    href="/contact"
                    className="px-3 py-1 text-[11px] rounded-full transition-all duration-200"
                    style={{
                      background: "rgba(59,130,246,0.08)",
                      border: "1px solid rgba(96,165,250,0.18)",
                      color: "rgba(147,197,253,0.52)",
                    }}
                  >
                    {s}
                  </Link>
                ) : (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    disabled={isTyping}
                    className="px-3 py-1 text-[11px] rounded-full transition-all duration-200 disabled:opacity-25"
                    style={{
                      background: "rgba(59,130,246,0.08)",
                      border: "1px solid rgba(96,165,250,0.18)",
                      color: "rgba(147,197,253,0.52)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isTyping) {
                        e.currentTarget.style.background = "rgba(59,130,246,0.16)"
                        e.currentTarget.style.color = "rgba(186,230,255,0.78)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(59,130,246,0.08)"
                      e.currentTarget.style.color = "rgba(147,197,253,0.52)"
                    }}
                  >
                    {s}
                  </button>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pill input — liquid glass */}
        <div
          className="max-w-xl mx-auto flex items-center gap-3 px-5 py-4"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(40px) saturate(1.8)",
            WebkitBackdropFilter: "blur(40px) saturate(1.8)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 9999,
            boxShadow:
              "inset 0 1.5px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.12), 0 4px 24px rgba(0,0,0,0.15)",
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                sendMessage(input)
              }
            }}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-blue-100/40"
            style={{
              color: "rgba(255,255,255,0.88)",
              caretColor: "rgba(180,220,255,0.9)",
            }}
          />
          {/* Waveform / send icon */}
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="shrink-0 transition-opacity duration-200 disabled:opacity-40"
          >
            {input.trim() ? (
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              /* Waveform bars icon like reference */
              <svg
                width="28"
                height="20"
                viewBox="0 0 28 20"
                fill="none"
                className="opacity-70"
              >
                <rect x="0"  y="7"  width="3" height="6"  rx="1.5" fill="white" />
                <rect x="5"  y="3"  width="3" height="14" rx="1.5" fill="white" />
                <rect x="10" y="0"  width="3" height="20" rx="1.5" fill="white" />
                <rect x="15" y="3"  width="3" height="14" rx="1.5" fill="white" />
                <rect x="20" y="6"  width="3" height="8"  rx="1.5" fill="white" />
                <rect x="25" y="8"  width="3" height="4"  rx="1.5" fill="white" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
