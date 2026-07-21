export default function GlassPanel({ children, className = '', as: Tag = 'div', ...props }) {
  return (
    <Tag className={`glass rounded-3xl ${className}`} {...props}>
      {children}
    </Tag>
  )
}
