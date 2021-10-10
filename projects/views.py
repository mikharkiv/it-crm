from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer, ProjectTeamClientSerializer


class ProjectViewSet(viewsets.ModelViewSet):
	queryset = Project.objects.all()
	filterset_fields = '__all__'
	ordering_fields = '__all__'
	search_fields = ['name', 'client__name', 'team__name']

	def get_serializer_class(self):
		if self.action == 'retrieve' or self.action == 'list':
			return ProjectTeamClientSerializer
		return ProjectSerializer
