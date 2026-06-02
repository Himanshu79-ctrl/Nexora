import Loader from './Loader'

const PageLoader = ({ text = 'Loading...' }) => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    background: 'var(--bg-primary)',
  }}>
    <div style={{ position: 'relative' }}>
      <Loader size={48} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
      }}>🤖</div>
    </div>
    <p style={{ color: '#64748b', fontSize: 14 }}>{text}</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)

export default PageLoader