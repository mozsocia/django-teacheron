# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('register/', create_teacher_profile, name='register'),
    path('teacher/<int:teacher_id>/', teacher_detail, name='teacher_detail'),
    path('teacher/profile/', teacher_profile, name='teacher_profile'),
    path('teacher/<int:teacher_id>/edit/', edit_teacher_profile, name='edit_teacher_profile'),


    path('applications/create/<int:job_id>/', create_application, name='create_application'),
    path('applications/<int:application_id>/', application_detail, name='application_detail'),
    path('applications/', application_list, name='application_list'),
    path('applications/update/<int:application_id>/', update_application, name='update_application'),
    path('applications/delete/<int:application_id>/', delete_application, name='delete_application'),
]
