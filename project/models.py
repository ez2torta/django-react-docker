from django.contrib.auth.models import User, Group
from django.db import models

class Ticket(models.Model):
	user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
	pedido = models.IntegerField(default=0)