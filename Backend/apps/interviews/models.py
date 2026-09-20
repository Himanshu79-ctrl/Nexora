import uuid

from django.db import models
from django.conf import settings

from apps.resumes.models import Resume


class InterviewStatus(models.TextChoices):

    CREATED = "created", "Created"

    IN_PROGRESS = "in_progress", "In Progress"

    COMPLETED = "completed", "Completed"

    CANCELLED = "cancelled", "Cancelled"


class DifficultyLevel(models.TextChoices):

    EASY = "easy", "Easy"

    MEDIUM = "medium", "Medium"

    HARD = "hard", "Hard"


class InterviewSession(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="interviews"
    )

    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="interviews"
    )

    role = models.CharField(
        max_length=255,
        db_index=True
    )

    duration_minutes = models.PositiveIntegerField()

    difficulty = models.CharField(
        max_length=20,
        choices=DifficultyLevel.choices,
        default=DifficultyLevel.MEDIUM
    )

    status = models.CharField(
        max_length=20,
        choices=InterviewStatus.choices,
        default=InterviewStatus.CREATED,
        db_index=True
    )

    websocket_room = models.CharField(
        max_length=255,
        unique=True
    )

    started_at = models.DateTimeField(
        blank=True,
        null=True
    )

    ended_at = models.DateTimeField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        ordering = ["-created_at"]

        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["created_at"]),
            models.Index(fields=["role"]),
        ]

    def __str__(self):

        return (
            f"{self.user.username} - {self.role}"
        )
    



class TranscriptRole(models.TextChoices):

    AI = "ai", "AI"

    USER = "user", "User"


class InterviewTranscript(models.Model):

    interview = models.ForeignKey(
        InterviewSession,
        on_delete=models.CASCADE,
        related_name="transcripts"
    )

    role = models.CharField(
        max_length=10,
        choices=TranscriptRole.choices,
        db_index=True
    )

    message = models.TextField()

    ai_evaluation = models.JSONField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True
    )

    class Meta:

        ordering = ["created_at"]

        indexes = [

            models.Index(
                fields=[
                    "interview",
                    "created_at"
                ]
            ),
        ]

    def __str__(self):

        return (
            f"{self.role} - "
            f"{self.interview.id}"
        )
    
    
    
class InterviewReport(models.Model):

    interview = models.OneToOneField(
        InterviewSession,
        on_delete=models.CASCADE,
        related_name="report"
    )

    overall_score = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )

    communication_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True
    )

    technical_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True
    )

    confidence_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True
    )

    strengths = models.JSONField(
        default=list,
        blank=True
    )

    improvements = models.JSONField(
        default=list,
        blank=True
    )

    summary = models.TextField()

    recommendation = models.CharField(
        max_length=50,
        blank=True,
        default=""
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return (
            f"Report - {self.interview.id}"
        )