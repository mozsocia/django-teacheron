from django.db import models

# Create your models here.
class Student(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField()
    bio = models.TextField(blank=True, null=True)
    education = models.TextField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
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
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    subject_area = models.CharField(max_length=100, blank=True, null=True)
    date_posted = models.DateField()
    deadline = models.DateField()
    pay_rate = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=job_status_choices)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)