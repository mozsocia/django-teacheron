from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from . forms import *
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.utils.encoding import force_str
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.http import HttpResponse
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.conf import settings

from pprint import pprint
from django.db import transaction
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from .forms import *
from .models import *
from apps.helpers import *
from apps.student.models import *
from apps.teacher.models import *





def signin(request):
    if request.method == 'POST':
        phone = request.POST['phone']
        password = request.POST['password']

        remember_me = request.POST.get('check', False)
        
        user = authenticate(request, phone=phone, password=password)

        if user is not None:
            login(request, user)

            if not remember_me:
                request.session.set_expiry(0)

            messages.success(request, "User logged in successfully.")
            return redirect('/')
        else:
            messages.error(request, 'Invalid phone or password.')
            return render(request, 'site/auth/login.html')
        
    return render(request, 'site/page/auth/login.html')


def signup(request):
    if request.method == 'POST':
        request.POST._mutable = True
        request.POST['accept_terms'] = True

        form = SignupForm(request.POST)
        print(request.POST)
        if form.is_valid():
            with transaction.atomic():
                new_user = CustomUser(
                    name=form.cleaned_data['name'],
                    phone=form.cleaned_data['phone'],
                    email=form.cleaned_data['email'],
                    accept_terms=form.cleaned_data['accept_terms'],
                )
                
                new_user.set_password(form.cleaned_data['password1'])
                


                new_user.save()


                if form.cleaned_data['role'] == 'student':
                    new_user.is_student = True
                    new_user.save()
                    Student.objects.create(
                        user=new_user
                    )

                elif form.cleaned_data['role'] == 'teacher':
                    new_user.is_teacher = True
                    new_user.save()
                    Teacher.objects.create(
                        user=new_user
                    )



            messages.success(request, 'Account created successfully. Please log in.')
            return redirect('login')
        else:
            messages.error(request, 'Error creating account. Please check the form and try again.')
            pprint(form.errors)
            
    else:
        form = SignupForm()

    return render(request, 'site/page/auth/signup.html', {'form': form})

def signout(request):
    logout(request)
    messages.success(request, "User logged out successfully.")
    return redirect('/')

def password_reset(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            user = None

        if user:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = reverse('reset_password_confirm', args=(uid, token))
            current_site = get_current_site(request)
            mail_subject = 'Password Reset Request'
            message = render_to_string('site/auth/reset-password-template.html', {
                'user': user,
                'domain': current_site.domain,
                'reset_link': reset_link,
            })

            

            send_mail(mail_subject, message, settings.DEFAULT_FROM_EMAIL, [email])
        return render(request, 'site/auth/reset-password-done.html', {'email': email})
    return render(request, 'site/auth/reset-password.html')


def password_reset_confirm(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        if request.method == 'POST':
            new_password = request.POST.get('new_password')
            user.set_password(new_password)
            user.save()
            return redirect('password_reset_complete')
        return render(request, 'site/auth/reset-password-confirm.html')
    else:
        return HttpResponse('Password reset link is invalid')
    

def password_reset_done(request):
    return render(request, 'site/auth/reset-password-done.html')


def password_reset_complete(request):
    return render(request, 'site/auth/reset-password-complete.html')



# def profile(request):
#     customer = Customer.objects.get(user=request.user)
#     # pprint(vars(customer))
#     return render(request, 'site/profile/profile_main.html', {'customer': customer})

# def profile_test(request):
#     customer = Customer.objects.get(user=request.user)
#     # pprint(vars(customer))
#     return render(request, 'site/profile/profile_test.html', {'customer': customer})

# def profile_update(request, pk):
#     customer = get_object_or_404(Customer, user=request.user)
#     if request.method == 'POST':
#         form = CustomerForm(request.POST, request.FILES, instance=customer)
#         if form.is_valid():
#             form.save()
#             return redirect('profile')
#     else:
#         form = CustomerForm(instance=customer)
#     return render(request, 'site/profile/profile_update.html', {'form': form})

def profile_back(request):
    return render(request, 'site/profile/profile_layout.html')


