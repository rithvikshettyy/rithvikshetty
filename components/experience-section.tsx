'use client'

import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import CardSwap, { Card } from './card-swap'

const workExperiences = [
  {
    title: 'Salesforce & Marketing Automation Intern',
    company: 'Lupin Ltd',
    period: 'Dec 2025 - Feb 2026',
    description: 'Streamlining business processes and enhancing outreach strategies using Salesforce CRM and advanced marketing automation tools.',
    skills: ['Salesforce', 'Marketing Automation', 'Analytics', 'Technical Strategy'],
    type: 'Internship',
    certificateUrl: 'experience/lupin.pdf',
  },
  {
    title: 'Machine Learning Intern',
    company: 'ION Chemicals',
    period: 'Jan 2025 - Apr 2025',
    description: 'Developing and optimizing machine learning models for chemical analysis and process automation, improving prediction accuracy across datasets.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Scikit-learn'],
    type: 'Internship',
    certificateUrl: 'experience/Ionchemicals.pdf',
  },
  {
    title: 'Graphic Designer',
    company: "BM's Drishtency",
    period: 'Feb 2024 - Mar 2024',
    description: 'Designed high-impact graphics and visual content for digital marketing campaigns and brand identity materials.',
    skills: ['Graphic Design', 'Figma', 'Visual Design', 'Branding'],
    type: 'Internship',
    certificateUrl: '#',
  },
  {
    title: 'Graphic Designer',
    company: 'AASK RETAIL LLP',
    period: 'Jan 2024 - Feb 2024',
    description: 'Specialized in apparel design by creating custom T-shirt graphics and high-fidelity mockups for new retail collections.',
    skills: ['Graphic Design', 'Figma', 'Apparel Design', 'Mockup Design'],
    type: 'Internship',
    certificateUrl: 'experience/irsya.pdf',
  },
]

const collegePositions = [
  {
    title: 'Technical Secretary',
    company: 'Technical Team',
    period: '2025 - 2026',
    description: 'Leading technical initiatives and managing large-scale projects while ensuring high standards of execution and innovation for the college community.',
    skills: ['Leadership', 'Project Management', 'Technical Strategy'],
    type: 'Leadership',
  },
  {
    title: 'Design Lead',
    company: 'TEDx SIESGST',
    period: '2025 - 2026',
    description: 'Leading design direction and creative vision for TEDx events and initiatives, creating compelling and cohesive visual experiences.',
    skills: ['Design', 'Figma', 'Creative Direction', 'UI/UX'],
    type: 'Leadership',
  },
  {
    title: 'Social Media Lead',
    company: 'Ecell SIESGST',
    period: 'Aug 2025 - Dec 2025',
    description: 'Coordinating social media strategies and digital presence to promote entrepreneurship and innovation-focused events.',
    skills: ['Leadership', 'Strategy', 'Growth', 'Marketing'],
    type: 'Leadership',
  },
]

// All roles in one stack — internships first, then leadership.
const allExperiences = [...workExperiences, ...collegePositions]

// The "Journey" experience block — a 3D card stack pinned to the viewport:
// each scroll step flips the front card under the pile; once every role has
// flipped, the page releases and scrolls on to the next section.
// Used standalone on /experience and embedded on the homepage.
export default function ExperienceSection() {
  const pinRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const steps = allExperiences.length

  // Scroll progress across the tall wrapper → discrete flip steps.
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const s = Math.min(steps - 1, Math.max(0, Math.floor(v * steps)))
    if (s !== step) setStep(s)
  })

  return (
    <div ref={pinRef} className="relative bg-black" style={{ height: `${steps * 55 + 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden text-white flex items-center">
      {/* Crimson ambient glow — echoes the homepage red */}
      <div className="absolute top-0 left-0 w-[560px] h-[420px] bg-[#a81f14]/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-56 2xl:px-72">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — heading + blurb */}
          <div>
            <span className="text-sm uppercase tracking-widest text-neutral-500">( The Journey )</span>
            <h2 className="mt-4 text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
              Experience<span className="text-accent">.</span>
            </h2>
            <p className="mt-6 max-w-md text-neutral-400 text-base md:text-lg font-light leading-relaxed">
              Internships and leadership roles, one card at a time. Keep scrolling to flip through the stack.
            </p>
            <span className="mt-8 inline-block font-mono text-xs text-neutral-500 tabular-nums">
              {String(step + 1).padStart(2, '0')} / {String(steps).padStart(2, '0')}
            </span>
          </div>

          {/* Right — the card stack anchors itself bottom-right of this box */}
          <div className="relative h-[420px] md:h-[500px]">
            <CardSwap
              width={460}
              height={340}
              cardDistance={45}
              verticalDistance={56}
              skewAmount={5}
              easing="elastic"
              autoplay={false}
              step={step}
            >
              {allExperiences.map((exp) => (
                <Card key={`${exp.title}-${exp.company}`} className="p-6 flex flex-col">
                  {/* Meta row */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-neutral-300">
                      {exp.type}
                    </span>
                    <span className="font-mono text-xs text-neutral-500">{exp.period}</span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold tracking-tighter leading-[1.05]">{exp.title}</h3>
                  <p className="mt-1.5 text-sm text-neutral-500">{exp.company}</p>

                  <p className="mt-4 text-sm text-neutral-400 leading-relaxed text-pretty">{exp.description}</p>

                  {/* Skill chips pinned to the card bottom */}
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-neutral-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
