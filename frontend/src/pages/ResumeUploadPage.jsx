import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, X, CheckCircle, Sparkles, Trash2 } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { uploadResume, analyzeResume } from '../api/resumeApi';
import toast from 'react-hot-toast';

const SKILL_COLORS = {
  JavaScript: '#f7df1e', React: '#61dafb', 'Node.js': '#68a063',
  ExpressJS: '#999', MongoDB: '#4faa41', HTML: '#e34c26',
  CSS: '#2965f1', 'Tailwind CSS': '#38bdf8', Git: '#f05032',
  'REST API': '#6366f1', Python: '#3776ab', Docker: '#2496ed',
};

export default function ResumeUploadPage() {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [recentUploads, setRecentUploads] = useState([]);

  const handleFile = useCallback((f) => {
    if (!f) return;
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(f.type)) {
      toast.error('Only PDF or DOCX files allowed');
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error('File size must be under 5MB');
      return;
    }
    setFile(f);
    setAnalysis(null);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('resume', file);
      const uploadRes = await uploadResume(formData);
      setRecentUploads(prev => [{ name: file.name, id: uploadRes.id, date: new Date() }, ...prev]);
      toast.success('Resume uploaded!');

      setUploading(false);
      setAnalyzing(true);
      const result = await analyzeResume(uploadRes.id);
      setAnalysis(result);
      toast.success('Analysis complete!');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      setAnalyzing(false);
    }
  };

  return (
    <MainLayout>
      <div className="resume-page">
        <div className="page-header">
          <h1>Resume Analysis</h1>
          <p>Upload your resume and let AI analyze your skills</p>
        </div>

        <div className="resume-grid">
          {/* Upload Section */}
          <div className="upload-section">
            <div
              className={`drop-zone ${dragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="file-preview">
                  <div className="file-icon">
                    <FileText size={32} color="#8b5cf6" />
                  </div>
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">{(file.size / 1024).toFixed(0)} KB</p>
                  <button className="remove-btn" onClick={() => setFile(null)}>
                    <X size={14} /> Remove
                  </button>
                </div>
              ) : (
                <div className="drop-content">
                  <div className="drop-icon">
                    <Upload size={28} color="#8b5cf6" />
                  </div>
                  <p className="drop-title">Drag & drop your resume here</p>
                  <p className="drop-or">or</p>
                  <label className="choose-btn">
                    Choose File
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      hidden
                      onChange={(e) => handleFile(e.target.files[0])}
                    />
                  </label>
                  <p className="drop-hint">PDF, DOCX (Max. 5MB)</p>
                </div>
              )}
            </div>

            {file && (
              <button
                className="analyze-btn"
                onClick={handleUploadAndAnalyze}
                disabled={uploading || analyzing}
              >
                {uploading ? 'Uploading...' : analyzing ? 'Analyzing...' : (
                  <><Sparkles size={16} /> Analyze Resume</>
                )}
              </button>
            )}

            {/* Recent Uploads */}
            {recentUploads.length > 0 && (
              <div className="recent-uploads">
                <h3>Recent Uploads</h3>
                {recentUploads.map((u, i) => (
                  <div key={i} className="upload-item">
                    <FileText size={16} color="#8b5cf6" />
                    <div className="upload-info">
                      <p className="upload-name">{u.name}</p>
                      <p className="upload-date">Uploaded {u.date.toLocaleDateString()}</p>
                    </div>
                    <button className="view-analysis-btn" onClick={() => {}}>
                      View Analysis
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Analysis Results */}
          {(analyzing || analysis) && (
            <div className="analysis-section">
              {analyzing ? (
                <div className="analyzing-state">
                  <div className="analyze-spinner" />
                  <p>AI is analyzing your resume...</p>
                </div>
              ) : (
                <>
                  {/* Extracted Skills */}
                  <div className="analysis-card">
                    <h3>Extracted Skills</h3>
                    <div className="skills-grid">
                      {(analysis?.skills || ['JavaScript', 'React', 'Node.js', 'ExpressJS', 'MongoDB', 'HTML', 'CSS', 'Tailwind CSS', 'Git', 'REST API']).map(skill => (
                        <span key={skill} className="skill-tag" style={{ borderColor: `${SKILL_COLORS[skill] || '#8b5cf6'}40`, color: SKILL_COLORS[skill] || '#a78bfa' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="analysis-card">
                    <h3>AI Summary</h3>
                    <p className="ai-summary">
                      {analysis?.summary || 'Your resume looks strong! You have good experience in full stack development. Focus more on System Design and Advanced DSA to improve your chances.'}
                    </p>
                  </div>

                  {/* Match Score */}
                  <div className="analysis-card score-card">
                    <div className="score-circle">
                      <svg viewBox="0 0 36 36" width="80" height="80">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray={`${analysis?.score || 85}, 100`} strokeLinecap="round" />
                        <text x="18" y="20.35" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="700">{analysis?.score || 85}%</text>
                      </svg>
                    </div>
                    <div>
                      <p className="score-label">Resume Match Score</p>
                      <p className="score-desc">Based on skill analysis</p>
                    </div>
                  </div>

                  <button
                    className="start-interview-btn"
                    onClick={() => navigate('/interview/setup')}
                  >
                    Start Interview Based on Resume →
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .resume-page { max-width: 1000px; }
        .page-header { margin-bottom: 28px; }
        .page-header h1 { color: #e2e8f0; font-size: 26px; font-weight: 700; margin: 0 0 6px; }
        .page-header p { color: #64748b; font-size: 14px; margin: 0; }
        .resume-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .upload-section { display: flex; flex-direction: column; gap: 16px; }
        .drop-zone {
          background: rgba(139, 92, 246, 0.04);
          border: 2px dashed rgba(139, 92, 246, 0.3);
          border-radius: 16px;
          padding: 48px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          cursor: pointer;
          min-height: 220px;
        }
        .drop-zone.drag-over {
          border-color: #8b5cf6;
          background: rgba(139, 92, 246, 0.1);
        }
        .drop-zone.has-file {
          border-color: rgba(139, 92, 246, 0.5);
          background: rgba(139, 92, 246, 0.06);
        }
        .drop-content { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .drop-icon {
          width: 64px; height: 64px;
          background: rgba(139, 92, 246, 0.12);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px;
        }
        .drop-title { color: #94a3b8; font-size: 15px; font-weight: 500; margin: 0; }
        .drop-or { color: #475569; font-size: 13px; margin: 0; }
        .drop-hint { color: #475569; font-size: 12px; margin: 0; }
        .choose-btn {
          padding: 10px 24px;
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
          border-radius: 10px;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .choose-btn:hover { opacity: 0.9; }
        .file-preview { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .file-icon { width: 60px; height: 60px; background: rgba(139,92,246,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .file-name { color: #e2e8f0; font-size: 14px; font-weight: 600; margin: 0; }
        .file-size { color: #64748b; font-size: 12px; margin: 0; }
        .remove-btn { display: flex; align-items: center; gap: 4px; background: none; border: 1px solid rgba(239,68,68,0.3); border-radius: 6px; color: #f87171; font-size: 12px; padding: 4px 10px; cursor: pointer; }
        .analyze-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .analyze-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .analyze-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(139,92,246,0.4); }
        .recent-uploads h3 { color: #94a3b8; font-size: 13px; font-weight: 600; margin: 0 0 10px; }
        .upload-item { display: flex; align-items: center; gap: 10px; padding: 10px; background: rgba(139,92,246,0.06); border: 1px solid rgba(139,92,246,0.15); border-radius: 10px; }
        .upload-info { flex: 1; }
        .upload-name { color: #e2e8f0; font-size: 13px; font-weight: 600; margin: 0; }
        .upload-date { color: #64748b; font-size: 11px; margin: 0; }
        .view-analysis-btn { padding: 5px 12px; background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.3); border-radius: 6px; color: #a78bfa; font-size: 11px; cursor: pointer; white-space: nowrap; }
        .analysis-section { display: flex; flex-direction: column; gap: 16px; }
        .analyzing-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; gap: 16px; color: #94a3b8; font-size: 14px; }
        .analyze-spinner { width: 40px; height: 40px; border: 3px solid rgba(139,92,246,0.2); border-top-color: #8b5cf6; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .analysis-card { background: rgba(15,12,30,0.6); border: 1px solid rgba(139,92,246,0.15); border-radius: 14px; padding: 18px; }
        .analysis-card h3 { color: #94a3b8; font-size: 13px; font-weight: 600; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag { padding: 4px 12px; background: rgba(139,92,246,0.08); border: 1px solid; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .ai-summary { color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 0; }
        .score-card { display: flex; align-items: center; gap: 16px; }
        .score-label { color: #e2e8f0; font-size: 14px; font-weight: 600; margin: 0 0 4px; }
        .score-desc { color: #64748b; font-size: 12px; margin: 0; }
        .start-interview-btn {
          padding: 14px;
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .start-interview-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(139,92,246,0.4); }
        @media (max-width: 768px) { .resume-grid { grid-template-columns: 1fr; } }
      `}</style>
    </MainLayout>
  );
}