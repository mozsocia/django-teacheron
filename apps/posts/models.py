from django.db import models
import os
from apps.helpers import *

class Brand(models.Model):
    name = models.CharField(max_length=50, null=False)
    img = models.ImageField(upload_to='brand_images/', null=True ,blank=True) 
    details = models.TextField(null=True, blank =True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=50, null=False)
    img = models.ImageField(upload_to='category_images/', null=False, blank=True)  
    details = models.TextField(null=True, blank =True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Blog(DeleteOldImageFilesMixin,models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)

    def __str__(self):
        return self.title