import datetime
from django.contrib.auth.hashers import make_password
from .models import Student
from django.contrib.auth import get_user_model

def create_students():
    CustomUser = get_user_model()
    students = [
        {
            "user": {
                "name": "Alice Johnson",
                "phone": "123-555-7890",
                "email": "alice.johnson@example.com",
                "is_student": True,
                "accept_terms": True,
            },
            "bio": "High school student passionate about science and technology.",
            "education": "Currently in 11th grade at Science High School.",
            "is_active": True,
            "is_verified": True,
        },
        {
            "user": {
                "name": "Bob Williams",
                "phone": "987-555-3210",
                "email": "bob.williams@example.com",
                "is_student": True,
                "accept_terms": True,
            },
            "bio": "College freshman majoring in English Literature.",
            "education": "1st year at State University, English Literature major.",
            "is_active": True,
            "is_verified": False,
        },
        {
            "user": {
                "name": "Carol Davis",
                "phone": "456-555-8901",
                "email": "carol.davis@example.com",
                "is_student": True,
                "accept_terms": True,
            },
            "bio": "Math enthusiast preparing for calculus olympiad.",
            "education": "8th grade at Math Academy, participating in math competitions.",
            "is_active": True,
            "is_verified": True,
        },
        {
            "user": {
                "name": "David Brown",
                "phone": "789-555-2345",
                "email": "david.brown@example.com",
                "is_student": True,
                "accept_terms": True,
            },
            "bio": "History buff focusing on World War II era.",
            "education": "Senior at Liberal Arts College, History major with focus on 20th century.",
            "is_active": True,
            "is_verified": True,
        },
        {
            "user": {
                "name": "Eva Martinez",
                "phone": "234-555-6789",
                "email": "eva.martinez@example.com",
                "is_student": True,
                "accept_terms": True,
            },
            "bio": "Aspiring artist taking online courses to improve skills.",
            "education": "Self-taught, completed various online art and design courses.",
            "is_active": True,
            "is_verified": False,
        }
    ]

    for student_data in students:
        user_data = student_data.pop("user")
        user = CustomUser.objects.create(**user_data)
        user.set_password("password")
        user.save()
        
        student = Student.objects.create(user=user, **student_data)
        

    print("Students created successfully.")