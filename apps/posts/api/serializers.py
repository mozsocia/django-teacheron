# serializers.py
from rest_framework import serializers
from ..models import *
from apps.helpers import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class BlogSerializer(DepthMixin, serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

