# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import *
from .serializers import *



# Teacher model CRUD API Views
@api_view(['GET'])
def api_teacher_list(request):
    teachers = Teacher.objects.all()
    serializer = TeacherSerializer(teachers, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def api_teacher_store(request):
    serializer = TeacherSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def api_teacher_show(request, teacher_id):
    try:
        teacher = Teacher.objects.get(id=teacher_id)
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data)
    except Teacher.DoesNotExist:
        return Response({'message': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def api_teacher_edit(request, teacher_id):
    try:
        teacher = Teacher.objects.get(id=teacher_id)
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data)
    except Teacher.DoesNotExist:
        return Response({'message': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def api_teacher_update(request, teacher_id):
    try:
        teacher = Teacher.objects.get(id=teacher_id)
    except Teacher.DoesNotExist:
        return Response({'message': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = TeacherSerializer(teacher, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def api_teacher_destroy(request, teacher_id):
    try:
        teacher = Teacher.objects.get(id=teacher_id)
    except Teacher.DoesNotExist:
        return Response({'message': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)

    teacher.delete()
    return Response({'message': 'Teacher deleted successfully'}, status=status.HTTP_204_NO_CONTENT)