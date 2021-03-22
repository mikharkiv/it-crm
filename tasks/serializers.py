from projects.models import Project
from .models import *
from rest_framework import serializers
from users.serializers import CRMUserTinySerializer, CRMUser


class PersonApprovalSerializer(serializers.ModelSerializer):
	class Meta:
		model = PersonApproval
		fields = '__all__'


class PersonApprovalUserSerializer(PersonApprovalSerializer):
	person = CRMUserTinySerializer()


class PersonApprovalSaveSerializer(PersonApprovalSerializer):
	task = serializers.PrimaryKeyRelatedField(queryset=ProjectTask.objects.all(), write_only=True)
	person = serializers.PrimaryKeyRelatedField(queryset=CRMUser.objects.all(), write_only=True)


class ProjectTaskCommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProjectTaskComment
		fields = '__all__'


class ProjectTaskCommentUserSerializer(ProjectTaskCommentSerializer):
	author = CRMUserTinySerializer(read_only=True)


class ProjectTaskSerializer(serializers.ModelSerializer):
	comments = ProjectTaskCommentUserSerializer(many=True, required=False)

	class Meta:
		model = ProjectTask
		fields = '__all__'
		read_only_fields = ['created_at', 'updated_at', 'author']


class ProjectTaskUserSerializer(ProjectTaskSerializer):
	author = CRMUserTinySerializer(read_only=True)
	attached_persons = PersonApprovalUserSerializer(source='personapproval_set', many=True)


class ProjectTaskFullSerializer(ProjectTaskUserSerializer):
	is_completed = serializers.SerializerMethodField(read_only=True)

	def get_is_completed(self, obj):
		return obj.is_completed()


class ProjectTaskCreateSerializer(ProjectTaskSerializer):
	attached_persons = serializers.PrimaryKeyRelatedField(queryset=CRMUser.objects.all(), many=True)

	def create(self, validated_data):
		members = validated_data.pop('attached_persons')
		task = ProjectTask.objects.create(**validated_data)
		for memb in members:
			PersonApproval.objects.create(task=task, person=memb)
		return task


class ProjectTaskUpdateSerializer(ProjectTaskCreateSerializer):
	task = serializers.PrimaryKeyRelatedField(queryset=ProjectTask.objects.all(), required=False)
	project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), required=False)

	def update(self, instance, validated_data):
		persons = validated_data.pop('attached_persons')
		for person in persons:
			if not PersonApproval.objects.filter(person=person, task=instance).exists():
				PersonApproval(person=person, task=instance).save()
		for pa in PersonApproval.objects.filter(task=instance):
			if pa.person not in persons:
				pa.delete()
		instance = super(ProjectTaskSerializer, self).update(instance, validated_data)
		return instance
