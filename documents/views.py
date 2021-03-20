from rest_framework import viewsets
from .serializers import *
from django_filters import FilterSet


class DocumentFilterSet(FilterSet):
	class Meta:
		model = Document
		exclude = ['file']


class DocumentViewSet(viewsets.ModelViewSet):
	queryset = Document.objects.all()
	filterset_class = DocumentFilterSet
	ordering_fields = '__all__'
	search_fields = ['name', 'description', '$file', 'author__first_name', 'author__last_name']

	def pre_save(self, obj):
		obj.file = self.request.FILES.get('file')

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)

	def get_serializer_class(self):
		if self.action == "list" or self.action == "retrieve":
			return DocumentDetailSerializer
		if self.action == "update":
			return DocumentUpdateSerializer
		return DocumentSerializer
