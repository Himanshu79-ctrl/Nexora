const AIAvatar = ({ speaking = false, listening = false, size = 120 }) => {
  const pulse = speaking || listening

  return (
    <div style={{
      position: 'relative', width: size, height: size,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {pulse && (
        <>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: `2px solid ${speaking ? 'rgba(124,58,237,0.4)' : 'rgba(59,130,246,0.4)'}`,
              animation: `avatarPulse ${0.8 + i * 0.4}s ease-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }} />
          ))}
        </>
      )}

      <div style={{
        width: size * 0.78, height: size * 0.78, borderRadius: '50%',
        background: 'linear-gradient(135deg, #1e1e4a, #2d1f5e)',
        border: `2px solid ${pulse ? '#7c3aed' : 'rgba(124,58,237,0.3)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        boxShadow: pulse ? '0 0 30px rgba(124,58,237,0.4)' : 'none',
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{ fontSize: size * 0.35, lineHeight: 1, userSelect: 'none' }}>🤖</div>

        {speaking && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
            background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.2))',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            gap: 3, padding: '0 0 8px',
          }}>
            {[3, 6, 4, 8, 5, 7, 3].map((h, i) => (
              <div key={i} style={{
                width: 3, height: h * 1.5,
                background: '#a78bfa', borderRadius: 2,
                animation: `voiceBar 0.${5 + i}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.07}s`,
              }} />
            ))}
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute', bottom: 6, right: 6,
        width: 14, height: 14, borderRadius: '50%',
        background: pulse ? '#10b981' : '#374151',
        border: '2px solid #0a0a1a',
        transition: 'background 0.3s',
      }} />

      <style>{`
        @keyframes avatarPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes voiceBar {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}

export default AIAvatar