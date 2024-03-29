from django_filters import FilterSet
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *


class ProjectTaskFilterSet(FilterSet):
	class Meta:
		model = ProjectTask
		fields = ['name', 'description', 'budget', 'project__client', 'project__team', 'deadline', 'project', 'author']
		# exclude = ['notes', 'attached_persons', 'is_completed']


class ProjectTaskViewSet(viewsets.ModelViewSet):
	queryset = ProjectTask.objects.all()
	filterset_class = ProjectTaskFilterSet
	ordering_fields = '__all__'
	search_fields = ['name', 'description', 'budget', 'project__name', 'author__first_name', 'author__last_name']

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)

	def filter_queryset(self, queryset):
		if self.action == 'list':
			queryset = super(ProjectTaskViewSet, self).filter_queryset(queryset).order_by('deadline').all()
			return sorted(queryset, key=lambda q: q.is_completed())
		else:
			return super(ProjectTaskViewSet, self).filter_queryset(queryset)


	def get_serializer_class(self):
		if self.action == 'retrieve' or self.action == 'list':
			return ProjectTaskFullSerializer
		if self.action == 'update':
			return ProjectTaskUpdateSerializer
		if self.action == 'create':
			return ProjectTaskCreateSerializer
		return ProjectTaskSerializer


class ProjectTaskCommentViewSet(viewsets.ModelViewSet):
	queryset = ProjectTaskComment.objects.all()
	filterset_fields = ['task', 'author', 'text', 'created_at', 'task__project']
	ordering_fields = '__all__'
	search_fields = ['author__first_name', 'author__last_name', 'text']

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)

	def get_serializer_class(self):
		if self.action == 'retrieve' or self.action == 'list':
			return ProjectTaskCommentUserSerializer
		return ProjectTaskCommentSerializer


@api_view(['POST'])
def set_task_person_checked(request, task_id):
	appr = PersonApproval.objects.filter(task=task_id, person=request.user).first()
	if 'is_completed' not in request.data.keys():
		return Response({'detail': 'is_completed shout be set'}, status.HTTP_400_BAD_REQUEST)
	appr.is_completed = request.data['is_completed']
	appr.save()
	return Response(PersonApprovalSerializer(appr).data)
