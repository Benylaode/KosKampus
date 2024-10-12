from django.db import models

class Pondok(models.Model):
    id = models.AutoField(primary_key=True)
    nama = models.CharField(max_length=255, null=True)  # Bisa null
    nomor = models.CharField(max_length=255, null=True)  # Bisa null
    harga = models.DecimalField(max_digits=10, decimal_places=2, null=True)  # Bisa null
    alamat = models.TextField(null=True)  # Bisa null
    fasilitas = models.TextField(null=True)  # Bisa null
    aturan = models.TextField(null=True)  # Bisa null
    link_alamat = models.URLField(null=True)  # Bisa null

    def __str__(self):
        return self.nama
