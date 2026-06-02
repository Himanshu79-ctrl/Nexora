const ResumeAnalysisCard = ({ analysis }) => {
  if (!analysis) return null

  return (
    <div style={{ background: '#13132a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24 }}>
      <h4 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginBottom: 16 }}>AI Summary</h4>
      <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7, marginBottom: 20 }}>{analysis.summary}</p>

      {analysis.score != null && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, padding: 16,
          background: 'rgba(124,58,237,0.08)', borderRadius: 10, marginBottom: 16,
        }}>
          <div style={{ position: 'relative', width: 60, height: 60 }}>
            <svg viewBox="0 0 36 36" style={{ width: 60, height: 60, transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#7c3aed" strokeWidth="3"
                strokeDasharray={`${analysis.score * 0.942} 100`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#f1f5f9' }}>
              {analysis.score}%
            </div>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>Resume Match Score</p>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Based on job requirements</p>
          </div>
        </div>
      )}

      {analysis.recommendations?.length > 0 && (
        <>
          <h5 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Recommendations
          </h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {analysis.recommendations.map((r, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#94a3b8' }}>
                <span style={{ color: '#a78bfa', flexShrink: 0 }}>→</span> {r}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default ResumeAnalysisCard