import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import { useAuth } from '../context/AuthContext'
import { getDashboardStats, getInterviewList } from '../api/interviewApi'
import { formatDate, getScoreColor } from '../utils/formatters'
import Button from '../components/common/Button'

const MOCK_STATS = { interviews: 12, avg_score: 78, best_score: 92, total_time: '8h 45m' }
const MOCK_INTERVIEWS = [
  { id: 1, type: 'Frontend Developer Interview', date: '2024-05-20', duration: 45, score: 85 },
  { id: 2, type: 'Backend Developer Interview',  date: '2024-05-18', duration: 50, score: 72 },
  { id: 3, type: 'Full Stack Developer Interview',date: '2024-05-16', duration: 60, score: 92 },
  { id: 4, type: 'React Developer Interview',     date: '2024-05-10', duration: 40, score: 85 },
]
const MOCK_SKILLS = [
  { label: 'JavaScript', value: 85 },
  { label: 'React',      value: 80 },
  { label: 'Node.js',    value: 72 },
  { label: 'System Design', value: 65 },
  { label: 'DSA',        value: 75 },
]
const TIP = '"Focus on clarity, break down complex problems, and speak your thought process."'

const StatCard = ({ label, value, icon }) => (
  <div style={{
    background: '#13132a', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, padding: '18px 20px',
  }}>
    <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
      {label}
    </p>
    <p style={{ fontSize: 26, fontWeight: 900, color: '#f1f5f9' }}>{value}</p>
  </div>
)

const SkillBar = ({ label, value }) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
      <span style={{ fontSize: 13, color: '#94a3b8' }}>{label}</span>
      <span style={{ fontSize: 13, color: '#f1f5f9', fontWeight: 700 }}>{value}%</span>
    </div>
    <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: 3,
        width: `${value}%`,
        background: value >= 80 ? 'linear-gradient(90deg,#10b981,#34d399)' :
                    value >= 70 ? 'linear-gradient(90deg,#3b82f6,#60a5fa)' :
                    'linear-gradient(90deg,#f59e0b,#fbbf24)',
        transition: 'width 1s ease',
      }} />
    </div>
  </div>
)

const DashboardPage = () => {
  const { user } = useAuth()
  const nav = useNavigate()
  const [stats] = useState(MOCK_STATS)
  const [interviews] = useState(MOCK_INTERVIEWS)

  return (
    <MainLayout>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#f1f5f9', marginBottom: 4 }}>
            Hello, {user?.username?.split(' ')[0] || 'Aditya'} 👋
          </h1>
          <p style={{ color: '#64748b', fontSize: 15 }}>Ready to practice today?</p>
        </div>
        <Button onClick={() => nav('/interview/setup')}>
          🚀 Start New Interview
        </Button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
        <StatCard label="Interviews Taken" value={stats.interviews} />
        <StatCard label="Avg. Score"        value={`${stats.avg_score}%`} />
        <StatCard label="Best Score"        value={`${stats.best_score}%`} />
        <StatCard label="Total Time"        value={stats.total_time} />
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Interviews */}
        <div style={{ background: '#13132a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>Recent Interviews</h3>
            <button onClick={() => nav('/interviews')} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
              View all
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {interviews.map(iv => (
              <div key={iv.id} onClick={() => nav(`/report/${iv.id}`)} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#1e1e4a,#2d1f5e)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
                }}>🤖</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{iv.type}</p>
                  <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{formatDate(iv.date)} · {iv.duration} min</p>
                </div>
                <div style={{
                  padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 800,
                  background: `${getScoreColor(iv.score)}18`,
                  color: getScoreColor(iv.score),
                }}>
                  {iv.score}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* AI Tip */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.06))',
            border: '1px solid rgba(124,58,237,0.2)', borderRadius: 14, padding: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span>💡</span>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>AI Tip of the Day</h4>
            </div>
            <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7, fontStyle: 'italic' }}>{TIP}</p>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#1e1e4a,#2d1f5e)', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🤖</div>
            </div>
          </div>

          {/* Skill Summary */}
          <div style={{ background: '#13132a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24, flex: 1 }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', marginBottom: 18 }}>Skill Summary</h4>
            {MOCK_SKILLS.map(s => <SkillBar key={s.label} {...s} />)}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default DashboardPage