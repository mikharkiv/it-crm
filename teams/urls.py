from django.urls import path, re_path
from . import views

urlpatterns = [
	path('<int:team_id>/addmember', views.add_member_to_team),
	path('<int:team_id>/removemember', views.remove_member_from_team),
	path('<int:team_id>/setteamlead', views.set_teamlead),
]
