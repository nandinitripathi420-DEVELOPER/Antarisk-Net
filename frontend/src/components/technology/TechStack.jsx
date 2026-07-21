import { motion } from 'framer-motion'
import { Cpu, Database, GitBranch, Layers } from 'lucide-react'

const STACK = [
  { icon: Cpu, name: 'Diffusion Infill Model', detail: 'U-Net backbone, 340M params' },
  { icon: Layers, name: 'Multispectral Encoder', detail: '13-band Sentinel-2 input' },
  { icon: Database, name: 'Earth Observation Corpus', detail: '4.2M labeled tiles' },
  { icon: GitBranch, name: 'Continuous Retraining', detail: 'Weekly model refresh' },
]

export default function TechStack() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {STACK.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="glass flex items-start gap-4 rounded-2xl p-5"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/20 to-violet-glow/20">
            <item.icon className="h-5 w-5 text-cyan-glow" strokeWidth={1.75} />
          </span>
          <div>
            <h4 className="font-display text-sm font-semibold text-mist-100">{item.name}</h4>
            <p className="mt-1 text-xs text-mist-500">{item.detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
