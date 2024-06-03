from django import template

register = template.Library()

@register.filter
def split_string(value, delimiter):
    """
    Split a string by a given delimiter.
    Usage: {{ value|split_string:"," }}
    """
    return [item.strip() for item in value.split(delimiter)]

@register.filter
def mult(value, arg):
    """
    Multiply a value by a given factor.
    Usage: {{ value|mult:0.012 }}
    """
    try:
        return float(value) * float(arg)
    except (ValueError, TypeError):
        return None