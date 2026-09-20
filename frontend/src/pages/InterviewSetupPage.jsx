import { useState } from 'react';
import {useNavigate,useSearchParams,} from "react-router-dom";
import {Code2,Server,Database,Layers,Brain,Clock,Mic,Video,ArrowRight,Upload,Edit3} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { startInterview } from '../api/interviewApi';

import toast from 'react-hot-toast';
import "../styles/InterviewSetupPage.css";

const ROLES = [
  {
    id: 'Frontend Developer',
    label: 'Frontend Developer',
    icon: Code2,
    color: '#61dafb'
  },
  {
    id: 'Backend Developer',
    label: 'Backend Developer',
    icon: Server,
    color: '#68a063'
  },
  {
    id: 'Full Stack Developer',
    label: 'Full Stack Developer',
    icon: Layers,
    color: '#8b5cf6'
  },
  {
    id: 'Data Engineer',
    label: 'Data Engineer',
    icon: Database,
    color: '#f59e0b'
  },
  {
    id: 'ML Engineer',
    label: 'ML Engineer',
    icon: Brain,
    color: '#ec4899'
  },
  {
  id: 'Other',
  label: 'Other',
  icon: Edit3,
  color: '#ffffff'
}
];

const DIFFICULTIES = [
  'easy',
  'medium',
  'hard'
];

const DURATIONS = [15, 30, 45, 60];

