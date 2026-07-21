import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`glass rounded-3xl p-6 md:p-8 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
