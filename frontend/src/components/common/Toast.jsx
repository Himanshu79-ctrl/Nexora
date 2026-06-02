import { Toaster } from 'react-hot-toast'

const Toast = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3500,
      style: {
        background: '#1e1e3f',
        color: '#f1f5f9',
        border: '1px solid rgba(124,58,237,0.3)',
        borderRadius: '10px',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      },
      success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
      error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
    }}
  />
)

export default Toast