from django import forms
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
# Create your models here.
CustomUser = get_user_model() 

class SignupForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    phone = forms.CharField(max_length=15)
    password1 = forms.CharField(widget=forms.PasswordInput)
    password2 = forms.CharField(widget=forms.PasswordInput)
    accept_terms = forms.BooleanField(label='Accept all the Terms & Conditions')
    role = forms.ChoiceField(choices=(('student', 'Student'), ('teacher', 'Teacher')))

    def clean_password1(self):
        password1 = self.cleaned_data.get('password1')

        try:
            password_validation.validate_password(password1)
        except ValidationError as e:
            raise forms.ValidationError(e.messages[0])

        return password1

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')

        if CustomUser.objects.filter(phone=phone).exists():
            raise forms.ValidationError('This phone number is already registered.')

        return phone



    def clean(self):
        cleaned_data = super().clean()

        # Custom overall form validation
        if not cleaned_data.get('accept_terms'):
            raise forms.ValidationError('You must accept the Terms & Conditions.')

 # Check if passwords match
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords do not match.")

        return cleaned_data



class SignInForm(forms.Form):
    email = forms.EmailField( )
    password = forms.CharField( )
    remember_me = forms.BooleanField(
        label='Remember Me',
        required=False,
        initial=False,

    )

    def clean(self):
        cleaned_data = super().clean()
        email = cleaned_data.get('email')
        password = cleaned_data.get('password')

        if email and password:
            user = CustomUser.objects.filter(email=email).first()
            if user and not user.check_password(password):
                print('not valid')
                raise forms.ValidationError('Invalid email or password.')
            elif not user:
                print('not valid 2')
                raise forms.ValidationError('Invalid email or password.')

        return cleaned_data

# forms.py
from django import forms
from .models import CustomUser

class CustomUserForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = '__all__'
        exclude = ['password','last_login','user_permissions', 'groups','is_superuser','is_staff']
