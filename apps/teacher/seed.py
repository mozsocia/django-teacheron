import datetime
from .models import *

def create_teachers():
    teachers = [
        {
            "user": {
                "name": "John Doe",
                "phone": "123-456-7890",
                "email": "john.doe@example.com",
                "is_teacher": True,
                "accept_terms": True,
            },
            "is_active": True,
            "is_verified": True,
            "is_profile_completed": True,
            "teacher_type": "individual",
            "gender": "male",
            "location": "New York",
            "postal_code": "10001",
            "subjects": "Math, Science",
            "from_level": 6,
            "to_level": 12,
            "organization": "NYC Public Schools",
            "designation": "Senior Teacher",
            "experience_start_date": datetime.date(2015, 1, 1),
            "experience_end_date": None,
            "association": "fulltime",
            "job_description": "Teaching advanced math and science.",
            "lesson_plan_details": "Interactive and hands-on approach.",
            "fee_type": "hourly",
            "max_fee": 50.00,
            "min_fee": 30.00,
            "fee_details": "Discounts for group sessions.",
            "tutor_experience_years": 5,
            "industry_experience_years": 2,
            "online_teaching_experience_years": 1,
            "willing_to_travel": True,
            "available_for_online_teaching": True,
            "has_digital_pen": True,
            "helps_with_homework": True,
            "is_full_time_teacher": True,
            "interested_opportunities": "fulltime",
            "institute": "Columbia University",
            "degree_type": "master",
            "degree_name": "Master's in Education",
            "education_start_date": datetime.date(2010, 9, 1),
            "education_end_date": datetime.date(2012, 6, 30),
            "education_association": "fulltime",
            "specialities": "Advanced Calculus, Physics",
            "score": "3.8 GPA",
            "profile_description": "Experienced teacher with a passion for education.",
            "document_type": "passport",
        },
        {
            "user": {
                "name": "Jane Smith",
                "phone": "987-654-3210",
                "email": "jane.smith@example.com",
                "is_teacher": True,
                "accept_terms": True,
            },
            "is_active": True,
            "is_verified": True,
            "is_profile_completed": True,
            "teacher_type": "tutor",
            "gender": "female",
            "location": "Los Angeles",
            "postal_code": "90001",
            "subjects": "English, History",
            "from_level": 1,
            "to_level": 8,
            "organization": "Smith's Tutoring Services",
            "designation": "Founder",
            "experience_start_date": datetime.date(2012, 6, 1),
            "experience_end_date": None,
            "association": "fulltime",
            "job_description": "Providing personalized tutoring.",
            "lesson_plan_details": "Tailored to each student's needs.",
            "fee_type": "monthly",
            "max_fee": 500.00,
            "min_fee": 300.00,
            "fee_details": "Includes weekly sessions and homework help.",
            "tutor_experience_years": 8,
            "industry_experience_years": 0,
            "online_teaching_experience_years": 3,
            "willing_to_travel": False,
            "available_for_online_teaching": True,
            "has_digital_pen": True,
            "helps_with_homework": True,
            "is_full_time_teacher": False,
            "interested_opportunities": "parttime",
            "institute": "UCLA",
            "degree_type": "phd",
            "degree_name": "PhD in English Literature",
            "education_start_date": datetime.date(2005, 9, 1),
            "education_end_date": datetime.date(2010, 6, 30),
            "education_association": "fulltime",
            "specialities": "Victorian Literature, American History",
            "score": "Summa Cum Laude",
            "profile_description": "Passionate about helping students achieve their goals.",
            "document_type": "drivinglicense",
        },
        # 1. Experienced French teacher
    {
        "user": {
            "name": "Marie Dupont",
            "phone": "+33-123-456-789",
            "email": "marie.dupont@example.com",
            "is_teacher": True,
            "accept_terms": True,
        },
        "is_active": True,
        "is_verified": True,
        "is_profile_completed": True,
        "teacher_type": "individual",
        "gender": "female",
        "location": "Paris",
        "postal_code": "75001",
        "subjects": "French",
        "from_level": 1,
        "to_level": 12,
        "organization": "French Language Institute",
        "designation": "Senior Teacher",
        "experience_start_date": datetime.date(2000, 1, 1),
        "experience_end_date": None,
        "association": "fulltime",
        "job_description": "Teaching French language and culture.",
        "lesson_plan_details": "Communicative and engaging approach.",
        "fee_type": "hourly",
        "max_fee": 40.00,
        "min_fee": 30.00,
        "fee_details": "Discounts for long-term bookings.",
        "tutor_experience_years": 20,
        "industry_experience_years": 20,
        "online_teaching_experience_years": 5,
        "willing_to_travel": False,
        "available_for_online_teaching": True,
        "has_digital_pen": True,
        "helps_with_homework": True,
        "is_full_time_teacher": True,
        "interested_opportunities": "fulltime",
        "institute": "Sorbonne University",
        "degree_type": "master",
        "degree_name": "Master's in French Language Teaching",
        "education_start_date": datetime.date(1995, 9, 1),
        "education_end_date": datetime.date(1997, 6, 30),
        "education_association": "fulltime",
        "specialities": "French Literature, Business French",
        "score": "4.0 GPA",
        "profile_description": "Highly experienced and passionate French teacher.",
        "document_type": "passport",
    },

    # 2. Young and enthusiastic coding tutor
    {
        "user": {
            "name": "David Lee",
            "phone": "+82-10-987-6543",
            "email": "david.lee@example.com",
            "is_teacher": True,
            "accept_terms": True,
        },
        "is_active": True,
        "is_verified": True,
        "is_profile_completed": True,

        "teacher_type": "tutor",
        "gender": "male",
        "location": "Seoul",
        "postal_code": "123456",
        "subjects": "Programming (Python, Java)",
        "from_level": 1,
        "to_level": 12,
        "organization": "Coding Academy",
        "designation": "Lead Instructor",
        "experience_start_date": datetime.date(2018, 6, 1),
        "experience_end_date": None,
        "association": "parttime",
        "job_description": "Teaching coding fundamentals and project-based learning.",
        "lesson_plan_details": "Interactive and hands-on approach with real-world examples.",
        "fee_type": "hourly",
        "max_fee": 35.00,
        "min_fee": 25.00,
        "fee_details": "Discounts for group sessions and long-term commitments.",
        "tutor_experience_years": 5,
        "industry_experience_years": 1,
        "online_teaching_experience_years": 3,
        "willing_to_travel": True,
        "available_for_online_teaching": True,
        "has_digital_pen": False,
        "helps_with_homework": True,
        "is_full_time_teacher": False,
        "interested_opportunities": "parttime",
        "institute": "Seoul National University",
        "degree_type": "bachelor",
        "degree_name": "Bachelor's in Computer Science",
        "education_start_date": datetime.date(2014, 9, 1),
        "education_end_date": datetime.date(2018, 6, 30),
        "education_association": "fulltime",
        "specialities": "Web Development, Mobile App Development",
        "score": "3.9 GPA",
        "profile_description": "Enthusiastic and engaging coding instructor.",
        "document_type": "studentcard",
    },

    # 3. Retired music teacher offering private lessons
    {
        "user": {
            "name": "Anna Maria Rossi",
            "phone": "+39-06-123-4567",
            "email": "anna.rossi@example.com",
            "is_teacher": True,
            "accept_terms": True,
        },
        "is_active": True,
        "is_verified": True,
        "is_profile_completed": True,
        "teacher_type": "individual",
        "gender": "female",
        "location": "Rome",
        "postal_code": "00186",
        "subjects": "Music (Piano, Violin)",
        "from_level": 1,
        "to_level": 12,
        "organization": "Retired",
        "designation": "Music Teacher",
        "experience_start_date": datetime.date(1975, 1, 1),
        "experience_end_date": datetime.date(2020, 12, 31),
        "association": "fulltime",
        "job_description": "Teaching piano and violin to all ages and levels.",
        "lesson_plan_details": "Tailored to individual needs and goals.",
        "fee_type": "hourly",
        "max_fee": 50.00,
        "min_fee": 40.00,
        "fee_details": "Flexible pricing based on student's age and experience.",
        "tutor_experience_years": 45,
        "industry_experience_years": 45,
        "online_teaching_experience_years": 2,
        "willing_to_travel": False,
        "available_for_online_teaching": True,
        "has_digital_pen": False,
        "helps_with_homework": False,
        "is_full_time_teacher": False,
        "interested_opportunities": "parttime",
        "institute": "Conservatory of Santa Cecilia",
        "degree_type": "master",
        "degree_name": "Master's in Music Performance",
        "education_start_date": datetime.date(1970, 9, 1),
        "education_end_date": datetime.date(1975, 6, 30),
        "education_association": "fulltime",
        "specialities": "Classical Music, Performance Techniques",
        "score": "Distinction",
        "profile_description": "Highly experienced and dedicated music teacher.",
        "document_type": "passport",
    },

    # 4. Specialized art tutor with a focus on creativity
    {
        "user": {
            "name": "Miguel Garcia",
            "phone": "+34-91-123-4567",
            "email": "miguel.garcia@example.com",
            "is_teacher": True,
            "accept_terms": True,
        },
        "is_active": True,
        "is_verified": True,
        "is_profile_completed": True,
        "teacher_type": "tutor",
        "gender": "male",
        "location": "Barcelona",
        "postal_code": "08001",
        "subjects": "Art (Drawing, Painting)",
        "from_level": 1,
        "to_level": 12,
        "organization": "Art Studio Barcelona",
        "designation": "Art Instructor",
        "experience_start_date": datetime.date(2015, 1, 1),
        "experience_end_date": None,
        "association": "parttime",
        "job_description": "Encouraging artistic expression and exploration through various mediums.",
    "lesson_plan_details": "Fun and engaging activities that spark creativity and imagination.",
    "fee_type": "hourly",
    "max_fee": 45.00,
    "min_fee": 35.00,
    "fee_details": "Discounts for group sessions and long-term commitments.",
    "tutor_experience_years": 7,
    "industry_experience_years": 3,
    "online_teaching_experience_years": 4,
    "willing_to_travel": True,
    "available_for_online_teaching": True,
    "has_digital_pen": False,
    "helps_with_homework": False,
    "is_full_time_teacher": False,
    "interested_opportunities": "parttime",
    "institute": "Barcelona School of Fine Arts",
    "degree_type": "bachelor",
    "degree_name": "Bachelor's in Fine Arts",
    "education_start_date": datetime.date(2012, 9, 1),
    "education_end_date": datetime.date(2016, 6, 30),
    "education_association": "fulltime",
    "specialities": "Drawing Techniques, Watercolors, Creative Thinking",
    "score": "First Class Honors",
    "profile_description": "Passionate about fostering artistic development in students.",
    "document_type": "nationalid",
    },

    # 5. Experienced history teacher with a focus on social justice
    {
        "user": {
            "name": "Dr. Sarah Jones",
            "phone": "+1-415-555-1212",
            "email": "sarah.jones@example.com",
            "is_teacher": True,
            "accept_terms": True,
        },
        "is_active": True,
        "is_verified": True,
        "is_profile_completed": True,
        "teacher_type": "individual",
        "gender": "female",
        "location": "San Francisco",
        "postal_code": "94102",
        "subjects": "History (World History, US History)",
        "from_level": 9,
        "to_level": 12,
        "organization": "University of California, Berkeley",
        "designation": "Professor",
        "experience_start_date": datetime.date(2005, 9, 1),
        "experience_end_date": None,
        "association": "fulltime",
        "job_description": "Teaching undergraduate and graduate history courses with a focus on social justice and critical thinking.",
        "lesson_plan_details": "Incorporating diverse perspectives and engaging discussions.",
        "fee_type": "hourly",
        "max_fee": 75.00,
        "min_fee": 60.00,
        "fee_details": "Available for private tutoring or group workshops.",
        "tutor_experience_years": 18,
        "industry_experience_years": 18,
        "online_teaching_experience_years": 5,
        "willing_to_travel": True,
        "available_for_online_teaching": True,
        "has_digital_pen": True,
        "helps_with_homework": True,
        "is_full_time_teacher": True,
        "interested_opportunities": "parttime",
        "institute": "Harvard University",
        "degree_type": "phd",
        "degree_name": "PhD in History",
        "education_start_date": datetime.date(1995, 9, 1),
        "education_end_date": datetime.date(2000, 6, 30),
        "education_association": "fulltime",
        "specialities": "Modern American History, Social Movements",
        "score": "Summa Cum Laude",
        "profile_description": "Dedicated to fostering historical understanding and critical thinking through engaging lessons.",
        "document_type": "passport",
    },

    ]

    for teacher_data in teachers:
        user_data = teacher_data.pop("user")
        user = CustomUser.objects.create(**user_data)
        # set password for user here
        user.set_password("password")
        user.save()
        

        
        teacher = Teacher.objects.create(user=user, **teacher_data)



    print("Teachers created successfully.")






