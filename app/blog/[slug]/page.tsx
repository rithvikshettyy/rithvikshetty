"use client"

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag, Share2, Facebook, Twitter, Linkedin, ThumbsUp, ThumbsDown } from 'lucide-react'

// Mock data with dynamically populated content sections
const blogPosts = [
  {
    id: 1,
    title: 'Bytecamp\'26: Navi Mumbai\'s Biggest Hackathon',
    description: 'What it really takes to organize a national-level hackathon: months of chaos, controlled execution, and the end of a chapter.',
    date: 'March 14, 2026',
    readTime: '5 min read',
    category: 'Hackathon',
    tags: ['Leadership', 'Team-Building', 'Problem-Solving'],
    slug: 'bytecamp-26',
    thumbnail: '/byte1.jpeg',
    content: (
      <>
        <p className="text-2xl md:text-3xl text-neutral-100 mb-10 font-normal leading-relaxed">
          ByteCamp'26 wasn't just another college event. It was the closing chapter of my tenure as Secretary of the Technical Team at SIES Graduate School of Technology — and easily the biggest responsibility I carried during that time.
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">More Than Just Numbers</h2>
        <p className="mb-8">
          On paper, ByteCamp'26 was a national-level hackathon with over 2,400 registrations, filtered down to 400+ teams, and finally 40 shortlisted teams. Those numbers sound impressive — and they are — but they only tell a small part of the story.
        </p>
        <p className="mb-10">
          What they don't show is the 5–6 months leading up to it: constant sponsor outreach, permission approvals, vendor coordination, and an endless stream of participant queries that never really stopped. The event didn't begin on hackathon day. It began months earlier, in uncertainty, follow-ups, and decisions that had to be made without knowing how things would turn out.
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">The Shortlisting Crucible</h2>
        <p className="mb-8">
          One of the most intense phases was shortlisting teams. We went through hundreds of applications in just 2–3 days with barely any sleep, knowing that every decision mattered — because we were choosing who gets a shot at building, and who doesn't.
        </p>
        <p className="mb-10">
          That weight is hard to describe. You're not just reviewing submissions; you're making calls that affect real people's plans. It sharpens your judgment fast, but it's also exhausting in a way that caffeine can't really fix.
        </p>

        <div className="my-14 p-8 md:p-10 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-white opacity-80" />
          <p className="text-2xl md:text-3xl italic font-light text-neutral-200 m-0 leading-relaxed">
            "No amount of planning eliminates chaos — it only prepares you to handle it better."
          </p>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">Controlled Chaos on the Day</h2>
        <p className="mb-8">
          From the outside, everything may have looked smooth. Internally, it was anything but. WiFi issues, teams traveling from Pune, Ratnagiri, Tirupati, and Kolkata all arriving at different times, food delays, and a constant stream of problems that needed to be handled before they became visible to anyone else.
        </p>
        <p className="mb-10">
          That's what execution really looks like at this scale. It's not about things going perfectly — it's about making sure nothing fails visibly. The job is to absorb the chaos so participants never have to feel it.
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">What Made It Different</h2>
        <p className="mb-10">
          Managing participants from different cities, backgrounds, and expectations changes how you think about an event. You can't plan for everything. You adapt in real time, make decisions when you're running on empty, and keep moving because stopping isn't an option.
        </p>

        <ul className="list-disc pl-8 space-y-4 mb-10 marker:text-neutral-500 text-neutral-200">
          <li><strong>Scale of outreach:</strong> 2,400+ registrations from across the country, handled by a small student team.</li>
          <li><strong>Logistics complexity:</strong> Coordinating teams from multiple states, each with different travel constraints and arrival windows.</li>
          <li><strong>Real-time problem solving:</strong> From infrastructure hiccups to scheduling shifts — handled on the fly, every time.</li>
          <li><strong>Emotional weight:</strong> Shortlisting 40 teams from 400+ — a decision that affected real people, made under real time pressure.</li>
        </ul>

        <p className="mb-10">
          Despite everything, ByteCamp'26 came together and ended smoothly — almost unexpectedly so. In fact, it felt like it ended too soon. After months of it being the center of everything, it was suddenly over.
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">The End of a Chapter</h2>
        <p className="mb-8">
          ByteCamp'26 was the final and biggest flagship event of our technical team for the term. For me personally, it marked the end of a chapter — one that taught me more about leadership, responsibility, and execution than any classroom could.
        </p>
        <p className="mb-8">
          Leadership isn't about control. It's about taking responsibility, especially when things go wrong. The most seamless events are almost always built on moments that were anything but smooth behind the scenes.
        </p>
        <p className="mb-12">
          If you're reading this as someone planning their first big event — know that the chaos is part of it. Plan well, stay calm, and trust the people around you. The rest has a way of working itself out.
        </p>
      </>
    )
  },
  {
    id: 2,
    title: 'Won the "Most Product Readiness Award" at HackCelestial 2.0',
    description: 'A look back at how we built SeaGuard under pressure—an AI-powered maritime safety application leveraging React Native, Supabase, and Twilio—which secured the Most Product Readiness Award.',
    date: 'September 25, 2025',
    readTime: '12 min read',
    category: 'Hackathon',
    tags: ['React Native', 'Supabase', 'AI Innovation'],
    slug: 'hackcelestial-seaguard',
    thumbnail: '/hackcelestial.png',
    content: (
      <>
        <p className="text-2xl md:text-3xl text-neutral-100 mb-10 font-normal leading-relaxed">
          Securing the "Most Product Readiness Award" at HackCelestial 2.0 wasn't just about writing good code—it was about building something that solved a real problem in maritime safety.
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">The Challenge</h2>
        <p className="mb-8">
          We set out to build SeaGuard—a mobile application designed to save lives at sea. The ocean is vast and unforgiving, and when emergencies happen, communication is historically spotty. We wanted to build an SOS framework that used AI to streamline triage so coast guards understand exactly what they're walking into.
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">The Tech Stack</h2>
        <p className="mb-10">
          Over 36 intense hours, we combined React Native for a cross-platform mobile experience, Supabase as a lightning-fast backend, Twilio for instant SMS dispatching during emergencies, and SARVAM AI integration to rapidly parse distress signals into structured data.
        </p>

        <div className="my-14 p-8 md:p-10 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-white opacity-80" />
          <p className="text-2xl md:text-3xl italic font-light text-neutral-200 m-0 leading-relaxed">
            "We didn't just build a hack; we built a deployable product that felt ready for the ocean."
          </p>
        </div>
      </>
    )
  },
  {
    id: 3,
    title: 'Modern CSS Techniques for Responsive Design',
    description: 'Discover advanced CSS techniques like Grid, Flexbox, and CSS Variables to create responsive, maintainable designs.',
    date: 'March 10, 2025',
    readTime: '6 min read',
    category: 'Frontend',
    tags: ['CSS', 'Responsive Design', 'Web Design'],
    slug: 'modern-css-responsive-design',
    thumbnail: '/geometric-app-design.jpg',
    content: (
      <>
        <p className="text-2xl md:text-3xl text-neutral-100 mb-10 font-normal leading-relaxed">
          CSS has evolved massively in the last five years. If you are still relying heavily on floats or complex margin hacks, it's time to adapt to modern layout engines.
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">Embracing CSS Grid</h2>
        <p className="mb-8">
          Grid isn't just for complex, two-dimensional dashboard layouts. It can be used for simple page scaling where you formerly used Flexbox, allowing you to define precise track columns that inherently resize beautifully without media queries.
        </p>
      </>
    )
  },
  {
    id: 4,
    title: 'React Hooks: A Deep Dive into useCallback and useMemo',
    description: 'Understand performance optimization in React with useCallback and useMemo hooks. Learn when and how to use them effectively.',
    date: 'March 5, 2025',
    readTime: '10 min read',
    category: 'React',
    tags: ['React', 'Hooks', 'Performance'],
    slug: 'react-hooks-deep-dive',
    thumbnail: '/minimalist-mobile-app.jpg',
    content: (
      <>
        <p className="text-2xl md:text-3xl text-neutral-100 mb-10 font-normal leading-relaxed">
          Premature optimization is the root of all evil—but knowing exactly *when* to optimize React components using memoization is a senior developer's superpower.
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">The Cost of Memoization</h2>
        <p className="mb-8">
          Every time you wrap a function in <code>useCallback</code> or an object in <code>useMemo</code>, React has to do extra work to store references. Only use them when passing props down to heavily rendering children wrapped in <code>React.memo</code>, or when dealing with highly complex computations.
        </p>
      </>
    )
  },
  {
    id: 5,
    title: 'API Design Best Practices for Modern Web Services',
    description: 'Learn about RESTful API design, versioning, authentication, and error handling best practices.',
    date: 'February 28, 2025',
    readTime: '9 min read',
    category: 'Backend',
    tags: ['API', 'Backend', 'Best Practices'],
    slug: 'api-design-best-practices',
    thumbnail: '/modern-ecommerce-black.jpg',
    content: (
      <>
        <p className="text-2xl md:text-3xl text-neutral-100 mb-10 font-normal leading-relaxed">
          A frontend is only as solid as the backend it relies on. Clean, predictable, and robust APIs make product development seamless.
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">Consistency is Key</h2>
        <p className="mb-8">
          Whether you are using REST or GraphQL, the most critical element of API design is consistency in payload structures, error formats, and versioning strategies.
        </p>
      </>
    )
  },
  {
    id: 6,
    title: 'TypeScript Tips for Large-Scale Applications',
    description: 'Leverage TypeScript effectively in large-scale projects with advanced types, generics, and utility types.',
    date: 'February 20, 2025',
    readTime: '11 min read',
    category: 'TypeScript',
    tags: ['TypeScript', 'Development', 'Best Practices'],
    slug: 'typescript-large-scale-apps',
    thumbnail: '/abstract-creative-brand-design-black-and-white.jpg',
    content: (
      <>
        <p className="text-2xl md:text-3xl text-neutral-100 mb-10 font-normal leading-relaxed">
          TypeScript changes how you think about your application state. Building tight, expressive types prevents entire categories of production bugs.
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">Advanced Utility Types</h2>
        <p className="mb-8">
          Going beyond simple interfaces using <code>Omit</code>, <code>Pick</code>, and conditional types scale your codebase robustly and keeps your typings incredibly DRY.
        </p>
      </>
    )
  },
]

