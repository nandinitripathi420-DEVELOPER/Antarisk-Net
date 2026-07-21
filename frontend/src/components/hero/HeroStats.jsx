import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 98.4, suffix: '%', label: 'Structural accuracy' },
  { value: 2.8, suffix: 's', label: 'Avg. reconstruction time' },
  { value: 4.2, suffix: 'M+', label: 'Images processed' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  const decimals = value % 1 !== 0 ? 1 : 0

  return (
    <span ref={ref} className="font-display text-3xl font-semibold text-mist-100 md:text-4xl">
      {display.toFixed(decimals)}
      <span className="text-gradient">{suffix}</span>
    </span>
  )
}

export default function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="mt-4 grid grid-cols-3 gap-6 border-t border-white/8 pt-6 md:mt-6 md:max-w-md"
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <Counter value={stat.value} suffix={stat.suffix} />
          <span className="text-xs leading-snug text-mist-500">{stat.label}</span>
        </div>
      ))}
    </motion.div>
  )
}
