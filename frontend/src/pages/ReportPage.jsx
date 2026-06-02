import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getReport } from '../api/interviewApi';
import toast from 'react-hot-toast';

// Mock data for display
const MOCK_REPORT = {
  role: 'Frontend Developer Interview',
  date: 'May 30, 2024 • 45 min',
  scores: { overall: 85, communication: 90, technical: 82, problemSolving: 83 },
  performanceData: [
    { time: '0m', score: 70 }, { time: '10m', score: 75 }, { time: '20m', score: 78 },
    { time: '30m', score: 82 }, { time: '40m', score: 85 }, { time: '45m', score: 85 },
  ],
  strengths: ['Good problem solving skills', 'Clear communication', 'Strong in React concepts'],
  improvements: ['System Design knowledge', 'Edge case handling', 'Time complexity techniques'],
  questionBreakdown: { correct: 10, partiallyCorrect: 5, incorrect: 2 },
  totalQuestions: 17,
  feedback: 'Great job! You have a solid understanding of frontend concepts. Work on system design and optimization techniques.',
};

function CircleScore({ score, label, color = '#8b5cf6' }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="circle-score">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={r} fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
        <text x="40" y="45" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="700">{score}%</text>
      </svg>
      <p className="circle-label">{label}</p>
    </div>
  );
}

