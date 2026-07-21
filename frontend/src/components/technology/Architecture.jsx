import { motion } from 'framer-motion'
import { Satellite, Server, BrainCircuit, MonitorSmartphone, ArrowRight } from 'lucide-react'

const NODES = [
  { icon: Satellite, label: 'Satellite Feed' },
  { icon: Server, label: 'Ingestion API' },
  { icon: BrainCircuit, label: 'Inference Cluster' },
  { icon: MonitorSmartphone, label: 'Workspace UI' },
]

export default function Architecture() {
  return (
    <div className="glass rounded-3xl p-6 md:p-10">
      <div className="flex flex-col items-stretch justify-between gap-6 md:flex-row md:items-center">
        {NODES.map((node, i) => (
          <div key={node.label} className="flex flex-1 items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-6 text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/20 to-violet-glow/20">
                <node.icon className="h-5 w-5 text-cyan-glow" strokeWidth={1.75} />
              </span>
              <span className="text-xs font-medium text-mist-300">{node.label}</span>
            </motion.div>

            {i < NODES.length - 1 && (
              <ArrowRight className="hidden h-5 w-5 shrink-0 text-mist-500 md:block" strokeWidth={1.75} />
            )}
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-mist-500 md:text-left">
        Every tile flows through the same pipeline in production — from raw capture to a
        rendered, cloud-free result in the workspace.
      </p>
    </div>
  )
}
