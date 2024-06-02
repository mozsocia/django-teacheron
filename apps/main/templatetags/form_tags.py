from django import template
from django.utils.safestring import mark_safe

register = template.Library()
# field.widget.attrs.update({'class': class_mapping[widget_type]})
@register.filter(is_safe=True)
def add_class(field, css_class):
    existing_classes = field.field.widget.attrs.get('class', '')
    return mark_safe(field.as_widget(attrs={"class": f"{existing_classes} {css_class}".strip()}))
