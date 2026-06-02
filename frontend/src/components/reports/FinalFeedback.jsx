const Section = ({ title, items, color }) => (
  <div>
    <h5 style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
      {title}
    </h5>
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
      {items?.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
          <span style={{ color, flexShrink: 0, marginTop: 2 }}>•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
)

const FinalFeedback = ({ feedback }) => {
  if (!feedback) return null

  return (
    <div style={{
      background: '#13132a', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12, padding: 24,
    }}>
      <h4 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>Feedback</h4>

      {feedback.summary && (
        <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7, marginBottom: 20,
          padding: '14px 18px', background: 'rgba(124,58,237,0.06)',
          borderRadius: 8, borderLeft: '3px solid #7c3aed',
        }}>
          {feedback.summary}
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Section title="✅ Strengths" items={feedback.strengths} color="#34d399" />
        <Section title="⚡ Areas to Improve" items={feedback.improvements} color="#f87171" />
      </div>
    </div>
  )
}

export default FinalFeedback