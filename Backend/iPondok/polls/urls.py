# polls/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PondokViewSet

router = DefaultRouter()
router.register(r'pondok', PondokViewSet)  # Registrasi API untuk Pondok

urlpatterns = [
    path('', include(router.urls)),  # Mengarahkan semua permintaan ke router DRF
]
