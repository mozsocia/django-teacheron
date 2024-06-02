from django import forms
from .models import Teacher
from apps.helpers import *

class TeacherProfileForm(FormFieldClassMixin,forms.ModelForm):
    class Meta:
        model = Teacher
        exclude = ['user']  # Exclude user as it will be set in the view

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['willing_to_travel'].widget = forms.RadioSelect(choices=[(True, 'Yes'), (False, 'No')])
        self.fields['available_for_online_teaching'].widget = forms.RadioSelect(choices=[(True, 'Yes'), (False, 'No')])
        self.fields['has_digital_pen'].widget = forms.RadioSelect(choices=[(True, 'Yes'), (False, 'No')])
        self.fields['helps_with_homework'].widget = forms.RadioSelect(choices=[(True, 'Yes'), (False, 'No')])
        self.fields['is_full_time_teacher'].widget = forms.RadioSelect(choices=[(True, 'Yes'), (False, 'No')])