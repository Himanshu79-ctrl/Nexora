import uuid
from django.db import transaction
from apps.resumes.models import Resume
from .models import  InterviewSession
import logging
from apps.ai_engine.gemini_service import  generate_interview_question,evaluate_answer
from django.utils import timezone

from .models import (
    InterviewSession,
    InterviewTranscript,
    TranscriptRole,
    InterviewReport,
    InterviewStatus,
)


logger = logging.getLogger(__name__)


def create_interview_session(*,user,validated_data):
    try:

        resume = (
            Resume.objects
            .only(
                "id",
                "user",
                "ai_analysis"
            )
            .get(
                id=validated_data["resume_id"],
                user=user
            )
        )

    except Resume.DoesNotExist:
        raise Exception(
            "Resume not found."
        )

    try:

        with transaction.atomic():

            websocket_room = (
                f"interview_{uuid.uuid4().hex}"
            )

            interview = (
                InterviewSession.objects.create(
                    user=user,
                    resume=resume,
                    role=validated_data["role"],
                    duration_minutes=validated_data[
                        "duration_minutes"
                    ],
                    difficulty=validated_data[
                        "difficulty"
                    ],
                    websocket_room=websocket_room,
                )
            )

            return interview

    except Exception as e:

        raise Exception(
            f"Interview creation failed: {str(e)}"
        )


def start_interview(*, interview):

    if interview.status != InterviewStatus.CREATED:

        return

    interview.status = (
        InterviewStatus.IN_PROGRESS
    )

    interview.started_at = (
        timezone.now()
    )

    interview.save(
        update_fields=[
            "status",
            "started_at"
        ]
    )

def generate_welcome_message(*, interview):

    return (
        f"Hello and welcome to your "
        f"{interview.role} interview. "
        f"I will assess your technical knowledge, "
        f"problem solving ability and communication skills. "
        f"Let's begin."
    )



def generate_question(*,interview,conversation=""):
    try:

        resume = interview.resume

        if not resume:

            raise ValueError(
                "Resume not found."
            )

        resume_analysis = (
            resume.ai_analysis or {}
        )

        skills = (
            resume_analysis.get(
                "skills",
                []
            )
        )

        projects = (
            resume_analysis.get(
                "projects",
                []
            )
        )

        question = (
            generate_interview_question(

                role=interview.role,

                difficulty=interview.difficulty,

                skills=skills,

                projects=projects,

                conversation=conversation
            )
        )

        InterviewTranscript.objects.create(

            interview=interview,

            role=TranscriptRole.AI,

            message=question
        )

        return question

    except Exception as e:

        logger.exception(
            f"Question generation service failed: {str(e)}"
        )

        fallback_question = (
            "Can you introduce yourself "
            "and explain your recent project?"
        )

        InterviewTranscript.objects.create(

            interview=interview,

            role=TranscriptRole.AI,

            message=fallback_question
        )

        return fallback_question
    

def process_user_answer(*,interview,answer):
    try:

        latest_ai_question = (

            InterviewTranscript.objects
            .filter(

                interview=interview,

                role=TranscriptRole.AI
            )
            .order_by("-created_at")
            .first()
        )

        if not latest_ai_question:

            raise ValueError(
                "No AI question found."
            )

        evaluation = (
            evaluate_answer(

                question=latest_ai_question.message,

                answer=answer
            )
        )

        user_transcript = (
            InterviewTranscript.objects.create(

                interview=interview,

                role=TranscriptRole.USER,

                message=answer,

                ai_evaluation=evaluation
            )
        )

        transcript_history = (

            InterviewTranscript.objects
            .filter(
                interview=interview
            )
            .order_by("created_at")
            .values_list(
                "role",
                "message"
            )
        )

        formatted_conversation = "\n".join([

            f"{role}: {message}"

            for role, message
            in transcript_history
        ])

        next_question = (
            generate_question(

                interview=interview,

                conversation=formatted_conversation
            )
        )

        return {

            "evaluation":
            evaluation,

            "next_question":
            next_question
        }

    except Exception as e:

        logger.exception(
            f"Process answer failed: {str(e)}"
        )

        return {

            "evaluation": {

                "score": 5,

                "feedback":
                "Could not fully evaluate answer.",

                "strengths": [],

                "weaknesses": []
            },

            "next_question":
            "Can you explain your previous answer in more detail?"
        }
    
def end_interview(*, interview):

    if interview.status == (
        InterviewStatus.COMPLETED
    ):
        return

    interview.status = (
        InterviewStatus.COMPLETED
    )

    interview.ended_at = (
        timezone.now()
    )

    interview.save(
        update_fields=[
            "status",
            "ended_at"
        ]
    )

    generate_final_report(
        interview=interview
    )


def generate_final_report(
    *,
    interview
):

    transcripts = (

        InterviewTranscript.objects
        .filter(
            interview=interview
        )
        .exclude(
            ai_evaluation__isnull=True
        )
    )

    scores = []

    strengths = []

    improvements = []

    for item in transcripts:

        evaluation = (
            item.ai_evaluation or {}
        )

        score = (
            evaluation.get(
                "score"
            )
        )

        if score is not None:

            scores.append(
                float(score)
            )

        strengths.extend(
            evaluation.get(
                "strengths",
                []
            )
        )

        improvements.extend(
            evaluation.get(
                "weaknesses",
                []
            )
        )

    overall_score = (
        round(
            sum(scores) / len(scores),
            2
        )
        if scores
        else 0
    )

    summary = (
        f"Candidate completed a "
        f"{interview.role} interview "
        f"with an overall score of "
        f"{overall_score}/10."
    )

    recommendation = (
        "Recommended"
        if overall_score >= 7
        else "Needs Improvement"
    )

    InterviewReport.objects.update_or_create(

        interview=interview,

        defaults={

            "overall_score":
            overall_score,

            "communication_score":
            overall_score,

            "technical_score":
            overall_score,

            "confidence_score":
            overall_score,

            "strengths":
            list(set(strengths))[:10],

            "improvements":
            list(set(improvements))[:10],

            "summary":
            summary,

            "recommendation":
            recommendation,
        }
    )