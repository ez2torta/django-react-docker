from django.urls import include, path
from rest_framework import routers
from .views import login, UserViewSet, GroupViewSet, TicketViewSet
from .admin import admin_site

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'tickets', TicketViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('myadmin/', admin_site.urls),
    path('api/login', login),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]