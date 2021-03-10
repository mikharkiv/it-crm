from .models import Document
from rest_framework import serializers
from users.serializers import CRMUserTinySerializer


class DocumentSerializer(serializers.ModelSerializer):
	file_size = serializers.SerializerMethodField(read_only=True)
	file_name = serializers.SerializerMethodField(read_only=True)
	author = CRMUserTinySerializer(read_only=True)

	def get_file_size(self, obj):
		return obj.get_size()

	def get_file_name(self, obj):
		return obj.get_filename()

	class Meta:
		model = Document
		fields = '__all__'
		read_only_fields = ['created_at', 'updated_at', 'author']