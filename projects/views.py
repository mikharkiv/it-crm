from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
	queryset = Project.objects.all()
	serializer_class = ProjectSerializer
	filterset_fields = '__all__'
	ordering_fields = '__all__'
	search_fields = '__all__'
