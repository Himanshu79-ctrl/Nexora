const Loader = ({ size = 24, color = '#7c3aed' }) => (
  <span style={{
    display: 'inline-block',
    width: size, height: size,
    border: `3px solid rgba(124,58,237,0.2)`,
    borderTopColor: color,
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  }} />
)

export const SpinCSS = () => (
  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
)

export default Loader