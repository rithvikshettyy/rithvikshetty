import TeamGrid from "@/components/team-grid"

export default function TeamPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-24 border-b border-white/20 pb-8">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 uppercase">
            The <span className="text-neutral-500">Squad</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end">
            <p className="text-xl md:text-2xl max-w-2xl font-light leading-relaxed text-neutral-400">
              A collective of digital architects, code poets, and pixel perfectionists. We don't just write code; we
              sculpt the internet.
            </p>
            <div className="text-sm font-mono uppercase tracking-widest animate-pulse">/// Scroll for roster</div>
          </div>
        </div>

        <TeamGrid />
      </div>
    </div>
  )
}
