from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from apps.posts.models import Blog

class BlogTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.prefix = 'api/posts/'
        self.blog1 = Blog.objects.create(title='Test Blog 1', content='Content for Test Blog 1')
        self.blog2 = Blog.objects.create(title='Test Blog 2', content='Content for Test Blog 2')

    def add_prefix(self, url):
        return f'/{self.prefix}{url}/'

    def test_get_blogs(self):
        response = self.client.get(self.add_prefix('blogs'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_blog(self):
        data = {'title': 'New Blog', 'content': 'Content for New Blog'}
        response = self.client.post(self.add_prefix('blogs/store'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Blog.objects.count(), 3)

    def test_get_blog(self):
        response = self.client.get(self.add_prefix(f'blogs/{self.blog1.id}/show'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Blog 1')

    def test_update_blog(self):
        data = {'title': 'Updated Blog Title', 'content': 'Updated content'}
        response = self.client.post(self.add_prefix(f'blogs/{self.blog1.id}/update'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.blog1.refresh_from_db()
        self.assertEqual(self.blog1.title, 'Updated Blog Title')

    def test_delete_blog(self):
        response = self.client.post(self.add_prefix(f'blogs/{self.blog2.id}/destroy'))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Blog.objects.filter(id=self.blog2.id).exists())
