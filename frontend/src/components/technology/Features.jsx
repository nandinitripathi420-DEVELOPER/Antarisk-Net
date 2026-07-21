import { motion } from 'framer-motion'
import { Gauge, Globe2, Lock, Radar } from 'lucide-react'

const FEATURES = [
  {
    icon: Gauge,
    title: 'Sub-3 second inference',
    description: 'Optimized for near-real-time reconstruction on standard GPU nodes.',
  },
  {
    icon: Globe2,
    title: 'Global coverage',
    description: 'Trained across biomes from tundra to tropics for consistent accuracy.',
  },
  {
    icon: Radar,
    title: 'Multi-sensor support',
    description: 'Works across Sentinel-2, Landsat 8/9, and custom LISS-IV inputs.',
  },
  {
    icon: Lock,
    title: 'On-premise ready',
    description: 'Deployable in air-gapped environments for sensitive missions.',
  },
]

export default function Features() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: i * 0.08 }}
          className="flex flex-col gap-3 rounded-2xl border border-white/8 p-5"
        >
          <f.icon className="h-5 w-5 text-violet-glow" strokeWidth={1.75} />
          <h4 className="font-display text-sm font-semibold text-mist-100">{f.title}</h4>
          <p className="text-xs leading-relaxed text-mist-500">{f.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
