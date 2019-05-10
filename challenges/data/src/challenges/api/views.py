from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import authentication_classes, permission_classes

from . import serializers
from . import NumbersList

numbers= {0:NumbersList(values=[])}

@authentication_classes([])
@permission_classes([])
class NumbersListViewSet(viewsets.ViewSet):
	# Required for the Browsable API renderer to have a nice form.
	serializer_class = serializers.NumbersListSerializer

	def list(self, request):
		serializer = serializers.NumbersListSerializer(
			instance=numbers[0])
		return Response(serializer.data['values'])

	def create(self, request):
		print(request.data)
		print('view create')
		new_array = request.data
		# new_array.sort()
		# print(new_array)
		num_object = {"values":new_array}
		serializer = serializers.NumbersListSerializer(data=num_object)
		if serializer.is_valid():
			print('is valid')
			new_array = serializer.save()
			numbers[0] = new_array
			print(numbers[0])
			return Response(serializer.data['values'], status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)