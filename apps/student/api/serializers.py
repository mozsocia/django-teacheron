# serializers.py
from rest_framework import serializers
from ..models import *
from apps.helpers import *
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class StudentSerializer(DepthMixin,serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'



class JobRequirementSerializer(DepthMixin,serializers.ModelSerializer):
    class Meta:
        model = JobRequirement
        fields =  '__all__'