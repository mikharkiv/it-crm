from django_filters import FilterSet
from rest_framework import viewsets

from .serializers import *


class ProjectTaskFilterSet(FilterSet):
	class Meta:
		model = ProjectTask
		exclude = ['notes', 'attached_persons']


class ProjectTaskViewSet(viewsets.ModelViewSet):
	queryset = ProjectTask.objects.all()
	serializer_class = ProjectTaskFullSerializer
	filterset_class = ProjectTaskFilterSet
	ordering_fields = '__all__'
	search_fields = ['name', 'description', 'budget', 'project__name', 'author__first_name', 'author__last_name']

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)

