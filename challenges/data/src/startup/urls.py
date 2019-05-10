"""startup URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from challenges.api.views import NumbersListViewSet
from challenges.views import home
from django.conf.urls.static import static
from django.conf import settings



urlpatterns = [
    path('data/', NumbersListViewSet.as_view({'get': 'list', 'post': 'create'}), name="numberslist"),
    path('', home.as_view(), name='home'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)