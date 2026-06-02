import { useState, useEffect } from 'react'

const STEPS = [
  'Analyzing your resume...',
  'Preparing personalized questions...',
  'Setting up AI interviewer...',
  'Almost ready...',
]

const InterviewLoader = ({ onReady }) => {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        const np = p + 1.5
        if (np >= 100) { clearInterval(t); onReady?.(); return 100 }
        setStep(Math.floor(np / 25))
        return np
      })
    }, 60)
    return () => clearInterval(t)
  }, [onReady])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', gap: 28,
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e1e4a, #2d1f5e)',
          border: '3px solid rgba(124,58,237,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 44, boxShadow: '0 0 40px rgba(124,58,237,0.3)',
          animation: 'float 2s ease-in-out infinite',
        }}>🤖</div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 8 }}>
          Setting Up Your Interview
        </h2>
        <p style={{ color: '#a78bfa', fontSize: 14, minHeight: 20 }}>{STEPS[Math.min(step, STEPS.length - 1)]}</p>
      </div>

      <div style={{ width: 320 }}>
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, height: 8, overflow: 'hidden' }}>
          <div style={{
            width: `${progress}%`, height: '100%',
            background: 'linear-gradient(90deg, #7c3aed, #3b82f6)',
            borderRadius: 10, transition: 'width 0.1s',
          }} />
        </div>
        <p style={{ textAlign: 'right', fontSize: 12, color: '#64748b', marginTop: 6 }}>{Math.round(progress)}%</p>
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}

export default InterviewLoader