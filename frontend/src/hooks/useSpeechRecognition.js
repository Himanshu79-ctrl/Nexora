import { useState, useRef, useCallback } from 'react'
import { createSpeechRecognition } from '../utils/speechHelpers'

export const useSpeechRecognition = (onResult) => {
  const [isListening, setIsListening] = useState(false)
  const [interimText, setInterimText] = useState('')
  const recRef = useRef(null)

  const start = useCallback(() => {
    const rec = createSpeechRecognition()
    if (!rec) return
    recRef.current = rec

    rec.onresult = (e) => {
      let interim = ''
      let final   = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const txt = e.results[i][0].transcript
        if (e.results[i].isFinal) final += txt
        else interim += txt
      }
      setInterimText(interim)
      if (final) onResult?.(final)
    }

    rec.onend = () => setIsListening(false)
    rec.start()
    setIsListening(true)
  }, [onResult])

  const stop = useCallback(() => {
    recRef.current?.stop()
    setIsListening(false)
    setInterimText('')
  }, [])

  return { isListening, interimText, start, stop }
}