from django.db import models
from django.template.defaultfilters import truncatechars
from users.models import CRMUser


# TODO teamlead must be a member validation
class Team(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField(max_length=500)
	members = models.ManyToManyField(CRMUser, related_name='teams')
	teamlead = models.ForeignKey('users.CRMUser', null=True, on_delete=models.SET_NULL, related_name='teamlead_teams')

	class Meta:
		ordering = ['name']

	def get_short_description(self):
		return truncatechars(self.description, 50)

	def __str__(self):
		return self.name
