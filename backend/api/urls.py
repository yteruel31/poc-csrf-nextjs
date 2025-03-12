from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'items-viewset', views.ItemViewSet)

urlpatterns = [
    # CSRF token endpoint
    path('csrf-token/', views.csrf_token, name='csrf-token'),

    # Authentication endpoints
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/user/', views.user_view, name='user'),

    # Items endpoints
    path('items/', views.items_list, name='items-list'),
    path('items/<int:pk>/', views.item_detail, name='item-detail'),

    # Router for ViewSet
    path('', include(router.urls)),
]
