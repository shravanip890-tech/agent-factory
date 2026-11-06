import { PanelLeft, Plus } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
import Button, { IconButton } from './Button.jsx'

const CHIP = {
  groq: 'AI connected',
  fallback: 'Fallback mode',
  offline: 'API offline',
  checking: 'Connecting',
}

export default function Header({ theme, onToggleTheme, onMenu, menuExpanded, apiMode, onNew }) {
  return (
    <header className="topbar">
      <IconButton icon={PanelLeft} label="Toggle navigation" onClick={onMenu} aria-controls="app-sidebar" aria-expanded={menuExpanded} />
      <div className="crumbs"><span>Workspace</span><span aria-hidden="true">/</span><strong>Overview</strong></div>
      <div className="topbar__right">
        <span className={`chip chip--${apiMode}`} role="status"><i />{CHIP[apiMode] || CHIP.checking}</span>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <Button variant="primary" size="sm" icon={Plus} onClick={onNew} className="topbar__cta">New initiative</Button>
      </div>
    </header>
  )
}
