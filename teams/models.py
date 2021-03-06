from django.db import models
from django.template.defaultfilters import truncatechars
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from users.models import CRMUser


class Team(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField(max_length=500)
	members = models.ManyToManyField(CRMUser, related_name='teams')
	teamlead = models.ForeignKey('users.CRMUser', null=True, on_delete=models.SET_NULL, related_name='teamlead_teams')

	def get_short_description(self):
		return truncatechars(self.description, 50)

	# def clean(self, *args, **kwargs):
	# 	if self.teamlead and not self.members.filter(id=self.teamlead.id):
	# 		return ValidationError(_("Teamlead must be a member of the team"))

	def __str__(self):
		return self.name
