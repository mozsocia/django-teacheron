from django.core.management.base import BaseCommand
from django.template import loader
from django.conf import settings
from django.apps import apps
import os
import re
from django.db.models import ImageField

from .crud_generator.views import generate_views
from .crud_generator.sidebar import generate_sidebar
from .crud_generator.forms import generate_forms
from .crud_generator.urls import generate_urls
from .crud_generator.templates import generate_html_templates

class Command(BaseCommand):
    help = 'Generate CRUD templates for a given model'

    templates_path = os.path.join('panel','crud_arch')
    crud_template_path = os.path.join('templates', templates_path)

    def add_arguments(self, parser):
        parser.add_argument('app_name', type=str, help='The name of the app')
        parser.add_argument('model_name', type=str, help='The name of the model to generate CRUD templates for')
        parser.add_argument('--dir_name', type=str, help='The directory name to use for the templates (defaults to app_name)', default=None)
        parser.add_argument('--use_root_templates_dir', action='store_true', help='Flag to use app templates')

    def capitalize_first(self, s):
        if isinstance(s, str) and s:
            return s[0].upper() + s[1:]
        return s


    def handle(self, *args, **options):
        
        if options['dir_name'] is None:
            options['dir_name'] = 'panel/pages'


        # Create a context dictionary to pass variables to functions
        self.context = {
            'app_name': options['app_name'],
            'model_name': options['model_name'],
            'model_name_capitalized': self.capitalize_first(options['model_name'].lower()),
            'dir_name': options['dir_name'],
            'use_root_templates_dir': options['use_root_templates_dir'],
            'templates_path': self.templates_path,
            'crud_template_path': self.crud_template_path

        }

        generate_urls(self)
        generate_forms(self)
        generate_views(self)
        generate_sidebar(self)
        generate_html_templates(self)

