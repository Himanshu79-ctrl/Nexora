from rest_framework import serializers

from .models import (
    InterviewSession,
    DifficultyLevel
)


class CreateInterviewSerializer(
    serializers.Serializer
):

    resume_id = serializers.IntegerField()

    role = serializers.CharField(
        max_length=255
    )

    difficulty = serializers.ChoiceField(
        choices=DifficultyLevel.choices
    )
    duration_minutes = serializers.IntegerField()

    def validate_duration_minutes(
        self,
        value
    ):

        allowed = [15, 30, 45, 60]

        if value not in allowed:

            raise serializers.ValidationError(
                "Duration must be 15, 30, 45 or 60 minutes."
            )

        return value