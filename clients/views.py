from django_filters import FilterSet
from rest_framework import viewsets
from .serializers import *


class ClientFilterSet(FilterSet):
	class Meta:
		model = Client
		exclude = ['photo', 'comments', 'socials']


class ClientViewSet(viewsets.ModelViewSet):
	queryset = Client.objects.all()
	filterset_class = ClientFilterSet
	ordering_fields = '__all__'
	search_fields = ['name', 'manager__first_name', 'manager__last_name', 'address', 'postal_address',
					'phone', 'fax', 'email', 'socials', 'website']

	def get_serializer_class(self):
		if self.action == "list" or self.action == "retrieve":
			return ClientDetailSerializer
		return ClientSerializer


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
	filterset_class = ContactPersonFilterSet
	ordering_fields = '__all__'
	search_fields = ['name', 'position', 'client__name', 'address', 'postal_address',
					'phone', 'fax', 'email', 'socials', 'website']

	def get_serializer_class(self):
		if self.action == "list" or self.action == "retrieve":
			return ContactPersonDetailSerializer
		return ContactPersonSerializer


class CommunicationHistoryViewSet(viewsets.ModelViewSet):
	queryset = CommunicationHistory.objects.all()
	filterset_fields = '__all__'
	ordering_fields = '__all__'
	search_fields = ['author__first_name', 'author__last_name', 'contact__name', 'description']

	def get_serializer_class(self):
		if self.action == "list" or self.action == "retrieve":
			return CommunicationHistoryDetailSerializer
		return CommunicationHistorySerializer

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)
