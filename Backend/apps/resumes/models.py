from django.db import models
from django.conf import settings


class Resume(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="resumes"
    )

    title = models.CharField(
        max_length=255
    )

    resume_file = models.FileField(
        upload_to="resumes/"
    )

    extracted_text = models.TextField(
        blank=True,
        null=True
    )

    ai_analysis = models.JSONField(
        default=dict
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        ordering = ["-uploaded_at"]

        indexes = [
            models.Index(fields=["uploaded_at"]),
        ]

    def __str__(self):

        return (
            f"{self.user.username} - {self.title}"
        )