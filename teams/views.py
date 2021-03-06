from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Team
from users.models import CRMUser
from .serializers import TeamSerializer


class TeamViewSet(viewsets.ModelViewSet):
	queryset = Team.objects.all().order_by('-name')
	serializer_class = TeamSerializer


@api_view(['POST'])
def add_member_to_team(request, team_id):
	if not team_id:
		return Response({'detail': 'Team ID shout be set'}, status.HTTP_400_BAD_REQUEST)
	if 'user_id' not in request.data.keys():
		return Response({'detail': 'User ID shout be set'}, status.HTTP_400_BAD_REQUEST)
	if not Team.objects.filter(id=team_id):
		return Response({'detail': 'Team not found'}, status.HTTP_400_BAD_REQUEST)
	if not CRMUser.objects.filter(id=request.data['user_id']):
		return Response({'detail': 'User not found'}, status.HTTP_400_BAD_REQUEST)
	team = Team.objects.filter(id=team_id).first()
	user = CRMUser.objects.filter(id=request.data['user_id']).first()
	if team.members.filter(id=user.id):
		return Response({'detail': 'User is already in the team'}, status.HTTP_400_BAD_REQUEST)
	team.members.add(user)
	team.save()
	# TODO serialize team and output it
	return Response({'detail': 'User successfully added to the team'}, status.HTTP_200_OK)


@api_view(['POST'])
def remove_member_from_team(request, team_id):
	if not team_id:
		return Response({'detail': 'Team ID shout be set'}, status.HTTP_400_BAD_REQUEST)
	if 'user_id' not in request.data.keys():
		return Response({'detail': 'User ID shout be set'}, status.HTTP_400_BAD_REQUEST)
	if not Team.objects.filter(id=team_id):
		return Response({'detail': 'Team not found'}, status.HTTP_400_BAD_REQUEST)
	if not CRMUser.objects.filter(id=request.data['user_id']):
		return Response({'detail': 'User not found'}, status.HTTP_400_BAD_REQUEST)
	team = Team.objects.filter(id=team_id).first()
	user = CRMUser.objects.filter(id=request.data['user_id']).first()
	if not team.members.filter(id=user.id):
		return Response({'detail': 'User is not in the team'}, status.HTTP_400_BAD_REQUEST)
	team.members.remove(user)
	team.save()
	# TODO serialize team and output it
	return Response({'detail': 'User successfully deleted from the team'}, status.HTTP_200_OK)


@api_view(['POST'])
def set_teamlead(request, team_id):
	if not team_id:
		return Response({'detail': 'Team ID shout be set'}, status.HTTP_400_BAD_REQUEST)
	if 'user_id' not in request.data.keys():
		return Response({'detail': 'User ID shout be set'}, status.HTTP_400_BAD_REQUEST)
	if not Team.objects.filter(id=team_id):
		return Response({'detail': 'Team not found'}, status.HTTP_400_BAD_REQUEST)
	if not CRMUser.objects.filter(id=request.data['user_id']):
		return Response({'detail': 'User not found'}, status.HTTP_400_BAD_REQUEST)
	team = Team.objects.filter(id=team_id).first()
	user = CRMUser.objects.filter(id=request.data['user_id']).first()
	if not team.members.filter(id=user.id):
		return Response({'detail': 'User is not in the team'}, status.HTTP_400_BAD_REQUEST)
	if team.teamlead and team.teamlead.id is user.id:
		return Response({'detail': 'User is already a teamlead'}, status.HTTP_400_BAD_REQUEST)
	team.teamlead = user
	team.save()
	# TODO serialize team and output it
	return Response({'detail': 'Teamlead successfully set'}, status.HTTP_200_OK)

