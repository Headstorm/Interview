from rest_framework import serializers
from .models import *


class fiveHundredNumbersListSerializer(serializers.ModelSerializer):
    class Meta:
        model = fiveHundredNumbersList
        # fields = ('id','intArray')
        fields="__all__"

# class nosqlRecordSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = record
#         fields="__all__"
