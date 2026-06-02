const QuestionCard = ({ question, index }) => {
  if (!question) return (
    <div style={{ padding: 24, color: '#64748b', textAlign: 'center' }}>
      Waiting for question...
    </div>
  )

  return (
    <div style={{
      background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)',
      borderRadius: 12, padding: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
          Question {index + 1}
        </span>
        {question.difficulty && (
          <span style={{
            padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600,
            background: question.difficulty === 'easy' ? 'rgba(16,185,129,0.15)' :
                        question.difficulty === 'hard' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
            color: question.difficulty === 'easy' ? '#34d399' :
                   question.difficulty === 'hard' ? '#f87171' : '#fbbf24',
          }}>
            {question.difficulty}
          </span>
        )}
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: '#f1f5f9', fontWeight: 500 }}>
        {question.text}
      </p>
    </div>
  )
}

export default QuestionCard