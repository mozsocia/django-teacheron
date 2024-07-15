from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import *
from .forms import *
from apps.teacher.models import *
from django.http import HttpResponseForbidden
from django.http import Http404
from django.views.decorators.http import require_GET, require_POST


@login_required
def create_job_requirement(request):
    if request.method == 'POST':
        form = JobRequirementForm(request.POST, request.FILES)
        if form.is_valid():
            job_req = form.save(commit=False)
            job_req.user = request.user
            job_req.save()
            messages.success(request, 'Job requirement created successfully.')
            return redirect('view_job_requirement', pk=job_req.pk)
        else:
            messages.error(request, 'Please correct the errors below.')
            print(form.errors)
    else:
        custom_classes = {
            'text': 'form-hr-input',
            'textarea': 'form-hr-textarea',
            'select': 'form-hr-input-select',
            'file': 'form-hr-file',
        }
        form = JobRequirementForm().apply_classes(custom_classes)

    return render(request, 'site/page/student/create_job_requirement.html', {'form': form})

@login_required
def view_job_requirement(request, pk):
    try:
        job_requirement = JobRequirement.objects.get(pk=pk, user=request.user)
    except JobRequirement.DoesNotExist:
        raise Http404("Job requirement not found or you don't have permission to view it.")
    
    applications = Application.objects.filter(job=job_requirement).select_related('teacher')
    return render(request, 'site/page/student/view_job_requirement.html', {
        'job_req': job_requirement,
        'applications': applications,
    })
    job_req = get_object_or_404(JobRequirement, pk=pk)
    return render(request, 'site/page/student/view_job_requirement.html', {'job_req': job_req})

@login_required
def list_job_requirements(request):
    job_reqs = JobRequirement.objects.filter(user=request.user)
    return render(request, 'site/page/student/list_job_requirements.html', {'job_reqs': job_reqs})



@login_required
def edit_job_requirement(request, pk):
    job_req = get_object_or_404(JobRequirement, pk=pk)
    
    # Check if the user owns this job requirement
    if job_req.user != request.user:
        return HttpResponseForbidden("You don't have permission to edit this job requirement.")
    
    if request.method == 'POST':
        form = JobRequirementForm(request.POST, request.FILES, instance=job_req)
        if form.is_valid():
            form.save()
            messages.success(request, "Job requirement updated successfully.")
            return redirect('view_job_requirement', pk=job_req.pk)
    else:
        form = JobRequirementForm(instance=job_req)
    
    return render(request, 'site/page/student/edit_job_requirement.html', {'form': form, 'job_req': job_req})

@login_required
def delete_job_requirement(request, pk):
    job_req = get_object_or_404(JobRequirement, pk=pk)
    
    # Check if the user owns this job requirement
    if job_req.user != request.user:
        return HttpResponseForbidden("You don't have permission to delete this job requirement.")
    
    if request.method == 'POST':        
        job_req.delete()
        messages.success(request, "Job requirement deleted successfully.")
        return redirect('list_job_requirements')
    
    return redirect('view_job_requirement', pk=job_req.pk)



# CRUD for student
@require_GET
def panel_student_list(request):
    object_list = Student.objects.all()
    return render(request, 'panel/pages/student/list.html', {'object_list': object_list})

@require_GET
def panel_student_create(request):
    form = StudentPanelForm()
    return render(request, 'panel/pages/student/create.html', {'form': form})

@require_POST
def panel_student_store(request):
    form = StudentPanelForm(request.POST, request.FILES)
    if form.is_valid():
        object = form.save()
        return redirect('panel_student_detail', pk=object.id)
    return render(request, 'panel/pages/student/create.html', {'form': form})

@require_GET
def panel_student_detail(request, pk):
    object = get_object_or_404(Student, pk=pk)
    return render(request, 'panel/pages/student/detail.html', {'object': object})

@require_GET
def panel_student_edit(request, pk):
    object = get_object_or_404(Student, pk=pk)
    form = StudentPanelForm(instance=object)
    return render(request, 'panel/pages/student/edit.html', {'form': form, 'object': object})

@require_POST
def panel_student_update(request, pk):
    object = get_object_or_404(Student, pk=pk)
    form = StudentPanelForm(request.POST, request.FILES, instance=object)
    if form.is_valid():
        form.save()
        return redirect('panel_student_detail', pk=object.id)
    return render(request, 'panel/pages/student/edit.html', {'form': form, 'object': object})

@require_POST
def panel_student_delete(request, pk):
    object = get_object_or_404(Student, pk=pk)
    object.delete()
    return redirect('panel_student_list')



# CRUD for jobrequirement
@require_GET
def panel_jobrequirement_list(request):
    object_list = JobRequirement.objects.all()
    return render(request, 'panel/pages/jobrequirement/list.html', {'object_list': object_list})

@require_GET
def panel_jobrequirement_create(request):
    form = JobrequirementPanelForm()
    return render(request, 'panel/pages/jobrequirement/create.html', {'form': form})

@require_POST
def panel_jobrequirement_store(request):
    form = JobrequirementPanelForm(request.POST, request.FILES)
    if form.is_valid():
        object = form.save()
        return redirect('panel_jobrequirement_detail', pk=object.id)
    return render(request, 'panel/pages/jobrequirement/create.html', {'form': form})

@require_GET
def panel_jobrequirement_detail(request, pk):
    object = get_object_or_404(JobRequirement, pk=pk)
    return render(request, 'panel/pages/jobrequirement/detail.html', {'object': object})

@require_GET
def panel_jobrequirement_edit(request, pk):
    object = get_object_or_404(JobRequirement, pk=pk)
    form = JobrequirementPanelForm(instance=object)
    return render(request, 'panel/pages/jobrequirement/edit.html', {'form': form, 'object': object})

@require_POST
def panel_jobrequirement_update(request, pk):
    object = get_object_or_404(JobRequirement, pk=pk)
    form = JobrequirementPanelForm(request.POST, request.FILES, instance=object)
    if form.is_valid():
        form.save()
        return redirect('panel_jobrequirement_detail', pk=object.id)
    return render(request, 'panel/pages/jobrequirement/edit.html', {'form': form, 'object': object})

@require_POST
def panel_jobrequirement_delete(request, pk):
    object = get_object_or_404(JobRequirement, pk=pk)
    object.delete()
    return redirect('panel_jobrequirement_list')