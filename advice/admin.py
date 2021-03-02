from django.contrib import admin
from advice.models import Advice


class AdviceAdmin(admin.ModelAdmin):
	pass


admin.site.register(Advice, AdviceAdmin)
