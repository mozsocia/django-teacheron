from django.urls import path
from .views import *

urlpatterns = [
    # CustomUser CRUD API URLs
    path('users/list/', api_user_list),
    path('users/store/', api_user_store),
    path('users/<int:user_id>/show/', api_user_show),
    path('users/<int:user_id>/edit/', api_user_edit),
    path('users/<int:user_id>/update/', api_user_update),
    path('users/<int:user_id>/destroy/', api_user_destroy),

    path('get-session-data/', get_session_data, name='get_session_data'),

]
