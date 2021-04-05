from django.db import models
from django_filters import FilterSet
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from advice.models import Advice
from clients.models import Client
from documents.models import Document
from projects.models import Project
from tasks.models import ProjectTask
from .serializers import CRMUserSerializer
from .models import CRMUser


class CRMUserFilterSet(FilterSet):
	class Meta:
		model = CRMUser
		exclude = ['password', 'image', 'is_staff', 'is_superuser', 'groups', 'user_permissions', 'last_login']


class CRMUserViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = CRMUser.objects.all()
	serializer_class = CRMUserSerializer
	filterset_class = CRMUserFilterSet
	ordering_fields = '__all__'
	search_fields = ['first_name', 'last_name', 'email', 'phone']


@api_view()
def get_me(request):
	return Response(CRMUserSerializer(request.user, context={'request': request}).data)


@api_view()
def get_my_stats(request):
	user = request.user
	stats = dict()
	stats['clients_count'] = Client.objects.filter(manager=user).count()  # TODO add proj count
	stats['advice_count'] = Advice.objects.filter(author=user).count()
	stats['tasks_count'] = user.tasks.count()
	stats['tasks_created_count'] = ProjectTask.objects.filter(author=user).count()
	stats['teams_count'] = user.teams.count()
	stats['documents_count'] = Document.objects.filter(author=user).count()
	stats['tasks_budget'] = ProjectTask.objects.filter(author=user).aggregate(models.Sum('budget'))['budget__sum'] or 0
	stats['projects_budget'] = Project.objects.filter(client__manager=user).aggregate(models.Sum('budget'))['budget__sum'] or 0
	return Response(stats)
