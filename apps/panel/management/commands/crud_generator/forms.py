from django.core.management.base import BaseCommand
from django.template import loader
from django.conf import settings
from django.apps import apps
import os
import re
from django.db.models import ImageField



def generate_forms(self):

    app_name = self.context['app_name']
    model_name = self.context['model_name']
    model_name_capitalized = self.context['model_name_capitalized']
    dir_name = self.context['dir_name']
    use_root_templates_dir = self.context['use_root_templates_dir']

    model_name_lower = model_name.lower()
    model = apps.get_model(app_name, model_name)

    # Load the template forms.py from the crud_arch/forms.arch file
    template_forms_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'crud_arch', 'forms.arch')
    with open(template_forms_path, 'r') as f:
        template_forms_content = f.read()

    # Replace the placeholders with the actual model name
    replaced_forms_content = template_forms_content.replace('[[model_name]]', model_name_capitalized)

    forms_path = os.path.join(settings.BASE_DIR, 'apps', app_name, 'forms.py')

    # Check if the forms.py file exists, if not, create it
    forms_file_exists = os.path.isfile(forms_path)
    if not forms_file_exists:
        with open(forms_path, 'w') as f:
            f.write('from django import forms\n\n')

    # Open the app's forms.py file and read its content
    with open(forms_path, 'r') as f:
        forms_content = f.read()

    # Check if the form for the model already exists
    form_pattern = r'class {}PanelForm\(forms\.ModelForm\)'.format(model_name_capitalized)
    if re.search(form_pattern, forms_content):
        self.stdout.write(self.style.WARNING(f'Form for {model_name} model already exists. Skipping form generation.'))
        return

    # Append the replaced forms content to the end of the file
    new_forms_content = forms_content + '\n' + replaced_forms_content

    # Write the new content back to the app's forms.py file
    with open(forms_path, 'w') as f:
        f.write(new_forms_content)

    self.stdout.write(self.style.SUCCESS(f'Form for {model_name} model generated successfully'))





