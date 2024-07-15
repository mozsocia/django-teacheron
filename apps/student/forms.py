from django import forms
from .models import *
from apps.helpers import *

class JobRequirementForm(EnhancedFormMixin,forms.ModelForm):
    class Meta:
        model = JobRequirement
        fields = [
            'location', 'phone', 'details', 'subjects', 'level', 'i_want', 'meeting',
            'how_much_travel', 'budget', 'gender_preference', 'tutors_wanted',
            'need_someone', 'communication_language', 'uploaded_file'
        ]
        widgets = {
            'location': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your location'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your phone number'}),
            'details': forms.Textarea(attrs={'class': 'form-control', 'rows': 4, 'placeholder': 'Provide more details about your requirements'}),
            'subjects': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter subjects, separated by commas'}),
            'level': forms.Select(attrs={'class': 'form-control'}),
            'i_want': forms.Select(attrs={'class': 'form-control'}),
            'meeting': forms.Select(attrs={'class': 'form-control'}),
            'how_much_travel': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'How much are you willing to travel?'}),
            'budget': forms.NumberInput(attrs={'class': 'form-control', 'min': 0}),
            'gender_preference': forms.Select(attrs={'class': 'form-control'}),
            'tutors_wanted': forms.Select(attrs={'class': 'form-control'}),
            'need_someone': forms.Select(attrs={'class': 'form-control'}),
            'communication_language': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your preferred language(s)'}),
            'uploaded_file': forms.FileInput(attrs={'class': 'form-control-file'}),
        }
        labels = {
            'location': 'Location',
            'phone': 'Phone Number',
            'details': 'Additional Details',
            'subjects': 'Subjects (comma-separated)',
            'level': 'Proficiency Level',
            'i_want': 'I Want to',
            'meeting': 'Meeting Preference',
            'how_much_travel': 'Travel Distance',
            'budget': 'Budget',
            'gender_preference': 'Preferred Gender',
            'tutors_wanted': 'Number of Tutors',
            'need_someone': 'Availability Required',
            'communication_language': 'Communication Language(s)',
            'uploaded_file': 'Upload Relevant File',
        }
        help_texts = {
            'subjects': 'Enter each subject separated by a comma, e.g., "Math, Physics, Chemistry"',
            'how_much_travel': 'Specify the distance or area you are willing to travel',
            'budget': 'Enter your budget in the local currency',
            'communication_language': 'List the languages you prefer for communication',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make all fields required by default
        for field in self.fields:
            self.fields[field].required = True
        
        # Make uploaded_file optional
        self.fields['uploaded_file'].required = False

    def clean_subjects(self):
        subjects = self.cleaned_data['subjects']
        # Remove any extra spaces around commas and after each subject
        cleaned_subjects = ', '.join([subject.strip() for subject in subjects.split(',')])
        return cleaned_subjects

    def clean_budget(self):
        budget = self.cleaned_data['budget']
        if budget < 0:
            raise forms.ValidationError("Budget cannot be negative.")
        return budget

    def clean_phone(self):
        phone = self.cleaned_data['phone']
        # Basic phone number validation (you might want to make this more robust or use a library)
        if not phone.isdigit() or len(phone) < 10:
            raise forms.ValidationError("Please enter a valid phone number.")
        return phone