import random
import datetime
from django.utils import timezone
from apps.teacher.models import *
from apps.student.models import *

def create_applications():
    teachers = Teacher.objects.all()
    job_requirements = JobRequirement.objects.all()

    if not teachers:
        print("No teachers found. Please create some teachers first.")
        return

    if not job_requirements:
        print("No job requirements found. Please create some job requirements first.")
        return

    cover_letters = [
        "I am an experienced math tutor with over 5 years of experience teaching calculus and linear algebra. I have helped numerous students improve their grades and understand complex mathematical concepts. I believe my expertise makes me the perfect fit for your requirements.",
        
        "As a passionate language teacher, I have been teaching English to Japanese speakers for the past 3 years. I also have a JLPT N2 certification in Japanese. I'm excited about the opportunity to engage in a language exchange, as it would benefit both of us.",
        
        "I have been a professional software developer for 7 years, with a strong focus on Python and Django. I've built and maintained several large-scale web applications. Teaching is my way of giving back to the community, and I'd love to share my knowledge with you.",
        
        "My expertise lies in teaching advanced physics, particularly quantum mechanics and relativity. I have a Ph.D. in Theoretical Physics and have been tutoring graduate students. I'm interested in your posting as it aligns well with my skill set.",
        
        "I am a native French speaker with a degree in French Literature. I've been teaching French online for the past 2 years, focusing on conversational skills and cultural nuances. I believe language learning should be fun and engaging."
    ]

    applications = []
    for _ in range(10):  # Creating 10 random applications
        job = random.choice(job_requirements)
        teacher = random.choice(teachers)
        cover_letter = random.choice(cover_letters)
        status = random.choice(['pending', 'accepted', 'rejected'])
        
        # Ensure the teacher hasn't already applied to this job
        while any(a for a in applications if a[0] == job and a[1] == teacher):
            job = random.choice(job_requirements)
            teacher = random.choice(teachers)

        applications.append((job, teacher, cover_letter, status))

    for job, teacher, cover_letter, status in applications:
        applied_at = timezone.now() - datetime.timedelta(days=random.randint(0, 30))
        Application.objects.create(
            job=job,
            teacher=teacher,
            cover_letter=cover_letter,
            status=status,
            applied_at=applied_at
        )
    
    print("Applications created successfully.")