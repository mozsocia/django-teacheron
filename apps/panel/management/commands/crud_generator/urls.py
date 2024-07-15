from django.core.management.base import BaseCommand
from django.template import loader
from django.conf import settings
from django.apps import apps
import os
import re
from django.db.models import ImageField



def generate_urls(self):
    app_name = self.context['app_name']
    model_name = self.context['model_name']
    model_name_capitalized = self.context['model_name_capitalized']
    dir_name = self.context['dir_name']
    use_root_templates_dir = self.context['use_root_templates_dir']



    model_name_lower = model_name.lower()

    model = apps.get_model(app_name, model_name)

    # Load the template URLs from the crud_arch/urls.arch
    template_urls_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'crud_arch', 'urls.arch')
    with open(template_urls_path, 'r') as f:
        template_urls_content = f.read()

    # Replace the placeholders with the actual model name
    replaced_urls_content = template_urls_content.replace('[[model_name_lower]]', model_name_lower)


    urls_path = os.path.join(settings.BASE_DIR,'apps', app_name, 'urls.py')

    # Open the app's urls.py file and read its content
    with open(urls_path, 'r') as f:
        urls_content = f.read()

    # Check if the comment already exists
    comment_pattern = r'# CRUD for {}'.format(model_name_lower)
    if re.search(comment_pattern, urls_content):
        self.stdout.write(self.style.WARNING(f'URLs for {model_name} model already exist. Skipping URL generation.'))
        return

    # Find the urlpatterns variable in the urls.py file
    urlpatterns_pattern = r'urlpatterns\s*=\s*\[(.*?)\]'
    urlpatterns_match = re.search(urlpatterns_pattern, urls_content, re.DOTALL)

    comment = f'\t# CRUD for {model_name_lower}'

    if urlpatterns_match:
        # Replace the urlpatterns content with the new content
        start_index = urlpatterns_match.start(1)
        end_index = urlpatterns_match.end(1)
        existing_urlpatterns = urlpatterns_match.group(1)
        new_urls_content = urls_content[:start_index] + existing_urlpatterns + '\n\n' +comment+ replaced_urls_content + '\n' + urls_content[end_index:]
    else:
        # If urlpatterns is not found, append the replaced URLs content to the end of the file
        new_urls_content = urls_content + '\n' + replaced_urls_content

    # Write the new content back to the app's urls.py file
    with open(urls_path, 'w') as f:
        f.write(new_urls_content)

    self.stdout.write(self.style.SUCCESS(f'URLs for {model_name} model generated successfully'))

