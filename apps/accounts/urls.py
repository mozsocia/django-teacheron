from django.urls import path
from . import views
from .views import *


# app_name = 'accounts'

urlpatterns = [
   path('login/', views.signin, name='login'),
   path('signup/', views.signup, name='signup'),
   path('signout/', views.signout, name='signout'),
   # path('profile/', views.profile, name='profile'),
   # path('profile_test/', views.profile_test, name='profile_test'),
   # path('profile/<int:pk>/update/', views.profile_update, name='profile_update'),

   path('profile_back/', views.profile_back, name='profile_back'),

   path('reset-password/', views.password_reset, name='reset_password'),
   path('reset-password-done/', views.password_reset_done, name='reset_password_done'),
   path('reset-password-confirm/<uidb64>/<token>/', views.password_reset_confirm, name='reset_password_confirm'),
   path('reset-password-complete/', views.password_reset_complete, name='password_reset_complete'),





]



