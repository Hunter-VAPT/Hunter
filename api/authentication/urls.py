from django.urls import path
from .import views

urlpatterns = [
    path('signup', views.signup),
    path('signin',views.signin),
    path('token',views.test_token),
]
