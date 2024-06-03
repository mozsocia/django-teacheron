from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import TeacherProfileForm

# @login_required
def create_teacher_profile(request):
    if request.method == 'POST':
        form = TeacherProfileForm(request.POST, request.FILES)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            profile.save()
            return redirect('profile_created')  # Redirect to a success page
    else:
        form = TeacherProfileForm()
    
    return render(request, 'site/page/register_form.html', {'form': form})




from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Application, JobRequirement
from django.contrib import messages
def has_applied(teacher, job):
    return Application.objects.filter(teacher=teacher, job=job).exists()

@login_required
def create_application(request, job_id):
    job = get_object_or_404(JobRequirement, id=job_id)
    teacher = request.user.teacher

        # Check if the teacher has already applied
    if has_applied(teacher, job):
        messages.warning(request, "You have already applied for this job.")
        return redirect('application_detail', application_id=Application.objects.get(teacher=teacher, job=job).id)

    if request.method == 'POST':
        cover_letter = request.POST.get('cover_letter')
        application = Application.objects.create(
            job=job,
            teacher=teacher,
            cover_letter=cover_letter,
            status='pending'
        )
        return redirect('application_detail', application_id=application.id)

    return render(request, 'site/page/applications/create.html', {'job': job})

@login_required
def application_detail(request, application_id):
    application = get_object_or_404(Application, id=application_id, teacher=request.user.teacher)
    return render(request, 'site/page/applications/detail.html', {'application': application})

@login_required
def application_list(request):
    applications = Application.objects.filter(teacher=request.user.teacher)
    return render(request, 'site/page/applications/list.html', {'applications': applications})

@login_required
def update_application(request, application_id):
    application = get_object_or_404(Application, id=application_id, teacher=request.user.teacher)

    if request.method == 'POST':
        application.cover_letter = request.POST.get('cover_letter')
        application.save()
        return redirect('application_detail', application_id=application.id)

    return render(request, 'site/page/applications/update.html', {'application': application})

@login_required
def delete_application(request, application_id):
    application = get_object_or_404(Application, id=application_id, teacher=request.user.teacher)

    if request.method == 'POST':
        application.delete()
        return redirect('application_list')

    return render(request, 'site/page/applications/delete.html', {'application': application})
