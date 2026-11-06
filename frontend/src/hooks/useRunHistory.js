import { useCallback, useState } from 'react'

const KEY = 'agent-factory-runs'
const LIMIT = 6

function read() {
  try { const v = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(v) ? v : [] } catch { return [] }
}

/** Remembers the last few real runs (name, id, outcome) in this browser only. */
export function useRunHistory() {
  const [runs, setRuns] = useState(read)
  const record = useCallback((data) => {
    const run = {
      id: data?.build?.project_id || '',
      name: data?.requirements?.project_name || 'Untitled project',
      at: new Date().toISOString(),
      tasks: data?.plan?.tasks?.length || 0,
      files: data?.build?.files?.length || 0,
      passed: data?.tests?.passed || 0,
      failed: data?.tests?.failed || 0,
      status: data?.tests?.status === 'passed' ? 'passed' : 'review',
    }
    setRuns((prev) => {
      const next = [run, ...prev.filter((r) => !(r.id && r.id === run.id))].slice(0, LIMIT)
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* storage unavailable */ }
      return next
    })
  }, [])
  return { runs, record }
}
