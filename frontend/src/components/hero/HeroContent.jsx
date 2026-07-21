import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Badge from '../ui/Badge.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center gap-6 text-center md:items-start md:text-left"
    >
      <motion.div variants={item}>
        <Badge icon={Sparkles}>AI-Powered Cloud Reconstruction</Badge>
      </motion.div>

      <motion.h1
        variants={item}
        className="max-w-xl font-display text-4xl font-semibold leading-[1.08] text-mist-100 sm:text-5xl lg:text-6xl"
      >
        See through clouds.
        <br />
        <span className="text-gradient">Reveal what's hidden</span> from orbit.
      </motion.h1>

      <motion.p variants={item} className="max-w-md text-base leading-relaxed text-mist-500 md:text-lg">
        OrbitVision reconstructs cloud-obscured satellite imagery in seconds using a
        generative deep-learning pipeline trained on millions of Earth observation frames.
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
        {['Sentinel-2 compatible', '98.4% structural accuracy', 'Sub-3s inference'].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/8 px-3 py-1 text-xs text-mist-500"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}
