# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('blogs/list/', api_blog_list, name='api_blog_list'),
    path('blogs/related/', api_blog_related, name='api_blog_related'),
    path('blogs/store/', api_blog_store, name='api_blog_store'),
    path('blogs/<int:blog_id>/show/', api_blog_show, name='api_blog_show'),
    path('blogs/<int:blog_id>/edit/', api_blog_edit, name='api_blog_edit'),
    path('blogs/<int:blog_id>/update/', api_blog_update, name='api_blog_update'),
    path('blogs/<int:blog_id>/destroy/', api_blog_destroy, name='api_blog_destroy'),
]
