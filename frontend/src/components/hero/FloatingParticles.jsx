import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function FloatingParticles({ count = 14 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 5 + 3,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 4,
        color: i % 2 === 0 ? 'bg-cyan-glow' : 'bg-violet-glow',
      })),
    [count]
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute rounded-full ${p.color} opacity-50 blur-[1px]`}
          style={{ top: `${p.top}%`, left: `${p.left}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -22, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
