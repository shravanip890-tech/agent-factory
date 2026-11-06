export default function NavigationItem({ icon: Icon, label, active = false, badge, collapsed = false, onClick }) {
  return (
    <button type="button" className={`nav-item ${active ? 'is-active' : ''}`} onClick={onClick} aria-current={active ? 'page' : undefined} title={collapsed ? label : undefined}>
      <Icon size={18} />
      <span className="nav-item__label">{label}</span>
      {badge ? <span className="nav-item__badge">{badge}</span> : null}
    </button>
  )
}
