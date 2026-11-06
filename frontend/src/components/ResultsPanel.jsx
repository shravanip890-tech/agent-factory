import { BriefcaseBusiness, Check, CheckCircle2, Code2, Download, FileCode2, FolderKanban, ShieldCheck, X } from 'lucide-react'
import DashboardCard from './DashboardCard.jsx'
import Button from './Button.jsx'

export default function ResultsPanel({ result, testRate, passed, failed, fileCount, onDownload }) {
  const { requirements, plan, build, tests } = result
  const summary = requirements?.summary || requirements?.requirements
  return (
    <div className="results">
      <div className="banner">
        <span className="banner__icon"><CheckCircle2 size={20} /></span>
        <div className="banner__copy">
          <span className="eyebrow">Delivery package created</span>
          <h3>{requirements?.project_name || 'Your project'}</h3>
          <p>{summary || 'Your business brief has been processed into a starter project.'}</p>
        </div>
        <Button variant="primary" icon={Download} onClick={onDownload}>Download package</Button>
      </div>

      <div className="results__grid">
        <DashboardCard as="article" eyebrow="01 · Business discovery" title="What we understood" icon={BriefcaseBusiness}>
          <p className="card__text">{summary || 'Requirement summary not returned.'}</p>
          <h5 className="subhead">Capabilities in scope</h5>
          <div className="tags">{(requirements?.features || []).map((f, i) => <span className="tag" key={`${f}-${i}`}><Check size={12} />{f}</span>)}</div>
        </DashboardCard>

        <DashboardCard as="article" eyebrow="02 · Delivery plan" title="Work breakdown" icon={FolderKanban}>
          <ol className="work-list">{(plan?.tasks || []).map((t, i) => <li key={`${t}-${i}`}><span>{String(i + 1).padStart(2, '0')}</span>{t}</li>)}</ol>
          {plan?.architecture_notes?.length > 0 && (
            <div className="note"><b>Architecture considerations</b>{plan.architecture_notes.map((n, i) => <p key={i}>{n}</p>)}</div>
          )}
        </DashboardCard>

        <DashboardCard as="article" eyebrow="03 · Build output" title="Project artifacts" icon={Code2}>
          <div className="artifact-root"><FolderKanban size={16} /><b>{build?.project_id || 'project'}</b><span>{fileCount} files</span></div>
          <ul className="file-list">{(build?.files || []).map((f, i) => <li key={`${f}-${i}`}><FileCode2 size={14} /><span>{f}</span></li>)}</ul>
          <p className="card__foot card__foot--ok"><CheckCircle2 size={14} />{build?.message || 'Starter project scaffold generated.'}</p>
          <p className="muted-xs">MVP scope: template-based starter generation. Generated code is not production-certified.</p>
        </DashboardCard>

        <DashboardCard as="article" eyebrow="04 · Quality assurance" title="Validation report" icon={ShieldCheck}>
          <div className="qa">
            <strong>{testRate}<small>%</small></strong>
            <div><b>{tests?.status === 'passed' ? 'Checks passed' : 'Review required'}</b><span>{passed} passed · {failed} failed</span></div>
            <div className="qa__bar" style={{ '--score': `${testRate}%` }}><i /></div>
          </div>
          <ul className="check-list">{(tests?.checks || []).map((c, i) => (
            <li key={`${c.name}-${i}`}><span className={c.status === 'passed' ? 'is-pass' : 'is-fail'}>{c.status === 'passed' ? <CheckCircle2 size={16} /> : <X size={16} />}</span><b>{c.name}</b><small>{c.status}</small></li>
          ))}</ul>
          <p className="card__foot">{tests?.message || 'Review the validation checks before production use.'}</p>
        </DashboardCard>
      </div>
    </div>
  )
}
