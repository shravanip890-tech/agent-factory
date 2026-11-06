import { Check, LoaderCircle, X } from 'lucide-react'
import DashboardCard from './DashboardCard.jsx'
import { stages } from '../constants.js'

export default function PipelineCard({ busy, result, completed, failedStage }) {
  const title = busy ? 'Your delivery team is at work' : result ? 'Delivery run summary' : 'A repeatable path from idea to implementation'
  const meta = result ? `${completed.size}/${stages.length} stages complete` : 'Ready when you are'
  return (
    <DashboardCard eyebrow="Delivery pipeline" title={title} action={<span className="muted-xs">{meta}</span>}>
      <ol className="pipeline">
        {stages.map((stage, index) => {
          const done = completed.has(stage.id)
          const failed = failedStage === stage.id
          const active = busy && index === 0
          const Icon = stage.icon
          const state = done ? 'done' : failed ? 'failed' : active ? 'active' : 'idle'
          return (
            <li key={stage.id} className={`pipeline__stage is-${state}`}>
              <span className="pipeline__node">{done ? <Check size={16} /> : failed ? <X size={16} /> : active ? <LoaderCircle className="spin" size={16} /> : <Icon size={16} />}</span>
              <span className="pipeline__text"><b>{stage.label}</b><small>{stage.detail}</small></span>
            </li>
          )
        })}
      </ol>
      <p className="card__foot">Human review remains part of production delivery.</p>
    </DashboardCard>
  )
}
