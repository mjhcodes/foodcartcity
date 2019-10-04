from django.views.generic import ListView
from .models import Cart, Cuisine

class CartListView(ListView):
    template_name = "home.html"

    def get_queryset(self):
        return Cart.objects.all
    