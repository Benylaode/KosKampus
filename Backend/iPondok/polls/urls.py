from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PondokViewSet, RegisterView, UserProfileView, OrderViewSet, PondokSearchView, UploadImageView, CustomTokenObtainPairView, CustomTokenRefreshView

# Membuat router untuk viewset
router = DefaultRouter()
router.register(r'pondok', PondokViewSet)
router.register(r'order', OrderViewSet)  # Jika ada, tambahkan nanti

urlpatterns = [
    path('', include(router.urls)),

    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Custom untuk login
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),  # Custom untuk refresh token

    
    path('register/', RegisterView.as_view(), name='register'),
    path('search/', PondokSearchView.as_view(), name='search_pondok'),
    path('user/', UserProfileView.as_view(), name='user'),
    path('pondok/<int:pondok_id>/upload-gambar/', UploadImageView.as_view(), name='upload-gambar'),
    
]
