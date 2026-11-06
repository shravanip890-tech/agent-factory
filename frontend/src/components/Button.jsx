import { LoaderCircle } from 'lucide-react'

export default function Button({ variant = 'secondary', size = 'md', icon: Icon, iconRight: IconRight, loading = false, className = '', children, disabled, type = 'button', ...rest }) {
  return (
    <button type={type} className={`btn btn--${variant} btn--${size} ${className}`} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <LoaderCircle className="spin" size={16} /> : Icon && <Icon size={16} />}
      {children}
      {IconRight && !loading && <IconRight size={16} />}
    </button>
  )
}

export function IconButton({ icon: Icon, label, className = '', size = 18, ...rest }) {
  return (
    <button type="button" className={`icon-btn ${className}`} aria-label={label} title={label} {...rest}>
      <Icon size={size} />
    </button>
  )
}
