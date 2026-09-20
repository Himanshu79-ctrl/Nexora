from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser


@database_sync_to_async
def get_user(token):
    try:
        access_token = AccessToken(token)

        User = get_user_model()

        user = User.objects.get(
            id=access_token["user_id"]
        )

        return user

    except Exception as e:
        print("JWT ERROR:", e)
        return AnonymousUser()


class JWTAuthMiddleware(BaseMiddleware):

    async def __call__(
        self,
        scope,
        receive,
        send
    ):
        query_string = scope.get(
            "query_string",
            b""
        ).decode()

        query_params = parse_qs(query_string)

        token = query_params.get(
            "token",
            [None]
        )[0]

        print("WS TOKEN:", bool(token))

        if token:
            scope["user"] = await get_user(token)
        else:
            scope["user"] = AnonymousUser()

        print(
            "WS USER:",
            scope["user"],
            "AUTH:",
            scope["user"].is_authenticated
        )

        return await super().__call__(
            scope,
            receive,
            send
        )