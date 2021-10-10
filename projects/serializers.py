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
	has_tasks = serializers.SerializerMethodField()
	is_finished = serializers.SerializerMethodField()
	tasks_budget = serializers.SerializerMethodField()

	def get_has_tasks(self, obj):
		return obj.has_tasks()

	def get_is_finished(self, obj):
		return obj.is_finished()

	def get_tasks_budget(self, obj):
		return obj.tasks_budget()
