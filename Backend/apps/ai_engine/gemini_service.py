import json
import google.generativeai as genai
from decouple import config
from .prompts import (INTERVIEW_QUESTION_PROMPT, ANSWER_EVALUATION_PROMPT)
import logging
logger = logging.getLogger(__name__)

genai.configure(
    api_key=config("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def analyze_resume(resume_text):

    try:

        prompt = f"""
        Analyze this resume.

        Return ONLY valid JSON.

        Format:

        {{
            "skills": [],
            "projects": [],
            "tech_stack": [],
            "experience_level": "",
            "suggested_role": ""
        }}

        Resume:
        {resume_text}
        """

        response = model.generate_content(
            prompt,
            request_options={"timeout": 60}
        )

        cleaned_response = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        parsed_response = json.loads(
            cleaned_response
        )

        return parsed_response

    except json.JSONDecodeError:

        raise Exception(
            "Invalid AI JSON response."
        )

    except Exception as e:

        raise Exception(
            f"Gemini analysis failed: {str(e)}"
        )
    



def generate_interview_question(
    *,
    role,
    difficulty,
    skills,
    projects,
    conversation
):

    try:

        prompt = (
            INTERVIEW_QUESTION_PROMPT.format(
                role=role,

                difficulty=difficulty,

                skills="\n".join(
                    skills[:15]
                ),

                projects="\n".join(
                    projects[:5]
                ),

                conversation=conversation
            )
        )

        response = model.generate_content(
            prompt
        )

        question = getattr(
            response,
            "text",
            ""
        ).strip()

        if not question:

            raise ValueError(
                "Empty AI response."
            )

        return question

    except Exception as e:

        logger.exception(
            f"Question generation failed: {str(e)}"
        )

        return (
            "Can you explain your most recent project?"
        )
    


    
def evaluate_answer(
    *,
    question,
    answer
):

    try:

        prompt = (
            ANSWER_EVALUATION_PROMPT.format(
                question=question,
                answer=answer
            )
        )

        response = model.generate_content(
            prompt
        )

        text = getattr(
            response,
            "text",
            ""
        ).strip()

        if not text:

            raise ValueError(
                "Empty evaluation response."
            )

        cleaned_text = (
            text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(
            cleaned_text
        )

    except Exception as e:

        logger.exception(
            f"Answer evaluation failed: {str(e)}"
        )

        return {

            "score": 5,

            "feedback":
            "Your answer was average.",

            "strengths": [],

            "weaknesses": [
                "Could not evaluate properly."
            ]
        }