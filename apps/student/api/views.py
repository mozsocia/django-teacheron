# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import *
from .serializers import *



@api_view(['GET'])
def api_student_list(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def api_student_related(request):
    # You can implement related data retrieval here if needed
    return Response({'message': 'Related data endpoint'})

@api_view(['POST'])
def api_student_store(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def api_student_show(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    except Student.DoesNotExist:
        return Response({'message': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def api_student_edit(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    except Student.DoesNotExist:
        return Response({'message': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def api_student_update(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        return Response({'message': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = StudentSerializer(student, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def api_student_destroy(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        return Response({'message': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

    student.delete()
    return Response({'message': 'Student deleted successfully'}, status=status.HTTP_204_NO_CONTENT)









@api_view(['GET'])
def api_job_requirement_list(request):
    if request.method == 'GET':
        requirements = JobRequirement.objects.all()
        serializer = JobRequirementSerializer(requirements, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def api_job_requirement_related(request):
    # this is endpoint to get all foreign key field data for select input tag
    users = CustomUser.objects.all()
    user_serializer = CustomUserSerializer(users, many=True)

    return Response({
        'users': user_serializer.data,
    })

@api_view(['POST'])
def api_job_requirement_store(request):
    serializer = JobRequirementSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def api_job_requirement_show(request, req_id):
    try:
        requirement = JobRequirement.objects.get(id=req_id)
        serializer = JobRequirementSerializer(requirement)
        return Response(serializer.data)
    except JobRequirement.DoesNotExist:
        return Response({'message': 'Job requirement not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def api_job_requirement_edit(request, req_id):
    try:
        requirement = JobRequirement.objects.get(id=req_id)
        serializer = JobRequirementSerializer(requirement)
        return Response(serializer.data)
    except JobRequirement.DoesNotExist:
        return Response({'message': 'Job requirement not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def api_job_requirement_update(request, req_id):
    try:
        requirement = JobRequirement.objects.get(id=req_id)
    except JobRequirement.DoesNotExist:
        return Response({'message': 'Job requirement not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = JobRequirementSerializer(requirement, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def api_job_requirement_destroy(request, req_id):
    try:
        requirement = JobRequirement.objects.get(id=req_id)
    except JobRequirement.DoesNotExist:
        return Response({'message': 'Job requirement not found'}, status=status.HTTP_404_NOT_FOUND)

    requirement.delete()
    return Response({'message': 'Job requirement deleted successfully'}, status=status.HTTP_204_NO_CONTENT)