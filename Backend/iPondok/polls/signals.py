from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile

@receiver(post_save, sender=UserProfile)
def update_user_is_staff(sender, instance, created, **kwargs):
    user = instance.user  # Akses objek User yang terkait dengan UserProfile
    if instance.role == 'admin' or instance.role == 'staf':
        user.is_staff = True  # Set is_staff True jika role adalah 'admin' atau 'staff'
    else:
        user.is_staff = False  # Set is_staff False untuk role lainnya
    user.save() 

@receiver(post_save, sender=UserProfile)
def update_user_is_superuser(sender, instance, created, **kwargs):
    user = instance.user  
    if instance.role == 'admin':
        user.is_superuser = True  
    else:
        user.is_superuser = False  
    user.save() 

