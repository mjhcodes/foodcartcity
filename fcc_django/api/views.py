from carts.models import Cart, Cuisine
from rest_framework import viewsets, filters
from .serializers import CartSerializer, CuisineSerializer

class CartViewSet(viewsets.ModelViewSet):
    search_fields = ['name', 'neighborhood', 'cuisines__name']
    filter_backends = (filters.SearchFilter,)
    queryset = Cart.objects.all().order_by('name')
    serializer_class = CartSerializer

class CuisineViewSet(viewsets.ModelViewSet):
    queryset = Cuisine.objects.all().order_by('name')
    serializer_class = CuisineSerializer