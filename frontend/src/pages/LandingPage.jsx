import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Button from '../components/common/Button'

const FEATURES = [
  { icon: '🤖', title: 'AI Powered', desc: 'Smart questions and real-time evaluation powered by GPT-4' },
  { icon: '🎙️', title: 'Real-time Voice', desc: 'Voice-based real-time interview simulation' },
  { icon: '⚡', title: 'Adaptive', desc: 'Questions adapt dynamically to your answers' },
  { icon: '📊', title: 'Insights', desc: 'Detailed performance analytics and feedback reports' },
]

const STEPS = [
  { step: '01', title: 'Upload Resume', desc: 'Upload your resume and let AI extract your skills and experience.' },
  { step: '02', title: 'Choose Interview', desc: 'Select the role type, difficulty level and duration.' },
  { step: '03', title: 'Start Interview', desc: 'AI conducts a real-time voice interview with adaptive questions.' },
  { step: '04', title: 'Get Report', desc: 'Receive a detailed performance report with actionable insights.' },
]

const PLANS = [
  { name: 'Free', price: '$0', period: '/month', features: ['3 interviews/month', 'Basic feedback', 'Resume analysis', '2 interview types'], cta: 'Get Started', highlight: false },
  { name: 'Pro', price: '$19', period: '/month', features: ['Unlimited interviews', 'Detailed AI feedback', 'Resume optimization', 'All interview types', 'Priority support', 'PDF reports'], cta: 'Start Free Trial', highlight: true },
  { name: 'Team', price: '$49', period: '/month', features: ['Everything in Pro', 'Team dashboard', 'Bulk invites', 'Custom questions', 'API access', 'Dedicated support'], cta: 'Contact Sales', highlight: false },
]

const STATS = [
  { value: '50K+', label: 'Interviews Taken' },
  { value: '92%', label: 'Success Rate' },
  { value: '4.9★', label: 'User Rating' },
  { value: '200+', label: 'Companies Hiring' },
]

const StatCard = ({ value, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: 36, fontWeight: 900, background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      {value}
    </div>
    <div style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>{label}</div>
  </div>
)

const LandingPage = () => {
  const nav = useNavigate()

  return (
    <div
  style={{
    minHeight: "100vh",
    overflowX: "hidden",

    backgroundColor: "#050816",

    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
    `,

    backgroundSize: "50px 50px",
  }}
>
      <Navbar landing />

      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 80px 80px', position: 'relative',
        background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(124,58,237,0.15) 0%, transparent 70%)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 20,
              background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)',
              fontSize: 13, color: '#a78bfa', fontWeight: 600, marginBottom: 28,
            }}>
              🚀 AI-Powered Mock Interviews
            </div>

            <h1 style={{ fontSize: 58, fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: -1 }}>
              <span style={{ color: '#f1f5f9' }}>Ace Your Next</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Interview with AI
              </span>
            </h1>

            <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Real-time AI Mock Interviews with voice interaction, adaptive questioning and intelligent feedback — practice until you're perfect.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Button size="lg" onClick={() => nav('/register')}>
                🎯 Get Started for Free
              </Button>
              <Button variant="secondary" size="lg" onClick={() => nav('/demo')}>
                ▶ Watch Demo
              </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginTop: 48 }}>
              {FEATURES.map(f => (
                <div key={f.title}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', marginBottom: 3 }}>{f.title}</p>
                  <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero robot illustration */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{
              width: 340, height: 340, borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 40%, rgba(124,58,237,0.3), rgba(59,130,246,0.1))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', animation: 'heroFloat 3s ease-in-out infinite',
            }}>
              <div style={{
                width: 240, height: 240, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e1e4a, #2d1f5e)',
                border: '2px solid rgba(124,58,237,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 100, boxShadow: '0 0 80px rgba(124,58,237,0.25)',
              }}>🤖</div>

              {/* Orbit dots */}
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{
                  position: 'absolute', width: 12, height: 12, borderRadius: '50%',
                  background: i % 2 === 0 ? '#7c3aed' : '#3b82f6',
                  top: `${15 + i * 22}%`, right: i % 2 === 0 ? '-5%' : '5%',
                  animation: `orbit ${2 + i * 0.5}s ease-in-out infinite alternate`,
                  boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(124,58,237,0.6)' : 'rgba(59,130,246,0.6)'}`,
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 80px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40 }}>
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: '100px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ color: '#a78bfa', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>How it Works</p>
            <h2 style={{ fontSize: 42, fontWeight: 900, color: '#f1f5f9', letterSpacing: -0.5 }}>Get hired in 4 simple steps</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
            {STEPS.map((s, i) => (
              <div key={s.step} style={{
                position: 'relative', padding: 28,
                background: '#13132a', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14, transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                {i < STEPS.length - 1 && (
                  <div style={{ position: 'absolute', top: '50%', right: -18, transform: 'translateY(-50%)', color: '#374151', fontSize: 20 }}>→</div>
                )}
                <div style={{ fontSize: 28, fontWeight: 900, color: 'rgba(124,58,237,0.3)', marginBottom: 16 }}>{s.step}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '100px 80px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ color: '#a78bfa', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>Pricing</p>
            <h2 style={{ fontSize: 42, fontWeight: 900, color: '#f1f5f9', letterSpacing: -0.5 }}>Simple, transparent pricing</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {PLANS.map(plan => (
              <div key={plan.name} style={{
                padding: 32, borderRadius: 16,
                background: plan.highlight ? 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.08))' : '#13132a',
                border: plan.highlight ? '2px solid rgba(124,58,237,0.5)' : '1px solid rgba(255,255,255,0.08)',
                position: 'relative',
              }}>
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    padding: '4px 18px', borderRadius: 20,
                    background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
                    fontSize: 12, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap',
                  }}>Most Popular</div>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#f1f5f9', marginBottom: 8 }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, color: plan.highlight ? '#a78bfa' : '#f1f5f9' }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: '#64748b' }}>{plan.period}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#94a3b8' }}>
                      <span style={{ color: '#10b981' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Button fullWidth variant={plan.highlight ? 'primary' : 'secondary'} onClick={() => nav('/register')}>
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '100px 80px', textAlign: 'center',
        background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)',
      }}>
        <h2 style={{ fontSize: 48, fontWeight: 900, color: '#f1f5f9', marginBottom: 16, letterSpacing: -1 }}>
          Ready to ace your interview?
        </h2>
        <p style={{ color: '#64748b', fontSize: 18, marginBottom: 36 }}>
          Join 50,000+ professionals who practice with AI Interview
        </p>
        <Button size="lg" onClick={() => nav('/register')}>🚀 Start For Free Today</Button>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>🤖</span>
          <span style={{ fontWeight: 800, background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI Interview
          </span>
        </div>
        <p style={{ color: '#64748b', fontSize: 13 }}>© 2025 AI Interview. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes orbit {
          from { transform: translateY(0) scale(1); }
          to { transform: translateY(-14px) scale(0.8); }
        }
      `}</style>
    </div>
  )
}

export default LandingPage