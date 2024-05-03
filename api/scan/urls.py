from django.urls import path
from .import views

urlpatterns = [
    path('',views.new_scan),
    path('all',views.list_scan),
    path('<int:id>/',views.scan_detail),    
]
