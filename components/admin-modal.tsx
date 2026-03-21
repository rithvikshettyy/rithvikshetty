"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { authenticateAdmin } from "@/app/actions/stats"
import { X, Lock, Eye, EyeOff, Activity, Users, Clock, Globe } from "lucide-react"

export default function AdminModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [id, setId] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev: any) => {
        if (!prev) return prev
        
        // Randomly fluctuate active users (-2 to +3)
        const fluctuation = Math.floor(Math.random() * 6) - 2 
        const currentActive = Math.max(1, Math.min(35, prev.activeNow + fluctuation))
        
        // Occasional live pageviews happening in real-time
        const isNewView = Math.random() > 0.4
        const newPageViews = prev.pageViews + (isNewView ? 1 : 0)
        const newUnique = prev.uniqueVisitors + (isNewView && Math.random() > 0.8 ? 1 : 0)

        // Micro-fluctuate horizontal graphs directly
        const newTopCountries = prev.topCountries.map((c: any) => {
          if (c.percentage === 0) return c
          const drift = (Math.random() * 0.6 - 0.3)
          return {
            ...c,
            percentage: Math.max(0, Math.min(100, Math.round((c.percentage + drift) * 10) / 10))
          }
        })

        return {
          ...prev,
          activeNow: currentActive,
          pageViews: newPageViews,
          uniqueVisitors: newUnique,
          topCountries: newTopCountries
        }
      })
    }, 2800)

    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await authenticateAdmin(id, pass)
      if (result.success && result.stats) {
        setStats(result.stats)
      } else {
        setError(result.message || "Authentication failed")
      }
    } catch (err) {
      setError("Server error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setId("")
    setPass("")
    setError("")
    setStats(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl z-10 overflow-hidden"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors p-2"
            >
              <X size={20} />
            </button>

            {!stats ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                    <Lock className="text-neutral-400" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">Restricted Area</h3>
                  <p className="text-neutral-500 text-sm mt-2">Enter admin credentials to view live analytics.</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-neutral-400">Admin ID</label>
                    <input 
                      type="text" 
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Enter ID"
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-xs uppercase tracking-widest text-neutral-400">Security Key</label>
                    <div className="relative">
                      <input 
                        type={showPass ? "text" : "password"} 
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors pr-12"
                        placeholder="Enter password"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-2 bg-white text-black font-bold uppercase tracking-widest text-sm py-4 rounded-lg hover:scale-[1.02] transition-transform flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  {loading ? "Authenticating..." : "Access Analytics"}
                </button>
              </form>
            ) : (
              <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                  <Activity className="text-green-400" size={24} />
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white">Live Operations</h3>
                    <p className="text-green-400/80 text-xs uppercase tracking-widest mt-1">Systems online & tracking</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
                    <span className="text-neutral-500 text-xs uppercase tracking-widest flex items-center gap-2"><Globe size={14} /> Active Now</span>
                    <span className="text-4xl font-bold text-white tabular-nums">{stats.activeNow}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
                    <span className="text-neutral-500 text-xs uppercase tracking-widest flex items-center gap-2"><Clock size={14} /> Avg Session</span>
                    <span className="text-2xl font-bold text-white mt-1">{stats.avgSessionDuration}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-neutral-400">Total Pageviews</span>
                    <span className="text-white font-mono">{stats.pageViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-neutral-400">Unique Visitors</span>
                    <span className="text-white font-mono">{stats.uniqueVisitors.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-neutral-400">Bounce Rate</span>
                    <span className="text-white font-mono">{stats.bounceRate}</span>
                  </div>
                </div>

                <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Top Regions</h4>
                <div className="flex flex-col gap-3">
                  {stats.topCountries.map((c: any, i: number) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-neutral-400 text-sm w-24 truncate">{c.name}</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${c.percentage}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-white rounded-full"
                        />
                      </div>
                      <span className="text-white font-mono text-xs w-8 text-right">{c.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
