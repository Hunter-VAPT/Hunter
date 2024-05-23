from django.urls import path
from .import views

urlpatterns = [
    path('',views.new_scan,name='new_scan'),
    path('all',views.list_scan,name='list_scan'),
    path('<int:id>/',views.scan_detail,name='scan_detail'),    
    path('<int:scan_id>/<int:host_id>',views.host_detail,name='host_detail'),    
]
