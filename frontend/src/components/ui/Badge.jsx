export default function Badge({ children, icon: Icon, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-mist-300 backdrop-blur-md ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5 text-cyan-glow" strokeWidth={2.25} />}
      {children}
    </span>
  )
}
