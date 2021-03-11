from .models import *
from rest_framework import serializers
from users.serializers import CRMUserTinySerializer


class PersonApprovalSerializer(serializers.ModelSerializer):
	class Meta:
		model = PersonApproval
		fields = '__all__'


class PersonApprovalUserSerializer(PersonApprovalSerializer):
	person = CRMUserTinySerializer()


class ProjectTaskCommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProjectTaskComment
		fields = '__all__'


class ProjectTaskCommentUserSerializer(ProjectTaskCommentSerializer):
	author = CRMUserTinySerializer(read_only=True)


class ProjectTaskSerializer(serializers.ModelSerializer):
	comments = ProjectTaskCommentUserSerializer(many=True)

	class Meta:
		model = ProjectTask
		fields = '__all__'
		read_only_fields = ['created_at', 'updated_at', 'author']


class ProjectTaskUserSerializer(ProjectTaskSerializer):
	author = CRMUserTinySerializer(read_only=True)
	attached_persons = PersonApprovalUserSerializer(many=True)


class ProjectTaskFullSerializer(ProjectTaskUserSerializer):
	is_completed = serializers.SerializerMethodField(read_only=True)

	def get_is_completed(self, obj):
		return obj.is_completed()

