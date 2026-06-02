import { useState, useRef, useCallback } from 'react'

export const useWebcam = () => {
  const [stream, setStream]     = useState(null)
  const [hasCamera, setHasCamera] = useState(false)
  const [error, setError]       = useState(null)
  const videoRef = useRef(null)

  const startCamera = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(s)
      setHasCamera(true)
      if (videoRef.current) videoRef.current.srcObject = s
    } catch (err) {
      setError(err.message)
      setHasCamera(false)
    }
  }, [])

  const stopCamera = useCallback(() => {
    stream?.getTracks().forEach(t => t.stop())
    setStream(null)
    setHasCamera(false)
  }, [stream])

  const toggleCamera = useCallback(() => {
    if (stream) stopCamera()
    else startCamera()
  }, [stream, startCamera, stopCamera])

  return { stream, hasCamera, error, videoRef, startCamera, stopCamera, toggleCamera }
}