# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    # Teacher model CRUD API URLs
    path('teachers/list/', api_teacher_list),
    path('teachers/store/', api_teacher_store),
    path('teachers/<int:teacher_id>/show/', api_teacher_show),
    path('teachers/<int:teacher_id>/edit/', api_teacher_edit),
    path('teachers/<int:teacher_id>/update/', api_teacher_update),
    path('teachers/<int:teacher_id>/destroy/', api_teacher_destroy),
]
