import { useEffect, useState, useRef } from 'react'
import { formatDuration } from '../../utils/formatters'

const Timer = ({ running = true, initialSeconds = 0, onTick, warningAt = 300 }) => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const ref = useRef(null)

  useEffect(() => {
    if (!running) { clearInterval(ref.current); return }
    ref.current = setInterval(() => {
      setSeconds(s => { const n = s + 1; onTick?.(n); return n })
    }, 1000)
    return () => clearInterval(ref.current)
  }, [running, onTick])

  const warning = seconds >= warningAt
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '6px 14px', borderRadius: 20,
      background: warning ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)',
      border: `1px solid ${warning ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.1)'}`,
    }}>
      <span style={{ fontSize: 14 }}>⏱</span>
      <span style={{
        fontFamily: 'monospace', fontWeight: 700, fontSize: 16,
        color: warning ? '#f87171' : '#f1f5f9',
        animation: warning ? 'timerWarn 1s ease-in-out infinite alternate' : 'none',
      }}>
        {formatDuration(seconds)}
      </span>
      <style>{`@keyframes timerWarn { from { opacity: 1; } to { opacity: 0.5; } }`}</style>
    </div>
  )
}

export default Timer