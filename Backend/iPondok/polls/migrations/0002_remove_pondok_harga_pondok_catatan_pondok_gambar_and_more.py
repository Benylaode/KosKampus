# Generated by Django 5.1.1 on 2024-11-02 02:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pondok',
            name='harga',
        ),
        migrations.AddField(
            model_name='pondok',
            name='catatan',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='pondok',
            name='gambar',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
        migrations.AddField(
            model_name='pondok',
            name='harga_bulan',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='pondok',
            name='harga_tahun',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='pondok',
            name='jumlah_kamar',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='pondok',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='pondok',
            name='link_alamat',
            field=models.URLField(null=True),
        ),
        migrations.AddField(
            model_name='pondok',
            name='longitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='pondok',
            name='rating_air',
            field=models.DecimalField(decimal_places=1, max_digits=3, null=True),
        ),
        migrations.AddField(
            model_name='pondok',
            name='rating_jaringan',
            field=models.DecimalField(decimal_places=1, max_digits=3, null=True),
        ),
        migrations.AddField(
            model_name='pondok',
            name='rating_kebersihan',
            field=models.DecimalField(decimal_places=1, max_digits=3, null=True),
        ),
        migrations.AddField(
            model_name='pondok',
            name='tipe',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='pondok',
            name='universitas',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='pondok',
            name='alamat',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='pondok',
            name='aturan',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='pondok',
            name='fasilitas',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='pondok',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='pondok',
            name='nama',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
