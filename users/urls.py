from django.urls import path, re_path
from . import views

urlpatterns = [
	path('me/', views.get_me),
]
