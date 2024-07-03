# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    # students api
    path('students/list/', api_student_list),
    path('students/store/', api_student_store),
    path('students/<int:student_id>/show/', api_student_show),
    path('students/<int:student_id>/edit/', api_student_edit),
    path('students/<int:student_id>/update/', api_student_update),
    path('students/<int:student_id>/destroy/', api_student_destroy),



    path('job-requirements/list/', api_job_requirement_list),
    path('job-requirements/related/', api_job_requirement_related),
    path('job-requirements/store/', api_job_requirement_store),
    path('job-requirements/<int:req_id>/show/', api_job_requirement_show),
    path('job-requirements/<int:req_id>/edit/', api_job_requirement_edit),
    path('job-requirements/<int:req_id>/update/', api_job_requirement_update),
    path('job-requirements/<int:req_id>/destroy/', api_job_requirement_destroy),
]
