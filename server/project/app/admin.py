from django.contrib import admin

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_active', 'date_joined')
    search_fields = ('email', 'username')
    ordering = ('-date_joined',)
    
    # Поля для отображения в форме редактирования
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ('phone',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    # Поля при создании нового пользователя
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    
    # Добавляем кастомные действия
    actions = ['delete_test_users', 'deactivate_users']
    
    def delete_test_users(self, request, queryset):
        """Удалить тестовых пользователей"""
        # Можешь настроить свою логику определения тестовых
        test_users = queryset.filter(
            email__icontains='test'
        ) | queryset.filter(
            username__icontains='test'
        )
        count = test_users.count()
        test_users.delete()
        self.message_user(request, f'Удалено {count} тестовых пользователей')
    delete_test_users.short_description = "Удалить тестовых пользователей"
    
    def deactivate_users(self, request, queryset):
        """Деактивировать выбранных пользователей"""
        count = queryset.update(is_active=False)
        self.message_user(request, f'Деактивировано {count} пользователей')
    deactivate_users.short_description = "Деактивировать пользователей"