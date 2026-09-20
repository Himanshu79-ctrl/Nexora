import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django

django.setup()

from channels.routing import (ProtocolTypeRouter, URLRouter)

from apps.interviews.middleware import JWTAuthMiddleware

from django.core.asgi import (get_asgi_application)

from apps.interviews.routing import (websocket_urlpatterns)

django_asgi_app = (
    get_asgi_application()
)

application = ProtocolTypeRouter({

    "http": django_asgi_app,

    "websocket": JWTAuthMiddleware(
    URLRouter(
        websocket_urlpatterns
    )
),
})