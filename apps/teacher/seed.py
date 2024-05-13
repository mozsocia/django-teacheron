import datetime
from .models import *

def create_teachers():
    teachers = [
        {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "date_of_birth": datetime.date(1980, 1, 1),
            "bio": "Experienced teacher with a passion for education.",
            "education": "Bachelor's in Education",
            "phone_number": "123-456-7890",
            "qualifications": "Certified teacher",
            "experience": 5,
            "subjects": "Math, Science",
            "is_active": True,
            "is_verified": True,
        },
        {
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "jane.smith@example.com",
            "date_of_birth": datetime.date(1985, 5, 10),
            "bio": "Passionate about helping students achieve their goals.",
            "education": "Master's in Education",
            "phone_number": "987-654-3210",
            "qualifications": "Certified teacher",
            "experience": 8,
            "subjects": "English, History",
            "is_active": True,
            "is_verified": True,
        },
        {
            "first_name": "Alice",
            "last_name": "Johnson",
            "email": "alice.johnson@example.com",
            "date_of_birth": datetime.date(1990, 8, 15),
            "bio": "Dedicated educator with a focus on personalized learning.",
            "education": "Bachelor's in Mathematics",
            "phone_number": "555-123-4567",
            "qualifications": "Certified teacher",
            "experience": 3,
            "subjects": "Math, Physics",
            "is_active": True,
            "is_verified": True,
        },
    ]

    for teacher_data in teachers:
        Teacher.objects.create(**teacher_data)

    print("Teachers created successfully.")