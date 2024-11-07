# polls/serializers.py

from rest_framework import serializers
from .models import Pondok

class PondokSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pondok
        fields = [
    'id', 'nama', 'universitas', 'harga_tahun', 'harga_bulan', 'tipe', 
    'fasilitas', 'rating_jaringan', 'rating_kebersihan', 'rating_air', 
    'jumlah_kamar', 'gambar', 'alamat', 'link_alamat', 'latitude', 'longitude', 
    'aturan']

