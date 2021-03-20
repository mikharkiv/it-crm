from rest_framework import serializers
from .models import Project
from teams.serializers import TeamUserSerializer
from clients.serializers import ClientSerializer


class ProjectSerializer(serializers.ModelSerializer):
	class Meta:
		model = Project
		fields = '__all__'
		read_only_fields = ['created_at', 'updated_at']


class ProjectTeamClientSerializer(ProjectSerializer):
	team = TeamUserSerializer()
	client = ClientSerializer()
