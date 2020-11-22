from django.contrib import admin
from . import views as summary_views
from django.conf.urls import url

urlpatterns = [
	url(r'^$', summary_views.index, name = 'index'),
]