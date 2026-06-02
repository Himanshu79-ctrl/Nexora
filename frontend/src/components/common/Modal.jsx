import { useEffect } from 'react'

const Modal = ({ open, onClose, title, children, width = 480 }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#13132a', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16, padding: 28, width, maxWidth: '100%',
          animation: 'modalIn 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9' }}>{title}</h3>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#64748b',
            cursor: 'pointer', fontSize: 20, lineHeight: 1,
          }}>✕</button>
        </div>
        {children}
      </div>
      <style>{`@keyframes modalIn { from { opacity:0; transform: scale(0.95); } to { opacity:1; transform:scale(1); } }`}</style>
    </div>
  )
}

export default Modal