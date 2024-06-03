from django.shortcuts import render, get_object_or_404

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





from apps.teacher.models import *

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

def teacher_list(request):
    teachers = Teacher.objects.all()
    page = request.GET.get('page', 1)
    paginator = Paginator(teachers, 10)  # Show 10 teachers per page

    try:
        teachers_paginated = paginator.page(page)
    except PageNotAnInteger:
        teachers_paginated = paginator.page(1)
    except EmptyPage:
        teachers_paginated = paginator.page(paginator.num_pages)

    return render(request, 'site/page/all_tutors.html', {'teachers': teachers_paginated})

def teacher_detail(request, pk):
    teacher = get_object_or_404(Teacher, pk=pk)
    return render(request, 'site/page/tutor_detail.html', {'teacher': teacher})