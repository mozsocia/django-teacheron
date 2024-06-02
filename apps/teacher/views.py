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
