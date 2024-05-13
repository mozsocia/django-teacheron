from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'site/page/home.html')


def login_view(request):
    return render(request, 'site/page/login.html')

def signup_view(request):
    return render(request, 'site/page/signup.html')


def job_post(request):
    return render(request, 'site/page/job_form.html')

def register(request):
    return render(request, 'site/page/register_form.html')