import { useState } from 'react'
import { FaGithub } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Input from '../common/Input'
import Button from '../common/Button'

const OAUTH = [
  { icon: 'G', label: 'Google', color: '#ea4335' },
  { icon: <FaGithub />, label: 'GitHub', color: '#fff' },
  { icon: 'in', label: 'LinkedIn', color: '#0077b5' },
]

const LoginForm = () => {
  const { login } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ login: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError(''); 
    setLoading(true)
    try {
      await login(form)
      nav('/dashboard')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ width: 360, maxWidth: '100%' }}>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#f1f5f9', marginBottom: 4 }}>Welcome Back</h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>Login to continue your journey</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {OAUTH.map(({ icon, label, color }) => (
          <button key={label} style={{
            flex: 1, padding: '10px', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
            color, fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
          >{icon}</button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        <span style={{ color: '#64748b', fontSize: 12 }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
      </div>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input label="Email or Username" type="text" value={form.login}
          onChange={handle('login')} placeholder="Enter email or username" required />
        <Input label="Password" type="password" value={form.password}
          onChange={handle('password')} placeholder="Enter your password" required />

        <div style={{ textAlign: 'right' }}>
          <Link to="/forgot-password" style={{ fontSize: 12, color: '#7c3aed' }}>Forgot password?</Link>
        </div>

        {error && <p style={{ color: '#f87171', fontSize: 13, textAlign: 'center' }}>{error}</p>}

        <Button type="submit" fullWidth loading={loading}>Login</Button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#64748b' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#7c3aed', fontWeight: 600 }}>Sign up</Link>
      </p>
    </div>
  )
}

export default LoginForm