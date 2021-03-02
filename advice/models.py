from django.db import models
from django.template.defaultfilters import truncatechars


class Advice(models.Model):
	name = models.CharField(max_length=200)
	theme = models.CharField(max_length=200)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	text = models.TextField()
	author = models.ForeignKey('users.CRMUser', null=True, on_delete=models.CASCADE, related_name='advices')

	def get_short_text(self):
		return truncatechars(self.text, 100)


class AdviceComment(models.Model):
	author = models.ForeignKey('users.CRMUser', on_delete=models.CASCADE, related_name='comments')
	text = models.TextField(max_length=1500)
	created_at = models.DateTimeField(auto_now_add=True)

	def get_short_text(self):
		return truncatechars(self.text, 100)
