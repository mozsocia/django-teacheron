from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class PhoneBackend(ModelBackend):
    def authenticate(self, request, phone=None, password=None, **kwargs):
        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(phone=phone)
        except UserModel.DoesNotExist:
            return None

        if user.check_password(password):
            return user

        return None

