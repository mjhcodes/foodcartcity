from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'carts', views.CartViewSet)
router.register(r'cuisines', views.CuisineViewSet)

urlpatterns = [
    path('', include(router.urls))
]