from django.contrib import admin
from django.urls import path
from app.views import *
from . import views

urlpatterns = [
    path('api/csrf/', views.CsrfTokenView.as_view(), name='csrf'),
    path('api/check-auth/', views.CheckAuthView.as_view(), name='check-auth'),
    path('api/register/', views.RegisterView.as_view(), name='register'),
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('api/logout/', views.LogoutView.as_view(), name='logout'),
    path('api/profile/', views.UserProfileView.as_view(), name='profile'),
    path('api/profile/update/', views.UpdateProfileView.as_view(), name='profile-update'),
    path('api/profile/change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    
    # Товары
    path('api/products/', views.ProductListView.as_view(), name='product-list'),
    path('api/products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('api/test-media/', views.TestMediaView.as_view(), name='test-media'),
    
    # Корзина
    path('api/cart/', views.CartView.as_view(), name='cart'),
    path('api/cart/count/', views.CartCountView.as_view(), name='cart-count'),
    path('api/cart/<int:item_id>/', views.CartItemView.as_view(), name='cart-item'),
]

