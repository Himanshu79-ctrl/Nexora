import LoginForm from "../components/auth/LoginForm";
import Navbar from "../components/layout/Navbar";
import "../styles/auth/auth-grid.css";

const LoginPage = () => {
  return (
    <div className="auth-page">

      {/* Left Side */}

      <div className="auth-visual-panel">

        <div className="auth-blue-glow"></div>
        <div className="auth-purple-glow"></div>

        <div className="auth-content">

          <div className="auth-badge">
            🚀 AI Mock Interview Platform
          </div>

          <h1 className="auth-hero-title">
            Crack Your
            <span> Dream Job</span>
          </h1>

          <p className="auth-hero-subtitle">
            Practice with an AI interviewer that asks real interview questions,
            analyzes your answers, and helps you improve before the actual interview.
          </p>

          <div className="auth-feature-list">
            <div>🎤 Real-Time Voice Interviews</div>
            <div>🤖 AI Generated Questions</div>
            <div>📊 Detailed Performance Reports</div>
            <div>🚀 Track Your Progress</div>
          </div>

          <div className="auth-stats">

            <div className="auth-stat-card">
              <h3>50K+</h3>
              <span>Users</span>
            </div>

            <div className="auth-stat-card">
              <h3>92%</h3>
              <span>Success</span>
            </div>

            <div className="auth-stat-card">
              <h3>4.9★</h3>
              <span>Rating</span>
            </div>

          </div>
        </div>
      </div>

      {/* Right Side */}

      <div
        className="auth-grid-bg"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative"
        }}
      >
      <div className="auth-purple-glow"></div>

      <div className="auth-form-wrapper">
        <LoginForm />
      </div>
    </div>
  </div>
  );
};

export default LoginPage;