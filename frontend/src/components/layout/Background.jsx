import { useMemo } from 'react'

function useStars(count) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.6 + 0.6,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 3,
      })),
    [count]
  )
}

export default function Background() {
  const stars = useStars(90)

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-space-950">
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

      <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-azure/20 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-violet-glow/15 blur-[130px]" />
      <div className="absolute bottom-0 -left-32 h-[420px] w-[420px] rounded-full bg-cyan-glow/10 blur-[130px]" />

      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-mist-100"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            opacity: 0.5,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}
