export default function DashboardCard({ eyebrow, title, icon: Icon, action, className = '', as: Tag = 'section', children, ...rest }) {
  const hasHead = eyebrow || title || action || Icon
  return (
    <Tag className={`card ${className}`} {...rest}>
      {hasHead && (
        <header className="card__head">
          {Icon && <span className="card__icon"><Icon size={18} /></span>}
          <div className="card__titles">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && <h3>{title}</h3>}
          </div>
          {action && <div className="card__action">{action}</div>}
        </header>
      )}
      {children}
    </Tag>
  )
}
