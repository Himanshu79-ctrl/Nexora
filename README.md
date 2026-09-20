# 🚀 Nexora AI — AI-Powered Mock Interview Platform

Nexora AI is an AI-powered mock interview platform that simulates real technical interviews using Large Language Models, real-time WebSockets, Speech-to-Text, Text-to-Speech, resume analysis, and personalized interview logic.

The platform analyzes a candidate's resume, extracts relevant skills and projects, and uses that information to conduct a personalized AI-driven technical interview.

---

## ✨ Features

- 📄 Resume Upload & AI Analysis
- 🧠 Resume-based Interview Personalization
- 🎯 Custom Interview Roles
- ⚙️ Adjustable Interview Difficulty
- ⏱️ Custom Interview Duration
- 🤖 AI-generated Interview Questions
- 🎤 Real-time Voice Interview
- 🗣️ Speech-to-Text
- 🔊 Text-to-Speech
- 🔌 Real-time WebSocket Communication
- 📝 Live Interview Transcript
- 📊 AI-powered Answer Evaluation
- 📑 Automated Interview Reports
- 🔐 JWT Authentication
- 👤 Multiple Resume Management
- 🎥 Webcam Integration

---

## 🧠 How It Works

                    Candidate
                       │
                       ▼
                 Upload Resume
                       │
                       ▼
                PDF Text Extraction
                       │
                       ▼
                 Gemini AI Analysis
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Skills       Projects     Tech Stack
          │            │            │
          └────────────┼────────────┘
                       ▼
                Interview Setup
                       │
                       ▼
                 Start Interview
                       │
                       ▼
              WebSocket Connection
                       │
                       ▼
                 AI Interviewer
                       │
                       ▼
                  AI Question
                       │
                       ▼
                     TTS
                       │
                       ▼
               Candidate Answers
                       │
                       ▼
                     STT
                       │
                       ▼
                 AI Evaluation
                       │
                       ▼
                Next Question
                       │
                       ▼
                Final Interview
                       │
                       ▼
                AI Interview Report
                
🏗️ System Architecture
┌──────────────────────────────────────────────┐
│                  React Frontend              │
│                                              │
│  Dashboard │ Resume │ Interview │ Reports   │
│                                              │
│  Speech Recognition │ Speech Synthesis      │
│              │                               │
│              ▼                               │
│          WebSocket Client                   │
└──────────────────┬───────────────────────────┘
                   │
                   │ REST / WebSocket
                   ▼
┌──────────────────────────────────────────────┐
│                Django Backend                │
│                                              │
│  Django REST Framework                       │
│  Django Channels                             │
│  JWT Authentication                          │
│  Interview Services                          │
│  Resume Services                             │
│                                              │
│              ┌───────────────┐               │
│              │   AI Engine   │               │
│              └───────┬───────┘               │
└──────────────────────┼───────────────────────┘
                       │
                       ▼
                  Google Gemini



**🎯 Interview Setup**

Before starting an interview, the candidate can configure:

Resume
Interview Role
Difficulty
Interview Duration
Voice
Camera

Example:

Resume: Candidate Resume
Role: Full Stack Developer
Difficulty: Medium
Duration: 45 Minutes
Voice: Enabled
Camera: Enabled


**🤖 AI Interview Engine**

The AI interviewer generates questions based on the candidate's context.

The interview context can include:

Resume skills
Projects
Technical stack
Selected role
Difficulty
Previous questions
Previous answers

This allows the interview to be personalized instead of relying only on a fixed question list.

**
🎤 Voice Interview**

Nexora AI uses browser-native speech APIs for the voice interaction.

Speech-to-Text
Microphone
    ↓
Speech Recognition
    ↓
Candidate Answer
    ↓
WebSocket
    ↓
Backend
Text-to-Speech
AI Question
    ↓
Speech Synthesis
    ↓
Candidate hears question

**⚙️ Local Development Setup**
1. Clone Repository
git clone https://github.com/YOUR_USERNAME/ai-mock-interview.git
cd ai-mock-interview
2. Backend Setup
cd Backend

Create a virtual environment:

python -m venv venv

Activate on Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run migrations:

python manage.py migrate

Create an admin user:

python manage.py createsuperuser

Start the backend:

python manage.py runserver

Backend:

http://127.0.0.1:8000/
3. Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev
**
##🔑 Environment Variables**

Create a .env file for sensitive configuration.

SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
DEBUG=True
