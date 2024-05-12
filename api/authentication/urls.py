from django.urls import path
from .import views

urlpatterns = [
    path('signup', views.signup,name='signup'),
    path('signin',views.signin,name='signin'),
    path('token',views.test_token,name='test_token'),
]
