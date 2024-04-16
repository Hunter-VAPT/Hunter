from django.urls import path
from .import views

urlpatterns = [
    path('up_hosts',views.up_hosts)
]
