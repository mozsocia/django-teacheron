
from django import template
import os
import json
from django.templatetags.static import static
from django.conf import settings
from django.utils.safestring import mark_safe
from pathlib import Path
from pprint import pprint

register = template.Library()

@register.simple_tag
def render_vite_dev_scripts():
    scripts = []

    if getattr(settings, 'DEV_ENV', False):
        port = getattr(settings, 'VITE_DEV_PORT', 3080)  # Default port is 3080
        
        # Adding the provided script
        scripts.append('<script type="module">import RefreshRuntime from "http://localhost:{}/@react-refresh"; RefreshRuntime.injectIntoGlobalHook(window); window.$RefreshReg$ = () => {{}}; window.$RefreshSig$ = () => (type) => type; window.__vite_plugin_react_preamble_installed__ = true;</script>'.format(port))

    
        # Script tag for Vite client
        scripts.append(f'<script type="module" src="http://localhost:{port}/@vite/client"></script>')

        # Script tag for your main.ts file
        scripts.append(f'<script type="module" src="http://localhost:{port}/src/main.jsx"></script>')


    return mark_safe('\n'.join(scripts))


@register.simple_tag
def render_vite_assets(entry_name='index.html'):
    if getattr(settings, 'DEV_ENV', True):
        return ''

    manifest_path = os.path.join(settings.BASE_DIR, settings.VITE_APP_STATIC_DIR, '.vite/manifest.json')

    try:
        with open(manifest_path, 'r') as manifest_file:
            manifest_data = json.load(manifest_file)
    except Exception as e:
        # Code to handle other types of exceptions
        print(f"An error occurred: {e}")


    if entry_name in manifest_data:
        entry = manifest_data[entry_name]
        js_file = entry.get('file', '')
        css_files = entry.get('css', [])

        js_tag = f'<script type="module" src="/{settings.VITE_APP_STATIC_DIR}/{js_file}"></script>' if js_file else ''

        css_tags = [f'<link rel="stylesheet" href="/{settings.VITE_APP_STATIC_DIR}/{css_file}">' for css_file in css_files]


        return mark_safe('\n'.join([js_tag] + css_tags))

    return ''

