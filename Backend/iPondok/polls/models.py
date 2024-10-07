from django.db import models

class Pondok(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)

    alamat = models.TextField()
    fasilitas = models.TextField()
    aturan = models.TextField()

    def __str__(self):
        return self.nama
