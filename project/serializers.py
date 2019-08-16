from django.contrib.auth.models import User, Group
from .models import User, Group, Ticket
from rest_framework import serializers

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    groups = GroupSerializer(many=True)
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class TicketSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Ticket
        fields = '__all__'

