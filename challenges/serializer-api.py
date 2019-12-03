from rest_framework import serializers
from .models import data
from django.core.exceptions import ValidationError

class RandnumbersSerializer(serializers.ModelSerializer):
    class Meta:
        model = data
        fields = ('id', 'numbers')

    def validate_numbers(self, value):
        queryset = data.objects.count()
        if 500 != queryset:
            raise serializers.ValidationError("You need to enter exactly 500 random numbers")
        return value

    def validate_numbers(self, value):
        queryset = data.objects.count()
        if 500 < queryset:
            raise serializers.ValidationError("You need to enter exactly 500 random numbers")
        return value

    def validate_numbers(self, value):
        queryset = data.objects.count()
        if 500 > queryset:
            raise serializers.ValidationError("You need to enter exactly 500 random numbers")
        return value