export default function BlogPost() {
  const params = useParams()
  const slug = params?.slug as string
  const post = blogPosts.find((p) => p.slug === slug)

  const [voteCount, setVoteCount] = useState<number>(0)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    if (post) setVoteCount(post.id * 14 + 102) // Predictable initial fake counts per post
  }, [post])

  const handleUpvote = () => {
    if (userVote === 'up') {
      setUserVote(null)
      setVoteCount(prev => prev - 1)
    } else {
      setVoteCount(prev => prev + (userVote === 'down' ? 2 : 1))
      setUserVote('up')
    }
  }

  const handleDownvote = () => {
    if (userVote === 'down') {
      setUserVote(null)
      setVoteCount(prev => prev + 1)
    } else {
      setVoteCount(prev => prev - (userVote === 'up' ? 2 : 1))
      setUserVote('down')
    }
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Check out this article: ${post?.title}`)
    
    let shareUrl = ''
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    
    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.description,
        url: window.location.href,
      }).catch(console.error)
    }
  }

  if (!post) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-neutral-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-20">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 items-center mb-6">
            <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs uppercase tracking-widest rounded border border-white/5">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-neutral-400 text-sm flex-wrap ml-2">
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light mb-8">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center justify-between border-y border-white/10 py-6 gap-6">
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 text-neutral-200 text-sm md:text-base rounded-full border border-neutral-700/50"
                >
                  <Tag size={16} />
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-5 text-neutral-400">
              <button onClick={handleNativeShare} className="text-sm md:text-base uppercase tracking-widest mx-2 flex items-center gap-2 hover:text-white transition-colors">
                <Share2 size={16} /> Share
              </button>
              <button onClick={() => handleShare('twitter')} className="hover:text-white transition-colors"><Twitter size={20} /></button>
              <button onClick={() => handleShare('linkedin')} className="hover:text-white transition-colors"><Linkedin size={20} /></button>
              <button onClick={() => handleShare('facebook')} className="hover:text-white transition-colors"><Facebook size={20} /></button>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative aspect-video md:aspect-[16/9] w-full max-h-[70vh] rounded-2xl overflow-hidden mb-16 border border-white/10 bg-black group"
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            priority
          />
        </motion.div>

        {/* Content Section - DYNAMICALLY RENDERED FROM POST OBJECT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-neutral-300 leading-[1.8] font-light max-w-none"
        >
          {post.content}
        </motion.div>

        {/* Interaction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <button 
              onClick={handleUpvote} 
              className={`flex items-center justify-center p-2 rounded-full transition-colors ${userVote === 'up' ? 'text-green-400 bg-green-400/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
            >
              <ThumbsUp size={20} className={userVote === 'up' ? 'fill-green-400/20' : ''} />
            </button>
            <span className="text-neutral-200 font-mono text-lg min-w-[3ch] text-center select-none font-bold">{voteCount}</span>
            <button 
              onClick={handleDownvote} 
              className={`flex items-center justify-center p-2 rounded-full transition-colors ${userVote === 'down' ? 'text-red-400 bg-red-400/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
            >
              <ThumbsDown size={20} className={userVote === 'down' ? 'fill-red-400/20' : ''} />
            </button>
          </div>
          <span className="text-neutral-500 text-sm md:text-base font-light tracking-wide">Did you find this article helpful?</span>
        </motion.div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-neutral-800 overflow-hidden relative">
              {/* Replace with actual author image if available */}
              <Image src="/rithvik.png" alt="Rithvik" fill className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-white">Rithvik</p>
              <p className="text-sm text-neutral-500">Software Engineer & Designer</p>
            </div>
          </div>
          <Link
            href="/blog"
            className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm rounded hover:scale-105 transition-transform"
          >
            Read More Articles
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
