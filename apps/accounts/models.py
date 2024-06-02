from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, phone, password=None, **extra_fields):
        if not phone:
            raise ValueError('The Phone field must be set')
        user = self.model(phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(phone, password=password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100, unique=True)
    points = models.IntegerField( default = 0)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    otp = models.CharField(max_length=10, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    image = models.ImageField(upload_to='users_images', blank=True, null=True, verbose_name='Profile Image')
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_reseller = models.BooleanField(default=False)
    is_company_staff = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    is_assitant_manager = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    accept_terms = models.BooleanField(verbose_name='Accept all the Terms & Conditions', default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'



# class Division(models.Model):
#     name = models.CharField(max_length=255)

#     def _str_(self):
#         return self.name


# class District(models.Model):
#     name = models.CharField(max_length=255)
#     division = models.ForeignKey(Division, on_delete=models.CASCADE)

#     def _str_(self):
#         return self.name


# class Thana(models.Model):
#     name = models.CharField(max_length=255)
#     district = models.ForeignKey(District, on_delete=models.CASCADE)

#     def _str_(self):
#         return self.name


# class Reseller(models.Model):
#     name = models.CharField(max_length=255)
#     mobile_number = models.CharField(max_length=15, help_text="Mobile number in international format (e.g., +8801xxxxxxxxx).")
#     division = models.ForeignKey(Division, on_delete=models.CASCADE, related_name='resellers')
#     district = models.ForeignKey(District, on_delete=models.CASCADE, related_name='resellers')
#     thana = models.ForeignKey(Thana, on_delete=models.CASCADE, related_name='resellers')
#     full_address = models.CharField(max_length=255, help_text="123 Main Street, Gulshan, Dhaka")
#     zip_code = models.CharField(max_length=10, help_text="Zip code or postal code of the reseller's location.")
#     nid_photo = models.ImageField(upload_to='nid_photos/', help_text="National ID card photo (Front and Back sides together).")
#     passport_size_photo = models.ImageField(upload_to='passport_photos/', help_text="Passport size photo of 55x45mm (5.5x4.5 cm), Professional photo (Background white).")
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         ordering = ['name']
#         verbose_name = 'Reseller'
#         verbose_name_plural = 'Resellers'

#     def _str_(self):
#         return self.name

