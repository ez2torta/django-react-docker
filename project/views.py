from django.contrib.auth.models import User, Group
from .models import Ticket
from rest_framework import viewsets
from .serializers import UserSerializer, GroupSerializer, TicketSerializer
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
from drf_roles.mixins import RoleViewSetMixin

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        try:
            # Try finding user using email account
            find_user = User.objects.get(email=username)
            if find_user:
                user = authenticate(username=find_user.username, password=password)
                if not user:
                    return Response({'error': 'Invalid Credentials'},
                                    status=HTTP_404_NOT_FOUND)    
        except:
            return Response({'error': 'Invalid Credentials'},
                            status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    usuario = UserSerializer(user)
    # Return token and user data
    return Response({'token': token.key, 'user_data': usuario.data},
                    status=HTTP_200_OK)

class UserViewSet(RoleViewSetMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def get_queryset_for_usuarios(self):
        user = self.request.user
        return User.objects.filter(username = user.username)


class GroupViewSet(RoleViewSetMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def get_queryset_for_usuarios(self):
        return Ticket.objects.none()

class TicketViewSet(RoleViewSetMixin, viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def perform_create(self, serializer):
        user_id = self.request.data['user_id']
        serializer.save(user_id=user_id)

    def perform_update(self, serializer):
        user_id = self.request.data['user_id']
        serializer.save(user_id=user_id)

    # El usuario no debe ser capaz de borrar ?
    def perform_delete_for_usuarios(self, serializer):
        pass

    # Limitar el queryset para los Usuarios, mas no los Admins
    def get_queryset_for_usuarios(self):
        user = self.request.user
        return Ticket.objects.filter(user=user)