import datetime
from django.contrib.auth.hashers import make_password
from .models import *
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


import random
import datetime
from django.contrib.auth import get_user_model

def create_job_requirements():
    CustomUser = get_user_model()
    users = CustomUser.objects.filter(is_student=True)

    if not users:
        print("No users found. Please create some users first.")
        return

    job_requirements = [
        {
            "location": "New York, NY",
            "phone": "+1 (212) 555-1234",
            "details": "Looking for a math tutor to help with calculus and linear algebra.",
            "subjects": "Math, Calculus, Linear Algebra",
            "level": "intermediate",
            "i_want": "learn",
            "meeting": "online",
            "how_much_travel": "No travel required",
            "budget": 50,
            "gender_preference": "none",
            "tutors_wanted": "only_one",
            "need_someone": "part_time",
            "communication_language": "English"
        },
        {
            "location": "London, UK",
            "phone": "+44 20 7946 0958",
            "details": "I'm an experienced programmer willing to teach Python and Django.",
            "subjects": "Programming, Python, Django",
            "level": "advanced",
            "i_want": "teach",
            "meeting": "offline",
            "how_much_travel": "Within London",
            "budget": 75,
            "gender_preference": "none",
            "tutors_wanted": "no",
            "need_someone": "full_time",
            "communication_language": "English, French"
        },
        {
            "location": "Tokyo, Japan",
            "phone": "+81 3-1234-5678",
            "details": "Seeking language exchange partner for Japanese and English.",
            "subjects": "Language, Japanese, English",
            "level": "beginner",
            "i_want": "both",
            "meeting": "online",
            "how_much_travel": "No travel required",
            "budget": 30,
            "gender_preference": "none",
            "tutors_wanted": "more_than_one",
            "need_someone": "part_time",
            "communication_language": "Japanese, English"
        }
    ]

    for job_req in job_requirements:
        JobRequirement.objects.create(
            location=job_req["location"],
            phone=job_req["phone"],
            details=job_req["details"],
            subjects=job_req["subjects"],
            level=job_req["level"],
            i_want=job_req["i_want"],
            meeting=job_req["meeting"],
            how_much_travel=job_req["how_much_travel"],
            budget=job_req["budget"],
            gender_preference=job_req["gender_preference"],
            tutors_wanted=job_req["tutors_wanted"],
            need_someone=job_req["need_someone"],
            communication_language=job_req["communication_language"],
            uploaded_file=None,  # You can add a default file or leave it as None
            user=random.choice(users),
        )
        
    print("Job requirements created successfully.")