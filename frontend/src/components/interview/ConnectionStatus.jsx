const ConnectionStatus = ({ connected }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '5px 12px', borderRadius: 20,
    background: connected ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
    border: `1px solid ${connected ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
  }}>
    <div style={{
      width: 7, height: 7, borderRadius: '50%',
      background: connected ? '#10b981' : '#ef4444',
      boxShadow: connected ? '0 0 6px #10b981' : 'none',
      animation: connected ? 'connPulse 2s ease-in-out infinite' : 'none',
    }} />
    <span style={{ fontSize: 12, fontWeight: 600, color: connected ? '#34d399' : '#f87171' }}>
      {connected ? 'Connected' : 'Disconnected'}
    </span>
    <style>{`@keyframes connPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
  </div>
)

export default ConnectionStatus