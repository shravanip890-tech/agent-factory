import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle }) {
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button type="button" className="theme-toggle" onClick={onToggle} role="switch" aria-checked={theme === 'dark'} aria-label={`Switch to ${next} theme`} title={`Switch to ${next} theme`}>
      <Sun className="theme-toggle__sun" size={18} />
      <Moon className="theme-toggle__moon" size={18} />
    </button>
  )
}
