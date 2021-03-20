from rest_framework import viewsets
from .models import Document
from .serializers import DocumentSerializer, DocumentDetailSerializer


class DocumentViewSet(viewsets.ModelViewSet):
	queryset = Document.objects.all()

	def pre_save(self, obj):
		obj.file = self.request.FILES.get('file')

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)

	def get_serializer_class(self):
		if self.action == "list" or self.action == "retrieve":
			return DocumentDetailSerializer
		return DocumentSerializer
