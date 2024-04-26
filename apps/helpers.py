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

