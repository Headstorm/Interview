from rest_framework import serializers
from . import NumbersList

class NumbersListSerializer(serializers.Serializer):
	values = serializers.ListField(
		child=serializers.IntegerField(),
		min_length=500,
		max_length=500
	)


	def create(self, validated_data):
		validated_data['values'].sort()
		return NumbersList(id=None, **validated_data)