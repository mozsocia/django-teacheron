from django.db import models
import os
from apps.helpers import *
from django.utils.text import slugify

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

class Product(models.Model):
    title = models.CharField(max_length=200, null=False)
    slug = models.SlugField(max_length=100, unique=True, blank=True ,db_index=True)
    short_details = models.TextField(max_length=500, null=False)
    sku = models.CharField(max_length=200, blank=True, null=True)
    points = models.IntegerField(null=False, default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.BooleanField(blank=True, null=True, default=False)
    previous_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField(upload_to='product_images/', null=False, blank=True) 
    stock_count = models.IntegerField(null=False, default=0)
    rating = models.FloatField(null=False, default=4.5)
    remark = models.CharField(max_length=10, choices=[('popular', 'Popular'), ('new', 'New'), ('top', 'Top'), ('special', 'Special'), ('trending', 'Trending'), ('regular', 'Regular')], default='regular', null=False)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True)

    details = models.TextField(blank=True, null=True)



    color = models.CharField(max_length=255, blank=True, null=True)
    size = models.CharField(max_length=255, blank=True, null=True)

    is_active =models.BooleanField(blank=True, null=True, default=True)


    is_reseller =models.BooleanField(blank=True, null=True, default=False)
    reseller_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    variations = models.TextField(blank=True, null=True) 

    additional_info = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
