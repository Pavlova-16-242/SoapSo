from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.CsrfTokenView.as_view(), name='csrf'),
    path('check-auth/', views.CheckAuthView.as_view(), name='check-auth'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    path('profile/update/', views.UpdateProfileView.as_view(), name='profile-update'),
    path('profile/change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/count/', views.CartCountView.as_view(), name='cart-count'),
    path('cart/<int:item_id>/', views.CartItemView.as_view(), name='cart-item'),
    path('orders/', views.OrderListView.as_view(), name='order-list'),
    path('orders/create/', views.CreateOrderView.as_view(), name='order-create'),
    path('orders/create/', views.CreateOrderView.as_view(), name='order-create'),
    path('profile/delete/', views.DeleteAccountView.as_view(), name='profile-delete'),
]