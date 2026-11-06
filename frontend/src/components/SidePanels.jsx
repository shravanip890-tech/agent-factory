import { ArrowUpRight, Download, History, Inbox, Sparkles } from 'lucide-react'
import DashboardCard from './DashboardCard.jsx'
import EmptyState from './EmptyState.jsx'
import { IconButton } from './Button.jsx'
import { samplePrompts } from '../constants.js'
import { timeAgo } from '../utils/time.js'

export function StartingPoints({ onPick }) {
  return (
    <DashboardCard eyebrow="Starting points" title="Begin from a scenario" icon={Sparkles} className="starters">
      <p className="card__intro">Use a business scenario as a base, then tailor it to your needs.</p>
      <ul className="starter-list">
        {samplePrompts.map((item) => (
          <li key={item.label}>
            <button type="button" onClick={() => onPick(item.prompt)}>
              <span><small>{item.label}</small><b>{item.title}</b></span>
              <ArrowUpRight size={16} />
            </button>
          </li>
        ))}
      </ul>
    </DashboardCard>
  )
}

export function RecentRuns({ runs, onDownload }) {
  return (
    <DashboardCard eyebrow="Recent activity" title="Latest runs" icon={History}>
      {runs.length === 0 ? (
        <EmptyState compact icon={Inbox} title="No runs yet">Completed deliveries will be listed here.</EmptyState>
      ) : (
        <ul className="run-list">
          {runs.map((run) => (
            <li key={`${run.id}-${run.at}`}>
              <span className={`dot dot--${run.status === 'passed' ? 'ok' : 'warn'}`} />
              <span className="run-list__main"><b>{run.name}</b><small>{timeAgo(run.at)} · {run.files} files · {run.passed}/{run.passed + run.failed} checks</small></span>
              {run.id && <IconButton icon={Download} size={16} label={`Download ${run.name}`} onClick={() => onDownload(run.id)} />}
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  )
}
