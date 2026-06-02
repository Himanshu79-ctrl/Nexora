import Sidebar from './Sidebar'

const MainLayout = ({ children }) => (
  <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
    <Sidebar />
    <main style={{ flex: 1, marginLeft: 220, padding: '32px', overflowY: 'auto', minHeight: '100vh' }}>
      {children}
    </main>
  </div>
)

export default MainLayout