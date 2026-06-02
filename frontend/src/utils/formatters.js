export const formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${m}m`
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

export const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const formatScore = (score) => `${Math.round(score)}%`

export const getScoreColor = (score) => {
  if (score >= 80) return '#10b981'
  if (score >= 60) return '#f59e0b'
  return '#ef4444'
}

export const getScoreBadge = (score) => {
  if (score >= 85) return { label: 'Excellent', color: '#10b981' }
  if (score >= 70) return { label: 'Good',      color: '#3b82f6' }
  if (score >= 50) return { label: 'Average',   color: '#f59e0b' }
  return { label: 'Needs Work', color: '#ef4444' }
}

export const truncate = (str, n = 60) =>
  str?.length > n ? str.slice(0, n) + '…' : str