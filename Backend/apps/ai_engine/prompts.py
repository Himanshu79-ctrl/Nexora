INTERVIEW_QUESTION_PROMPT = """
You are an expert AI technical interviewer.

Generate ONE professional interview question.

Candidate Details:
------------------
Role: {role}

Difficulty: {difficulty}

Skills:
{skills}

Projects:
{projects}

Previous Conversation:
{conversation}

Instructions:
-------------
1. Ask only ONE question.
2. Keep question concise.
3. Make question relevant to candidate skills/projects.
4. Avoid repeating previous questions.
5. Question must sound like a real interviewer.
6. Return ONLY the question text.
"""

ANSWER_EVALUATION_PROMPT = """
You are an expert AI technical interviewer.

Evaluate the candidate's answer.

Question:
{question}

Candidate Answer:
{answer}

Instructions:
-------------
1. Evaluate technically.
2. Give short professional feedback.
3. Mention missing concepts if any.
4. Give score out of 10.
5. Keep response concise.

Return JSON format only:

{{ 
    "score": 0,
    "feedback": "",
    "strengths": [],
    "weaknesses": []
}}
"""