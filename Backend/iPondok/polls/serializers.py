# polls/serializers.py
from rest_framework import serializers
from .models import Pondok, Order, UserProfile, PondokImage
from django.contrib.auth.models import User


class PondokImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PondokImage
        fields = ['id', 'image', 'uploaded_at'] 
        
class OrderSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Order
        fields = '__all__'  # Atau pilih field yang ingin ditampilkan

class PondokSerializer(serializers.ModelSerializer):
    gambar = PondokImageSerializer(many=True, read_only=True)  # Menampilkan daftar gambar terkait pondok
    orders = OrderSerializer(many=True, read_only=True)  # Nested untuk daftar orders

    class Meta:
        model = Pondok
        fields = [
            'id', 'nama', 'universitas', 'harga_tahun', 'harga_bulan', 'tipe', 
            'fasilitas', 'rating_jaringan', 'rating_kebersihan', 'rating_air', 
            'jumlah_kamar', 'gambar', 'alamat', 'link_alamat', 'latitude', 'longitude', 
            'aturan', 'orders'  # Melakukan referensi ke orders terkait
        ]

        

class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True, required=False)  
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}  

    def create(self, validated_data):
        role = validated_data.pop('role', None)

        user = User.objects.create_user(**validated_data)  
       
        if role:
            UserProfile.objects.create(user=user, role=role)

        return user





class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'role']


