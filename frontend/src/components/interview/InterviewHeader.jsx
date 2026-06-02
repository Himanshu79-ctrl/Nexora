import { useNavigate } from 'react-router-dom'
import Timer from './Timer'
import Button from '../common/Button'
import ConnectionStatus from './ConnectionStatus'

const InterviewHeader = ({ title, connected, running, onEnd }) => {
  const nav = useNavigate()

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 28px', background: '#0d0d24',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 800, fontSize: 16 }}>🤖 AI Interview</span>
        <span style={{ color: '#64748b', fontSize: 13 }}>•</span>
        <span style={{ color: '#94a3b8', fontSize: 14 }}>{title}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <ConnectionStatus connected={connected} />
        <Timer running={running} />
        <Button variant="danger" size="sm" onClick={onEnd}>End Interview</Button>
      </div>
    </header>
  )
}

export default InterviewHeader