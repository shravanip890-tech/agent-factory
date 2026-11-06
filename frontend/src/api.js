// Thin wrapper around the existing backend endpoints (unchanged contract).
export const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function fetchHealthMode() {
  try {
    const response = await fetch(`${API}/api/health`)
    const data = await response.json()
    return data.ai_mode || 'fallback'
  } catch {
    return 'offline'
  }
}

export async function generateProject(prompt) {
  try {
    const response = await fetch(`${API}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.detail || 'Generation failed. Check that the backend is running.')
    return data
  } catch (e) {
    throw new Error(e.message || 'Could not connect to the API.')
  }
}

export const downloadUrl = (projectId) => `${API}/api/download/${encodeURIComponent(projectId)}`
export function openDownload(projectId) {
  if (projectId) window.open(downloadUrl(projectId), '_blank', 'noopener,noreferrer')
}
