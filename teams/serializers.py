from rest_framework import serializers
from .models import Team
from users.serializers import CRMUserTinySerializer


class TeamSerializer(serializers.ModelSerializer):
	class Meta:
		model = Team
		fields = '__all__'


class TeamUserSerializer(TeamSerializer):
	members = CRMUserTinySerializer(many=True)
	teamlead = CRMUserTinySerializer()

