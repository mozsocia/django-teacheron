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
]
