from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email.split('@')[0]
        super().save(*args, **kwargs)

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=500, blank=True, null=True)
    size = models.CharField(max_length=50, default='col-span-3 row-span-1')
    layout = models.CharField(max_length=20, default='vertical')
    available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['id']
    
    def __str__(self):
        return self.name

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'product']
    
    def __str__(self):
        return f"{self.user.email} - {self.product.name} x{self.quantity}"
    
    @property
    def total_price(self):
        return self.product.price * self.quantity

class Order(models.Model):
    STATUS_CHOICES = [
        ('processing', 'Принят в обработку'),
        ('confirmed', 'Подтвержден'),
        ('shipped', 'Отправлен'),
        ('delivered', 'Доставлен'),
        ('cancelled', 'Отменен'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='processing')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_quantity = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Заказ №{self.id} - {self.user.email}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена на момент заказа
    
    @property
    def total_price(self):
        return self.price * self.quantity
    
    def __str__(self):
        return f"{self.product.name} x{self.quantity}"