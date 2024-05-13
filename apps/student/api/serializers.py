# serializers.py
from rest_framework import serializers
from ..models import *
from apps.helpers import *

class StudentSerializer(DepthMixin,serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'