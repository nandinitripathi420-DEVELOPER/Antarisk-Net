import { motion } from 'framer-motion'

const VARIANTS = {
  primary:
    'bg-gradient-to-r from-cyan-glow to-violet-glow text-space-950 shadow-[0_0_30px_-6px_rgba(63,212,255,0.55)] hover:shadow-[0_0_40px_-4px_rgba(139,108,255,0.65)]',
  secondary:
    'glass text-mist-100 hover:border-cyan-glow/40 hover:bg-white/[0.07]',
}

export default function Button({
  children,
  variant = 'primary',
  icon: Icon,
  className = '',
  as = 'button',
  ...props
}) {
  const MotionTag = motion[as] ?? motion.button

  return (
    <MotionTag
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold font-display tracking-wide transition-colors duration-300 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" strokeWidth={2.25} />}
      {children}
    </MotionTag>
  )
}
