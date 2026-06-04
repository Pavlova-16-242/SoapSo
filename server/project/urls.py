from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse
import os

def serve_file(request, filename):
    file_path = os.path.join(settings.BASE_DIR, '..', 'client', 'build', filename)
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        content_type = 'text/plain'
        if filename.endswith('.xml'):
            content_type = 'application/xml'
        return HttpResponse(content, content_type=content_type)
    return HttpResponse('Not found', status=404)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('app.urls')),
    path('sitemap.xml', lambda r: serve_file(r, 'sitemap.xml')),
    path('robots.txt', lambda r: serve_file(r, 'robots.txt')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=os.path.join(settings.BASE_DIR, 'static'))
    urlpatterns += static(settings.STATIC_URL, document_root=os.path.join(settings.BASE_DIR, '..', 'client', 'build'))

urlpatterns += [
    re_path(r'^(?!api/|admin/|static/).*$', TemplateView.as_view(template_name='index.html')),
]