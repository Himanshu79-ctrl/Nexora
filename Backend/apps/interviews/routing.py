from django.urls import re_path

from .consumers import (
    InterviewConsumer
)

websocket_urlpatterns = [

    re_path(r"ws/interview/(?P<room_name>[\w\-]+)/$",InterviewConsumer.as_asgi()),
]