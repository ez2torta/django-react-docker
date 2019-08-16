from django.contrib.admin import AdminSite, ModelAdmin
from django.contrib.auth.models import User, Group
from .models import Ticket

class MyAdminSite(AdminSite):
    site_header = 'Monty Python administration'


admin_site = MyAdminSite(name='Admin')

admin_site.register(User)
admin_site.register(Group)
admin_site.register(Ticket)