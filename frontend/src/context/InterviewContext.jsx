import { createContext, useContext, useState } from "react";

const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const [interview, setInterview] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState("");

  const [transcript, setTranscript] = useState([]);

  const [feedback, setFeedback] = useState(null);

  const [connected, setConnected] = useState(false);

  const [status, setStatus] = useState("idle");

  const [isSpeaking, setIsSpeaking] = useState(false);

  const [isListening, setIsListening] = useState(false);

  const addTranscript = (
    role,

    message,
  ) => {
    setTranscript((prev) => [
      ...prev,

      {
        role,

        message,

        created_at: new Date(),
      },
    ]);
  };

  const resetInterview = () => {
    setInterview(null);

    setCurrentQuestion("");

    setTranscript([]);

    setFeedback(null);

    setConnected(false);

    setStatus("idle");

    setIsSpeaking(false);

    setIsListening(false);
  };

  return (
    <InterviewContext.Provider
      value={{
        interview,

        setInterview,

        currentQuestion,

        setCurrentQuestion,

        transcript,

        addTranscript,

        feedback,

        setFeedback,

        connected,

        setConnected,

        status,

        setStatus,

        isSpeaking,

        setIsSpeaking,

        isListening,

        setIsListening,

        resetInterview,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterviewContext = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("InterviewProvider missing.");
  }

  return context;
};
