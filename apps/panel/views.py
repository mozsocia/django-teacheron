from django.shortcuts import render

# Create your views here.

def panel(request):
    return render(request, 'panel/pages/dashboard/index.html')