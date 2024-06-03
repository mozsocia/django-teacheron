# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('job-requirement/create/', create_job_requirement, name='create_job_requirement'),
    path('job-requirement/<int:pk>/', view_job_requirement, name='view_job_requirement'),
    path('job-requirements/', list_job_requirements, name='list_job_requirements'),
    path('job-requirement/<int:pk>/edit/', edit_job_requirement, name='edit_job_requirement'),
    path('job-requirement/<int:pk>/delete/', delete_job_requirement, name='delete_job_requirement'),


]
