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

	def __str__(self):
		return f"{self.name} by {self.author.get_full_name()}"


class AdviceComment(models.Model):
	author = models.ForeignKey('users.CRMUser', on_delete=models.CASCADE, related_name='comments')
	text = models.TextField(max_length=1500)
	created_at = models.DateTimeField(auto_now_add=True)
	advice = models.ForeignKey('advice.Advice', on_delete=models.CASCADE, related_name='comments')

	def get_short_text(self):
		return truncatechars(self.text, 100)

	def __str__(self):
		print(self.author.get_full_name())
		return f"{truncatechars(self.text, 10)} by {self.author.get_full_name()}"
