from django_filters import FilterSet
from rest_framework import viewsets
from .serializers import CRMUserSerializer
from .models import CRMUser


class CRMUserFilterSet(FilterSet):
	class Meta:
		model = CRMUser
		exclude = ['password', 'image', 'is_staff', 'is_superuser', 'groups', 'user_permissions', 'last_login']


class CRMUserViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = CRMUser.objects.all()
	serializer_class = CRMUserSerializer
	filterset_class = CRMUserFilterSet
	ordering_fields = '__all__'
	search_fields = ['first_name', 'last_name', 'email', 'phone']
