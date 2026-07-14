/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Route renamed from /achievements to /awards; preserve old links + SEO.
      { source: '/achievements', destination: '/awards', permanent: true },
    ]
  },
}

export default nextConfig
