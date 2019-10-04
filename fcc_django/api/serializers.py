from carts.models import Cart, Cuisine
from rest_framework import serializers

class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = ['id', 'name']
        read_only_fields = ['id']


class CartSerializer(serializers.HyperlinkedModelSerializer):
    cuisines = CuisineSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'name', 'address', 'phone', 'email', 'website', 'yelp', 'twitter', 'instagram', 'facebook', 'image', 'neighborhood', 'cuisines', 'active']
        read_only_fields = ['id']