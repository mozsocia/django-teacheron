# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),
    # path('login/', login_view, name='login'),
    # path('signup/', signup_view, name='signup'),
    path('job_post/', job_post, name='job_post'),
    path('register/', register, name='register'),

    path('all-tutors/', teacher_list, name='all_tutors'),
    path('tutors/<int:pk>/', teacher_detail, name='tutor_detail'),

    path('job-requirements/', job_requirement_list, name='job_requirement_list'),
    path('job-requirements/<int:pk>/', job_requirement_detail, name='job_requirement_detail'),
]

