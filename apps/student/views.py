from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import *
from .forms import *
from django.http import HttpResponseForbidden


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