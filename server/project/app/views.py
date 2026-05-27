from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *

class CsrfTokenView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        get_token(request)
        return JsonResponse({'detail': 'CSRF cookie set'})

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        login(request, user)
        
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            },
            "message": "Регистрация успешна"
        }, status=status.HTTP_201_CREATED)
    
class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = authenticate(
            request,
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        
        if user:
            login(request, user)
            return Response({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                },
                "message": "Вход выполнен"
            })
        
        return Response(
            {"error": "Неверный email или пароль"}, 
            status=status.HTTP_401_UNAUTHORIZED
        )

class LogoutView(APIView):
    permission_classes = [AllowAny]  # Разрешаем доступ всем
    
    def post(self, request):
        # Очищаем сессию в любом случае
        if request.user.is_authenticated:
            logout(request)
        
        # Создаем новую сессию и CSRF-токен
        request.session.create()
        get_token(request)
        
        return Response({
            "message": "Выход выполнен",
            "detail": "Session cleared and new CSRF token generated"
        })

class UpdateProfileView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateProfileSerializer
    
    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "phone": user.phone
            },
            "message": "Профиль успешно обновлен"
        })

class ChangePasswordView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer
    
    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        # Меняем пароль
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        # Важно: обновляем сессию, чтобы пользователь не вышел
        update_session_auth_hash(request, user)
        
        return Response({
            "message": "Пароль успешно изменен"
        })

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # Базовые поля, которые точно есть
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
        
        # Добавляем необязательные поля
        if hasattr(user, 'phone') and user.phone:
            user_data['phone'] = user.phone
            
        if hasattr(user, 'first_name'):
            user_data['first_name'] = user.first_name
            
        if hasattr(user, 'last_name'):
            user_data['last_name'] = user.last_name
        
        return Response(user_data)
    
class CheckAuthView(APIView):

    permission_classes = [AllowAny]
    authentication_classes = []  # Отключаем автоматическую аутентификацию
    
    def get(self, request):
        # Проверяем авторизацию вручную
        if request.user.is_authenticated:
            return Response({
                "is_authenticated": True,
                "user": {
                    "id": request.user.id,
                    "username": request.user.username,
                    "email": request.user.email,
                }
            })
        return Response({
            "is_authenticated": False,
            "user": None
        })

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
        
        if hasattr(user, 'phone') and user.phone:
            user_data['phone'] = user.phone
            
        if hasattr(user, 'first_name'):
            user_data['first_name'] = user.first_name
            
        if hasattr(user, 'last_name'):
            user_data['last_name'] = user.last_name
        
        return Response(user_data)
    
class ProductListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Product.objects.filter(available=True)
    serializer_class = ProductSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
class ProductDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Product.objects.filter(available=True)
    serializer_class = ProductSerializer

class CartView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Получить содержимое корзины"""
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        
        total_quantity = sum(item.quantity for item in cart_items)
        total_price = sum(item.total_price for item in cart_items)
        
        return Response({
            'items': serializer.data,
            'total_quantity': total_quantity,
            'total_price': total_price
        })
    
    def post(self, request):
        """Добавить товар в корзину"""
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']
        
        product = get_object_or_404(Product, id=product_id, available=True)
        
        # Получаем или создаем элемент корзины
        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            # Если товар уже есть, увеличиваем количество
            cart_item.quantity += quantity
            cart_item.save()
        
        # Возвращаем обновленную корзину
        return self.get(request)

class CartItemView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, item_id):
        """Обновить количество товара в корзине"""
        cart_item = get_object_or_404(CartItem, id=item_id, user=request.user)
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        quantity = serializer.validated_data['quantity']
        
        if quantity == 0:
            cart_item.delete()
            return Response({'message': 'Товар удален из корзины'})
        
        cart_item.quantity = quantity
        cart_item.save()
        
        return Response(CartItemSerializer(cart_item).data)
    
    def delete(self, request, item_id):
        """Удалить товар из корзины"""
        cart_item = get_object_or_404(CartItem, id=item_id, user=request.user)
        cart_item.delete()
        return Response({'message': 'Товар удален из корзины'})

class CartCountView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Получить количество товаров в корзине"""
        count = CartItem.objects.filter(user=request.user).count()
        total_quantity = sum(
            item.quantity for item in CartItem.objects.filter(user=request.user)
        )
        return Response({
            'count': count,
            'total_quantity': total_quantity
        })
    
class CartView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user).select_related('product')
        
        serializer = CartItemSerializer(
            cart_items, 
            many=True, 
            context={'request': request}
        )
        
        total_quantity = sum(item.quantity for item in cart_items)
        total_price = sum(item.total_price for item in cart_items)
        
        return Response({
            'items': serializer.data,
            'total_quantity': total_quantity,
            'total_price': total_price
        })
    
    def post(self, request):
        """Добавить товар в корзину"""
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']
        
        product = get_object_or_404(Product, id=product_id, available=True)
        
        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        
        return self.get(request)
    
    def delete(self, request):
        """Очистить всю корзину"""
        CartItem.objects.filter(user=request.user).delete()
        return Response({
            'message': 'Корзина очищена',
            'items': [],
            'total_quantity': 0,
            'total_price': 0
        })
    
    def post(self, request):
        """Добавить товар в корзину"""
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']
        
        product = get_object_or_404(Product, id=product_id, available=True)
        
        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        
        return self.get(request)
    
    def delete(self, request):
        """Очистить всю корзину"""
        CartItem.objects.filter(user=request.user).delete()
        return Response({
            'message': 'Корзина очищена',
            'items': [],
            'total_quantity': 0,
            'total_price': 0
        })
    
class TestMediaView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        import os
        from django.conf import settings
        
        images_dir = os.path.join(settings.BASE_DIR, 'app', 'management', 'images')
        media_dir = settings.MEDIA_ROOT
        products_dir = os.path.join(media_dir, 'products')
        
        data = {
            'images_dir': images_dir,
            'images_dir_exists': os.path.exists(images_dir),
            'files_in_images': os.listdir(images_dir) if os.path.exists(images_dir) else [],
            'media_dir': media_dir,
            'media_dir_exists': os.path.exists(media_dir),
            'products_dir': products_dir,
            'products_dir_exists': os.path.exists(products_dir),
            'files_in_products': os.listdir(products_dir) if os.path.exists(products_dir) else [],
            'products_in_db': [
                {
                    'id': p.id,
                    'name': p.name,
                    'image': str(p.image),
                    'image_url': p.image.url if p.image else None
                }
                for p in Product.objects.all()
            ]
        }
        
        return Response(data)