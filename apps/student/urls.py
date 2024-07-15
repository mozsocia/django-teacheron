# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('job-requirement/create/', create_job_requirement, name='create_job_requirement'),
    path('job-requirement/<int:pk>/', view_job_requirement, name='view_job_requirement'),
    path('job-requirements/', list_job_requirements, name='list_job_requirements'),
    path('job-requirement/<int:pk>/edit/', edit_job_requirement, name='edit_job_requirement'),
    path('job-requirement/<int:pk>/delete/', delete_job_requirement, name='delete_job_requirement'),




	# CRUD for student
    path('panel/student/list/', panel_student_list, name='panel_student_list'),
    path('panel/student/create/', panel_student_create, name='panel_student_create'),
    path('panel/student/store/', panel_student_store, name='panel_student_store'),
    path('panel/student/<int:pk>/detail/', panel_student_detail, name='panel_student_detail'),
    path('panel/student/<int:pk>/edit/', panel_student_edit, name='panel_student_edit'),
    path('panel/student/<int:pk>/update/', panel_student_update, name='panel_student_update'),
    path('panel/student/<int:pk>/delete/', panel_student_delete, name='panel_student_delete'),


	# CRUD for jobrequirement
    path('panel/jobrequirement/list/', panel_jobrequirement_list, name='panel_jobrequirement_list'),
    path('panel/jobrequirement/create/', panel_jobrequirement_create, name='panel_jobrequirement_create'),
    path('panel/jobrequirement/store/', panel_jobrequirement_store, name='panel_jobrequirement_store'),
    path('panel/jobrequirement/<int:pk>/detail/', panel_jobrequirement_detail, name='panel_jobrequirement_detail'),
    path('panel/jobrequirement/<int:pk>/edit/', panel_jobrequirement_edit, name='panel_jobrequirement_edit'),
    path('panel/jobrequirement/<int:pk>/update/', panel_jobrequirement_update, name='panel_jobrequirement_update'),
    path('panel/jobrequirement/<int:pk>/delete/', panel_jobrequirement_delete, name='panel_jobrequirement_delete'),
]
