import { motion } from 'framer-motion'
import { Satellite, ScanEye, Wand2, ShieldCheck } from 'lucide-react'

const STEPS = [
  {
    icon: Satellite,
    title: 'Capture',
    description: 'Multispectral tiles ingested directly from Sentinel-2 and Landsat feeds.',
  },
  {
    icon: ScanEye,
    title: 'Detect',
    description: 'A segmentation head isolates cloud, shadow, and haze regions per pixel.',
  },
  {
    icon: Wand2,
    title: 'Reconstruct',
    description: 'A diffusion-based infill model rebuilds obscured terrain from context.',
  },
  {
    icon: ShieldCheck,
    title: 'Verify',
    description: 'Structural similarity checks confirm the output against known baselines.',
  },
]

export default function Pipeline() {
  return (
    <div className="flex flex-col gap-10">
      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center gap-4 text-center md:items-start md:text-left"
          >
            <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-space-900 ring-1 ring-white/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/20 to-violet-glow/20">
                <step.icon className="h-5 w-5 text-cyan-glow" strokeWidth={1.75} />
              </span>
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mist-500">
                Step {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="mt-1 font-display text-lg font-semibold text-mist-100">
                {step.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-mist-500">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
