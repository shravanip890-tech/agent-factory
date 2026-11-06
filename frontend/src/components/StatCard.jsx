export default function StatCard({ label, value, suffix, hint, icon: Icon, tone = 'accent' }) {
  return (
    <div className="stat">
      <div className="stat__top"><span>{label}</span>{Icon && <span className={`stat__icon tone-${tone}`}><Icon size={16} /></span>}</div>
      <strong className="stat__value">{value}{suffix && <i>{suffix}</i>}</strong>
      {hint && <small>{hint}</small>}
    </div>
  )
}
