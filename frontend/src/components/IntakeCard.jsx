import { Activity, ArrowUpRight, Sparkles, WandSparkles, X } from 'lucide-react'
import DashboardCard from './DashboardCard.jsx'
import Button from './Button.jsx'
import { MAX_BRIEF, samplePrompts } from '../constants.js'

export default function IntakeCard({ prompt, setPrompt, busy, error, apiMode, onSubmit }) {
  const canSubmit = prompt.trim().length >= 8 && !busy
  return (
    <DashboardCard eyebrow="New initiative" title="What outcome are we solving for?" icon={WandSparkles} className="intake">
      <label className="field-label" htmlFor="business-brief">Business challenge or opportunity</label>
      <textarea
        id="business-brief" className="textarea" value={prompt} maxLength={MAX_BRIEF}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && canSubmit) onSubmit() }}
        placeholder="Example: Our operations team loses hours every week reconciling inventory across spreadsheets. We need one place to track stock, flag shortages and coordinate replenishment…"
      />
      <div className="intake__meta">
        <span className="muted-xs">{prompt.length.toLocaleString()} / {MAX_BRIEF.toLocaleString()}</span>
        <button type="button" className="link-btn" onClick={() => setPrompt(samplePrompts[0].prompt)}><Sparkles size={14} /> Use an example</button>
      </div>
      {error && <div className="alert alert--error" role="alert"><X size={16} /><span>{error}</span></div>}
      {apiMode === 'fallback' && <div className="alert alert--warn"><Activity size={16} /><span>AI key not detected. The factory will use its deterministic fallback mode.</span></div>}
      {apiMode === 'offline' && <div className="alert alert--error"><Activity size={16} /><span>Backend is offline. Start the API at localhost:8000.</span></div>}
      <div className="intake__foot">
        <span className="muted-xs">Your brief stays in this local workspace. <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to launch.</span>
        <Button variant="primary" iconRight={ArrowUpRight} loading={busy} disabled={!canSubmit} onClick={onSubmit}>{busy ? 'Factory working' : 'Launch delivery'}</Button>
      </div>
    </DashboardCard>
  )
}
