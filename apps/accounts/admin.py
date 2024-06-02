from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError
from .models import CustomUser

class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(label="Password confirmation", widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ["phone"]

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = CustomUser
        fields = ["phone", "password", "is_active", "is_staff", "is_reseller", "user_permissions"]


class CustomUserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('phone', 'name', 'email', 'is_active', 'is_staff', 'is_reseller', 'is_superuser')
    list_filter = ('is_staff', 'is_reseller', 'is_active', 'date_joined')
    search_fields = ('phone', 'name', 'email')
    ordering = ('date_joined',)

    fieldsets = (
        (None, {'fields': ('phone', 'password')}),
        ('Personal info', {'fields': ('name', 'email', 'image')}),
        ('Permissions', {'fields': ('groups', 'user_permissions', 'is_active', 'is_reseller', 'is_staff', 'is_superuser', 'accept_terms')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name', 'phone', 'password1', 'password2', 'is_active', 'is_staff', 'is_reseller', 'accept_terms'),
        }),
    )


admin.site.site_header = 'SNR Shop Admin'
admin.site.site_title = 'SNR Shop Admin Portal'
admin.site.index_title = 'Welcome to SNR Shop Admin'
admin.site.register(CustomUser, CustomUserAdmin)
