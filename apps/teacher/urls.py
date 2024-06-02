# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('register/', create_teacher_profile, name='register'),
]
