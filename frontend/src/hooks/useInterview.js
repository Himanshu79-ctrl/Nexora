import { useEffect, useCallback,useRef } from "react";

import { useInterviewContext } from "../context/InterviewContext";

import { useWebSocket } from "./useWebSocket";

import { useSpeechSynthesis } from "./useSpeechSynthesis";

import { createInterview, endInterview } from "../api/interviewApi";

import toast from "react-hot-toast";

export const useInterview = (roomName) => {
  const {
    interview,
    setInterview,

    currentQuestion,
    setCurrentQuestion,

    transcript,
    addTranscript,

    feedback,
    setFeedback,

    status,
    setStatus,

    setConnected,
  } = useInterviewContext();

  const {
    connected,

    lastMessage,

    send,
  } = useWebSocket(roomName);

  const {
    speakText,

    isSpeaking,
  } = useSpeechSynthesis();

  useEffect(() => {
    setConnected(connected);
  }, [connected, setConnected]);

  useEffect(() => {
    if (!lastMessage) {
      return;
    }

    switch (lastMessage.type) {
      case "connection_established":
        console.log("Interview Connected.");

        break;

      case "welcome":
        addTranscript(
          "ai",

          lastMessage.message,
        );

        speakText(lastMessage.message);

        break;

      case "ai_question":
        setCurrentQuestion(lastMessage.question);

        addTranscript(
          "ai",

          lastMessage.question,
        );

        speakText(lastMessage.question);

        break;

      case "answer_feedback":
        setFeedback(lastMessage.evaluation);

        break;

      case "interview_completed":
        setStatus("completed");

        break;

      case "error":
        toast.error(lastMessage.message);

        break;

      default:
        break;
    }
  }, [lastMessage]);

  const startInterview = useCallback(
    async (config) => {
      try {
        const { data } = await createInterview(config);

        setInterview(data);

        setStatus("active");

        return data;
      } catch (error) {
        toast.error("Unable to start interview.");

        throw error;
      }
    },

    [],
  );

  const submittingRef = useRef(false);
  const submitAnswer = useCallback(
    async (answer) => {
      if (!answer || submittingRef.current) return;

      submittingRef.current = true;

      addTranscript("user", answer);

      send({
        type: "user_answer",
        answer,
      });

      setTimeout(() => {
        submittingRef.current = false;
      }, 1500);
    },
    [send, addTranscript]
  );

  const finishInterview = useCallback(async () => {
    if (!interview) {
      throw new Error("Interview session not found.");
    }

    const { data } = await endInterview(interview.id);

    setStatus("completed");

    return data;
  }, [interview, setStatus]);

  return {
    interview,
    currentQuestion,
    transcript,
    feedback,
    connected,
    isSpeaking,
    status,

    // Interview actions
    startInterview,
    submitUserAnswer: submitAnswer,
    finish: finishInterview,

    // WebSocket state
    wsMessage: lastMessage,

    // UI states
    loading: !connected && status === "idle",
    thinking: false,
  };
};
