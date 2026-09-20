import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import InterviewHeader from "../components/interview/InterviewHeader";
import AIAvatar from "../components/interview/AIAvatar";
import QuestionCard from "../components/interview/QuestionCard";
import LiveTranscript from "../components/interview/LiveTranscript";
import WebcamPanel from "../components/interview/WebcamPanel";
import InterviewControls from "../components/interview/InterviewControls";
import ConnectionStatus from "../components/interview/ConnectionStatus";
import InterviewLoader from "../components/interview/InterviewLoader";

import { useInterview } from "../hooks/useInterview";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

import { useWebcam } from "../hooks/useWebcam";

export default function InterviewRoomPage() {
  const navigate = useNavigate();

  const { sessionId } = useParams();

 const {
  connected,
  currentQuestion,
  transcript,
  submitUserAnswer,
  finish,
  wsMessage,
  loading,
  thinking,
  isSpeaking,
} = useInterview(sessionId);

  const {
    stream,

    isEnabled,

    toggleCamera,
  } = useWebcam();



  const [videoOff, setVideoOff] = useState(false);

  const [muted, setMuted] = useState(false);

//   const [lastSpokenQuestion, setLastSpokenQuestion] = useState("");

  const transcriptRef = useRef(null);

  /*
    -----------------------------------
    Speech Recognition
    -----------------------------------
    */

  const {
    isListening,

    interimText,

    start,

    stop: stopListening,
 } = useSpeechRecognition(async (finalText) => {
  if (!finalText.trim()) return;

  stopListening();
  await submitUserAnswer(finalText);
});



  /*
    -----------------------------------
    Auto Scroll Transcript
    -----------------------------------
    */

  useEffect(() => {
    if (!transcriptRef.current) return;

    transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [transcript]);

  /*
    -----------------------------------
    Auto Listen

    Once AI finishes speaking,
    microphone starts automatically.
    -----------------------------------
    */

 useEffect(() => {
  if (!currentQuestion) return;
  if (isSpeaking) return;
  if (isListening) return;
  if (muted) return;

  const timer = setTimeout(() => {
    start();
  }, 500);

  return () => clearTimeout(timer);
}, [currentQuestion, isSpeaking, isListening, muted, start]);

  /*
    -----------------------------------
    Handle End Interview
    -----------------------------------
    */

const handleEndInterview = useCallback(async () => {
  try {
    stopListening();

    const report = await finish();

    toast.success("Interview Completed");
    navigate(`/report/${report.interview_id}`);
  } catch (error) {
    console.error(error);
    toast.error("Unable to finish interview.");
  }
}, [finish, navigate, stopListening]);

  /*
    -----------------------------------
    Toggle Camera
    -----------------------------------
    */

  const handleToggleCamera = () => {
    setVideoOff((previous) => !previous);

    toggleCamera();
  };

  /*
    -----------------------------------
    Toggle Mic
    -----------------------------------
    */

  const handleToggleMute = () => {
    if (muted) {
      start();
    } else {
      stopListening();
    }

    setMuted((previous) => !previous);
  };

  /*
    -----------------------------------
    Loading Screen
    -----------------------------------
    */

  if (loading) {
    return <InterviewLoader message="Preparing your AI Interview..." />;
  }
  return (
    <div className="room-wrapper">
        <InterviewHeader
            title="AI Interview"
            connected={connected}
            running={true}
            onEnd={handleEndInterview}
        />

      <div className="room-body">
        {/* LEFT PANEL */}

        <div className="left-panel">
          <div className="ai-panel">
            <AIAvatar speaking={isSpeaking} listening={isListening} />

            <ConnectionStatus connected={connected} />
          </div>

          <QuestionCard
            question={
              typeof currentQuestion === "string"
                ? {
                    text: currentQuestion,
                  }
                : currentQuestion
            }
            index={transcript.length / 2}
          />

          <div
            ref={transcriptRef}
            style={{
              flex: 1,

              overflowY: "auto",
            }}
          >
            <LiveTranscript messages={transcript} />
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="right-panel">
          <WebcamPanel stream={stream} isEnabled={isEnabled && !videoOff} />

          {thinking && <div className="thinking-badge">AI is thinking...</div>}

          {interimText && (
            <div className="live-transcript">
              <strong>You:</strong> {interimText}
            </div>
          )}
        </div>
      </div>

      <InterviewControls
        muted={muted}
        videoOff={videoOff}
        onMute={handleToggleMute}
        onVideo={handleToggleCamera}
        onShare={() => toast("Coming Soon")}
        onNotes={() => toast("Coming Soon")}
        onSettings={() => toast("Coming Soon")}
      />

      <style>
        {`

                .room-wrapper{

                    display:flex;

                    flex-direction:column;

                    height:100vh;

                    background:#09090f;

                }

                .room-body{

                    flex:1;

                    display:grid;

                    grid-template-columns:1fr 330px;

                    overflow:hidden;

                }

                .left-panel{

                    display:flex;

                    flex-direction:column;

                    padding:24px;

                    gap:20px;

                    overflow:hidden;

                }

                .right-panel{

                    border-left:1px solid rgba(255,255,255,.08);

                    padding:20px;

                    display:flex;

                    flex-direction:column;

                    gap:20px;

                }

                .ai-panel{

                    display:flex;

                    flex-direction:column;

                    align-items:center;

                    justify-content:center;

                    padding:30px;

                    border-radius:18px;

                    background:rgba(255,255,255,.03);

                    border:1px solid rgba(255,255,255,.08);

                }

                .thinking-badge{

                    padding:12px;

                    border-radius:12px;

                    text-align:center;

                    color:#A78BFA;

                    background:rgba(124,58,237,.12);

                    border:1px solid rgba(124,58,237,.25);

                    font-weight:600;

                }

                .live-transcript{

                    margin-top:10px;

                    padding:15px;

                    border-radius:12px;

                    background:rgba(255,255,255,.05);

                    color:white;

                    line-height:1.6;

                    font-size:15px;

                }

                `}
      </style>
    </div>
  );
}
