import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from .models import  InterviewSession
from .services import  generate_question,process_user_answer ,generate_welcome_message
import json


logger = logging.getLogger(__name__)


class InterviewConsumer(
    AsyncWebsocketConsumer
):

    async def connect(self):
        print("WS CONNECT ENTERED")

        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]

        print("INTERVIEW ID:", self.room_name)
        print("USER:", self.scope["user"])

        interview = await database_sync_to_async(
            lambda: (
                InterviewSession.objects
                .filter(
                    id=self.room_name,
                    user=self.scope["user"]
                )
                .select_related("resume")
                .first()
            )
        )()

        if not interview:
            print("INTERVIEW NOT FOUND")
            await self.close()
            return

        self.interview = interview
        self.room_group_name = f"interview_{self.room_name}"

        await self.accept()

        print("WS ACCEPTED")

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.send(
            text_data=json.dumps({
                "type": "connection_established",
                "message": "Connected successfully."
            })
        )

        welcome = generate_welcome_message(
            interview=self.interview
        )

        await self.send(
            text_data=json.dumps({
                "type": "welcome",
                "message": welcome
            })
        )

        question = await database_sync_to_async(
            generate_question
        )(
            interview=self.interview
        )

        await self.send(
            text_data=json.dumps({
                "type": "ai_question",
                "question": question
            })
        )


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

    async def receive(self,text_data):

        try:

            data = json.loads(text_data)

            event_type = data.get("type")

            if event_type == "ping":
                await self.send(
                    text_data=json.dumps({"type":"pong"})
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