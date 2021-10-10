from .models import CRMUser
from rest_framework import serializers


class CRMUserSerializer(serializers.ModelSerializer):
	full_name = serializers.SerializerMethodField()
	# avatar = serializers.SerializerMethodField()

	def get_full_name(self, obj):
		return obj.get_full_name()

	def get_avatar(self, obj):
		return self.context['request'].build_absolute_uri(obj.photo.src)

	class Meta:
		model = CRMUser
		read_only = ['id', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'last_login',
					'groups', 'user_permissions', 'password']
		exclude = ['is_superuser', 'is_staff', 'is_active', 'date_joined', 'last_login',
					'groups', 'user_permissions', 'password']


class CRMUserTinySerializer(CRMUserSerializer):
	class Meta(CRMUserSerializer.Meta):
		exclude = []
		fields = ['id', 'first_name', 'last_name', 'image', 'full_name']#, 'avatar']
