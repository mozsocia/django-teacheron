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

    def __str__(self):
        return self.user.name




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

    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('none', 'None'),
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
    subjects = models.CharField(max_length=255,help_text="Comma-separated list of subjects")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    i_want = models.CharField(max_length=20, choices=IWANT_CHOICES)
    meeting = models.CharField(max_length=20, choices=MEETING_CHOICES)
    how_much_travel = models.CharField(max_length=255)
    budget = models.IntegerField()
    gender_preference = models.CharField(max_length=10, choices=GENDER_CHOICES)
    tutors_wanted = models.CharField(max_length=20, choices=TUTORS_WANTED_CHOICES)
    need_someone = models.CharField(max_length=20, choices=NEED_SOMEONE_CHOICES)
    communication_language = models.CharField(max_length=255)
    uploaded_file = models.FileField(upload_to='job_requirements/')

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.subjects} - {self.location}"

    class Meta:
        ordering = ['-created_at']