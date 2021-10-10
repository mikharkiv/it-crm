from django.contrib import admin
from .models import ProjectTask


class TaskAdmin(admin.ModelAdmin):
	pass


admin.site.register(ProjectTask, TaskAdmin)
