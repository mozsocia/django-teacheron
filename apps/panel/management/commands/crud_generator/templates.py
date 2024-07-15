from django.core.management.base import BaseCommand
from django.conf import settings
from django.apps import apps
import os
import re
from django.db.models import ImageField

def generate_html_templates(self):
    app_name = self.context['app_name']
    model_name = self.context['model_name']
    model_name_capitalized = self.context['model_name_capitalized']
    dir_name = self.context['dir_name']
    use_root_templates_dir = self.context['use_root_templates_dir']

    model_name_lower = model_name.lower()

    if dir_name is None:
        dir_name = app_name

    model = apps.get_model(app_name, model_name)

    if use_root_templates_dir:
        template_dir = os.path.join(settings.BASE_DIR, 'templates', dir_name, model_name_lower)
    else:
        template_dir = os.path.join(settings.BASE_DIR,'apps', app_name, 'templates', dir_name, model_name_lower)
 
    if os.path.exists(template_dir):
        self.stdout.write(self.style.WARNING(f"Directory '{template_dir}' already exists. No templates were generated."))
        return

    os.makedirs(template_dir, exist_ok=True)
    
    templates = {
        'list': 'list.html',
        'detail': 'detail.html',
        'create': 'create.html',
        'edit': 'edit.html',
        'delete': 'delete.html',
    }
    for view_name, template_name in templates.items():
        template_path = os.path.join(template_dir, template_name)
        with open(template_path, 'w') as f:
            base_template_path = os.path.join(os.path.dirname(__file__), 'crud_arch', f'{view_name}.html')
            with open(base_template_path, 'r') as base_file:
                base_template = base_file.read()
            
            contextNames = {
                'model_name': model_name_capitalized,
                'model_name_lower': model_name_lower,
            }
            urlNames = {
                'list_url_name': f'panel_{model_name_lower}_list',
                'detail_url_name': f'panel_{model_name_lower}_detail',
                'create_url_name': f'panel_{model_name_lower}_create',
                'store_url_name': f'panel_{model_name_lower}_store',
                'edit_url_name': f'panel_{model_name_lower}_edit',
                'update_url_name': f'panel_{model_name_lower}_update',
                'delete_url_name': f'panel_{model_name_lower}_delete',
            }

            if view_name == 'list':
                header_tags = []
                column_tags = []
                for field in model._meta.fields:
                    if not isinstance(field, ImageField):
                        header_tags.append(f'<th>{field.name}</th>\n')
                        column_tags.append(f'<td>{{{{ object.{field.name} }}}}</td>\n')

                contextNames['header_tags'] = ''.join(header_tags)
                contextNames['column_tags'] = ''.join(column_tags)

            elif view_name == 'detail':
                details_tags = []
                for field in model._meta.fields:
                    if isinstance(field, ImageField):
                        details_tags.append(f'<p><strong>{self.capitalize_first(field.verbose_name)}: </strong></p>')
                        start = "{% if " + f"object.{field.name} " + " %}"
                        end = "{% endif %}"
                        details_tags.append(start)
                        details_tags.append(f'<img src="{{{{ object.{field.name}.url }}}}">')
                        details_tags.append(end)
                        details_tags.append('<br>')
                        details_tags.append('<br>')
                        details_tags.append('\n')
                    else:
                        details_tags.append(f'<p><strong>{self.capitalize_first(field.verbose_name)}: </strong> {{{{ object.{field.name} }}}}</p>\n')

                contextNames['details_tags'] = ''.join(details_tags)

            template_source = base_template
            # Replace variables with their values
            for var_name, value in contextNames.items():
                template_source = re.sub(r'\[\[' + var_name + r'\]\]', str(value), template_source)

            # Replace variables outside {% %} tags with their values
            for var_name, value in urlNames.items():
                template_source = re.sub(r'(?<!\{%)\b' + var_name + r'\b(?!%})', str(value), template_source)

            f.write(template_source)
    
    self.stdout.write(self.style.SUCCESS(f'CRUD templates for {model_name} model generated successfully'))