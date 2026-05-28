from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    username = serializers.CharField(required=False, allow_blank=True)  # Делаем необязательным
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Пароли не совпадают"})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        
        # Если username не указан, генерируем его из email
        if not validated_data.get('username'):
            validated_data['username'] = validated_data['email'].split('@')[0]
        
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone')
        read_only_fields = ('id',)

class UpdateProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'phone')
        extra_kwargs = {
            'phone': {'required': False}
        }
    
    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.exclude(id=user.id).filter(email=value).exists():
            raise serializers.ValidationError("Этот email уже используется")
        return value
    
    def validate_username(self, value):
        if not value:
            return value
        user = self.context['request'].user
        if User.objects.exclude(id=user.id).filter(username=value).exists():
            raise serializers.ValidationError("Это имя уже используется")
        return value

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password2 = serializers.CharField(required=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password": "Новые пароли не совпадают"})
        return attrs
    
    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Неверный текущий пароль")
        return value
    
class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'image_url', 
                  'size', 'layout', 'available']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(f'/static/{obj.image}')
            return f'/static/{obj.image}'
        return None

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)  # Важно: используем ProductSerializer
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'total_price', 'added_at']

class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1, min_value=1)

class UpdateCartItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=0)

class OrderItemSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField()
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product_id', 'product_name', 'product_image', 'quantity', 'price', 'total_price']
    
    def get_product_image(self, obj):
        if obj.product.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(f'/static/{obj.product.image}')
            return f'/static/{obj.product.image}'
        return None

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'status', 'status_display', 'total_price', 'total_quantity', 
                  'items', 'created_at', 'updated_at']

class CreateOrderSerializer(serializers.Serializer):
    pass  # Заказ создается из корзины автоматически