import { useState } from 'react'

const Input = ({
  label, type = 'text', value, onChange, placeholder,
  error, icon, name, required, disabled,
}) => {
  const [show, setShow] = useState(false)
  const inputType = type === 'password' ? (show ? 'text' : 'password') : type

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8' }}>
          {label} {required && <span style={{ color: '#f87171' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            color: '#64748b', display: 'flex',
          }}>
            {icon}
          </span>
        )}
        <input
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${error ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 8,
            padding: `11px ${type === 'password' ? '40px' : '14px'} 11px ${icon ? '38px' : '14px'}`,
            color: '#f1f5f9',
            fontSize: 14,
            outline: 'none',
            transition: 'border-color 0.2s',
            fontFamily: 'inherit',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
          onBlur={e => e.target.style.borderColor = error ? '#ef4444' : 'rgba(255,255,255,0.1)'}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0,
              fontSize: 16,
            }}
          >
            {show ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      {error && <span style={{ fontSize: 12, color: '#f87171' }}>{error}</span>}
    </div>
  )
}

export default Input