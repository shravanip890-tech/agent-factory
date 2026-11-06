export default function EmptyState({ icon: Icon, title, children, action, compact = false }) {
  return (
    <div className={`empty ${compact ? 'empty--compact' : ''}`}>
      {Icon && <span className="empty__icon"><Icon size={compact ? 18 : 22} /></span>}
      <div className="empty__copy"><h4>{title}</h4>{children && <p>{children}</p>}</div>
      {action}
    </div>
  )
}
