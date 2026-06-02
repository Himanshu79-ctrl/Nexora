import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InterviewHeader from '../components/interview/InterviewHeader';
import AIAvatar from '../components/interview/AIAvatar';
import QuestionCard from '../components/interview/QuestionCard';
import LiveTranscript from '../components/interview/LiveTranscript';
import WebcamPanel from '../components/interview/WebcamPanel';
import InterviewControls from '../components/interview/InterviewControls';
import ConnectionStatus from '../components/interview/ConnectionStatus';
import InterviewLoader from '../components/interview/InterviewLoader';
import { useWebcam } from '../hooks/useWebcam';
import { useInterview } from '../hooks/useInterview';
import toast from 'react-hot-toast';

export default function InterviewRoomPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { stream, isEnabled: camEnabled, toggleCamera } = useWebcam();
  const {
    loading, connected, currentQuestion, questionNumber, totalQuestions,
    transcript, isSpeaking, isListening, isThinking, isMuted, toggleMute, endInterview,
  } = useInterview(sessionId);

  const [videoOff, setVideoOff] = useState(false);

  const handleEnd = async () => {
    try {
      const result = await endInterview();
      toast.success('Interview completed!');
      navigate(`/report/${result?.interviewId || sessionId}`);
    } catch {
      navigate('/dashboard');
    }
  };

  const handleToggleVideo = () => {
    setVideoOff(v => !v);
    toggleCamera();
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#080618', display: 'flex', flexDirection: 'column' }}>
        <InterviewHeader onEnd={handleEnd} />
        <InterviewLoader message="Connecting to AI Interviewer..." />
      </div>
    );
  }

  return (
    <div className="room-wrapper">
      <InterviewHeader sessionId={sessionId} onEnd={handleEnd} />

      <div className="room-body">
        {/* Left panel - AI + Question */}
        <div className="left-panel">
          <div className="ai-panel">
            <AIAvatar isSpeaking={isSpeaking} isListening={isListening} isThinking={isThinking} />
            <ConnectionStatus status={connected ? 'connected' : 'connecting'} />
          </div>
          <QuestionCard
            question={currentQuestion}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
          />
          <LiveTranscript messages={transcript} />
        </div>

        {/* Right panel - Webcam + Transcript */}
        <div className="right-panel">
          <WebcamPanel stream={stream} isEnabled={camEnabled && !videoOff} />
          <div className="thinking-state">
            {isThinking && (
              <div className="thinking-badge">
                <div className="think-dot" />
                <div className="think-dot" />
                <div className="think-dot" />
                <span>Thinking...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <InterviewControls
        isMuted={isMuted}
        isVideoOff={videoOff}
        onToggleMute={toggleMute}
        onToggleVideo={handleToggleVideo}
        onShareScreen={() => toast('Screen sharing coming soon')}
        onOpenNotes={() => toast('Notes panel coming soon')}
        onOpenSettings={() => toast('Settings coming soon')}
        onEnd={handleEnd}
      />

      <style>{`
        .room-wrapper {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #080618;
          overflow: hidden;
        }
        .room-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 0;
          overflow: hidden;
        }
        .left-panel {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          overflow-y: auto;
          border-right: 1px solid rgba(139, 92, 246, 0.1);
        }
        .ai-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px;
          background: rgba(15, 12, 30, 0.5);
          border: 1px solid rgba(139, 92, 246, 0.12);
          border-radius: 16px;
        }
        .right-panel {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: rgba(10, 8, 20, 0.5);
          overflow-y: auto;
        }
        .thinking-state { min-height: 36px; }
        .thinking-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.25);
          border-radius: 20px;
          padding: 6px 14px;
          color: #a78bfa;
          font-size: 13px;
          font-weight: 500;
        }
        .think-dot {
          width: 5px;
          height: 5px;
          background: #a78bfa;
          border-radius: 50%;
          animation: thinking 1.2s ease-in-out infinite;
        }
        .think-dot:nth-child(2) { animation-delay: 0.2s; }
        .think-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes thinking {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}