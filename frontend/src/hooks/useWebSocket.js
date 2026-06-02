import { useEffect, useRef, useState } from 'react'
import { InterviewWebSocket } from '../utils/websocketHelpers'

export const useWebSocket = (interviewId) => {
  const [connected, setConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState(null)
  const wsRef = useRef(null)

  useEffect(() => {
    if (!interviewId) return

    const ws = new InterviewWebSocket(
      interviewId,
      (msg) => {
        setLastMessage(msg)
        if (msg.type === 'connected') setConnected(true)
      },
      () => setConnected(false)
    )

    ws.connect()
    wsRef.current = ws
    setConnected(true)

    return () => ws.close()
  }, [interviewId])

  const send = (type, payload) => wsRef.current?.send(type, payload)

  return { connected, lastMessage, send }
}