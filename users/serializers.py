from .models import CRMUser
from rest_framework import serializers


class CRMUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = CRMUser
		exclude = ['is_superuser', 'is_staff', 'is_active', 'date_joined', 'last_login',
				   'groups', 'user_permissions', 'password']


class CRMUserTinySerializer(serializers.ModelSerializer):
	class Meta:
		model = CRMUser
		# exclude = CRMUserSerializer.Meta.exclude + ['email', 'gender', 'date_of_birth', 'phone', 'position']
		fields = ['id', 'first_name', 'last_name', 'name', 'image']

