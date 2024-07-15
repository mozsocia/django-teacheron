
from django.core.management.base import BaseCommand
from django.template import loader
from django.conf import settings
from django.apps import apps
import os
import re
from django.db.models import ImageField




def generate_sidebar(self):

    app_name = self.context['app_name']
    model_name = self.context['model_name']
    model_name_capitalized = self.context['model_name_capitalized']
    dir_name = self.context['dir_name']
    use_root_templates_dir = self.context['use_root_templates_dir']

    model_name_lower = model_name.lower()
    model = apps.get_model(app_name, model_name)

    replacements = [
        ('[[model_name_lower]]', model_name_lower),
        ('[[model_name]]', model_name_capitalized),
        ('[[list_url_name]]', f'panel_{model_name_lower}_list'),
        ('[[create_url_name]]', f'panel_{model_name_lower}_create')
    ]


    # Load the template sidebar from the crud_arch/sidebar_item.arch file
    template_sidebar_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'crud_arch', 'sidebar_item.arch')

    with open(template_sidebar_path, 'r') as f:
        template_sidebar_content = f.read()


    # Replace the placeholders with the actual model name
    replaced_sidebar_content = template_sidebar_content

    for pattern, replacement in replacements:
        replaced_sidebar_content = replaced_sidebar_content.replace(pattern, replacement)

    sidebar_path = os.path.join(settings.BASE_DIR,'templates', 'panel', 'includes', 'sidebar_items.html')

    # Open the app's sidebar.py file and read its content
    with open(sidebar_path, 'r') as f:
        sidebar_content = f.read()

    # Check if the comment already exists
    comment_pattern = r'# CRUD for {}'.format(model_name_lower)
    if re.search(comment_pattern, sidebar_content):
        self.stdout.write(self.style.WARNING(f'Sidebar item for {model_name} model already exist. Skipping view generation.'))
        return

    replaced_comment = '<!--' + f'# CRUD for {model_name_lower}' + '-->'

    # Append the replaced sidebar content to the end of the file
    new_sidebar_content = sidebar_content + '\n\n\n\n' + replaced_comment + '\n' + replaced_sidebar_content

    # Write the new content back to the app's sidebar.py file
    with open(sidebar_path, 'w') as f:
        f.write(new_sidebar_content)

    self.stdout.write(self.style.SUCCESS(f'Sidebar item for {model_name} model generated successfully'))




