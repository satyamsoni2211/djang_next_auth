from rest_framework.serializers import ModelSerializer
from authUtils.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "email"
        )


class TokenSerializer(
    TokenObtainPairSerializer
):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data
