from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ("candidate", "Candidate"),
        ("admin", "Admin"),
    )

    username = models.CharField(
        max_length=150,
        unique=True
    )

    email = models.EmailField(
        unique=True
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="candidate"
    )

    profile_picture = models.URLField(
        blank=True,
        null=True
    )

    is_verified = models.BooleanField(
        default=False
    )
    terms_accepted = models.BooleanField(
        default=False
    )

    terms_accepted_at = models.DateTimeField(
        null=True,
        blank=True
    )

    terms_version = models.CharField(
        max_length=20,
        default="v1.0"
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.username