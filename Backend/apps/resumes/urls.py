from django.urls import path

from .views import (
    ResumeUploadView,
    ResumeListView,
    ResumeDetailView,
    ResumeDeleteView,
)

urlpatterns = [
    path("upload/", ResumeUploadView.as_view()),
    path("list/", ResumeListView.as_view()),
    path("<int:pk>/", ResumeDetailView.as_view()),
    path("<int:pk>/delete/", ResumeDeleteView.as_view()),
]