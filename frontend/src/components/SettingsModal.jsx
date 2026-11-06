import { Monitor, Moon, Sun } from 'lucide-react'
import Modal from './Modal.jsx'
import { API } from '../api.js'

const OPTIONS = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
]

export default function SettingsModal({ open, onClose, mode, setMode }) {
  return (
    <Modal open={open} onClose={onClose} title="Settings">
      <div className="setting">
        <div><b>Appearance</b><small>Choose how Agent Factory looks. “System” follows your device.</small></div>
        <div className="segmented" role="radiogroup" aria-label="Theme">
          {OPTIONS.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" role="radio" aria-checked={mode === id} className={mode === id ? 'is-selected' : ''} onClick={() => setMode(id)}><Icon size={15} />{label}</button>
          ))}
        </div>
      </div>
      <div className="setting">
        <div><b>API endpoint</b><small>Set with <code>VITE_API_URL</code> in <code>.env</code>.</small></div>
        <code className="setting__value">{API}</code>
      </div>
    </Modal>
  )
}
