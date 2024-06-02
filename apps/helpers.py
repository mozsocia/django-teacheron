from django.db import models
import os


class DeleteOldImageFilesMixin:
    def delete(self, *args, **kwargs):
        # Delete old image file before deleting the instance
        for field in self._meta.fields:
            if isinstance(field, models.ImageField):
                file_field = getattr(self, field.name)
                if file_field:
                    # Delete old file
                    if os.path.isfile(file_field.path):
                        os.remove(file_field.path)
        super().delete(*args, **kwargs)

    def save(self, *args, **kwargs):
        # Delete old image file before saving the instance
        if self.pk:
            old_instance = self.__class__.objects.get(pk=self.pk)
            for field in self._meta.fields:
                if isinstance(field, models.ImageField):
                    old_file_field = getattr(old_instance, field.name)
                    new_file_field = getattr(self, field.name)
                    if old_file_field != new_file_field and old_file_field:
                        # Delete old file
                        if os.path.isfile(old_file_field.path):
                            os.remove(old_file_field.path)
        super().save(*args, **kwargs)

class DepthMixin:
    """
    A mixin that sets depth=1 for serialization (read operations)
    and depth=0 for deserialization (create/update operations).
    """
    def to_representation(self, instance):
        self.Meta.depth = 1
        return super().to_representation(instance)

    def to_internal_value(self, data):
        self.Meta.depth = 0
        return super().to_internal_value(data)

from django import forms
class DateInputMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            if isinstance(field, forms.DateField):
                field.widget = forms.DateInput(attrs={'type': 'date'})


class FormFieldClassMixin:
    _default_classes = {
        'text': 'custom-form-input',
        'textarea': 'custom-form-input',
        'select': 'custom-form-input',
        'checkbox': 'form-check-input',
        'radio': 'form-check-input',
        'file': 'custom-form-input',
        'date': 'custom-form-input',
        'datetime': 'custom-form-input',
        'email': 'custom-form-input',
        'number': 'custom-form-input',
        'password': 'custom-form-input',
        'time': 'custom-form-input',
        'url': 'custom-form-input',
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.apply_default_classes()

    def apply_default_classes(self):
        for field in self.fields.values():
            self._apply_class_to_field(field, self._default_classes)
        return self

    def apply_classes(self, class_mapping=None):
        if class_mapping is None:
            class_mapping = {}
        for field in self.fields.values():
            self._apply_class_to_field(field, class_mapping)
        return self

    def _apply_class_to_field(self, field, class_mapping):
        widget_type = self._get_widget_type(field.widget)
        if widget_type in class_mapping:
            field.widget.attrs.update({'class': class_mapping[widget_type]})

            # if 'class' in field.widget.attrs:
            #     field.widget.attrs['class'] += f' {class_mapping[widget_type]}'
            # else:
            #     field.widget.attrs['class'] = class_mapping[widget_type]
            #     print(class_mapping[widget_type])
            #     print(widget_type)



    def _get_widget_type(self, widget):
        if isinstance(widget, forms.TextInput):
            return widget.input_type if widget.input_type != 'text' else 'text'
        elif isinstance(widget, forms.Textarea):
            return 'textarea'
        elif isinstance(widget, forms.Select):
            return 'select'
        elif isinstance(widget, forms.CheckboxInput):
            return 'checkbox'
        elif isinstance(widget, forms.RadioSelect):
            return 'radio'
        elif isinstance(widget, forms.FileInput):
            return 'file'
        return 'text'  # default for unknown types
    


class EnhancedFormMixin(DateInputMixin, FormFieldClassMixin):
    pass