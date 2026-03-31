'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Bytecamp\'26: Navi Mumbai\'s Biggest Hackathon',
    description: 'What it really takes to organize a national-level hackathon: months of chaos, controlled execution, and the end of a chapter.',
    date: 'March 14, 2026',
    readTime: '8 min read',
    category: 'Hackathon',
    tags: ['Leadership', 'Team-Building', 'Problem-Solving'],
    slug: 'bytecamp-26',
    thumbnail: '/bytecamp_logo.png',
  },
  {
    id: 2,
    title: 'Won the "Most Product Readiness Award" at HackCelestial 2.0',
    description: 'A look back at how we built SeaGuard under pressure, an AI-powered maritime safety application leveraging React Native, Supabase, and Twilio—which secured the Most Product Readiness Award.',
    date: 'September 25, 2025',
    readTime: '12 min read',
    category: 'Hackathon',
    tags: ['React Native', 'Supabase', 'AI Innovation'],
    slug: 'hackcelestial-seaguard',
    thumbnail: '/hackcelestial.PNG',
  },
]

export default function BlogPage() {
  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-20">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80">
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
            My <span className="text-neutral-600">Blog</span>
          </h1>
          <p className="text-neutral-400 mt-6 text-lg max-w-2xl">
            Thoughts, tutorials, and insights on web development, machine learning, and digital innovation.
          </p>
        </div>

        <div className="space-y-8 mt-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group border border-white/10 hover:border-white/30 p-6 md:p-8 transition-all duration-300 hover:bg-white/5 flex flex-col md:flex-row gap-6 md:gap-8"
            >
              <div className="w-full md:w-1/3 shrink-0 rounded-lg overflow-hidden border border-white/10 aspect-video relative opacity-80 group-hover:opacity-100 transition-opacity bg-black">
                <Image src={post.thumbnail} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs uppercase tracking-widest rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-neutral-400 text-sm flex-wrap">
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

                <h2 className="text-2xl md:text-3xl font-bold group-hover:text-neutral-300 transition-colors">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-neutral-400 text-base leading-relaxed">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="flex items-center gap-1 px-2 py-1 bg-neutral-900 text-neutral-300 text-xs rounded border border-neutral-700 hover:border-neutral-500 transition-colors"
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="pt-4 flex items-center gap-2 text-white group-hover:translate-x-2 transition-transform w-fit"
                >
                  <span className="text-sm uppercase tracking-widest">Read Article</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 pt-12 border-t border-white/10 text-center"
        >
          <p className="text-neutral-400 text-lg mb-8">
            More articles coming soon. Subscribe to stay updated!
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded hover:scale-105 transition-transform"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
