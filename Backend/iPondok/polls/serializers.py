# polls/serializers.py

from rest_framework import serializers
from .models import Pondok

class PondokSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pondok
        fields = ['id', 'nama','nomor', 'harga', 'alamat', 'fasilitas', 'aturan', 'link_alamat']
