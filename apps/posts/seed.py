import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.posts.models import *
import string

def generate_random_string(length=10):
    """Generate a random string of alphanumeric characters."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))


def create_blogs():
    blogs = [
        {
            "title": "First Blog Post",
            "content": "This is the content of the first blog post.",
            "image": "blog_images/blog1.png",
            "category_id":1,
            "brand_id":1,
        },
        {
            "title": "Second Blog Post",
            "content": "This is the content of the second blog post.",
            "image": "blog_images/blog2.png",
            "category_id":1,
            "brand_id":1,
        },
        {
            "title": "Third Blog Post",
            "content": "This is the content of the third blog post.",
            "image": "blog_images/blog3.png",
            "category_id":2,
            "brand_id":2,
        }
    ]

    for blog_data in blogs:
        Blog.objects.create(
            title=blog_data["title"],
            content=blog_data["content"],
            image=blog_data["image"],
            category_id=blog_data["category_id"],
            brand_id=blog_data["brand_id"],
        )

    print("Blogs created successfully.")


def create_brands():
    brands = [
        {
            "name": "Nike"

        },
        {
            "name": "Adidas"
        },
        {
            "name": "Apple"
        }
    ]

    for brand in brands:
        Brand.objects.create(
            name=brand["name"]

        )

    print("Brand created successfully.")

def create_categories():
    categories = [
        {
            "name": "Electronics"
        },
        {
            "name": "Clothing"
        },
        {
            "name": "Books"
        }
    ]

    for category in categories:
        Category.objects.create(
            name=category["name"]
        )

    print("Categories created successfully.")
