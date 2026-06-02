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

const RegisterForm = () => {
  const { register } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', agree: false })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handle = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.username.trim()) e.username = 'Username is required'
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (form.password.length < 6) e.password = 'Min 6 characters'
    if (!form.agree) e.agree = 'You must agree to terms'
    return e
  }

  const submit = async (e) => {
  e.preventDefault()

  const e2 = validate()

  if (Object.keys(e2).length) {
    setErrors(e2)
    return
  }

  setLoading(true)

  try {
    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      terms_accepted: form.agree,
    }

    await register(payload)
    nav('/dashboard')

  } catch (err) {
    console.log("Register Error:", err.response?.data)

    const data = err.response?.data

    setErrors({
      username: data?.username?.[0],
      email: data?.email?.[0],
      password: data?.password?.[0],
      general: data?.detail || ''
    })
  } finally {
    setLoading(false)
  }
}

  return (
    <div style={{ width: 360, maxWidth: '100%' }}>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#f1f5f9', marginBottom: 4 }}>Create Account</h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>Start your AI interview journey</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {OAUTH.map(({ icon, label, color }) => (
          <button key={label} style={{
            flex: 1, padding: '10px', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
            color, fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit',
          }}>{icon}</button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        <span style={{ color: '#64748b', fontSize: 12 }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
      </div>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Input label="Username" value={form.username} onChange={handle('username')}
          placeholder="Enter your  username" error={errors.username} required />
        <Input label="Email address" type="email" value={form.email} onChange={handle('email')}
          placeholder="Enter your email" error={errors.email} required />
        <Input label="Password" type="password" value={form.password} onChange={handle('password')}
          placeholder="Create a password" error={errors.password} required />

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <input type="checkbox" checked={form.agree} onChange={handle('agree')}
            style={{ accentColor: '#7c3aed', width: 15, height: 15 }} />
          <span style={{ fontSize: 12, color: '#94a3b8' }}>
            I agree to the{' '}
            <Link to="/terms" style={{ color: '#7c3aed' }}>Terms & Conditions</Link>
          </span>
        </label>
        {errors.agree && <p style={{ color: '#f87171', fontSize: 12 }}>{errors.agree}</p>}
        {errors.general && <p style={{ color: '#f87171', fontSize: 13, textAlign: 'center' }}>{errors.general}</p>}

        <Button type="submit" fullWidth loading={loading}>Sign Up</Button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#64748b' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#7c3aed', fontWeight: 600 }}>Login</Link>
      </p>
    </div>
  )
}

export default RegisterForm