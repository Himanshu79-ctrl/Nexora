import { WS_BASE } from './constants'

export const buildWsUrl = (path) => `${WS_BASE}/${path}/`

export class InterviewWebSocket {
  constructor(interviewId, onMessage, onClose) {
    this.url = buildWsUrl(`interview/${interviewId}`)
    this.onMessage = onMessage
    this.onClose = onClose
    this.ws = null
    this.reconnectAttempts = 0
    this.maxReconnects = 5
  }

  connect() {
    this.ws = new WebSocket(this.url)

    this.ws.onopen = () => {
      console.log('[WS] Connected')
      this.reconnectAttempts = 0
    }

    this.ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        this.onMessage(data)
      } catch (err) {
        console.error('[WS] Parse error', err)
      }
    }

    this.ws.onclose = () => {
      console.log('[WS] Disconnected')
      if (this.reconnectAttempts < this.maxReconnects) {
        this.reconnectAttempts++
        setTimeout(() => this.connect(), 2000 * this.reconnectAttempts)
      } else {
        this.onClose?.()
      }
    }

    this.ws.onerror = (err) => console.error('[WS] Error', err)
  }

  send(type, payload) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, ...payload }))
    }
  }

  close() {
    this.maxReconnects = 0
    this.ws?.close()
  }
}