from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission, User
from django.contrib.auth.hashers import make_password


class UserProfile(models.Model):
    ADMIN = 'admin'
    STAF = 'staf'
    PUBLIC = "publik"

    role_CHOICES = [
        (ADMIN, 'admin'),
        (STAF, 'staf'),
        (PUBLIC, 'publik')
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(
        max_length=10,
        choices=role_CHOICES,
        default=PUBLIC,
    )

    def __str__(self):
        return self.user.username
    

class Pondok(models.Model):
    id = models.AutoField(primary_key=True)
    nama = models.CharField(max_length=255, null=True)
    universitas = models.CharField(max_length=255, null=True)
    harga_tahun = models.DecimalField(max_digits=30, decimal_places=20, null=True)
    harga_bulan = models.DecimalField(max_digits=30, decimal_places=20, null=True)
    tipe = models.CharField(max_length=50, null=True)
    fasilitas = models.TextField(null=True)

    rating_jaringan = models.DecimalField(max_digits=3, decimal_places=1, null=True)
    rating_kebersihan = models.DecimalField(max_digits=3, decimal_places=1, null=True)
    rating_air = models.DecimalField(max_digits=3, decimal_places=1, null=True)

    jumlah_kamar = models.IntegerField(null=True)

    # Tambahan atribut untuk alamat
    alamat = models.CharField(max_length=255, null=True, blank=True)  # Alamat pondok
    link_alamat = models.URLField(max_length=255, null=True, blank=True)  # Link ke peta atau lokasi
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)  # Latitude untuk peta
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)  # Longitude untuk peta


    aturan = models.TextField(null=True)  # Aturan
    catatan = models.TextField(null=True, blank=True)  # Catatan (optional)

    @property
    def gambar(self):
        """Mengambil semua gambar yang terkait dengan pondok ini."""
        return self.images_in_pondok.all()

    @property
    def orders(self):
        """Mengambil semua orders yang terkait dengan pondok ini."""
        return self.orders_in_pondok.all()

    def __str__(self):
        return f"Pondok {self.nama} ({self.universitas})"

# class User(models.Model):
#     email = models.EmailField(unique=True)
#     username = models.CharField(max_length=150, primary_key=True)
#     password = models.CharField(max_length=128)
    
#     def save(self, *args, **kwargs):
#         # Hash the password before saving
#         if not self.pk:  # Only hash on creation
#             self.password = make_password(self.password)
#         super().save(*args, **kwargs)
    
#     def __str__(self):
#         return self.username
    
class Order(models.Model):
    PENDING = 'pending'
    SHIPPED = 'shipped'
    DELIVERED = 'delivered'
    CANCELLED = 'cancelled'

    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (SHIPPED, 'Shipped'),
        (DELIVERED, 'Delivered'),
        (CANCELLED, 'Cancelled'),
    ]

    id = models.AutoField(primary_key=True)
    pondok = models.ForeignKey(Pondok, on_delete=models.CASCADE, related_name='orders_in_pondok')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    email_buyer = models.EmailField()
    order_date = models.DateTimeField(auto_now_add=True)
    nama_buyer = models.CharField(max_length=100)
    id_buyer = models.CharField(max_length=50)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=PENDING,
    )

    def __str__(self):
        return f"Order for Pondok ID {self.pondok_id} by {self.nama_buyer} - Status: {self.status}"

class PondokImage(models.Model):
    image = models.ImageField(upload_to='pondok_images/')
    pondok = models.ForeignKey(Pondok, on_delete=models.CASCADE, related_name='images_in_pondok')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.pondok.nama}"
