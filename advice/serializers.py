from advice.models import Advice, AdviceComment
from rest_framework import serializers
from users.serializers import CRMUserTinySerializer


class AdviceSerializer(serializers.ModelSerializer):
	class Meta:
		model = Advice
		fields = '__all__'
		read_only_fields = ['author']


# Including basic user information to display on frontend
class AdviceUserSerializer(AdviceSerializer):
	author = CRMUserTinySerializer()


# Serializer for truncating `text` attribute
class AdviceListSerializer(AdviceUserSerializer):
	text = serializers.SerializerMethodField(read_only=True)

	def get_text(self, obj):
		return obj.get_short_text()


class AdviceCommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = AdviceComment
		fields = '__all__'
		read_only_fields = ['author']


# Including basic user information to display on frontend
class AdviceCommentUserSerializer(AdviceCommentSerializer):
	author = CRMUserTinySerializer()


# Serializer for truncating `text` attribute
class AdviceCommentListSerializer(AdviceCommentUserSerializer):
	text = serializers.SerializerMethodField(read_only=True)

	def get_text(self, obj):
		return obj.get_short_text()
