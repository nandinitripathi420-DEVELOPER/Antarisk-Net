import { motion } from 'framer-motion'

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-glow">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight text-mist-100 md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-mist-500 md:text-lg">{description}</p>
      )}
    </motion.div>
  )
}
