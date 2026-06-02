import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { InterviewProvider } from './context/InterviewContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';
import './styles/theme.css';

export default function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a2e',
              color: '#e2e8f0',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#8b5cf6', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </InterviewProvider>
    </AuthProvider>
  );
}