export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
export const WS_BASE  = import.meta.env.VITE_WS_BASE_URL  || 'ws://localhost:8000/ws'
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'AI Interview'

export const INTERVIEW_TYPES = [
  { id: 'frontend', label: 'Frontend Developer', icon: '💻' },
  { id: 'backend',  label: 'Backend Developer',  icon: '⚙️' },
  { id: 'fullstack',label: 'Full Stack Developer',icon: '🔧' },
  { id: 'devops',   label: 'DevOps Engineer',     icon: '🚀' },
  { id: 'dsa',      label: 'DSA / Problem Solving',icon: '🧩' },
  { id: 'system',   label: 'System Design',        icon: '🏗️' },
]

export const DIFFICULTY_LEVELS = [
  { id: 'easy',   label: 'Easy',   color: '#10b981' },
  { id: 'medium', label: 'Medium', color: '#f59e0b' },
  { id: 'hard',   label: 'Hard',   color: '#ef4444' },
]

export const INTERVIEW_DURATIONS = [15, 30, 45, 60]

export const SKILLS_LIST = [
  'JavaScript','React','Node.js','Python','Java','TypeScript',
  'MongoDB','PostgreSQL','Redis','Docker','AWS','System Design',
  'DSA','REST API','GraphQL','Tailwind CSS','Git',
]