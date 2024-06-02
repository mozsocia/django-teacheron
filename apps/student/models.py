from django.db import models
from django.contrib.auth import get_user_model

CustomUser = get_user_model()
# Create your models here.
class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    education = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Job(models.Model):
    job_status_choices = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    subject_area = models.CharField(max_length=100, blank=True, null=True)
    date_posted = models.DateField()
    deadline = models.DateField()
    pay_rate = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=job_status_choices)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class JobRequirement(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    IWANT_CHOICES = [
        ('learn', 'Learn'),
        ('teach', 'Teach'),
        ('both', 'Both'),
    ]

    MEETING_CHOICES = [
        ('online', 'Online'),
        ('offline', 'Offline'),
    ]

    BUDGET_CHOICES = [
        (5000, '5000'),
        (1000, '1000'),
    ]

    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    TUTORS_WANTED_CHOICES = [
        ('only_one', 'Only One'),
        ('more_than_one', 'More Than One'),
        ('no', 'No'),
    ]

    NEED_SOMEONE_CHOICES = [
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
    ]

    location = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    details = models.TextField()
    subject = models.CharField(max_length=255)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    i_want = models.CharField(max_length=20, choices=IWANT_CHOICES)
    meeting = models.CharField(max_length=20, choices=MEETING_CHOICES)
    how_much_travel = models.CharField(max_length=255)
    budget = models.IntegerField(choices=BUDGET_CHOICES)
    gender_preference = models.CharField(max_length=10, choices=GENDER_CHOICES)
    tutors_wanted = models.CharField(max_length=20, choices=TUTORS_WANTED_CHOICES)
    need_someone = models.CharField(max_length=20, choices=NEED_SOMEONE_CHOICES)
    communication_language = models.CharField(max_length=255)
    uploaded_file = models.FileField(upload_to='job_requirements/')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.subject} - {self.location}"

    class Meta:
        ordering = ['-created_at']