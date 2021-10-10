from rest_framework import serializers
from tasks.serializers import ProjectTaskSerializer
from .models import *
from users.serializers import CRMUserTinySerializer


class ClientStatusSerializer(serializers.ModelSerializer):
	class Meta:
		model = ClientStatus
		fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = Client
		fields = '__all__'
		read_only_fields = ['created_at', 'updated_at']


class ClientDetailSerializer(ClientSerializer):
	status = ClientStatusSerializer()
	manager = CRMUserTinySerializer()


class ClientTinySerializer(ClientSerializer):
	class Meta(ClientSerializer.Meta):
		fields = ['name', 'photo', 'type', 'status', 'is_vip', 'manager']


class ContactPersonSerializer(serializers.ModelSerializer):
	class Meta:
		model = ContactPerson
		fields = '__all__'
		read_only_fields = ['created_at', 'updated_at']


class ContactPersonDetailSerializer(ContactPersonSerializer):
	client = ClientSerializer()


class ContactPersonTinySerializer(ContactPersonSerializer):
	class Meta(ContactPersonSerializer.Meta):
		fields = ['name', 'photo', 'position', 'client']


class CommunicationHistorySerializer(serializers.ModelSerializer):
	class Meta:
		model = CommunicationHistory
		fields = '__all__'
		read_only_fields = ['author']


class CommunicationHistoryDetailSerializer(CommunicationHistorySerializer):
	from documents.serializers import DocumentSerializer
	from projects.serializers import ProjectSerializer
	author = CRMUserTinySerializer()
	contact = ContactPersonDetailSerializer()
	task = ProjectTaskSerializer()
	project = ProjectSerializer()
	document = DocumentSerializer()
