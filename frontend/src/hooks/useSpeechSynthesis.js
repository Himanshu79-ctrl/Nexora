import { useState, useCallback } from 'react'
import { speak, stopSpeaking } from '../utils/speechHelpers'

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speakText = useCallback(async (text, options = {}) => {
    setIsSpeaking(true)
    await speak(text, options)
    setIsSpeaking(false)
  }, [])

  const stop = useCallback(() => {
    stopSpeaking()
    setIsSpeaking(false)
  }, [])

  return { isSpeaking, speakText, stop }
}