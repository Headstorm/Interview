from django.shortcuts import render
from rest_framework import viewsets
from .models import data
from .serializer import RandnumbersSerializer

class RandNumberView(viewsets.ModelViewSet):
    queryset = data.objects.all()
    serializer_class = RandnumbersSerializer
# Create your views here.
