import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import Button from '../ui/Button.jsx'

export default function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
    >
      <Button as="a" href="#workspace" icon={ArrowRight} className="flex-row-reverse">
        Try the Workspace
      </Button>
      <Button variant="secondary" icon={PlayCircle}>
        Watch Demo
      </Button>
    </motion.div>
  )
}
