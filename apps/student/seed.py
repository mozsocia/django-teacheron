import datetime
from django.contrib.auth.hashers import make_password
from .models import Student

def create_students():
    students = [
        {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "date_of_birth": "1995-05-20",
            "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "education": "Bachelor's Degree in Computer Science",
            "phone_number": "1234567890",
            "is_active": True,
            "is_verified": False,
        },
        {
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "jane@example.com",
            "date_of_birth": "1998-10-15",
            "bio": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            "education": "Master's Degree in Business Administration",
            "phone_number": "9876543210",
            "is_active": True,
            "is_verified": True,
        },
                {
            "first_name": "Alice",
            "last_name": "Johnson",
            "email": "alice@example.com",
            "date_of_birth": "1997-03-10",
            "bio": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce maximus justo vel tellus ullamcorper, eu dictum purus consequat.",
            "education": "Bachelor's Degree in Engineering",
            "phone_number": "5551234567",
            "is_active": True,
            "is_verified": True,
        },
        {
            "first_name": "Michael",
            "last_name": "Brown",
            "email": "michael@example.com",
            "date_of_birth": "1999-07-25",
            "bio": "Sed sed libero vel odio venenatis gravida vel at nisi. Donec aliquam ante vel sollicitudin lacinia.",
            "education": "Associate's Degree in Nursing",
            "phone_number": "1239876543",
            "is_active": True,
            "is_verified": False,
        },
        {
            "first_name": "Sophia",
            "last_name": "Davis",
            "email": "sophia@example.com",
            "date_of_birth": "1996-11-05",
            "bio": "Integer nec tortor malesuada, tempus nulla sed, viverra dolor. Aliquam erat volutpat. Nulla non sem auctor, tincidunt tortor quis, gravida odio.",
            "education": "Bachelor's Degree in Psychology",
            "phone_number": "9995554321",
            "is_active": False,
            "is_verified": False,
        },
    ]

    # for student_data in students:
    #     # Create the student instance
    #     Student.objects.create(**student_data)

    print("Students created successfully.")
