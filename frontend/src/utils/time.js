export function greeting(date = new Date()) {
  const h = date.getHours()
  return h < 5 ? 'Good evening' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

const units = [['day', 86400], ['hour', 3600], ['minute', 60]]
export function timeAgo(iso) {
  const seconds = Math.round((new Date(iso).getTime() - Date.now()) / 1000)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  for (const [unit, size] of units) if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  return 'just now'
}
