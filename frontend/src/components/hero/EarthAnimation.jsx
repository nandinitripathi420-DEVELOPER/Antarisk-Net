import { motion } from 'framer-motion'
import { Satellite } from 'lucide-react'

export default function EarthAnimation() {
  return (
    <div className="relative mx-auto flex h-[320px] w-[320px] items-center justify-center md:h-[420px] md:w-[420px]">
      {/* Orbit rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-white/10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 rounded-full border border-white/8"
      />

      {/* Satellite on orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <span className="absolute -top-2 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-space-850 text-cyan-glow shadow-[0_0_20px_rgba(63,212,255,0.5)]">
          <Satellite className="h-4 w-4" strokeWidth={2} />
        </span>
      </motion.div>

      {/* Earth sphere */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-[220px] w-[220px] rounded-full md:h-[300px] md:w-[300px]"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, #6fe8ff 0%, #2f8fe0 22%, #1c4fb0 45%, #0c1f52 72%, #05102f 100%)',
          boxShadow:
            '0 0 90px -10px rgba(63,212,255,0.55), inset -30px -30px 70px rgba(0,0,0,0.55)',
        }}
      >
        {/* Continents blobs */}
        <div className="absolute inset-0 overflow-hidden rounded-full opacity-70 mix-blend-overlay">
          <div className="absolute left-[15%] top-[20%] h-16 w-20 rounded-[45%] bg-emerald-400/70 blur-[2px]" />
          <div className="absolute left-[45%] top-[55%] h-20 w-24 rounded-[50%] bg-emerald-500/60 blur-[2px]" />
          <div className="absolute left-[65%] top-[15%] h-12 w-16 rounded-[45%] bg-emerald-400/50 blur-[2px]" />
        </div>

        {/* Cloud layer, slowly rotating opposite the satellite */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background:
              'conic-gradient(from 90deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, transparent 90deg, transparent 200deg, rgba(255,255,255,0.6) 250deg, transparent 300deg)',
          }}
        />

        {/* Reconstruction scan line */}
        <motion.div
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-glow to-transparent shadow-[0_0_12px_2px_rgba(63,212,255,0.7)]"
        />
      </motion.div>

      {/* Ambient glow behind everything */}
      <div className="absolute inset-0 -z-10 rounded-full bg-azure/25 blur-[80px]" />
    </div>
  )
}
