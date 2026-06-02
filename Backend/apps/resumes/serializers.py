from rest_framework import serializers

from .models import Resume


class ResumeSerializer(serializers.ModelSerializer):

    class Meta:

        model = Resume

        fields = [
            "id",
            "title",
            "resume_file",
            "ai_analysis",
            "uploaded_at",
        ]

        read_only_fields = [
            "id",
            "ai_analysis",
            "uploaded_at",
        ]

    def validate_resume_file(self, value):

        if not value.name.endswith(".pdf"):

            raise serializers.ValidationError(
                "Only PDF files are allowed."
            )

        return value