import { LoaderCircle } from 'lucide-react'

export default function LoadingState({ title, children }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading__icon"><LoaderCircle className="spin" size={22} /></span>
      <div><h4>{title}</h4>{children && <p>{children}</p>}</div>
      <span className="badge badge--accent">Live run</span>
    </div>
  )
}
