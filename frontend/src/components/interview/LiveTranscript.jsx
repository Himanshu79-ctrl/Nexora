import { useEffect, useRef } from 'react'

const LiveTranscript = ({ entries = [], interimText = '' }) => {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' })
  }, [entries, interimText])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h4 style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
        Live Transcript
      </h4>
      <div ref={ref} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {entries.map((entry, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: entry.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <span style={{ fontSize: 11, color: '#64748b', textTransform: 'capitalize' }}>
              {entry.role === 'ai' ? 'AI' : 'You'}
            </span>
            <div style={{
              padding: '8px 12px', borderRadius: 10, maxWidth: '88%',
              background: entry.role === 'ai' ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${entry.role === 'ai' ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.08)'}`,
              fontSize: 13, color: '#e2e8f0', lineHeight: 1.5,
            }}>
              {entry.text}
            </div>
          </div>
        ))}
        {interimText && (
          <div style={{ alignSelf: 'flex-end' }}>
            <div style={{
              padding: '8px 12px', borderRadius: 10, maxWidth: '88%',
              background: 'rgba(255,255,255,0.03)',
              border: '1px dashed rgba(255,255,255,0.1)',
              fontSize: 13, color: '#64748b', fontStyle: 'italic',
            }}>
              {interimText}...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LiveTranscript