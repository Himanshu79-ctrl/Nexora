import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getResumes } from '../../api/resumeApi'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/dashboard',        icon: '🏠', label: 'Dashboard'  },
  { to: '/interviews',       icon: '🎤', label: 'Interviews'  },
  { to: '/resume',           icon: '📄', label: 'Resume'      },
  { to: '/reports',          icon: '📊', label: 'Reports'     },
  { to: '/bookmarks',        icon: '🔖', label: 'Bookmarks'   },
  { to: '/settings',         icon: '⚙️', label: 'Settings'    },
]

const Sidebar = () => {
  const { user, logout } = useAuth()
  const [resumes, setResumes] = useState([])
  const [resumeOpen, setResumeOpen] = useState(false);
  const nav = useNavigate()
  useEffect(() => {
  const loadResumes = async () => {
    try {
      const { data } = await getResumes();
      setResumes(data);
    } catch (error) {
      console.error("Failed to load resumes:", error);
    }
  };

  loadResumes();

  window.addEventListener("resume-updated", loadResumes);

  return () => {
    window.removeEventListener("resume-updated", loadResumes);
  };
}, []);


  return (
    <aside style={{
      width: 220, minHeight: '100vh',
      background: '#0d0d24', borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
    }}>
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>🤖</span>
          <span style={{ fontWeight: 800, fontSize: 15, background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            AI Interview
          </span>
        </div>
      </div>

      <nav style={{flex: 1,minHeight: 0,overflowY: "auto",padding: "16px 12px",display: "flex",flexDirection: "column",gap: 4}}>
        {NAV.map(({ to, icon, label }) => (
          <div key={to}>
            <NavLink
            to={to}
            onClick={() => {
              if (label === "Resume") {
                setResumeOpen((prev) => !prev);
              }
            }}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              color: isActive ? "#a78bfa" : "#64748b",
              background: isActive
                ? "rgba(124,58,237,0.12)"
                : "transparent",
              textDecoration: "none",
              borderLeft: isActive
                ? "3px solid #7c3aed"
                : "3px solid transparent",
            })}
          >
      <span style={{ fontSize: 16 }}>{icon}</span>

      {label}

      {label === "Resume" && (
        <span style={{ marginLeft: "auto" }}>
          {resumeOpen ? "⌃" : "⌄"}
        </span>
      )}
    </NavLink>

    {label === "Resume" &&
      resumeOpen &&
      resumes.length > 0 && (
        <div
          style={{
            marginLeft: 18,
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {resumes.map((resume) => (
            <button
              key={resume.id}
              onClick={() =>
                nav(`/resume/${resume.id}`)
              }
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                padding: "7px 8px",
                textAlign: "left",
                fontSize: 12,
                cursor: "pointer",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={resume.title}
            >
              📄 {resume.title}
            </button>
          ))}
        </div>
      )}
  </div>
))}
      </nav>

      <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.username || 'User'}</p>
            <p style={{ fontSize: 11, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
          </div>
        </div>
        <button onClick={logout} style={{
          width: '100%', marginTop: 4, padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'none', border: 'none', color: '#64748b',
          fontSize: 14, cursor: 'pointer', borderRadius: 8, transition: 'all 0.2s',
          fontFamily: 'inherit',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar