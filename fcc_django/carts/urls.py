from django.urls import path
from . import views

app_name = "carts"
urlpatterns = [
    path("", views.CartListView.as_view(), name="home"),
]