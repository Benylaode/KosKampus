from django.contrib import admin
from .models import Pondok, Order, User, Group

admin.site.register(Pondok)
admin.site.register(Order)

users_with_admin_role = User.objects.select_related('userprofile').filter(userprofile__role='admin')
for user in users_with_admin_role:
    try :
        admin_group = Group.objects.get(name='Admin')
        user.groups.add(admin_group)
        staf_group = Group.objects.get(name='Staf')
        user.groups.add(staf_group)
    except : 
        staf_group, created = Group.objects.get_or_create(name='Staf')
        user.groups.add(staf_group)
        admin_group, created = Group.objects.get_or_create(name='Admin')
        user.groups.add(admin_group)

users_with_staf_role = User.objects.select_related('userprofile').filter(userprofile__role='staf')
for user in users_with_staf_role:
    try :
        staf_group = Group.objects.get(name='Staf')
        user.groups.add(staf_group)
    except : 
        staf_group, created = Group.objects.get_or_create(name='Staf')
        user.groups.add(staf_group)

