from django.db import models
from clients.models import Client


# TODO add comments
class Project(models.Model):
	name = models.CharField(max_length=200)
	description = models.TextField(max_length=2000)
	team = models.ForeignKey('teams.Team', on_delete=models.RESTRICT, related_name='projects')
	client = models.ForeignKey('clients.Client', on_delete=models.CASCADE, related_name='projects')

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ['-created_at', 'name']
