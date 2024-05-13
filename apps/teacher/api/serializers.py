# serializers.py
from rest_framework import serializers
from ..models import *
from apps.helpers import *


class TeacherSerializer(DepthMixin,serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'