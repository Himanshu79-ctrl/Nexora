const ScoreCard = ({ label, score, icon }) => {
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#3b82f6' : '#f59e0b'
  const r = 20
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <div style={{
      background: '#13132a', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12, padding: '20px 16px', textAlign: 'center',
    }}>
      <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 14 }}>
        {label}
      </p>
      <div style={{ position: 'relative', display: 'inline-block', width: 70, height: 70 }}>
        <svg viewBox="0 0 50 50" width="70" height="70" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="25" cy="25" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
          <circle cx="25" cy="25" r={r} fill="none" stroke={color} strokeWidth="4"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease' }} />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 800, color,
        }}>
          {score}%
        </div>
      </div>
    </div>
  )
}

export default ScoreCard