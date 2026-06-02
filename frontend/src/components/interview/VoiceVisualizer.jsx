const VoiceVisualizer = ({ active = false, bars = 24, label = 'Listening...' }) => {
  const heights = [4, 8, 12, 18, 14, 22, 16, 24, 18, 20, 14, 10, 18, 22, 16, 12, 20, 24, 16, 12, 8, 18, 14, 6]

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 3, height: 40, marginBottom: 8,
      }}>
        {heights.slice(0, bars).map((h, i) => (
          <div key={i} style={{
            width: 3, borderRadius: 2,
            background: active
              ? `linear-gradient(180deg, #a78bfa, #7c3aed)`
              : 'rgba(255,255,255,0.1)',
            height: active ? h : 4,
            animation: active ? `bar 0.${6 + (i % 5)}s ease-in-out infinite alternate` : 'none',
            animationDelay: `${i * 0.04}s`,
            transition: 'height 0.3s, background 0.3s',
          }} />
        ))}
      </div>
      <p style={{ fontSize: 13, color: active ? '#a78bfa' : '#64748b', transition: 'color 0.3s' }}>
        {active ? label : 'Paused'}
      </p>
      <style>{`
        @keyframes bar {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}

export default VoiceVisualizer