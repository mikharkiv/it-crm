from rest_framework import viewsets
from advice.serializers import *


class AdviceViewSet(viewsets.ModelViewSet):
	queryset = Advice.objects.all()
	filterset_fields = '__all__'
	ordering_fields = '__all__'
	search_fields = ['name', 'theme', 'text', 'author__first_name', 'author__last_name']

	def get_serializer_class(self):
		if self.action == "list":
			return AdviceListSerializer
		elif self.action == "retrieve":
			return AdviceUserSerializer
		return AdviceSerializer

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)


class AdviceCommentViewSet(viewsets.ModelViewSet):
	queryset = AdviceComment.objects.all()
	filterset_fields = '__all__'
	ordering_fields = '__all__'
	search_fields = ['text', 'author__first_name', 'author__last_name']

	def get_serializer_class(self):
		if self.action == "list":
			return AdviceCommentListSerializer
		elif self.action == "retrieve":
			return AdviceCommentUserSerializer
		return AdviceCommentSerializer

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)
