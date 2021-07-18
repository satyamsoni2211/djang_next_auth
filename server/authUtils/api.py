from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers.serializer import TokenSerializer


class CustomTokenView(TokenObtainPairView):
    serializer_class = TokenSerializer
