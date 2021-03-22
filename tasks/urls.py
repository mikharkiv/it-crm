from django.urls import path, re_path
from . import views

urlpatterns = [
	path('<int:task_id>/setcompleted', views.set_task_person_checked),
]
