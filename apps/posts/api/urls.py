# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('brands/list/', api_brand_list),
    path('brands/store/', api_brand_store),
    path('brands/<int:brand_id>/show/', api_brand_show),
    path('brands/<int:brand_id>/edit/', api_brand_edit),
    path('brands/<int:brand_id>/update/', api_brand_update),
    path('brands/<int:brand_id>/destroy/', api_brand_destroy),

    # ========== Category model CRUD API URLs ============
    path('categories/list/', api_category_list),
    path('categories/store/', api_category_store),
    path('categories/<int:category_id>/show/', api_category_show),
    path('categories/<int:category_id>/edit/', api_category_edit),
    path('categories/<int:category_id>/update/', api_category_update),
    path('categories/<int:category_id>/destroy/', api_category_destroy),


    path('blogs/list/', api_blog_list),
    path('blogs/related/', api_blog_related),
    path('blogs/store/', api_blog_store),
    path('blogs/<int:blog_id>/show/', api_blog_show),
    path('blogs/<int:blog_id>/edit/', api_blog_edit),
    path('blogs/<int:blog_id>/update/', api_blog_update),
    path('blogs/<int:blog_id>/destroy/', api_blog_destroy),
]
