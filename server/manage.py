"""Django's command-line utility for administrative tasks."""
import os
import sys

def main():
    """Run administrative tasks."""
    # Получаем абсолютный путь к папке, где лежит manage.py
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    
    # Добавляем эту папку в sys.path ПЕРВОЙ
    sys.path.insert(0, BASE_DIR)
    
    # Для отладки - выведем пути (потом можно удалить)
    print(f"DEBUG: BASE_DIR = {BASE_DIR}")
    print(f"DEBUG: sys.path = {sys.path}")
    print(f"DEBUG: Files in BASE_DIR: {os.listdir(BASE_DIR)}")
    
    # Устанавливаем модуль настроек
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
    
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()