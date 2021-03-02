from rest_framework import viewsets
from advice.models import Advice, AdviceComment
from advice.serializers import *
from rest_framework.response import Response


# TODO add serializers and endpoints for short-text view
# TODO add advice, advice comments list short text view
class AdviceViewSet(viewsets.ModelViewSet):
	queryset = Advice.objects.all().order_by('-created_at')
	serializer_class = AdviceSerializer

	def retrieve(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = AdviceUserSerializer(instance)
		return Response(serializer.data)

	# If querying list - give truncated text
	def list(self, request, *args, **kwargs):
		queryset = Advice.objects.all()
		serializer = AdviceListSerializer(queryset, many=True)
		return Response(serializer.data)

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)


class AdviceCommentViewSet(viewsets.ModelViewSet):
	queryset = AdviceComment.objects.all().order_by('-created_at')
	serializer_class = AdviceCommentSerializer

	def retrieve(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = AdviceCommentUserSerializer(instance)
		return Response(serializer.data)

	# If querying list - give truncated text
	def list(self, request, *args, **kwargs):
		queryset = Advice.objects.all()
		serializer = AdviceCommentListSerializer(queryset, many=True)
		return Response(serializer.data)

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)
