import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import  InterviewSession
from .services import  generate_question,process_user_answer


logger = logging.getLogger(__name__)


class InterviewConsumer(
    AsyncWebsocketConsumer
):

    async def connect(self):

        try:

            self.room_name = (
                self.scope["url_route"]["kwargs"]["room_name"]
            )

            self.room_group_name = (
                f"interview_{self.room_name}"
            )

            interview = await sync_to_async(

                InterviewSession.objects
                .select_related("resume")
                .filter(
                    websocket_room=self.room_name
                )
                .first

            )()

            if not interview:

                await self.close()

                return

            self.interview = interview

            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()

            await self.send(
                text_data=json.dumps({

                    "type":
                    "connection_established",

                    "message":
                    "Connected to interview room.",

                    "room":
                    self.room_name,
                })
            )

            question = await sync_to_async(
                generate_question
            )(
                interview=self.interview
            )

            await self.send(
                text_data=json.dumps({

                    "type":
                    "ai_question",

                    "question":
                    question,
                })
            )

        except Exception as e:

            logger.exception(
                f"WebSocket connect error: {str(e)}"
            )

            await self.send(
                text_data=json.dumps({

                    "type":
                    "error",

                    "message":
                    "Failed to initialize interview."
                })
            )

            await self.close()

    async def disconnect(
        self,
        close_code
    ):

        try:

            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

        except Exception as e:

            logger.exception(
                f"Disconnect error: {str(e)}"
            )

    async def receive(
        self,
        text_data
    ):

        try:

            data = json.loads(
                text_data
            )

            event_type = data.get(
                "type"
            )

            if event_type == "ping":

                await self.send(
                    text_data=json.dumps({

                        "type":
                        "pong"
                    })
                )

            elif event_type == "user_answer":

                answer = data.get(
                    "answer",
                    ""
                ).strip()

                if not answer:

                    await self.send(
                        text_data=json.dumps({

                            "type":
                            "error",

                            "message":
                            "Answer cannot be empty."
                        })
                    )

                    return

                result = await sync_to_async(
                    process_user_answer
                )(
                    interview=self.interview,

                    answer=answer
                )

                await self.send(
                    text_data=json.dumps({

                        "type":
                        "answer_feedback",

                        "evaluation":
                        result["evaluation"]
                    })
                )

                await self.send(
                    text_data=json.dumps({

                        "type":
                        "ai_question",

                        "question":
                        result["next_question"]
                    })
                )

            else:

                await self.send(
                    text_data=json.dumps({

                        "type":
                        "error",

                        "message":
                        "Invalid event type."
                    })
                )

        except json.JSONDecodeError:

            await self.send(
                text_data=json.dumps({

                    "type":
                    "error",

                    "message":
                    "Invalid JSON format."
                })
            )

        except Exception as e:

            logger.exception(
                f"Receive error: {str(e)}"
            )

            await self.send(
                text_data=json.dumps({

                    "type":
                    "error",

                    "message":
                    "Something went wrong."
                })
            )