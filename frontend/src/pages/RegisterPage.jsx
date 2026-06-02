import RegisterForm from "../components/auth/RegisterForm";
import "../styles/auth/auth-grid.css";

const RegisterPage = () => {
  return (
    <div className="auth-page">

      {/* Form */}

      <div
          className="auth-grid-bg"
          style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 60,
          position: "relative"
          }}
        >
        <div className="auth-purple-glow"></div>

        <div className="auth-form-wrapper">
        <RegisterForm />
        </div>
      </div>

      {/* Visual Side */}

      <div className="auth-visual-panel">

        <div className="auth-blue-glow"></div>
        <div className="auth-purple-glow"></div>

        <div className="auth-content">

  <div className="auth-badge">
    ⭐ Join 50,000+ Candidates
  </div>

  <h1 className="auth-hero-title">
    Become
    <span> Interview Ready</span>
  </h1>

  <p className="auth-hero-subtitle">
    Upload your resume, start personalized mock interviews,
    and receive actionable AI feedback to improve every round.
  </p>

  <div className="auth-feature-list">
    <div>✓ Resume-Based Questions</div>
    <div>✓ AI Feedback & Scoring</div>
    <div>✓ Multiple Job Roles</div>
    <div>✓ Industry Specific Practice</div>
  </div>

  <div className="auth-mini-card">
    <div className="auth-score-circle">
      92%
    </div>

    <div>
      <h4>Interview Readiness</h4>
      <p>Average improvement after 5 practice sessions.</p>
    </div>
  </div>

</div>

      </div>

    </div>
  );
};

export default RegisterPage;