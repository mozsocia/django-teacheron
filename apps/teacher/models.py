from django.db import models
from apps.student.models import *
from django.contrib.auth import get_user_model

CustomUser = get_user_model()
# Create your models here.
class Teacher(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    is_profile_completed = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)

    # Basic Information
    TEACHER_TYPE_CHOICES = [
        ('individual', 'Individual Teacher'),
        ('tutor', 'Tutor'),
    ]
    teacher_type = models.CharField(max_length=20, choices=TEACHER_TYPE_CHOICES)
    
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    
    location = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    

    # Subjects and Levels
    subjects = models.CharField(max_length=200, help_text="Comma-separated list of subjects")
    from_level = models.IntegerField(help_text="From Grade")
    to_level = models.IntegerField(help_text="To Grade")

    # Teaching Experience
    organization = models.CharField(max_length=100, blank=True)
    designation = models.CharField(max_length=100, blank=True)
    experience_start_date = models.DateField(null=True, blank=True)
    experience_end_date = models.DateField(null=True, blank=True)
    
    ASSOCIATION_CHOICES = [
        ('parttime', 'Part-time'),
        ('fulltime', 'Full-time'),
    ]
    association = models.CharField(max_length=10, choices=ASSOCIATION_CHOICES, blank=True)
    
    job_description = models.TextField(blank=True)
    lesson_plan_details = models.TextField(blank=True)

    # Teaching Details
    FEE_TYPE_CHOICES = [
        ('hourly', 'Hourly'),
        ('monthly', 'Monthly'),
    ]
    fee_type = models.CharField(max_length=10, choices=FEE_TYPE_CHOICES)
    
    max_fee = models.DecimalField(max_digits=10, decimal_places=2)
    min_fee = models.DecimalField(max_digits=10, decimal_places=2)
    fee_details = models.TextField(blank=True)
    tutor_experience_years = models.PositiveIntegerField(default=0)
    industry_experience_years = models.PositiveIntegerField(default=0)
    online_teaching_experience_years = models.PositiveIntegerField(default=0)
    
    willing_to_travel = models.BooleanField(default=False)
    available_for_online_teaching = models.BooleanField(default=False)
    has_digital_pen = models.BooleanField(default=False)
    helps_with_homework = models.BooleanField(default=False)
    is_full_time_teacher = models.BooleanField(default=False)
    
    OPPORTUNITY_CHOICES = [
        ('fulltime', 'Full Time'),
        ('parttime', 'Part Time'),
    ]
    interested_opportunities = models.CharField(max_length=10, choices=OPPORTUNITY_CHOICES)

    # Education
    institute = models.CharField(max_length=100)
    
    DEGREE_TYPE_CHOICES = [
        ('bachelor', 'Bachelor'),
        ('master', 'Master'),
        ('phd', 'PhD'),
    ]
    degree_type = models.CharField(max_length=10, choices=DEGREE_TYPE_CHOICES)
    
    degree_name = models.CharField(max_length=100)
    education_start_date = models.DateField()
    education_end_date = models.DateField(null=True, blank=True)
    
    EDU_ASSOCIATION_CHOICES = [
        ('parttime', 'Part-time'),
        ('fulltime', 'Full-time'),
    ]
    education_association = models.CharField(max_length=10, choices=EDU_ASSOCIATION_CHOICES)
    
    specialities = models.CharField(max_length=200, blank=True)
    score = models.CharField(max_length=50, blank=True, null=True)

    # Profile Description
    profile_description = models.TextField(help_text="Don't share any contact info")

    # Identification
    DOC_TYPE_CHOICES = [
        ('passport', 'Passport'),
        ('drivinglicense', 'Driving License'),
    ]
    document_type = models.CharField(max_length=20, choices=DOC_TYPE_CHOICES)
    document_file = models.FileField(upload_to='teacher_ids/')



    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.user.email


class Application(models.Model):
    application_status_choices = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    cover_letter = models.TextField()
    status = models.CharField(max_length=20, choices=application_status_choices)
    applied_at = models.DateTimeField(auto_now_add=True)