from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from rest_framework.authentication import SessionAuthentication
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
from django.contrib.sessions.backends.db import SessionStore
from django.contrib.sessions.models import Session
from .email_service import (
    send_subscribe_notification, 
    send_contact_notification, 
    send_order_notification,
    send_order_confirmation
)

@method_decorator(csrf_exempt, name='dispatch')
    
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
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            logout(request)
            # Очищаем сессию полностью
            request.session.flush()
        except Exception:
            pass
        
        return Response({
            "message": "Выход выполнен",
            "detail": "Session cleared"
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

        user.set_password(serializer.validated_data['new_password'])
        user.save()
        

        update_session_auth_hash(request, user)
        
        return Response({
            "message": "Пароль успешно изменен"
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
    
class CheckAuthView(APIView):

    permission_classes = [AllowAny]
    authentication_classes = []  
    
    def get(self, request):
        try:
            session_key = request.session.session_key
            
            if session_key:
                try:
                    # Пробуем загрузить сессию
                    session = Session.objects.get(session_key=session_key)
                    session_data = session.get_decoded()
                    
                    # Проверяем аутентификацию через сессию
                    from django.contrib.auth import get_user_model
                    User = get_user_model()
                    
                    user_id = session_data.get('_auth_user_id')
                    if user_id:
                        try:
                            user = User.objects.get(id=user_id)
                            return Response({
                                "is_authenticated": True,
                                "user": {
                                    "id": user.id,
                                    "username": user.username,
                                    "email": user.email,
                                }
                            })
                        except User.DoesNotExist:
                            pass
                except Session.DoesNotExist:
                    pass
                except Exception:
                    request.session.flush()
            
            return Response({
                "is_authenticated": False,
                "user": None
            })
            
        except Exception:
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
        # Проверяем что пользователь авторизован
        if not request.user.is_authenticated:
            return Response(
                {'error': 'Authentication required'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
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

class CartItemView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, item_id):
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
        cart_item = get_object_or_404(CartItem, id=item_id, user=request.user)
        cart_item.delete()
        return Response({'message': 'Товар удален из корзины'})

class CartCountView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
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
        CartItem.objects.filter(user=request.user).delete()
        return Response({
            'message': 'Корзина очищена',
            'items': [],
            'total_quantity': 0,
            'total_price': 0
        })
    
    def post(self, request):
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
    
class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        cart_items = CartItem.objects.filter(user=request.user).select_related('product')
        
        if not cart_items.exists():
            return Response({'error': 'Корзина пуста'}, status=status.HTTP_400_BAD_REQUEST)
        
        total_price = sum(item.total_price for item in cart_items)
        total_quantity = sum(item.quantity for item in cart_items)
        address = request.data.get('address', '')
        
        order = Order.objects.create(
            user=request.user,
            status='processing',
            total_price=total_price,
            total_quantity=total_quantity,
            address=address
        )
        
        items_data = []
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price
            )
            items_data.append({
                'product_name': cart_item.product.name,
                'quantity': cart_item.quantity,
                'total_price': str(cart_item.total_price),
            })
        
        cart_items.delete()
        
        # Отправляем уведомления
        try:
            send_order_notification(
                request.user.email, 
                order.id, 
                total_price, 
                items_data, 
                address
            )
            send_order_confirmation(
                request.user.email, 
                order.id, 
                total_price, 
                items_data, 
                address
            )
        except Exception as e:
            print(f"Email error: {e}")
        
        serializer = OrderSerializer(order, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)
            
class OrderListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items__product')
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class OrderDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items__product')
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request):
        password = request.data.get('password')
        
        if not password:
            return Response(
                {'error': 'Пароль обязателен'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = request.user
        
        if not user.check_password(password):
            return Response(
                {'error': 'Неверный пароль'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.delete()
        
        return Response({'message': 'Аккаунт успешно удален'}, status=status.HTTP_200_OK)
    
class SubscribeView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        if email:
            send_subscribe_notification(email)
            return Response({'message': 'Спасибо за подписку!'})
        return Response({'error': 'Email обязателен'}, status=400)

class ContactView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        message_text = request.data.get('message')
        
        if name and email and message_text:
            send_contact_notification(name, email, message_text)
            return Response({'message': 'Сообщение отправлено'})
        return Response({'error': 'Все поля обязательны'}, status=400)