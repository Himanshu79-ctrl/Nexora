import { useEffect } from 'react'
import { useWebcam } from '../../hooks/useWebcam'

const WebcamPanel = () => {
  const { videoRef, hasCamera, startCamera } = useWebcam()

  useEffect(() => { startCamera() }, [startCamera])

  return (
    <div style={{
      background: '#0d0d24', borderRadius: 12, overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)', aspectRatio: '16/9', position: 'relative',
    }}>
      {hasCamera ? (
        <video ref={videoRef} autoPlay muted playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
      ) : (
        <div style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span style={{ fontSize: 32 }}>📷</span>
          <p style={{ color: '#64748b', fontSize: 13 }}>Camera not available</p>
        </div>
      )}
      <div style={{
        position: 'absolute', bottom: 8, left: 8,
        padding: '3px 10px', borderRadius: 20,
        background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)',
        fontSize: 11, color: '#34d399', fontWeight: 600,
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', animation: 'p 1.5s ease-in-out infinite' }} />
        Connected
      </div>
      <style>{`@keyframes p { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  )
}

export default WebcamPanel