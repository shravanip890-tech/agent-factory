import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { IconButton } from './Button.jsx'

export default function Modal({ open, title, onClose, children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    ref.current?.focus()
    return () => { document.removeEventListener('keydown', onKey); previous?.focus?.() }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="modal-root" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref}>
        <header className="modal__head"><h3>{title}</h3><IconButton icon={X} label="Close" onClick={onClose} /></header>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}
