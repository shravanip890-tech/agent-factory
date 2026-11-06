import { useCallback, useEffect, useMemo, useState } from 'react'
import { Activity, CheckCircle2, FileCode2, FolderKanban, Gauge, Inbox, Rocket } from 'lucide-react'
import { fetchHealthMode, generateProject, openDownload } from './api.js'
import { useTheme } from './hooks/useTheme.js'
import { useRunHistory } from './hooks/useRunHistory.js'
import { greeting } from './utils/time.js'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import StatCard from './components/StatCard.jsx'
import IntakeCard from './components/IntakeCard.jsx'
import { StartingPoints, RecentRuns } from './components/SidePanels.jsx'
import PipelineCard from './components/PipelineCard.jsx'
import ResultsPanel from './components/ResultsPanel.jsx'
import EmptyState from './components/EmptyState.jsx'
import LoadingState from './components/LoadingState.jsx'
import DashboardCard from './components/DashboardCard.jsx'
import SettingsModal from './components/SettingsModal.jsx'
import Button from './components/Button.jsx'

const isMobile = () => window.matchMedia('(max-width: 900px)').matches
const RAIL_KEY = 'agent-factory-sidebar'

function initialCollapsed() {
  try { const v = localStorage.getItem(RAIL_KEY); if (v) return v === 'collapsed' } catch { /* ignore */ }
  return window.innerWidth <= 1100 // tablets start with the compact rail
}

function App() {
  const { theme, mode, setMode, toggle } = useTheme()
  const { runs, record } = useRunHistory()
  const [prompt, setPrompt] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [apiMode, setApiMode] = useState('checking')
  const [activeView, setActiveView] = useState('overview')
  const [collapsed, setCollapsed] = useState(initialCollapsed)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => { fetchHealthMode().then(setApiMode) }, [])

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])
  const closeSettings = useCallback(() => setSettingsOpen(false), [])
  const onMenu = () => {
    if (isMobile()) return setDrawerOpen((o) => !o)
    setCollapsed((c) => { const next = !c; try { localStorage.setItem(RAIL_KEY, next ? 'collapsed' : 'expanded') } catch { /* ignore */ } return next })
  }

  async function generate() {
    if (prompt.trim().length < 8 || busy) return
    setBusy(true); setError(''); setResult(null); setActiveView('overview')
    try {
      const data = await generateProject(prompt.trim())
      setResult(data)
      record(data)
      setTimeout(() => document.getElementById('delivery')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    } catch (e) { setError(e.message) }
    finally { setBusy(false) }
  }

  function startFresh() {
    setPrompt(''); setResult(null); setError(''); setActiveView('overview')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.getElementById('business-brief')?.focus({ preventScroll: true })
  }

  const completed = useMemo(() => new Set((result?.events || []).filter((e) => ['completed', 'success', 'passed'].includes(e.status)).map((e) => e.stage)), [result])
  const failedStage = result?.events?.find((e) => e.status === 'failed')?.stage
  const passed = result?.tests?.passed || 0
  const failed = result?.tests?.failed || 0
  const testRate = Math.round((passed / Math.max(1, passed + failed)) * 100)
  const fileCount = result?.build?.files?.length || 0

  // Headline numbers come from the live result, or the most recent saved run.
  const latest = result
    ? { tasks: result.plan?.tasks?.length || 0, files: fileCount, passed, failed, ok: result.tests?.status === 'passed' }
    : runs[0] && { tasks: runs[0].tasks, files: runs[0].files, passed: runs[0].passed, failed: runs[0].failed, ok: runs[0].status === 'passed' }

  return (
    <div className={`app-shell ${collapsed ? 'is-rail' : ''}`}>
      <Sidebar
        collapsed={collapsed} drawerOpen={drawerOpen} onCloseDrawer={closeDrawer}
        activeView={activeView} hasResult={!!result} apiMode={apiMode}
        onOverview={() => { setActiveView('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        onNew={startFresh}
        onDeliverables={() => document.getElementById('delivery')?.scrollIntoView({ behavior: 'smooth' })}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <div className="main">
        <Header theme={theme} onToggleTheme={toggle} onMenu={onMenu} menuExpanded={drawerOpen || !collapsed} apiMode={apiMode} onNew={startFresh} />

        <main className="page">
          <section className="hero">
            <span className="hero__greeting">{greeting()}</span>
            <h1>Turn business needs into working software</h1>
            <p>Describe the outcome you need. A coordinated AI delivery team turns it into requirements, a work plan and a starter project you can build on.</p>
          </section>

          {latest && (
            <section className="stats" aria-label="Latest run overview">
              <StatCard label="Planned work items" value={latest.tasks} hint="Delivery plan" icon={FolderKanban} />
              <StatCard label="Project artifacts" value={latest.files} hint="Generated files" icon={FileCode2} tone="cyan" />
              <StatCard label="Quality checks" value={latest.passed} suffix={`/${latest.passed + latest.failed}`} hint={`${Math.round((latest.passed / Math.max(1, latest.passed + latest.failed)) * 100)}% passed`} icon={Gauge} tone="success" />
              <StatCard label="Delivery status" value={latest.ok ? 'Validated' : 'Review'} hint="Structural validation" icon={CheckCircle2} tone={latest.ok ? 'success' : 'warn'} />
            </section>
          )}

          <div className="grid-intake">
            <IntakeCard prompt={prompt} setPrompt={setPrompt} busy={busy} error={error} apiMode={apiMode} onSubmit={generate} />
            <div className="side-stack">
              <StartingPoints onPick={setPrompt} />
              <RecentRuns runs={runs} onDownload={openDownload} />
            </div>
          </div>

          <section className="delivery" id="delivery" aria-label="Delivery">
            <PipelineCard busy={busy} result={result} completed={completed} failedStage={failedStage} />
            {busy && <DashboardCard><LoadingState title="Coordinating the delivery team">Interpreting the brief, shaping the work plan and assembling a project scaffold.</LoadingState></DashboardCard>}
            {!busy && !result && (
              <DashboardCard>
                <EmptyState icon={Inbox} title="Your delivery will appear here" action={<Button icon={Rocket} onClick={() => document.getElementById('business-brief')?.focus()}>Write your brief</Button>}>
                  Submit a business challenge above to receive a requirement summary, delivery plan, starter files and a quality report.
                </EmptyState>
              </DashboardCard>
            )}
            {result && <ResultsPanel result={result} testRate={testRate} passed={passed} failed={failed} fileCount={fileCount} onDownload={() => openDownload(result?.build?.project_id)} />}
          </section>

          <footer className="foot"><span><Activity size={13} /> Agent Factory · AI software factory</span><span>Local MVP · v2.0</span></footer>
        </main>
      </div>

      <SettingsModal open={settingsOpen} onClose={closeSettings} mode={mode} setMode={setMode} />
    </div>
  )
}

export default App