export default function InterviewSetupPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const urlResumeId = searchParams.get("resumeId");

  const [selectedResumeId, setSelectedResumeId] = useState(
    urlResumeId || ""
  );

  const [resumes, setResumes] = useState([]);

  const [role, setRole] = useState("Full Stack Developer");
  const [customRole, setCustomRole] = useState("");
  const [finalRole, setFinalRole] = useState("Full Stack Developer");
  const [difficulty, setDifficulty] = useState("medium");
  const [duration, setDuration] = useState(45);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [starting, setStarting] = useState(false);
  

  const handleResumeUpload = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  try {

    setUploading(true);

    const { data } =await uploadResume(file);
    console.log(data);

    setResumeId(data.resume.id);
    setAnalysis(data.resume.analysis);
    if (data.resume.analysis?.suggested_role) {
      setRole(data.resume.analysis.suggested_role);

      setFinalRole(data.resume.analysis.suggested_role);
    }

    toast.success(
      "Resume analyzed successfully"
    );

  } catch (err) {

    console.error(err);

    toast.error(
      err?.response?.data?.error ||
      "Failed to upload resume"
    );

  } finally {

    setUploading(false);
  }
};

  const handleStart = async () => {
  if (!selectedResumeId) {
    toast.error("Please select a resume first.");
    return;
  }

  try {
    setStarting(true);

    const { data } = await startInterview({
      resume_id: Number(selectedResumeId),
      role: finalRole,
      difficulty,
      duration_minutes: Number(duration),
    });

    toast.success("Interview Created");

    navigate(`/interview/room/${data.interview.id}`);
  } catch (err) {
    console.error(err);

    toast.error(
      err?.response?.data?.error ||
      "Failed to create interview"
    );
  } finally {
    setStarting(false);
  }
};

  return (
    <MainLayout>

      <div className="setup-page">

        <div className="page-header">
          <h1>Setup Your Interview</h1>
          <p>
            Upload resume and configure
            your interview
          </p>
        </div>

        <div className="setup-grid">

          <div className="setup-left">

            <div className="setup-section">
              <h2>Select Role</h2>

              <div className="role-grid">

                {
                  ROLES.map(
                    ({
                      id,
                      label,
                      icon: Icon,
                      color
                    }) => (

                      <button
                        key={id}
                        className={`role-card ${
                          role === id
                            ? 'selected'
                            : ''
                        }`}
                        onClick={() => {setRole(id);
                          if (id !== "Other") {
                            setFinalRole(id);
                          }
                        }}
                      >

                        <div
                          className="role-icon"
                          style={{
                            background:
                              `${color}18`,
                            color
                          }}
                        >
                          <Icon size={20} />
                        </div>

                        <span>
                          {label}
                        </span>

                      </button>
                    )
                  )
                }

              </div>
              {
              role === "Other" && (
              
                <div className="custom-role-box">

                  <input
                    type="text"
                    placeholder="Enter Your Role"
                    value={customRole}
                    onChange={(e) =>
                      setCustomRole(
                        e.target.value
                      )
                    }
                  />

                  <button
                    onClick={() => {
                    
                      if (!customRole.trim())
                        return;
                    
                      setFinalRole(customRole);

                      toast.success(
                        "Role Selected"
                      );
                    
                    }}
                  >
                    OK
                  </button>
                  
                </div>

              )
            }

            </div>
            

            <div className="setup-section">

              <h2>
                Difficulty
              </h2>

              <div className="pill-group">

                {
                  DIFFICULTIES.map(d => (

                    <button
                      key={d}
                      className={`pill ${
                        difficulty === d
                          ? 'active'
                          : ''
                      }`}
                      onClick={() =>
                        setDifficulty(d)
                      }
                    >
                      {
                        d.charAt(0)
                        .toUpperCase()
                        + d.slice(1)
                      }
                    </button>

                  ))
                }

              </div>

            </div>

            <div className="setup-section">

              <h2>

                <Clock
                  size={16}
                  style={{
                    marginRight: 6
                  }}
                />

                Duration

              </h2>

              <div className="pill-group">

                {
                  DURATIONS.map(d => (

                    <button
                      key={d}
                      className={`pill ${
                        duration === d
                          ? 'active'
                          : ''
                      }`}
                      onClick={() =>
                        setDuration(d)
                      }
                    >
                      {d} min
                    </button>

                  ))
                }

              </div>

            </div>

          </div>

          <div className="setup-right">

            <div className="settings-card">

              <h2>
                Interview Settings
              </h2>

              <div className="toggle-row">

                <div className="toggle-info">

                  <Mic
                    size={16}
                    color="#8b5cf6"
                  />

                  <div>

                    <p className="toggle-label">
                      Voice
                    </p>

                    <p className="toggle-desc">
                      Enable voice mode
                    </p>

                  </div>

                </div>

                <button
                  className={`toggle ${
                    voiceEnabled
                      ? 'on'
                      : ''
                  }`}
                  onClick={() =>
                    setVoiceEnabled(
                      !voiceEnabled
                    )
                  }
                >
                  <div className="toggle-knob" />
                </button>

              </div>

              <div className="toggle-row">

                <div className="toggle-info">

                  <Video
                    size={16}
                    color="#8b5cf6"
                  />

                  <div>

                    <p className="toggle-label">
                      Camera
                    </p>

                    <p className="toggle-desc">
                      Enable webcam
                    </p>

                  </div>

                </div>

                <button
                  className={`toggle ${
                    cameraEnabled
                      ? 'on'
                      : ''
                  }`}
                  onClick={() =>
                    setCameraEnabled(
                      !cameraEnabled
                    )
                  }
                >
                  <div className="toggle-knob" />
                </button>

              </div>

              <hr className="divider" />

              <div className="summary">

                <div className="summary-row">
                  <span>Role</span>
                  <span>{finalRole}</span>
                </div>

                <div className="summary-row">
                  <span>Difficulty</span>
                  <span>{difficulty}</span>
                </div>

                <div className="summary-row">
                  <span>Duration</span>
                  <span>{duration} min</span>
                </div>

              </div>

              <button
  type="button"
  className="start-btn"
  onClick={handleStart}
  disabled={starting}
>
  {starting ? (
    "Starting..."
  ) : (
    <>
      <ArrowRight size={18} />
      Start Interview
    </>
  )}
</button>

{!selectedResumeId && (
  <p
    style={{
      marginTop: 10,
      textAlign: "center",
      color: "#94a3b8",
      fontSize: 12,
    }}
  >
    Select a resume above to start the interview.
  </p>
)}

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}