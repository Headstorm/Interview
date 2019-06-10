from django.urls import path
from . import views

#'homepage/'
app_name='homepage'
urlpatterns = [
    path('', views.homepage,name='homepage'),
    path('data/', views.dataArray,name='dataArray'),
    path('loadNosqlJsonInDB/', views.loadNosqlJsonInDB,name='loadNosqlJsonInDB'),
    
]
