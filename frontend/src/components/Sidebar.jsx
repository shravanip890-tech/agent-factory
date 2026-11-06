import { useEffect } from 'react'
import { Bot, FolderKanban, LayoutDashboard, Plus, Settings, X } from 'lucide-react'
import NavigationItem from './NavigationItem.jsx'
import { IconButton } from './Button.jsx'
import { team } from '../constants.js'

const STATUS = {
  groq: ['AI engine connected', 'ok'],
  fallback: ['Fallback engine active', 'warn'],
  offline: ['Backend unavailable', 'error'],
  checking: ['Checking connection', 'idle'],
}

export default function Sidebar({ collapsed, drawerOpen, onCloseDrawer, activeView, hasResult, apiMode, onOverview, onNew, onDeliverables, onOpenSettings }) {
  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onCloseDrawer() }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('no-scroll') }
  }, [drawerOpen, onCloseDrawer])

  const [statusText, statusTone] = STATUS[apiMode] || STATUS.checking
  const go = (fn) => () => { fn(); onCloseDrawer() }

  return (
    <>
      <aside id="app-sidebar" className={`sidebar ${collapsed ? 'is-rail' : ''} ${drawerOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        <div className="sidebar__brand">
          <span className="brand-mark"><Bot size={20} /></span>
          <span className="brand-text"><strong>Agent Factory</strong><small>AI software factory</small></span>
          <IconButton icon={X} label="Close navigation" className="sidebar__close" onClick={onCloseDrawer} />
        </div>

        <nav className="sidebar__nav" aria-label="Workspace">
          <span className="sidebar__caption">Workspace</span>
          <NavigationItem icon={LayoutDashboard} label="Overview" active={activeView === 'overview'} collapsed={collapsed} onClick={go(onOverview)} />
          <NavigationItem icon={Plus} label="New initiative" collapsed={collapsed} onClick={go(onNew)} />
          <NavigationItem icon={FolderKanban} label="Deliverables" badge={hasResult ? '1' : null} collapsed={collapsed} onClick={go(onDeliverables)} />
        </nav>

        <div className="sidebar__team">
          <span className="sidebar__caption">Factory team</span>
          <ul>{team.map((a) => (
            <li key={a.n}><span className="team-n">{a.n}</span><span><b>{a.name}</b><small>{a.role}</small></span></li>
          ))}</ul>
        </div>

        <div className="sidebar__foot">
          <div className="sidebar__status" title={collapsed ? statusText : undefined}>
            <span className={`dot dot--${statusTone}`} />
            <span className="sidebar__status-text"><b>Factory status</b><small>{statusText}</small></span>
          </div>
          <div className="sidebar__profile">
            <span className="avatar">AF</span>
            <span className="sidebar__profile-text"><b>Admin workspace</b><small>Local environment</small></span>
            <IconButton icon={Settings} label="Settings" onClick={onOpenSettings} />
          </div>
        </div>
      </aside>
      <button type="button" className={`scrim ${drawerOpen ? 'is-visible' : ''}`} tabIndex={-1} aria-hidden={!drawerOpen} onClick={onCloseDrawer} />
    </>
  )
}
