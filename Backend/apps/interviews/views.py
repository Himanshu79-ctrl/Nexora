from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated
)
from rest_framework import status

from .serializers import (
    CreateInterviewSerializer
)

from .services import (
    create_interview_session
)


class CreateInterviewView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = (
            CreateInterviewSerializer(
                data=request.data
            )
        )

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            interview = (
                create_interview_session(
                    user=request.user,
                    validated_data=serializer.validated_data
                )
            )

            return Response(
                {
                    "message":
                    "Interview session created successfully.",

                    "interview": {

                        "id":
                        interview.id,

                        "role":
                        interview.role,

                        "duration_minutes":
                        interview.duration_minutes,

                        "difficulty":
                        interview.difficulty,

                        "status":
                        interview.status,

                        "websocket_room":
                        interview.websocket_room,
                    }
                },

                status=status.HTTP_201_CREATED
            )

        except Exception as e:

            return Response(
                {
                    "error": str(e)
                },

                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )