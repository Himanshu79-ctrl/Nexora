import { createContext, useContext, useState, useRef } from 'react'

const InterviewContext = createContext(null)

export const InterviewProvider = ({ children }) => {
  const [interview, setInterview]       = useState(null)
  const [currentQuestion, setCQ]        = useState(null)
  const [questionIndex, setQIndex]      = useState(0)
  const [transcript, setTranscript]     = useState([])
  const [isListening, setIsListening]   = useState(false)
  const [isSpeaking, setIsSpeaking]     = useState(false)
  const [status, setStatus]             = useState('idle') // idle | setup | active | ended
  const [feedback, setFeedback]         = useState(null)
  const wsRef = useRef(null)

  const addTranscriptEntry = (role, text) => {
    setTranscript(prev => [...prev, { role, text, time: new Date() }])
  }

  const reset = () => {
    setInterview(null)
    setCQ(null)
    setQIndex(0)
    setTranscript([])
    setIsListening(false)
    setIsSpeaking(false)
    setStatus('idle')
    setFeedback(null)
  }

  return (
    <InterviewContext.Provider value={{
      interview, setInterview,
      currentQuestion, setCQ,
      questionIndex, setQIndex,
      transcript, addTranscriptEntry,
      isListening, setIsListening,
      isSpeaking, setIsSpeaking,
      status, setStatus,
      feedback, setFeedback,
      wsRef, reset,
    }}>
      {children}
    </InterviewContext.Provider>
  )
}

export const useInterview = () => {
  const ctx = useContext(InterviewContext)
  if (!ctx) throw new Error('useInterview must be inside InterviewProvider')
  return ctx
}