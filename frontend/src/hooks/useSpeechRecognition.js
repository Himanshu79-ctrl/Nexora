import { useState, useRef, useCallback } from 'react'
import { createSpeechRecognition } from '../utils/speechHelpers'

export const useSpeechRecognition = (onResult) => {
  const [isListening, setIsListening] = useState(false)
  const [interimText, setInterimText] = useState('')

  const recRef = useRef(null)

  const start = useCallback(() => {
    // Already listening → don't start again
    if (recRef.current) return

    const rec = createSpeechRecognition()

    if (!rec) {
      console.warn('Speech Recognition is not supported in this browser.')
      return
    }

    recRef.current = rec

    rec.onresult = (e) => {
      let interim = ''
      let final = ''

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const txt = e.results[i][0].transcript

        if (e.results[i].isFinal) {
          final += txt
        } else {
          interim += txt
        }
      }

      setInterimText(interim)

      if (final.trim()) {
        rec.stop()
        recRef.current = null
        setIsListening(false)

        onResult?.(final.trim())
      }
    }

    rec.onend = () => {
      recRef.current = null
      setIsListening(false)
    }

    rec.onerror = (event) => {
      console.warn('Speech recognition error:', event.error)

      recRef.current = null
      setIsListening(false)
    }

    try {
      rec.start()
      setIsListening(true)
    } catch (error) {
      console.warn('Speech recognition could not start:', error)

      recRef.current = null
      setIsListening(false)
    }
  }, [onResult])

  const stop = useCallback(() => {
    if (recRef.current) {
      recRef.current.stop()
      recRef.current = null
    }

    setIsListening(false)
    setInterimText('')
  }, [])

  return {
    isListening,
    interimText,
    start,
    stop,
  }
}