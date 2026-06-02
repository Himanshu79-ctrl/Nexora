const ControlBtn = ({ icon, label, active, color = '#94a3b8', onClick }) => (
  <button onClick={onClick} style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    padding: '10px 16px', background: active ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${active ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', minWidth: 72, fontFamily: 'inherit',
  }}>
    <span style={{ fontSize: 20 }}>{icon}</span>
    <span style={{ fontSize: 11, color, fontWeight: 500 }}>{label}</span>
  </button>
)

const InterviewControls = ({ muted, videoOff, onMute, onVideo, onShare, onNotes, onSettings }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '16px 0' }}>
    <ControlBtn icon={muted ? '🎤' : '🔇'} label={muted ? 'Unmute' : 'Mute'} onClick={onMute}
      active={muted} color={muted ? '#f87171' : '#94a3b8'} />
    <ControlBtn icon={videoOff ? '🎥' : '📵'} label={videoOff ? 'Start Video' : 'Stop Video'}
      onClick={onVideo} active={videoOff} color={videoOff ? '#f87171' : '#94a3b8'} />
    <ControlBtn icon="🖥️" label="Share Screen" onClick={onShare} />
    <ControlBtn icon="📝" label="Notes" onClick={onNotes} />
    <ControlBtn icon="⚙️" label="Settings" onClick={onSettings} />
  </div>
)

export default InterviewControls