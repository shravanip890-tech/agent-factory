import { useCallback, useEffect, useState } from 'react'

const KEY = 'agent-factory-theme'
const query = () => window.matchMedia('(prefers-color-scheme: dark)')
let fadeTimer

function readStored() {
  try { const v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : null } catch { return null }
}

/**
 * Theme state: an explicit choice is persisted in localStorage; with no saved
 * choice the OS preference is used and followed live.
 */
export function useTheme() {
  const [stored, setStored] = useState(readStored)
  const [system, setSystem] = useState(() => (query().matches ? 'dark' : 'light'))
  const theme = stored ?? system

  useEffect(() => {
    const mq = query()
    const onChange = (e) => setSystem(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0B0F14' : '#F6F8FB')
  }, [theme])

  // mode: 'light' | 'dark' | 'system'
  const setMode = useCallback((mode) => {
    const root = document.documentElement
    root.classList.add('theme-transition')
    window.clearTimeout(fadeTimer)
    fadeTimer = window.setTimeout(() => root.classList.remove('theme-transition'), 300)
    try { mode === 'system' ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, mode) } catch { /* storage unavailable */ }
    setStored(mode === 'system' ? null : mode)
  }, [])

  const toggle = useCallback(() => setMode(theme === 'dark' ? 'light' : 'dark'), [theme, setMode])
  return { theme, mode: stored ?? 'system', setMode, toggle }
}
