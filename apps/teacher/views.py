from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .forms import *
from .models import *
from django.contrib import messages
from django.views.decorators.http import require_GET, require_POST

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


def teacher_profile(request):
    teacher = get_object_or_404(Teacher, id=request.user.teacher.id)
    return render(request, 'site/page/teachers/profile.html', {'teacher': teacher})
def teacher_detail(request, teacher_id):
    teacher = get_object_or_404(Teacher, id=teacher_id)
    return render(request, 'site/page/teachers/detail.html', {'teacher': teacher})




def edit_teacher_profile(request, teacher_id):
    teacher = get_object_or_404(Teacher, id=teacher_id)
    
    if request.method == 'POST':
        form = TeacherForm(request.POST, request.FILES, instance=teacher)
        if form.is_valid():
            form.save()
            return redirect('teacher_profile')  # Redirect to teacher's profile page
    else:
        form = TeacherForm(instance=teacher)
    
    return render(request, 'site/page/teachers/edit_profile.html', {'form': form, 'teacher': teacher})








def has_applied(teacher, job):
    return Application.objects.filter(teacher=teacher, job=job).exists()

@login_required
def create_application(request, job_id):
    if not request.user.is_teacher:
        messages.error(request, "You are not a teacher.")
        return redirect('job_requirement_detail', pk=job_id)
    
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




# CRUD for teacher
@require_GET
def panel_teacher_list(request):
    object_list = Teacher.objects.all()
    return render(request, 'panel/pages/teacher/list.html', {'object_list': object_list})

@require_GET
def panel_teacher_create(request):
    form = TeacherPanelForm()
    return render(request, 'panel/pages/teacher/create.html', {'form': form})

@require_POST
def panel_teacher_store(request):
    form = TeacherPanelForm(request.POST, request.FILES)
    if form.is_valid():
        object = form.save()
        return redirect('panel_teacher_detail', pk=object.id)
    return render(request, 'panel/pages/teacher/create.html', {'form': form})

@require_GET
def panel_teacher_detail(request, pk):
    object = get_object_or_404(Teacher, pk=pk)
    return render(request, 'panel/pages/teacher/detail.html', {'object': object})

@require_GET
def panel_teacher_edit(request, pk):
    object = get_object_or_404(Teacher, pk=pk)
    form = TeacherPanelForm(instance=object)
    return render(request, 'panel/pages/teacher/edit.html', {'form': form, 'object': object})

@require_POST
def panel_teacher_update(request, pk):
    object = get_object_or_404(Teacher, pk=pk)
    form = TeacherPanelForm(request.POST, request.FILES, instance=object)
    if form.is_valid():
        form.save()
        return redirect('panel_teacher_detail', pk=object.id)
    return render(request, 'panel/pages/teacher/edit.html', {'form': form, 'object': object})

@require_POST
def panel_teacher_delete(request, pk):
    object = get_object_or_404(Teacher, pk=pk)
    object.delete()
    return redirect('panel_teacher_list')