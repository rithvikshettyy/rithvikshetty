"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface LanyardResponse {
  data: {
    spotify: {
      track_id: string
      song: string
      artist: string
      album_art_url: string
      timestamps: {
        start: number
        end: number
      }
    } | null
    listening_to_spotify: boolean
  }
}

export default function SpotifyStatus() {
  const [data, setData] = useState<LanyardResponse["data"] | null>(null)
  const DISCORD_ID = "992018993730814002"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
        const json = await res.json() as LanyardResponse
        if (json.data) setData(json.data)
      } catch (err) {
        console.error("Failed to fetch Spotify status:", err)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [DISCORD_ID])

  const isPlaying = data?.listening_to_spotify && data?.spotify
  const song = data?.spotify

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 mb-4 max-w-full overflow-hidden whitespace-nowrap"
    >
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 text-[#1DB954] fill-current z-10 relative drop-shadow-[0_0_8px_rgba(29,185,84,0.3)] dark:drop-shadow-[0_0_8px_rgba(29,185,84,0.5)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM17.4813 17.2917C17.2713 17.6367 16.8213 17.7474 16.4813 17.5374C13.6593 15.8143 10.1558 15.4284 5.95292 16.3888C5.55992 16.4788 5.17462 16.2289 5.08462 15.8359C4.99462 15.4429 5.24452 15.0576 5.63752 14.9676C10.218 13.9189 14.0792 14.3643 17.2363 16.2917C17.5763 16.5017 17.687 16.9517 17.4813 17.2917ZM18.9481 14.0253C18.6631 14.4925 18.0531 14.6402 17.5859 14.3552C14.3752 12.383 9.48512 11.8087 5.68832 12.9619C5.16832 13.1197 4.61832 12.825 4.46042 12.305C4.30252 11.785 4.59722 11.235 5.11722 11.0771C9.44472 9.7634 14.8385 10.407 18.5229 12.6724C18.9901 12.9574 19.1378 13.5674 18.9481 14.0253ZM19.0833 10.6698C15.2285 8.3794 8.84752 8.1678 5.14372 9.2921C4.55122 9.4721 3.92622 9.1321 3.74622 8.5396C3.56622 7.9471 3.90622 7.3221 4.49872 7.1421C8.75112 5.8521 15.8113 6.0921 20.2514 8.7321C20.7839 9.0471 20.9589 9.7296 20.6439 10.2621C20.3289 10.7946 19.6464 10.9696 19.0833 10.6698Z" />
        </svg>
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[#1DB954]/40 blur-sm"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 text-sm md:text-base font-medium tracking-tight overflow-hidden">
        <span className="text-neutral-500 dark:text-neutral-400 font-normal shrink-0">
          {isPlaying ? "Now listening :" : "Last played :"}
        </span>
        <div className="flex items-center gap-1 overflow-hidden truncate">
          {isPlaying ? (
            <a 
              href={`https://open.spotify.com/track/${song?.track_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-all flex items-center gap-1 min-w-0"
            >
              <span className="text-neutral-900 dark:text-neutral-100 font-semibold truncate shrink">{song?.song}</span>
              <span className="text-neutral-400 dark:text-neutral-600 shrink-0">·</span>
              <span className="text-neutral-600 dark:text-neutral-500 truncate shrink">{song?.artist}</span>
            </a>
          ) : (
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-neutral-900 dark:text-neutral-200 font-semibold truncate shrink">Ucha Lamba Kad</span>
              <span className="text-neutral-400 dark:text-neutral-600 shrink-0">·</span>
              <span className="text-neutral-600 dark:text-neutral-500 truncate shrink">Anand Raj Anand, Kalpana Patowary</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
