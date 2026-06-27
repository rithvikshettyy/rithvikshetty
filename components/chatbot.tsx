"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, ArrowUpRight, Trash2 } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "@/components/ui/button"
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
const SUGGESTIONS = ["Projects", "Services", "Hire me", "Contact"]

function matchIntent(input: string): IntentDef | null {
  const normalized = input.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim()
  for (const intent of chatbotData.intents as IntentDef[]) {
    if (intent.keywords.some((kw) => normalized.includes(kw))) return intent
  }
  return null
}

function execAction(action: BotAction) {
  if (action.type === "email") window.location.href = `mailto:${action.value}`
  else if (action.type === "whatsapp") window.open(`https://wa.me/${action.value}`, "_blank", "noopener,noreferrer")
  else if (action.type === "link" && action.href) window.open(action.href, "_blank", "noopener,noreferrer")
}

function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-3 py-2.5 bg-white/5 border-2 border-white/10 rounded-2xl rounded-tl-none w-fit">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-white/40 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "bot",
      text: chatbotData.greeting,
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 350)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener("open-chat", handler)
    return () => window.removeEventListener("open-chat", handler)
  }, [])

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: trimmed }])
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
    }, 500)
  }, [isTyping])

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[680px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[calc(100vh-4rem)] p-0 gap-0 flex flex-col rounded-2xl border-2 border-white/10 overflow-hidden"
        >
          <VisuallyHidden><DialogTitle>Chat with Rithvik</DialogTitle></VisuallyHidden>
          <div className="flex items-center justify-between border-b-2 border-white/10 py-3 px-4 shrink-0">
            <div>
              <p className="text-sm font-semibold leading-none text-white">Chat with me</p>
              <p className="text-xs text-white/40 mt-1">Ask about projects, services, or pricing</p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setMessages([{ id: "init", role: "bot", text: chatbotData.greeting }])}
                title="Clear chat"
                className="h-8 w-8 shrink-0 text-white/30 hover:text-white/70 hover:bg-white/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="h-8 w-8 shrink-0 text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex flex-col gap-2", msg.role === "user" ? "items-end" : "items-start")}
              >
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "px-3 py-2 text-sm leading-relaxed max-w-[85%]",
                    msg.role === "user"
                      ? "bg-white text-black rounded-2xl rounded-tr-none font-medium"
                      : "bg-white/5 border-2 border-white/10 text-white/85 rounded-2xl rounded-tl-none"
                  )}
                >
                  {msg.text}
                </motion.div>

                {msg.projectList && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex flex-col gap-1.5 w-full"
                  >
                    {TOP_PROJECTS.map((p) => (
                      <Link
                        key={p.id}
                        href={`/projects/${p.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 border-2 border-white/10 rounded-xl transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white/90 tracking-wide">{p.title}</div>
                          <div className="text-[11px] text-white/40 mt-0.5">{p.category} · {p.year}</div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/25 group-hover:text-white/60 transition-colors shrink-0" />
                      </Link>
                    ))}
                    <Link
                      href="/projects"
                      onClick={() => setOpen(false)}
                      className="text-xs text-white/35 hover:text-white/65 transition-colors mt-0.5 pl-1"
                    >
                      View all projects →
                    </Link>
                  </motion.div>
                )}

                {msg.serviceList && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex flex-col gap-1.5 w-full"
                  >
                    {SERVICES.map((s) => (
                      <div key={s.tier} className="px-3 py-2 bg-white/5 border-2 border-white/10 rounded-xl">
                        <span className="text-xs font-semibold text-white/90">{s.tier}</span>
                        <span className="text-xs text-white/40"> — {s.desc}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {msg.skillList && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex flex-wrap gap-1.5"
                  >
                    {msg.skillList.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-white/5 border-2 border-white/10 rounded-lg text-[11px] text-white/55">
                        {skill}
                      </span>
                    ))}
                  </motion.div>
                )}

                {msg.actions && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex flex-wrap gap-2"
                  >
                    {msg.actions.map((action) => (
                      <Button
                        key={action.label}
                        size="sm"
                        variant="outline"
                        onClick={() => execAction(action)}
                        className="text-xs h-7 border-2 border-white/20 hover:bg-white/10 text-white/75"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </motion.div>
                )}

                {msg.links && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="flex flex-wrap gap-2"
                  >
                    {msg.links.map((link) => (
                      <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                        <Button size="sm" variant="ghost" className="text-xs h-7 text-white/45 hover:text-white/80 hover:bg-white/5 px-2">
                          {link.label} →
                        </Button>
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
                        className="px-3 py-1 text-[11px] border-2 border-white/15 rounded-full text-white/50 hover:border-white/40 hover:text-white/80 transition-colors"
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
                  initial={{ opacity: 0, y: 8 }}
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

          <div className="border-t-2 border-white/10 px-3 pt-2.5 pb-0 shrink-0 flex gap-1.5 flex-wrap">
            {SUGGESTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => sendMessage(opt)}
                disabled={isTyping}
                className="px-2.5 py-1 text-[11px] border-2 border-white/15 rounded-full text-white/45 hover:border-white/35 hover:text-white/75 transition-colors disabled:opacity-30"
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="px-3 pb-3 pt-2 shrink-0">
            <div className="flex gap-2 items-center">
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
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border-2 border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/25 transition-colors"
              />
              <Button
                size="icon"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="h-9 w-9 shrink-0 bg-white text-black hover:bg-white/90 disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
