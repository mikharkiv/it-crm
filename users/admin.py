from django.contrib import admin
from .models import CRMUser


class CRMUserAdmin(admin.ModelAdmin):
	pass


admin.site.register(CRMUser, CRMUserAdmin)
