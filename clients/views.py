from django_filters import FilterSet
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .serializers import *


class ClientFilterSet(FilterSet):
	class Meta:
		model = Client
		exclude = ['photo', 'comments', 'socials']


class ClientViewSet(viewsets.ModelViewSet):
	queryset = Client.objects.all()
	serializer_class = ClientSerializer
	filterset_class = ClientFilterSet
	ordering_fields = '__all__'
	search_fields = ['name', 'manager__first_name', 'manager__last_name', 'address', 'postal_address',
					'phone', 'fax', 'email', 'socials', 'website']

	# If querying single - give full view
	def retrieve(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = ClientDetailSerializer(instance)
		return Response(serializer.data)

	# If querying list - give short view
	def list(self, request, *args, **kwargs):
		queryset = self.filter_queryset(Client.objects.all())
		pagination = PageNumberPagination()
		paginated_queryset = pagination.paginate_queryset(queryset, request)
		serializer = ClientTinySerializer(paginated_queryset, many=True)
		return pagination.get_paginated_response(serializer.data)


class ClientStatusViewSet(viewsets.ModelViewSet):
	queryset = ClientStatus.objects.all()
	serializer_class = ClientStatusSerializer
	filterset_fields = '__all__'
	ordering_fields = '__all__'
	search_fields = ['name']


class ContactPersonFilterSet(FilterSet):
	class Meta:
		model = ContactPerson
		exclude = ['photo', 'comments', 'socials']


class ContactPersonViewSet(viewsets.ModelViewSet):
	queryset = ContactPerson.objects.all()
	serializer_class = ContactPersonSerializer
	filterset_class = ContactPersonFilterSet
	ordering_fields = '__all__'
	search_fields = ['name', 'position', 'client__name', 'address', 'postal_address',
					'phone', 'fax', 'email', 'socials', 'website']

	# If querying single - give full view
	def retrieve(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = ContactPersonDetailSerializer(instance)
		return Response(serializer.data)

	# If querying list - give short view
	def list(self, request, *args, **kwargs):
		queryset = self.filter_queryset(ContactPerson.objects.all())
		pagination = PageNumberPagination()
		paginated_queryset = pagination.paginate_queryset(queryset, request)
		serializer = ContactPersonTinySerializer(paginated_queryset, many=True)
		return pagination.get_paginated_response(serializer.data)
