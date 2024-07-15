from django.core.management.base import BaseCommand
from django.template import loader
from django.conf import settings
from django.apps import apps
import os
import re
from django.db.models import ImageField






def generate_views(self):
    app_name = self.context['app_name']
    model_name = self.context['model_name']
    model_name_capitalized = self.context['model_name_capitalized']
    dir_name = self.context['dir_name']
    use_root_templates_dir = self.context['use_root_templates_dir']

    model_name_lower = model_name.lower()
    
    model = apps.get_model(app_name, model_name)

    replacements = [
        ('[[dir_name]]', dir_name if dir_name is not None else app_name),
        ('[[model_name_lower]]', model_name_lower),
        ('[[model_name]]', model_name_capitalized)
    ]

    # Load the template views from the crud_arch/views.arch file
    template_views_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'crud_arch', 'views.arch')

    with open(template_views_path, 'r') as f:
        template_views_content = f.read()

        
    replaced_views_content = template_views_content

    for pattern, replacement in replacements:
        replaced_views_content = replaced_views_content.replace(pattern, replacement)

    views_path = os.path.join(settings.BASE_DIR,'apps', app_name, 'views.py')

    # Open the app's views.py file and read its content
    with open(views_path, 'r') as f:
        views_content = f.read()

    # Check if the comment already exists
    comment_pattern = r'# CRUD for {}'.format(model_name_lower)
    if re.search(comment_pattern, views_content):
        self.stdout.write(self.style.WARNING(f'Views for {model_name} model already exist. Skipping view generation.'))
        return

    replaced_comment = f'# CRUD for {model_name_lower}'

    # Append the replaced views content to the end of the file
    new_views_content = views_content + '\n\n\n\n' + replaced_comment + replaced_views_content

    # Write the new content back to the app's views.py file
    with open(views_path, 'w') as f:
        f.write(new_views_content)

    self.stdout.write(self.style.SUCCESS(f'Views for {model_name} model generated successfully'))










