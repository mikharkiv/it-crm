from rest_framework import viewsets
from advice.serializers import *
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class AdviceViewSet(viewsets.ModelViewSet):
	queryset = Advice.objects.all()
	serializer_class = AdviceSerializer
	filterset_fields = '__all__'
	ordering_fields = '__all__'
	search_fields = ['name', 'theme', 'text', 'author__first_name', 'author__last_name']

	def retrieve(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = AdviceUserSerializer(instance)
		return Response(serializer.data)

	# If querying list - give truncated text
	def list(self, request, *args, **kwargs):
		queryset = self.filter_queryset(Advice.objects.all())
		pagination = PageNumberPagination()
		paginated_queryset = pagination.paginate_queryset(queryset, request)
		serializer = AdviceListSerializer(paginated_queryset, many=True)
		return pagination.get_paginated_response(serializer.data)

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)


class AdviceCommentViewSet(viewsets.ModelViewSet):
	queryset = AdviceComment.objects.all()
	serializer_class = AdviceCommentSerializer
	filterset_fields = '__all__'
	ordering_fields = '__all__'
	search_fields = ['text', 'author__first_name', 'author__last_name']

	def retrieve(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = AdviceCommentUserSerializer(instance)
		return Response(serializer.data)

	# If querying list - give truncated text
	def list(self, request, *args, **kwargs):
		queryset = self.filter_queryset(AdviceComment.objects.all())
		serializer = AdviceCommentListSerializer(queryset, many=True)
		return Response(serializer.data)

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)
