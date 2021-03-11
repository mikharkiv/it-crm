from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from advice.views import AdviceViewSet, AdviceCommentViewSet
from teams.views import TeamViewSet
from documents.views import DocumentViewSet
from clients.views import ClientViewSet, ClientStatusViewSet, ContactPersonViewSet
from projects.views import ProjectViewSet
from tasks.views import ProjectTaskViewSet
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'advice', AdviceViewSet)
router.register(r'advice-comments', AdviceCommentViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'documents', DocumentViewSet)
router.register(r'clients', ClientViewSet)
router.register(r'contacts', ContactPersonViewSet)
router.register(r'clients-statuses', ClientStatusViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'tasks', ProjectTaskViewSet)

urlpatterns = [
	path('admin/', admin.site.urls),
	# Django Rest login and logout
	path('api-auth/', include('rest_framework.urls')),
	path('', include(router.urls)),
	path('team/', include('teams.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
	+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
