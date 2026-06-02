import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Server, Database, Layers, Brain, Clock, BarChart2, Mic, Video, ArrowRight } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { startInterview } from '../api/interviewApi';
import toast from 'react-hot-toast';
import "../styles/InterviewSetupPage.css";

const ROLES = [
  { id: 'frontend', label: 'Frontend Developer', icon: Code2, color: '#61dafb' },
  { id: 'backend', label: 'Backend Developer', icon: Server, color: '#68a063' },
  { id: 'fullstack', label: 'Full Stack Developer', icon: Layers, color: '#8b5cf6' },
  { id: 'data', label: 'Data Engineer', icon: Database, color: '#f59e0b' },
  { id: 'ml', label: 'ML Engineer', icon: Brain, color: '#ec4899' },
];

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const DURATIONS = [15, 30, 45, 60];

export default function InterviewSetupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('fullstack');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [duration, setDuration] = useState(45);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [starting, setStarting] = useState(false);

  const handleStart = async () => {
    try {
      setStarting(true);
      const session = await startInterview({ role, difficulty, duration, voiceEnabled });
      toast.success('Interview starting!');
      navigate(`/interview/room/${session.sessionId}`);
    } catch (err) {
      toast.error(err.message || 'Failed to start interview');
      setStarting(false);
    }
  };

  return (
    <MainLayout>
      <div className="setup-page">
        <div className="page-header">
          <h1>Setup Your Interview</h1>
          <p>Configure your mock interview session</p>
        </div>

        <div className="setup-grid">
          <div className="setup-left">
            {/* Role Selection */}
            <div className="setup-section">
              <h2>Select Role</h2>
              <div className="role-grid">
                {ROLES.map(({ id, label, icon: Icon, color }) => (
                  <button
                    key={id}
                    className={`role-card ${role === id ? 'selected' : ''}`}
                    onClick={() => setRole(id)}
                  >
                    <div className="role-icon" style={{ background: `${color}18`, color }}>
                      <Icon size={20} />
                    </div>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="setup-section">
              <h2>Difficulty Level</h2>
              <div className="pill-group">
                {DIFFICULTIES.map(d => (
                  <button
                    key={d}
                    className={`pill ${difficulty === d ? 'active' : ''}`}
                    onClick={() => setDifficulty(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="setup-section">
              <h2><Clock size={16} style={{ display: 'inline', marginRight: 6 }} />Duration</h2>
              <div className="pill-group">
                {DURATIONS.map(d => (
                  <button
                    key={d}
                    className={`pill ${duration === d ? 'active' : ''}`}
                    onClick={() => setDuration(d)}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview + Settings */}
          <div className="setup-right">
            <div className="settings-card">
              <h2>Interview Settings</h2>

              <div className="toggle-row">
                <div className="toggle-info">
                  <Mic size={16} color="#8b5cf6" />
                  <div>
                    <p className="toggle-label">Voice Mode</p>
                    <p className="toggle-desc">Answer questions verbally</p>
                  </div>
                </div>
                <button
                  className={`toggle ${voiceEnabled ? 'on' : ''}`}
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                >
                  <div className="toggle-knob" />
                </button>
              </div>

              <div className="toggle-row">
                <div className="toggle-info">
                  <Video size={16} color="#8b5cf6" />
                  <div>
                    <p className="toggle-label">Camera</p>
                    <p className="toggle-desc">Enable webcam during interview</p>
                  </div>
                </div>
                <button
                  className={`toggle ${cameraEnabled ? 'on' : ''}`}
                  onClick={() => setCameraEnabled(!cameraEnabled)}
                >
                  <div className="toggle-knob" />
                </button>
              </div>

              <hr className="divider" />

              {/* Summary */}
              <div className="summary">
                <div className="summary-row">
                  <span>Role</span>
                  <span>{ROLES.find(r => r.id === role)?.label}</span>
                </div>
                <div className="summary-row">
                  <span>Difficulty</span>
                  <span>{difficulty}</span>
                </div>
                <div className="summary-row">
                  <span>Duration</span>
                  <span>{duration} minutes</span>
                </div>
                <div className="summary-row">
                  <span>Voice</span>
                  <span>{voiceEnabled ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>

              <button
                className="start-btn"
                onClick={handleStart}
                disabled={starting}
              >
                {starting ? 'Starting...' : (
                  <><ArrowRight size={18} /> Start Interview</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}