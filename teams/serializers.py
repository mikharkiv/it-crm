from rest_framework import serializers
from .models import Team
from users.serializers import CRMUserTinySerializer


class TeamSerializer(serializers.ModelSerializer):
	members = CRMUserTinySerializer(many=True)
	teamlead = CRMUserTinySerializer()

	class Meta:
		model = Team
		fields = '__all__'

