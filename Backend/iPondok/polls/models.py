from django.db import models

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
    gambar = models.CharField(max_length=255, null=True) 


    alamat = models.TextField(null=True) 
    link_alamat = models.URLField(null=True)  
    latitude = models.DecimalField(max_digits=30, decimal_places=20, null=True) 
    longitude = models.DecimalField(max_digits=30, decimal_places=20, null=True)  

    aturan = models.TextField(null=True)  # Aturan
    catatan = models.TextField(null=True, blank=True)  # Catatan (optional)

    def __str__(self):
        return self.nama
