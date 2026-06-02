from django.contrib.auth import authenticate, get_user_model
from django.utils import timezone
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, min_length=8)
    terms_accepted = serializers.BooleanField()

    class Meta:
        model = User
        fields = ["username", "email", "password", "terms_accepted"]


    def validate_terms_accepted(self, value):
        if not value:
            raise serializers.ValidationError(
                "You must accept the Terms & Conditions."
            )
        return value
    


    def validate_email(self, value):

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    def validate_username(self, value):

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    def create(self, validated_data):

        password = validated_data.pop("password")

        user = User.objects.create_user(
            **validated_data
        )

        user.set_password(password)

        if user.terms_accepted:
            user.terms_accepted_at = timezone.now()

        user.save()

        return user


class LoginSerializer(serializers.Serializer):

    login = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):

        login_input = data.get("login")
        password = data.get("password")

        # login with email
        if "@" in login_input:

            try:
                user_obj = User.objects.get(email=login_input)
                username = user_obj.username

            except User.DoesNotExist:
                raise serializers.ValidationError(
                    "Invalid credentials."
                )

        else:
            username = login_input

        user = authenticate(
            username=username,
            password=password
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid credentials."
            )

        refresh = RefreshToken.for_user(user)

        return {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },

            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }



class LogoutSerializer(serializers.Serializer):

    refresh = serializers.CharField()
