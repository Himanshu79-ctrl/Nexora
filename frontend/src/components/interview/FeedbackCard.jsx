const FeedbackCard = ({ feedback }) => {
  if (!feedback) return null

  return (
    <div style={{
      background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)',
      borderRadius: 10, padding: 16, marginTop: 12, animation: 'fadeIn 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span>✨</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#34d399' }}>Feedback</span>
        {feedback.score != null && (
          <span style={{
            marginLeft: 'auto', fontSize: 13, fontWeight: 800,
            color: feedback.score >= 70 ? '#10b981' : '#f59e0b',
          }}>{feedback.score}%</span>
        )}
      </div>
      <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{feedback.text}</p>
      <style>{`@keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }`}</style>
    </div>
  )
}

export default FeedbackCard