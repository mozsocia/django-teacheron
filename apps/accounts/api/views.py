from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import CustomUser
from .serializers import CustomUserSerializer

from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response

@api_view(['GET'])
@login_required
def get_session_data(request):
    data = {
        'is_authenticated': request.user.is_authenticated,
        'phone': request.user.phone,
        'user': CustomUserSerializer(request.user).data,  # Convert user object to string
    }
    return Response(data)


# CustomUser CRUD API Views
@api_view(['GET'])
def api_user_list(request):
    users = CustomUser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def api_user_store(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def api_user_show(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    except CustomUser.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def api_user_edit(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    except CustomUser.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def api_user_update(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CustomUserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def api_user_destroy(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user.delete()
    return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
