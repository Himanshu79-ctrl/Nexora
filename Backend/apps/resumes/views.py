from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import ResumeSerializer
from .utils import extract_text_from_pdf

from apps.ai_engine.gemini_service import (
    analyze_resume
)


class ResumeUploadView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ResumeSerializer(
            data=request.data
        )

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            # =====================================
            # SAVE RESUME
            # =====================================

            resume = serializer.save(
                user=request.user
            )

            # =====================================
            # EXTRACT PDF TEXT
            # =====================================

            extracted_text = (
                extract_text_from_pdf(
                    request.FILES["resume_file"]
                )
            )

            resume.extracted_text = (
                extracted_text
            )

            # =====================================
            # AI ANALYSIS
            # =====================================

            ai_analysis = analyze_resume(
                extracted_text
            )

            resume.ai_analysis = ai_analysis

            resume.save(
                update_fields=[
                    "extracted_text",
                    "ai_analysis"
                ]
            )

            return Response(
                {
                    "message":
                    "Resume uploaded successfully.",

                    "resume": {
                        "id": resume.id,
                        "title": resume.title,
                        "analysis": resume.ai_analysis,
                    }
                },

                status=status.HTTP_201_CREATED
            )

        except Exception as e:

            if "resume" in locals():
                resume.delete()

            return Response(
                {
                    "error": str(e)
                },

                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )