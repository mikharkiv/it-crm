from rest_framework import viewsets
from .models import Document
from .serializers import DocumentSerializer


class DocumentViewSet(viewsets.ModelViewSet):
	queryset = Document.objects.all()
	serializer_class = DocumentSerializer

	def pre_save(self, obj):
		obj.file = self.request.FILES.get('file')

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)
