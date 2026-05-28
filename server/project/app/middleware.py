from django.utils.deprecation import MiddlewareMixin

class DebugMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print(f"Request: {request.method} {request.path}")
        print(f"Origin: {request.META.get('HTTP_ORIGIN')}")
        print(f"Referer: {request.META.get('HTTP_REFERER')}")
        print(f"CSRF Cookie: {request.META.get('HTTP_X_CSRFTOKEN')}")
        print(f"Session ID: {request.META.get('HTTP_COOKIE')}")