export default function ReportPage() {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(MOCK_REPORT);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await getReport(interviewId);
        if (data) setReport(data);
      } catch {
        // Use mock data as fallback
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [interviewId]);

  const { correct, partiallyCorrect, incorrect } = report.questionBreakdown;
  const total = report.totalQuestions;

  return (
    <MainLayout>
      <div className="report-page">
        <div className="report-header">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <h1>{report.role}</h1>
            <p>{report.date}</p>
          </div>
          <button className="download-btn" onClick={() => toast('Downloading PDF...')}>
            <Download size={14} /> Download PDF
          </button>
        </div>

        {/* Score Cards */}
        <div className="scores-row">
          {[
            { label: 'Overall Score', score: report.scores.overall, color: '#8b5cf6' },
            { label: 'Communication', score: report.scores.communication, color: '#06b6d4' },
            { label: 'Technical', score: report.scores.technical, color: '#34d399' },
            { label: 'Problem Solving', score: report.scores.problemSolving, color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} className="score-box">
              <CircleScore score={s.score} label={s.label} color={s.color} />
            </div>
          ))}
        </div>

        <div className="report-grid">
          {/* Performance Over Time */}
          <div className="report-card span-2">
            <h3>Performance Over Time</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={report.performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
                <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 8, fontSize: 12 }}
                  itemStyle={{ color: '#a78bfa' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Strengths */}
          <div className="report-card">
            <h3><TrendingUp size={14} style={{ marginRight: 6, color: '#34d399' }} />Strengths</h3>
            <div className="list-items">
              {report.strengths.map((s, i) => (
                <div key={i} className="list-item green">
                  <CheckCircle size={13} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas to Improve */}
          <div className="report-card">
            <h3><AlertCircle size={14} style={{ marginRight: 6, color: '#f87171' }} />Areas to Improve</h3>
            <div className="list-items">
              {report.improvements.map((s, i) => (
                <div key={i} className="list-item red">
                  <XCircle size={13} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Question Breakdown */}
          <div className="report-card">
            <h3>Question Breakdown</h3>
            <div className="breakdown-body">
              <div className="donut-wrap">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  {/* Correct */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#34d399" strokeWidth="14"
                    strokeDasharray={`${(correct / total) * 220} 220`}
                    strokeDashoffset="0" transform="rotate(-90 50 50)" />
                  {/* Partially correct */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="14"
                    strokeDasharray={`${(partiallyCorrect / total) * 220} 220`}
                    strokeDashoffset={`-${(correct / total) * 220}`} transform="rotate(-90 50 50)" />
                  {/* Incorrect */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#f87171" strokeWidth="14"
                    strokeDasharray={`${(incorrect / total) * 220} 220`}
                    strokeDashoffset={`-${((correct + partiallyCorrect) / total) * 220}`} transform="rotate(-90 50 50)" />
                  <text x="50" y="54" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="700">{total}</text>
                </svg>
                <div className="donut-legend">
                  <div className="legend-item"><span style={{ background: '#34d399' }} /> Correct ({correct})</div>
                  <div className="legend-item"><span style={{ background: '#f59e0b' }} /> Partial ({partiallyCorrect})</div>
                  <div className="legend-item"><span style={{ background: '#f87171' }} /> Incorrect ({incorrect})</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="report-card">
            <h3>Feedback</h3>
            <p className="feedback-text">{report.feedback}</p>
            <div className="action-row">
              <button className="action-btn primary" onClick={() => navigate('/interview/setup')}>
                Practice Again
              </button>
              <button className="action-btn" onClick={() => navigate('/dashboard')}>
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .report-page { max-width: 1000px; }
        .report-header {
          display: flex; align-items: center; gap: 16px; margin-bottom: 28px;
        }
        .report-header h1 { color: #e2e8f0; font-size: 20px; font-weight: 700; margin: 0 0 2px; }
        .report-header p { color: #64748b; font-size: 13px; margin: 0; }
        .report-header > div { flex: 1; }
        .back-btn {
          display: flex; align-items: center; gap: 6px;
          background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.2);
          border-radius: 8px; padding: 8px 14px; color: #94a3b8; font-size: 13px; cursor: pointer;
          transition: all 0.15s;
        }
        .back-btn:hover { background: rgba(139,92,246,0.2); color: #e2e8f0; }
        .download-btn {
          display: flex; align-items: center; gap: 6px;
          background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.3);
          border-radius: 8px; padding: 9px 16px; color: #a78bfa; font-size: 13px;
          font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.15s;
        }
        .download-btn:hover { background: rgba(139,92,246,0.25); }
        .scores-row {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;
        }
        .score-box {
          background: rgba(15,12,30,0.7); border: 1px solid rgba(139,92,246,0.15);
          border-radius: 14px; padding: 20px 12px; display: flex; justify-content: center;
        }
        .circle-score { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .circle-label { color: #94a3b8; font-size: 12px; text-align: center; margin: 0; }
        .report-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .report-card {
          background: rgba(15,12,30,0.6); border: 1px solid rgba(139,92,246,0.12);
          border-radius: 14px; padding: 20px;
        }
        .report-card h3 { color: #94a3b8; font-size: 13px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; }
        .span-2 { grid-column: span 2; }
        .list-items { display: flex; flex-direction: column; gap: 10px; }
        .list-item { display: flex; align-items: center; gap: 8px; font-size: 13px; }
        .list-item.green { color: #34d399; }
        .list-item.red { color: #f87171; }
        .breakdown-body { display: flex; align-items: center; gap: 24px; }
        .donut-wrap { display: flex; align-items: center; gap: 20px; }
        .donut-legend { display: flex; flex-direction: column; gap: 8px; }
        .legend-item { display: flex; align-items: center; gap: 8px; color: #94a3b8; font-size: 12px; }
        .legend-item span { width: 10px; height: 10px; border-radius: 50%; display: block; }
        .feedback-text { color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 16px; }
        .action-row { display: flex; gap: 10px; }
        .action-btn {
          padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.15s; border: 1px solid rgba(139,92,246,0.2);
          background: transparent; color: #94a3b8;
        }
        .action-btn.primary { background: linear-gradient(135deg, #7c3aed, #8b5cf6); border-color: transparent; color: white; }
        .action-btn.primary:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(139,92,246,0.4); }
        @media (max-width: 768px) {
          .scores-row { grid-template-columns: 1fr 1fr; }
          .report-grid { grid-template-columns: 1fr; }
          .span-2 { grid-column: span 1; }
        }
      `}</style>
    </MainLayout>
  );
}