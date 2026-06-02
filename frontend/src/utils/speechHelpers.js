export const isSpeechRecognitionSupported = () =>
  'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

export const isSpeechSynthesisSupported = () =>
  'speechSynthesis' in window

export const createSpeechRecognition = () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) return null
  const rec = new SR()
  rec.continuous = true
  rec.interimResults = true
  rec.lang = 'en-US'
  return rec
}

export const speak = (text, { rate = 1, pitch = 1, volume = 1 } = {}) => {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported()) return resolve()
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = rate
    utter.pitch = pitch
    utter.volume = volume
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v => v.name.includes('Google') && v.lang === 'en-US')
    if (preferred) utter.voice = preferred
    utter.onend = resolve
    window.speechSynthesis.speak(utter)
  })
}

export const stopSpeaking = () => {
  if (isSpeechSynthesisSupported()) window.speechSynthesis.cancel()
}