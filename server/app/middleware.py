from django.utils.deprecation import MiddlewareMixin
from django.contrib.sessions.models import Session
import logging

logger = logging.getLogger(__name__)

class SessionCleanupMiddleware(MiddlewareMixin):
    
    def process_exception(self, request, exception):
        if 'SessionInterrupted' in str(exception):
            try:
                request.session.flush()
            except Exception:
                pass
            return None
        return None

class DebugMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print(f"Request: {request.method} {request.path}")
        print(f"Origin: {request.META.get('HTTP_ORIGIN')}")
        print(f"Referer: {request.META.get('HTTP_REFERER')}")
        print(f"CSRF Cookie: {request.META.get('HTTP_X_CSRFTOKEN')}")
        print(f"Session ID: {request.META.get('HTTP_COOKIE')}")